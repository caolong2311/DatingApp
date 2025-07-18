import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, CommonModule, BsDropdownModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
  }
  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members')
    }, error => {
      console.log(error);
      this.toastr.error(error.error)
    })
  }
  logout() {
    this.accountService.logout();
    this.model = {}
    this.router.navigateByUrl('/')
  }
}
