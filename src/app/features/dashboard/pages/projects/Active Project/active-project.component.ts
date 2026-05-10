import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Project } from '../../../models/projects.models';
import { ProjectService } from '../../../services/project.service';

@Component({
  standalone: true,
  selector: 'app-active-project',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'active-project.html',
})
export class ActiveProjectComponent {
  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading.set(true);

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load projects');
        this.loading.set(false);
      },
    });
  }
}
