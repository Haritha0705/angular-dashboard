export interface OverviewStat {
  id: string;
  label: string;
  value: string | number;
  delta: string;
  icon: string;
  tone: 'up' | 'down';
}

export interface ActivityEntry {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface OverviewTask {
  id: string;
  label: string;
  done: boolean;
}
