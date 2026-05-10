import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HELP_TOPICS } from '../../data/help.data';
import { HelpTopic } from '../../models/help.models';

@Component({
  standalone: true,
  selector: 'app-help',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'help.html'
})

export class HelpComponent {
  protected readonly topics: readonly HelpTopic[] = HELP_TOPICS;
}
