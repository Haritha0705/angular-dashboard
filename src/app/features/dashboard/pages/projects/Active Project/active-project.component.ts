import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Project {
  readonly name: string;
  readonly owner: string;
  readonly progress: number;
  readonly due: string;
}

@Component({
  standalone: true,
  selector: 'app-active-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      @for (p of projects; track p.name) {
        <div class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <div class="text-sm font-semibold text-slate-800">{{ p.name }}</div>
              <div class="text-xs text-slate-500">Owner: {{ p.owner }}</div>
            </div>
            <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Active
            </span>
          </div>
          <div>
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Progress</span>
              <span>{{ p.progress }}%</span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div class="h-full bg-blue-600" [style.width.%]="p.progress"></div>
            </div>
          </div>
          <div class="text-xs text-slate-500">Due {{ p.due }}</div>
        </div>
      }
    </div>
  `,
})
export class ActiveProjectComponent {
  protected readonly projects: readonly Project[] = [
    { name: 'Mobile redesign', owner: 'Sasha', progress: 62, due: 'May 28' },
    { name: 'Billing refactor', owner: 'Jordan', progress: 35, due: 'Jun 4' },
    { name: 'Analytics v2', owner: 'Casey', progress: 80, due: 'May 18' },
  ];
}
