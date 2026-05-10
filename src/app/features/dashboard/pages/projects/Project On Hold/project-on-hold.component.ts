import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeldProject } from '../../../models/projects.models';
import { HELD_PROJECTS } from '../../../data/projects.data';

@Component({
  standalone: true,
  selector: 'app-project-on-hold',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'project-on-hold.html'
})
export class ProjectOnHoldComponent {
  protected readonly projects: readonly HeldProject[] = HELD_PROJECTS;
}
