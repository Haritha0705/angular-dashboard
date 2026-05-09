import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-analytics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-semibold text-slate-800">Analytics</h1>
        <p class="text-sm text-slate-500">Last 30 days</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-lg border border-slate-200 p-4">
          <div class="text-sm text-slate-500">Visits</div>
          <div class="mt-2 text-2xl font-semibold text-slate-800">24,189</div>
          <div class="mt-1 text-xs text-emerald-600">+12.4%</div>
        </div>
        <div class="bg-white rounded-lg border border-slate-200 p-4">
          <div class="text-sm text-slate-500">Conversions</div>
          <div class="mt-2 text-2xl font-semibold text-slate-800">3.8%</div>
          <div class="mt-1 text-xs text-emerald-600">+0.6pp</div>
        </div>
        <div class="bg-white rounded-lg border border-slate-200 p-4">
          <div class="text-sm text-slate-500">Avg. session</div>
          <div class="mt-2 text-2xl font-semibold text-slate-800">2m 41s</div>
          <div class="mt-1 text-xs text-rose-600">-8s</div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-slate-200 p-4">
        <h2 class="text-sm font-semibold text-slate-700 mb-4">Traffic</h2>
        <div class="flex items-end gap-2 h-40">
          @for (b of bars; track $index) {
            <div
              class="flex-1 bg-blue-500/80 hover:bg-blue-600 rounded-t transition"
              [style.height.%]="b"
            ></div>
          }
        </div>
      </div>
    </div>
  `,
})
export class AnalyticsComponent {
  protected readonly bars: readonly number[] = [
    32, 48, 40, 65, 55, 70, 60, 78, 72, 85, 68, 90, 82, 75,
  ];
}
