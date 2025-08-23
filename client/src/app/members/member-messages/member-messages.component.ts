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
  @ViewChild('messageForm', { static: false }) messageForm?: NgForm;
  @ViewChild('scrollMe') private scrollContainer: any;
  @Input() username: string;

  messages: Message[] = [];
  currentUser: User;
  loading = false;
  messageContent: string = '';

  constructor(
    public messageService: MessageService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    if (this.currentUser && this.username) {
      this.messageService.createHubConnection(this.currentUser, this.username);
    }

    this.messageService.messageThread$.subscribe(messages => {
      this.messages = messages;
      this.scrollToBottom();
    });
  }


  async sendMessage() {
    this.loading = true;
    try {
      await this.messageService.sendMessage(this.username, this.messageContent);
      this.messageForm.reset();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  timeAgo(date: string | Date): string {
    return dayjs(date).fromNow();
  }
  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
