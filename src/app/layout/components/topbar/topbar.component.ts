import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [ToolbarModule, ButtonModule, InputTextModule, AvatarModule, BadgeModule, IconFieldModule, InputIconModule],
  templateUrl: 'topbar.html',
})
    
export class TopbarComponent {}
