import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-dashboard-layout',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ``
})

export class DashboardLayoutComponent {}
