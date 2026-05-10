import { Injectable, signal, inject } from '@angular/core';
import { OverviewStat, ActivityEntry, OverviewTask } from '../models/overview.model';
import { OverviewMockApi } from '../services/overview.mock';

@Injectable({ providedIn: 'root' })
export class OverviewStore {
  private api = inject(OverviewMockApi);

  // State
  stats = signal<OverviewStat[]>([]);
  activity = signal<ActivityEntry[]>([]);
  tasks = signal<OverviewTask[]>([]);
  loading = signal(false);

  async loadData() {
    this.loading.set(true);
    try {
      const [statsData, activityData, tasksData] = await Promise.all([
        this.api.getStats(),
        this.api.getActivity(),
        this.api.getTasks(),
      ]);
      this.stats.set(statsData);
      this.activity.set(activityData);
      this.tasks.set(tasksData);
    } finally {
      this.loading.set(false);
    }
  }

  async toggleTask(id: string, done: boolean) {
    // Optimistic update
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, done } : t))
    );
    // Persist mock
    await this.api.updateTask(id, done);
  }
}
