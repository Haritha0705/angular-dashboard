import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { OverviewStore } from './store/overview.store';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-overview',
  imports: [CardModule, DividerModule, ChipModule, CheckboxModule, FormsModule, SkeletonModule, CommonModule],
  templateUrl: 'overview.html',
})
export class OverviewComponent implements OnInit {
  store = inject(OverviewStore);

  ngOnInit() {
    this.store.loadData();
  }

  onTaskToggle(id: string, event: any) {
    this.store.toggleTask(id, event.checked);
  }
}
