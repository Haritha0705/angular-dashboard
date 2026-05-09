import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-help',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6 max-w-3xl">
      <div>
        <h1 class="text-2xl font-semibold text-slate-800">Help</h1>
        <p class="text-sm text-slate-500">Find answers or reach out to support.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (t of topics; track t.title) {
          <a
            href="#"
            class="bg-white rounded-lg border border-slate-200 p-4 hover:border-blue-400 hover:shadow-sm transition flex items-start gap-3"
          >
            <mat-icon class="text-blue-600">{{ t.icon }}</mat-icon>
            <div>
              <div class="text-sm font-semibold text-slate-800">{{ t.title }}</div>
              <div class="text-sm text-slate-500">{{ t.description }}</div>
            </div>
          </a>
        }
      </div>

      <div class="bg-white rounded-lg border border-slate-200 p-4">
        <h2 class="text-sm font-semibold text-slate-700 mb-2">Still need help?</h2>
        <p class="text-sm text-slate-500 mb-3">
          Our team usually replies within a few hours.
        </p>
        <button
          type="button"
          class="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Contact support
        </button>
      </div>
    </div>
  `,
})
export class HelpComponent {
  protected readonly topics = [
    { icon: 'rocket_launch', title: 'Getting started', description: 'Set up your workspace in minutes.' },
    { icon: 'integration_instructions', title: 'Integrations', description: 'Connect GitHub, Slack, and more.' },
    { icon: 'security', title: 'Account & security', description: 'Manage password, 2FA, and sessions.' },
    { icon: 'forum', title: 'Community', description: 'Join discussions with other teams.' },
  ];
}
