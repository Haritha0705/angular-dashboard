import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  SETTINGS_PREFERENCES,
  SETTINGS_PROFILE,
} from '../../data/settings.data';
import { SettingsPreference, SettingsProfile } from '../../models/settings.models';

@Component({
  standalone: true,
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'settings.html'
})
export class SettingsComponent {
  protected readonly profile: SettingsProfile = SETTINGS_PROFILE;
  protected readonly preferences: readonly SettingsPreference[] = SETTINGS_PREFERENCES;
}
