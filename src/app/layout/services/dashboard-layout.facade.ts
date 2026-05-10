import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardLayoutFacade {
  collapsed = signal(false);

  toggleSidebar() {
    this.collapsed.update((v) => !v);
  }
}
