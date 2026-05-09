import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Stat {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly icon: string;
  readonly tone: 'up' | 'down';
}

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-semibold text-slate-800">Overview</h1>
        <p class="text-sm text-slate-500">Welcome back — here's what's happening today.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (s of stats; track s.label) {
          <div class="bg-white rounded-lg border border-slate-200 p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500">{{ s.label }}</span>
              <mat-icon class="!text-[20px] !w-5 !h-5 text-slate-400">{{ s.icon }}</mat-icon>
            </div>
            <div class="mt-2 text-2xl font-semibold text-slate-800">{{ s.value }}</div>
            <div
              class="mt-1 text-xs"
              [class.text-emerald-600]="s.tone === 'up'"
              [class.text-rose-600]="s.tone === 'down'"
            >
              {{ s.delta }}
            </div>
          </div>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-4">
          <h2 class="text-sm font-semibold text-slate-700 mb-3">Recent activity</h2>
          <ul class="divide-y divide-slate-100">
            @for (a of activity; track a) {
              <li class="py-2 text-sm text-slate-600 flex items-center gap-2">
                <mat-icon class="!text-[10px] !w-[10px] !h-[10px] text-blue-500">circle</mat-icon>
                {{ a }}
              </li>
            }
          </ul>
        </div>
        <div class="bg-white rounded-lg border border-slate-200 p-4">
          <h2 class="text-sm font-semibold text-slate-700 mb-3">Tasks</h2>
          <ul class="space-y-2 text-sm text-slate-600">
            <li class="flex items-center gap-2"><input type="checkbox" /> Review PR #482</li>
            <li class="flex items-center gap-2"><input type="checkbox" checked /> Ship sidebar refactor</li>
            <li class="flex items-center gap-2"><input type="checkbox" /> Sync with design</li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class OverviewComponent {
  protected readonly stats: readonly Stat[] = [
    { label: 'Active projects', value: '12', delta: '+2 this week', icon: 'work', tone: 'up' },
    { label: 'Open tasks', value: '47', delta: '-5 this week', icon: 'check_circle', tone: 'up' },
    { label: 'Team members', value: '8', delta: '+1', icon: 'group', tone: 'up' },
    { label: 'Overdue', value: '3', delta: '+1 today', icon: 'warning', tone: 'down' },
  ];

  protected readonly activity: readonly string[] = [
    'Sasha closed task "Update billing copy"',
    'New project "Mobile redesign" created',
    'Jordan commented on "Q2 roadmap"',
    'Pull request #482 merged into main',
  ];
}
