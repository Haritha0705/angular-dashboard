import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6 max-w-2xl">
      <div>
        <h1 class="text-2xl font-semibold text-slate-800">Settings</h1>
        <p class="text-sm text-slate-500">Manage your account and preferences.</p>
      </div>

      <section class="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
        <h2 class="text-sm font-semibold text-slate-700">Profile</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label class="flex flex-col gap-1 text-sm">
            <span class="text-slate-600">Name</span>
            <input
              type="text"
              value="Haritha"
              class="px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label class="flex flex-col gap-1 text-sm">
            <span class="text-slate-600">Email</span>
            <input
              type="email"
              value="kavindesh518716&#64;gmail.com"
              class="px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
      </section>

      <section class="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
        <h2 class="text-sm font-semibold text-slate-700">Preferences</h2>
        <label class="flex items-center justify-between text-sm">
          <span class="text-slate-700">Email notifications</span>
          <input type="checkbox" checked />
        </label>
        <label class="flex items-center justify-between text-sm">
          <span class="text-slate-700">Weekly digest</span>
          <input type="checkbox" />
        </label>
        <label class="flex items-center justify-between text-sm">
          <span class="text-slate-700">Dark mode</span>
          <input type="checkbox" />
        </label>
      </section>

      <div class="flex justify-end gap-2">
        <button type="button" class="px-3 py-1.5 rounded border border-slate-300 text-sm text-slate-700 hover:bg-slate-50">
          Cancel
        </button>
        <button type="button" class="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
          Save changes
        </button>
      </div>
    </div>
  `,
})
export class SettingsComponent {}
