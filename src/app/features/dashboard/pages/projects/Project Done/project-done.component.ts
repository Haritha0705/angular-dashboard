import { ChangeDetectionStrategy, Component } from '@angular/core';

interface DoneProject {
  readonly name: string;
  readonly owner: string;
  readonly completed: string;
}

@Component({
  standalone: true,
  selector: 'app-project-done',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th class="text-left px-4 py-2 font-medium">Project</th>
            <th class="text-left px-4 py-2 font-medium">Owner</th>
            <th class="text-left px-4 py-2 font-medium">Completed</th>
            <th class="text-left px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700">
          @for (p of projects; track p.name) {
            <tr>
              <td class="px-4 py-2">{{ p.name }}</td>
              <td class="px-4 py-2">{{ p.owner }}</td>
              <td class="px-4 py-2">{{ p.completed }}</td>
              <td class="px-4 py-2">
                <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Done
                </span>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ProjectDoneComponent {
  protected readonly projects: readonly DoneProject[] = [
    { name: 'Onboarding revamp', owner: 'Sasha', completed: 'Apr 22' },
    { name: 'SSO integration', owner: 'Jordan', completed: 'Apr 14' },
    { name: 'Dark mode v1', owner: 'Casey', completed: 'Mar 30' },
  ];
}
