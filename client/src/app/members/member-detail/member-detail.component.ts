import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';

import { Member } from '../../_models/member';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

import { MessageService } from '../../_services/message.service';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { take } from 'rxjs';

dayjs.extend(relativeTime);
dayjs.locale('vi');

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, TabsModule, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;

  member: Member | null = null;
  selectedImage: string | null = null;
  activeTab: TabDirective | null = null;
  user: User | null = null;

  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(u => (this.user = u));
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data['member'];
    });

    // Chọn tab theo query param nếu có, mặc định tab 0
    this.route.queryParams.subscribe(params => {
      const tabIndex = Number(params['tab']);
      Number.isInteger(tabIndex) ? this.selectTab(tabIndex) : this.selectTab(0);
    });
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  openImage(url: string) {
    this.selectedImage = url;
  }

  closeImage() {
    this.selectedImage = null;
  }

  timeAgo(date: string | Date): string {
    return dayjs(date).fromNow();
  }

  selectTab(tabId: number) {
    if (this.memberTabs && this.memberTabs.tabs[tabId]) {
      this.memberTabs.tabs[tabId].active = true;
    }
  }


  onTabActivated(tab: TabDirective) {
    this.activeTab = tab;
    if (tab.heading === 'Tin nhắn' && this.user && this.member?.username) {
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }
}
