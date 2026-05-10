import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { SETTINGS_PROFILE, SETTINGS_PREFERENCES } from '../dashboard/data/settings.data';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CardModule, ToggleSwitchModule, InputTextModule, ButtonModule, DividerModule, AvatarModule, FormsModule],
  templateUrl: 'settings.html',
})
export class SettingsComponent {
  profile = { ...SETTINGS_PROFILE };
  preferences = SETTINGS_PREFERENCES.map(p => ({ ...p }));
}
