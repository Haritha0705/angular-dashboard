import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ANALYTICS_KPIS,
  ANALYTICS_TRAFFIC_BARS,
} from '../../data/analytics.data';
import { AnalyticsKpi } from '../../models/analytics.models';

@Component({
  standalone: true,
  selector: 'app-analytics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'analytics.html'
})
export class AnalyticsComponent {
  protected readonly kpis: readonly AnalyticsKpi[] = ANALYTICS_KPIS;
  protected readonly bars: readonly number[] = ANALYTICS_TRAFFIC_BARS;
}
