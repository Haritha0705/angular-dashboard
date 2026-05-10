import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { faker } from '@faker-js/faker';

interface InboxMessage {
  id: string;
  from: string;
  time: string;
  subject: string;
  preview: string;
  unread: boolean;
}

@Component({
  standalone: true,
  selector: 'app-inbox',
  imports: [CardModule, AvatarModule, BadgeModule, DividerModule, ButtonModule],
  templateUrl: 'inbox.html',
})
export class InboxComponent {
  messages: InboxMessage[] = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    from: faker.person.fullName(),
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    subject: faker.lorem.sentence({ min: 3, max: 6 }),
    preview: faker.lorem.sentences(2),
    unread: faker.datatype.boolean(),
  }));
}
