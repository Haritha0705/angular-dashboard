import { Message } from '../models/analytics.models';

export const INBOX_MESSAGES: readonly Message[] = [
  {
    from: 'Sasha Lee',
    subject: 'Quick note on the dashboard refactor',
    preview: 'Pushed the latest changes to the sidebar — let me know what you think...',
    time: '9:42 AM',
    unread: true,
  },
  {
    from: 'Jordan Park',
    subject: 'Q2 roadmap review',
    preview: 'Can we move the sync to Thursday? Conflict on my end...',
    time: 'Yesterday',
    unread: true,
  },
  {
    from: 'Notifications',
    subject: 'PR #482 was merged',
    preview: 'angular-dashboard / main',
    time: 'Mon',
    unread: false,
  },
  {
    from: 'Casey Wu',
    subject: 'Re: Mobile redesign kickoff',
    preview: 'Thanks for the writeup, comments inline.',
    time: 'May 4',
    unread: false,
  },
  {
    from: 'Riley Chen',
    subject: 'Design tokens proposal',
    preview: 'Drafted a new spacing scale — want your eyes before I share it...',
    time: 'May 2',
    unread: true,
  },
  {
    from: 'Billing',
    subject: 'Invoice #1029 available',
    preview: 'Your monthly invoice is ready to download.',
    time: 'Apr 30',
    unread: false,
  },
];
