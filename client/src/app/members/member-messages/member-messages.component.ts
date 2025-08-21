import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';

dayjs.extend(relativeTime);
dayjs.locale('vi');
@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username: string;
  currentUser: User;
  loading = false;
  messageContent: string;
  constructor(private messageService: MessageService,
    private accountService: AccountService) {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit(): void {

  }
  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe(message => {
      this.messages.push(message);
      this.messageForm.reset();
    })

  }
  timeAgo(date: string | Date): string {
    return dayjs(date).fromNow();
  }
}
