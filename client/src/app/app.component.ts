import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  users: any;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get('https://localhost:7241/api/users').subscribe(response => {
      this.users = response
    }, error => {
      console.log(error);
    })
  }
}
