import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";
import { Pagination } from '../../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UserParams } from '../../_models/userParams';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{ value: 'male', display: 'nam' }, { value: 'female', display: 'nữ' }]
  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.userParams = this.memberService.getUserParams();
  }
  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination
    })
  }
  resetFilter() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMember();
  }
  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMember();
  }
}
