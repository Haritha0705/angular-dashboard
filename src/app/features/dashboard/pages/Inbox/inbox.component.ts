import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Message {
  readonly from: string;
  readonly subject: string;
  readonly preview: string;
  readonly time: string;
  readonly unread: boolean;
}

@Component({
  standalone: true,
  selector: 'app-inbox',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-slate-800">Inbox</h1>
        <button
          type="button"
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          <mat-icon class="!text-[18px] !w-[18px] !h-[18px]">edit</mat-icon>
          Compose
        </button>
      </div>

      <div class="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
        @for (m of messages; track m.subject) {
          <div class="flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer">
            <div
              class="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-medium shrink-0"
            >
              {{ m.from.charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <span
                  class="text-sm truncate"
                  [class.font-semibold]="m.unread"
                  [class.text-slate-800]="m.unread"
                  [class.text-slate-600]="!m.unread"
                >
                  {{ m.from }}
                </span>
                <span class="text-xs text-slate-400 shrink-0">{{ m.time }}</span>
              </div>
              <div class="text-sm text-slate-700 truncate">{{ m.subject }}</div>
              <div class="text-xs text-slate-500 truncate">{{ m.preview }}</div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
    
export class InboxComponent {
  protected readonly messages: readonly Message[] = [
    {
      from: 'Sasha Lee',
      subject: 'Quick note on the dashboard refactor',
      preview: 'Pushed the latest changes to the sidebar — let me know what you think...',
      time: '9:42 AM',
      unread: true,
    },
    {
      from: 'Jordan Park',
      subject: 'Q2 roadmap review',
      preview: 'Can we move the sync to Thursday? Conflict on my end...',
      time: 'Yesterday',
      unread: true,
    },
    {
      from: 'Notifications',
      subject: 'PR #482 was merged',
      preview: 'angular-dashboard / main',
      time: 'Mon',
      unread: false,
    },
    {
      from: 'Casey Wu',
      subject: 'Re: Mobile redesign kickoff',
      preview: 'Thanks for the writeup, comments inline.',
      time: 'May 4',
      unread: false,
    },
  ];
}
