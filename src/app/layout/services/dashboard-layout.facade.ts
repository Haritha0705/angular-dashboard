import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardLayoutFacade {
  // State
  collapsed = signal(false);

  // Actions
  toggleSidebar() {
    this.collapsed.update((v) => !v);
  }

  setCollapsed(value: boolean) {
    this.collapsed.set(value);
  }
}
