import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../../layout/dashboard-layout.component';
import { OverviewComponent } from '../overview/overview.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { TicketListComponent } from '../tickets/pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from '../tickets/pages/ticket-detail/ticket-detail.component';
import { TicketFormComponent } from '../tickets/pages/ticket-form/ticket-form.component';
import { ProjectsComponent } from '../projects/projects.component';
import { UsersComponent } from '../users/users.component';
import { InboxComponent } from '../inbox/inbox.component';
import { SettingsComponent } from '../settings/settings.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'tickets', component: TicketListComponent },
      { path: 'tickets/new', component: TicketFormComponent },
      { path: 'tickets/:id/edit', component: TicketFormComponent },
      { path: 'tickets/:id', component: TicketDetailComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];
