import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { OverviewStat, ActivityEntry, OverviewTask } from '../models/overview.model';

@Injectable({ providedIn: 'root' })
export class OverviewMockApi {
  private delay<T>(data: T, ms?: number): Promise<T> {
    const wait = ms ?? faker.number.int({ min: 200, max: 600 });
    return new Promise((resolve) => setTimeout(() => resolve(data), wait));
  }

  getStats(): Promise<OverviewStat[]> {
    const stats: OverviewStat[] = [
      {
        id: faker.string.uuid(),
        label: 'Active projects',
        value: faker.number.int({ min: 5, max: 20 }),
        delta: '+2 this week',
        icon: 'work',
        tone: 'up',
      },
      {
        id: faker.string.uuid(),
        label: 'Open tasks',
        value: faker.number.int({ min: 20, max: 80 }),
        delta: '-5 this week',
        icon: 'check_circle',
        tone: 'up',
      },
      {
        id: faker.string.uuid(),
        label: 'Team members',
        value: faker.number.int({ min: 5, max: 15 }),
        delta: '+1',
        icon: 'group',
        tone: 'up',
      },
      {
        id: faker.string.uuid(),
        label: 'Overdue',
        value: faker.number.int({ min: 0, max: 10 }),
        delta: '+1 today',
        icon: 'warning',
        tone: 'down',
      },
    ];
    return this.delay(stats);
  }

  getActivity(): Promise<ActivityEntry[]> {
    const count = faker.number.int({ min: 4, max: 8 });
    const activities: ActivityEntry[] = Array.from({ length: count }).map(() => ({
      id: faker.string.uuid(),
      user: faker.person.firstName(),
      action: faker.helpers.arrayElement(['closed task', 'commented on', 'created project', 'merged PR']),
      target: faker.hacker.phrase().split(' ').slice(0, 3).join(' '),
      timestamp: faker.date.recent().toISOString(),
    }));
    return this.delay(activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  }

  getTasks(): Promise<OverviewTask[]> {
    const count = faker.number.int({ min: 3, max: 6 });
    const tasks: OverviewTask[] = Array.from({ length: count }).map(() => ({
      id: faker.string.uuid(),
      label: faker.hacker.phrase(),
      done: faker.datatype.boolean(),
    }));
    return this.delay(tasks);
  }

  updateTask(id: string, done: boolean): Promise<void> {
    return this.delay(undefined, 200);
  }
}
