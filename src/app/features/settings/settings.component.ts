import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { faker } from '@faker-js/faker';

@Component({
  standalone: true,
  selector: 'app-settings',
  imports: [CardModule, ToggleSwitchModule, InputTextModule, ButtonModule, DividerModule, AvatarModule, FormsModule],
  templateUrl: 'settings.html',
})
    
export class SettingsComponent {
  profile = {
    name: faker.person.fullName(),
    email: faker.internet.email()
  };

  preferences = [
    { key: 'notifications', label: 'Email Notifications', enabled: true },
    { key: 'marketing', label: 'Marketing Emails', enabled: false },
    { key: 'dark_mode', label: 'Dark Mode', enabled: false },
    { key: 'two_factor', label: 'Two-Factor Authentication', enabled: true }
  ].map(p => ({ ...p }));
}
