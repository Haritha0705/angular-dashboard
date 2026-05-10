import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersMockApi {
  private delay<T>(data: T, ms?: number): Promise<T> {
    const wait = ms ?? faker.number.int({ min: 200, max: 600 });
    return new Promise((resolve) => setTimeout(() => resolve(data), wait));
  }

  getUsers(): Promise<User[]> {
    const count = faker.number.int({ min: 6, max: 12 });
    const users: User[] = Array.from({ length: count }).map(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      return {
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        role: faker.person.jobTitle(),
        initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(),
        status: faker.helpers.arrayElement(['Active', 'Away', 'Offline']),
      };
    });
    return this.delay(users);
  }
}
