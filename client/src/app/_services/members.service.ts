import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  private getHttpOptions() {
    const userJson = localStorage.getItem('user');
    let token = '';

    if (userJson) {
      try {
        token = JSON.parse(userJson).token;
      } catch (err) {
        console.warn('Lỗi parse token:', err);
      }
    }
    const headers = token
      ? new HttpHeaders({ Authorization: 'Bearer ' + token })
      : new HttpHeaders();

    return { headers };
  }
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users', this.getHttpOptions());
  }
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username, this.getHttpOptions());
  }
  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users/', member)
  }
}
