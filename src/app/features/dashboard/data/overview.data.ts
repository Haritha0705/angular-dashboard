import { Stat } from '../models/overview.models';
import { OverviewTask } from '../models/overview.models';

export const OVERVIEW_STATS: readonly Stat[] = [
  { label: 'Active projects', value: '12', delta: '+2 this week', icon: 'work', tone: 'up' },
  { label: 'Open tasks', value: '47', delta: '-5 this week', icon: 'check_circle', tone: 'up' },
  { label: 'Team members', value: '8', delta: '+1', icon: 'group', tone: 'up' },
  { label: 'Overdue', value: '3', delta: '+1 today', icon: 'warning', tone: 'down' },
];

export const OVERVIEW_ACTIVITY: readonly string[] = [
  'Sasha closed task "Update billing copy"',
  'New project "Mobile redesign" created',
  'Jordan commented on "Q2 roadmap"',
  'Pull request #482 merged into main',
];

export const OVERVIEW_TASKS: readonly OverviewTask[] = [
  { label: 'Review PR #482', done: false },
  { label: 'Ship sidebar refactor', done: true },
  { label: 'Sync with design', done: false },
];
