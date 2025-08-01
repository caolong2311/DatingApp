import { Component, HostListener, OnInit, ViewChild, viewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";
@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, TabsModule, FormsModule, PhotoEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true
    }
  }
  constructor(private accountService: AccountService, private memberSerice: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
  }
  ngOnInit(): void {
    this.loadMember();
  }
  loadMember() {
    this.memberSerice.getMember(this.user.username).subscribe(member => {
      this.member = member
    })
  }
  updateMember() {
    this.memberSerice.updateMember(this.member).subscribe(() =>{
    this.toastr.success('Cập nhật hồ sơ thành công!', 'Thành công');
    this.editForm.reset(this.member);
    });
  }
}
