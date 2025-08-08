using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(DataContext dataContext, ITokenService tokenService, IMapper mapper)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username)) return BadRequest("Tên tài khoản đã có người đặt");
            var user = _mapper.Map<AppUser>(registerDTO);
            using var hmac = new HMACSHA512();
            user.UserName = registerDTO.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
            user.PasswordSalt = hmac.Key;
            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();
            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _dataContext.Users.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName == loginDTO.Username);
            if (user == null) return Unauthorized("Tên đăng nập không chính xác");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Mật khẩu không chính xác");
            }
            return new UserDTO
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };

        }
        private async Task<bool> UserExists(string username)
        {
            return await _dataContext.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
