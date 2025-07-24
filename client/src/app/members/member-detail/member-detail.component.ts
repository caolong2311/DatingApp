import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgImageSliderModule } from 'ng-image-slider';

import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, TabsModule, NgImageSliderModule],
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  imageObject: Array<object> = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMember();
  }

  getImages(): any[] {
    if (!this.member?.photos || this.member.photos.length === 0) return [];

    return this.member.photos.map(photo => ({
      image: photo.url,
      thumbImage: photo.url,
      alt: 'Ảnh',
      title: ''
    }));
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    this.memberService.getMember(username).subscribe(member => {
      this.member = member;
      this.imageObject = this.getImages();
    });
  }
}
