import { SettingsProfile, SettingsPreference } from '../models/settings.models';

export const SETTINGS_PROFILE: SettingsProfile = {
  name: 'Haritha',
  email: 'kavindesh518716@gmail.com',
};

export const SETTINGS_PREFERENCES: readonly SettingsPreference[] = [
  { key: 'emailNotifications', label: 'Email notifications', enabled: true },
  { key: 'weeklyDigest', label: 'Weekly digest', enabled: false },
  { key: 'darkMode', label: 'Dark mode', enabled: false },
];
