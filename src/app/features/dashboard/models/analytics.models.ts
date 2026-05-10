export interface Message {
  readonly from: string;
  readonly subject: string;
  readonly preview: string;
  readonly time: string;
  readonly unread: boolean;
}

export interface AnalyticsKpi {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly tone: 'up' | 'down';
}
