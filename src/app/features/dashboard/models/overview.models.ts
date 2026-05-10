export interface Stat {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly icon: string;
  readonly tone: 'up' | 'down';
}

export interface OverviewTask {
  readonly label: string;
  readonly done: boolean;
}
