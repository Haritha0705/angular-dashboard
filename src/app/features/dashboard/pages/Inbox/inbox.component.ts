import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Message } from '../../models/analytics.models';
import { INBOX_MESSAGES } from '../../data/inbox.data';

@Component({
  standalone: true,
  selector: 'app-inbox',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'inbox.html'
})
export class InboxComponent {
  protected readonly messages: readonly Message[] = INBOX_MESSAGES;
}
