import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Member } from '../_models/member';
import { map } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  member: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  constructor(private http: HttpClient) { }
  // private getHttpOptions() {
  //   const userJson = localStorage.getItem('user');
  //   let token = '';

  //   if (userJson) {
  //     try {
  //       token = JSON.parse(userJson).token;
  //     } catch (err) {
  //       console.warn('Lỗi parse token:', err);
  //     }
  //   }
  //   const headers = token
  //     ? new HttpHeaders({ Authorization: 'Bearer ' + token })
  //     : new HttpHeaders();

  //   return { headers };
  // }
  getMembers(page?: number, itemPerPage?: number) {
    let params = new HttpParams();
    if(page !== null && itemPerPage !== null){
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }
    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if(response.headers.get('Pagination') !== null){
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    )
  }
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users/', member)
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId)
  }
}
