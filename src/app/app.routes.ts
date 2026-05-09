import { Routes } from '@angular/router';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ...dashboardRoutes,
  { path: '**', redirectTo: 'dashboard' },
];
