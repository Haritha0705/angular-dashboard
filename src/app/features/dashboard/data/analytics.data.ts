import { AnalyticsKpi } from '../models/analytics.models';

export const ANALYTICS_KPIS: readonly AnalyticsKpi[] = [
  { label: 'Visits', value: '24,189', delta: '+12.4%', tone: 'up' },
  { label: 'Conversions', value: '3.8%', delta: '+0.6pp', tone: 'up' },
  { label: 'Avg. session', value: '2m 41s', delta: '-8s', tone: 'down' },
];

export const ANALYTICS_TRAFFIC_BARS: readonly number[] = [
  32, 48, 40, 65, 55, 70, 60, 78, 72, 85, 68, 90, 82, 75,
];
