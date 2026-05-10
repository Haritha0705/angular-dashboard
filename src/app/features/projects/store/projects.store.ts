import { Injectable, signal, inject } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectsMockApi } from '../services/project.mock';

@Injectable({ providedIn: 'root' })
export class ProjectsStore {
  private api = inject(ProjectsMockApi);

  projects = signal<Project[]>([]);
  loading = signal(false);

  async loadProjects() {
    this.loading.set(true);
    try {
      const data = await this.api.getProjects();
      this.projects.set(data);
    } finally {
      this.loading.set(false);
    }
  }
}
