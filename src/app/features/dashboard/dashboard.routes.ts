import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard-layout.component').then((m) => m.DashboardLayoutComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () =>
          import('./pages/Overview/overview.component').then((m) => m.OverviewComponent),
      },
      {
        path: 'help',
        loadComponent: () => import('./pages/Help/help.component').then((m) => m.HelpComponent),
      },
      {
        path: 'inbox',
        loadComponent: () => import('./pages/Inbox/inbox.component').then((m) => m.InboxComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/Analytics/analytics.component').then((m) => m.AnalyticsComponent),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects-shell.component').then((m) => m.ProjectsShellComponent),
        children: [
          {
            path: 'active',
            loadComponent: () =>
              import('./pages/projects/Active Project/active-project.component').then((m) => m.ActiveProjectComponent),
          },
          {
            path: 'done',
            loadComponent: () =>
              import('./pages/projects/Project Done/project-done.component').then(
                (m) => m.ProjectDoneComponent,
              ),
          },
          {
            path: 'on-hold',
            loadComponent: () =>
              import('./pages/projects/Project On Hold/project-on-hold.component').then(
                (m) => m.ProjectOnHoldComponent,
              ),
          },
        ],
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/Settings/settings.component').then((m) => m.SettingsComponent),
      },
    ],
  },
];
