using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Globalization;

namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public string? Currentname { get; set; }
        public string? Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;
        public string OrderBy { get; set; } = "lastActive";
    }
}
