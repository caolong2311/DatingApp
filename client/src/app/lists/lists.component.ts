import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { Pagination } from '../_models/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonsModule, MemberCardComponent, PaginationModule], 
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']                 
})
export class ListsComponent implements OnInit {
  members: Partial<Member>[] = [];
  predicate: string = 'liked';                   
  pageNumber = 1;
  pageSize = 6;
  pagination: Pagination;
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
