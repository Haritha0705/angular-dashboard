import { HelpTopic } from '../models/help.models';

export const HELP_TOPICS: readonly HelpTopic[] = [
  { icon: 'rocket_launch', title: 'Getting started', description: 'Set up your workspace in minutes.' },
  { icon: 'integration_instructions', title: 'Integrations', description: 'Connect GitHub, Slack, and more.' },
  { icon: 'security', title: 'Account & security', description: 'Manage password, 2FA, and sessions.' },
  { icon: 'forum', title: 'Community', description: 'Join discussions with other teams.' },
  { icon: 'payments', title: 'Billing & plans', description: 'Update payment methods and invoices.' },
  { icon: 'help_outline', title: 'FAQ', description: 'Answers to the most common questions.' },
];
