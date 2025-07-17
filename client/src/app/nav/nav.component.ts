import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDropdownModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {}
  
  constructor(public accountService: AccountService) { }
  ngOnInit(): void {
  }
  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);

    })
  }
  logout() {
    this.accountService.logout();
    this.model = {}
  }
}
