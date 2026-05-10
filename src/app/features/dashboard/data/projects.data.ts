import { DoneProject, HeldProject, Project } from '../models/projects.models';

export const ACTIVE_PROJECTS: readonly Project[] = [
  { name: 'Mobile redesign', owner: 'Sasha', progress: 62, due: 'May 28' },
  { name: 'Billing refactor', owner: 'Jordan', progress: 35, due: 'Jun 4' },
  { name: 'Analytics v2', owner: 'Casey', progress: 80, due: 'May 18' },
  { name: 'Search overhaul', owner: 'Riley', progress: 20, due: 'Jun 12' },
  { name: 'Notifications service', owner: 'Morgan', progress: 55, due: 'May 30' },
];

export const DONE_PROJECTS: readonly DoneProject[] = [
  { name: 'Onboarding revamp', owner: 'Sasha', completed: 'Apr 22' },
  { name: 'SSO integration', owner: 'Jordan', completed: 'Apr 14' },
  { name: 'Dark mode v1', owner: 'Casey', completed: 'Mar 30' },
  { name: 'Audit logging', owner: 'Morgan', completed: 'Mar 18' },
  { name: 'Email templates', owner: 'Riley', completed: 'Mar 5' },
];

export const HELD_PROJECTS: readonly HeldProject[] = [
  { name: 'Reporting v3', owner: 'Sasha', reason: 'Awaiting design' },
  { name: 'Public API', owner: 'Jordan', reason: 'Pending legal review' },
  { name: 'Mobile push', owner: 'Casey', reason: 'Vendor evaluation' },
];
