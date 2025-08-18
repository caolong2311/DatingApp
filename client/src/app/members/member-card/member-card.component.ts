import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterModule } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member: Member;
  constructor(private membersSerivce: MembersService, private toastr: ToastrService) {

  }
  addLike(member: Member) {
    this.membersSerivce.addLike(member.username).subscribe({
      next: () => {
        this.toastr.success('Bạn đã thích ' + member.knownAs);
      },
      error: (err) => {
        this.toastr.warning(err.error);
      }
    });
  }
}
