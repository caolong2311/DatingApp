import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
@Input() member: Member;
}
