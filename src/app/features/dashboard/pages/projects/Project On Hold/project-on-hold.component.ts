import { ChangeDetectionStrategy, Component } from '@angular/core';

interface HeldProject {
  readonly name: string;
  readonly owner: string;
  readonly reason: string;
}

@Component({
  standalone: true,
  selector: 'app-project-on-hold',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3">
      @for (p of projects; track p.name) {
        <div
          class="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between"
        >
          <div>
            <div class="text-sm font-semibold text-slate-800">{{ p.name }}</div>
            <div class="text-xs text-slate-500">Owner: {{ p.owner }} · {{ p.reason }}</div>
          </div>
          <span class="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
            On hold
          </span>
        </div>
      }
    </div>
  `,
})
export class ProjectOnHoldComponent {
  protected readonly projects: readonly HeldProject[] = [
    { name: 'Reporting v3', owner: 'Sasha', reason: 'Awaiting design' },
    { name: 'Public API', owner: 'Jordan', reason: 'Pending legal review' },
  ];
}
