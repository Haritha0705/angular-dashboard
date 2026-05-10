import { Component, inject, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { UsersStore } from './store/users.store';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CardModule, AvatarModule, TagModule, ButtonModule, DividerModule, SkeletonModule],
  templateUrl: 'users.html',
})
export class UsersComponent implements OnInit {
  store = inject(UsersStore);

  ngOnInit() {
    this.store.loadUsers();
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' | undefined {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Away':
        return 'warn';
      case 'Offline':
        return 'secondary';
      default:
        return undefined;
    }
  }
}
