
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { NgxSpinnerComponent } from "ngx-spinner";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Dating app';
  users: any;
  constructor(private accountService: AccountService, private router: Router) { }
  ngOnInit() {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.accountService.setCurrentUser(user);

      // Điều hướng về /members nếu đang ở trang gốc '/'
      if (this.router.url === '/') {
        this.router.navigateByUrl('/members');
      }
    }
  }
}