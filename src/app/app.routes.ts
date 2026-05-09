import { Routes } from '@angular/router';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  ...dashboardRoutes,
  { path: '**', redirectTo: '' },
];
