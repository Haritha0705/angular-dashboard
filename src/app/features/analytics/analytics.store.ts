import { Injectable, signal, inject, OnDestroy } from '@angular/core';
import { Subject, interval, switchMap, takeUntil, tap } from 'rxjs';
import { TicketsMockApi } from '../tickets/services/ticket.mock';
import {
  AnalyticsKpis,
  TrendPoint,
  CategoryBreakdown,
} from '../tickets/models/ticket.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsStore {
  private api = inject(TicketsMockApi);
  private destroy$ = new Subject<void>();
  private polling$ = new Subject<void>();

  // State
  kpis = signal<AnalyticsKpis | null>(null);
  trends = signal<TrendPoint[]>([]);
  categoryBreakdown = signal<CategoryBreakdown[]>([]);
  loading = signal(true);
  lastUpdated = signal<Date | null>(null);

  // Actions
  async loadAll() {
    this.loading.set(true);
    try {
      const [kpis, trends, categories] = await Promise.all([
        this.api.getAnalytics(),
        this.api.getTrends(30),
        this.api.getByCategory(),
      ]);
      this.kpis.set(kpis);
      this.trends.set(trends);
      this.categoryBreakdown.set(categories);
      this.lastUpdated.set(new Date());
    } finally {
      this.loading.set(false);
    }
  }

  startPolling(intervalMs: number = 15000) {
    this.polling$.next(); // stop any existing polling

    interval(intervalMs)
      .pipe(
        takeUntil(this.polling$),
        takeUntil(this.destroy$),
        switchMap(() => Promise.all([
          this.api.getAnalytics(),
          this.api.getTrends(30),
          this.api.getByCategory(),
        ])),
        tap(([kpis, trends, categories]) => {
          this.kpis.set(kpis);
          this.trends.set(trends);
          this.categoryBreakdown.set(categories);
          this.lastUpdated.set(new Date());
        }),
      )
      .subscribe();
  }

  stopPolling() {
    this.polling$.next();
  }

  cleanup() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
