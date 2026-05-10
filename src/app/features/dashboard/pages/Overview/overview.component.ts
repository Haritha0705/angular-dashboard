import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OverviewTask, Stat } from '../../models/overview.models';
import {
  OVERVIEW_ACTIVITY,
  OVERVIEW_STATS,
  OVERVIEW_TASKS,
} from '../../data/overview.data';

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'overview.html'
})
export class OverviewComponent {
  protected readonly stats: readonly Stat[] = OVERVIEW_STATS;
  protected readonly activity: readonly string[] = OVERVIEW_ACTIVITY;
  protected readonly tasks: readonly OverviewTask[] = OVERVIEW_TASKS;
}
