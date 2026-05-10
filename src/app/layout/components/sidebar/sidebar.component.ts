import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DASHBOARD_NAV, DASHBOARD_BOTTOM_NAV } from '../../config/dashboard-nav.config';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: 'sidebar.html',
})
export class SidebarComponent {
  collapsed = input(false);
  toggle = output<void>();

  nav = DASHBOARD_NAV;
  bottomNav = DASHBOARD_BOTTOM_NAV;
}
