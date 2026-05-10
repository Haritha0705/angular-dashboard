import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DoneProject } from '../../../models/projects.models';
import { DONE_PROJECTS } from '../../../data/projects.data';

@Component({
  standalone: true,
  selector: 'app-project-done',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'project-done.html'
})
export class ProjectDoneComponent {
  protected readonly projects: readonly DoneProject[] = DONE_PROJECTS;
}
