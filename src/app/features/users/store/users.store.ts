import { Injectable, signal, inject } from '@angular/core';
import { User } from '../models/user.model';
import { UsersMockApi } from '../services/user.mock';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private api = inject(UsersMockApi);

  users = signal<User[]>([]);
  loading = signal(false);

  async loadUsers() {
    this.loading.set(true);
    try {
      const data = await this.api.getUsers();
      this.users.set(data);
    } finally {
      this.loading.set(false);
    }
  }
}
