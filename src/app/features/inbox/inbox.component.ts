import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { INBOX_MESSAGES } from '../dashboard/data/inbox.data';

@Component({
  standalone: true,
  selector: 'app-inbox',
  imports: [CardModule, AvatarModule, BadgeModule, DividerModule, ButtonModule],
  templateUrl: 'inbox.html',
})
export class InboxComponent {
  messages = INBOX_MESSAGES;
}
