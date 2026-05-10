import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', loadComponent: () => import('./features/overview/overview.component').then(m => m.OverviewComponent) },
      { path: 'analytics', loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'tickets', loadComponent: () => import('./features/tickets/pages/ticket-list/ticket-list.component').then(m => m.TicketListComponent) },
      { path: 'projects', loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent) },
      { path: 'users', loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent) },
      { path: 'inbox', loadComponent: () => import('./features/inbox/inbox.component').then(m => m.InboxComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) },
    ]
  },
  { path: '**', redirectTo: '' },
];
