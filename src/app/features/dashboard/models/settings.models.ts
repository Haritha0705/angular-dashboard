export interface SettingsProfile {
  readonly name: string;
  readonly email: string;
}

export interface SettingsPreference {
  readonly key: string;
  readonly label: string;
  readonly enabled: boolean;
}
