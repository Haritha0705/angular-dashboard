import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardLayoutFacade } from './services/dashboard-layout.facade';

@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: 'dashboard-layout.html',
})

export class DashboardLayoutComponent {
  constructor(public facade: DashboardLayoutFacade) {}
}
