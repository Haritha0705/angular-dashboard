import { Component, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { AnalyticsStore } from './analytics.store';

@Component({
  standalone: true,
  selector: 'app-analytics',
  imports: [CardModule, ChartModule, SkeletonModule, TagModule, DatePipe],
  templateUrl: 'analytics.html',
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  store = inject(AnalyticsStore);

  // KPI card config
  kpiCards = computed(() => {
    const k = this.store.kpis();
    if (!k) return [];
    return [
      {
        label: 'Open Tickets',
        value: k.openTickets,
        icon: 'pi pi-ticket',
        iconBg: 'var(--color-primary-50)',
        iconColor: 'var(--color-primary-500)',
        delta: '+3 since yesterday',
        tone: 'up' as const,
      },
      {
        label: 'SLA Breached',
        value: k.slaBreached,
        icon: 'pi pi-exclamation-triangle',
        iconBg: 'var(--color-danger-50)',
        iconColor: 'var(--color-danger-500)',
        delta: k.slaBreached > 0 ? `${k.slaBreached} need attention` : 'All clear',
        tone: k.slaBreached > 0 ? 'down' as const : 'up' as const,
      },
      {
        label: 'Resolved Today',
        value: k.resolvedToday,
        icon: 'pi pi-check-circle',
        iconBg: 'var(--color-success-50)',
        iconColor: 'var(--color-success-500)',
        delta: 'Great progress!',
        tone: 'up' as const,
      },
      {
        label: 'Avg Response Time',
        value: `${k.avgResponseTime}m`,
        icon: 'pi pi-clock',
        iconBg: 'var(--color-warning-50)',
        iconColor: 'var(--color-warning-500)',
        delta: k.avgResponseTime < 60 ? 'Under 1hr — excellent' : 'Target: < 60m',
        tone: k.avgResponseTime < 60 ? 'up' as const : 'down' as const,
      },
    ];
  });

  // Line chart
  trendChartData = computed(() => {
    const trends = this.store.trends();
    if (!trends.length) return null;
    return {
      labels: trends.map((t) => {
        const d = new Date(t.date);
        return `${d.getMonth() + 1}/${d.getDate()}`;
      }),
      datasets: [
        {
          label: 'Opened',
          data: trends.map((t) => t.opened),
          borderColor: 'rgba(99, 102, 241, 1)',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 5,
          borderWidth: 2,
        },
        {
          label: 'Resolved',
          data: trends.map((t) => t.resolved),
          borderColor: 'rgba(34, 197, 94, 1)',
          backgroundColor: 'rgba(34, 197, 94, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 5,
          borderWidth: 2,
        },
      ],
    };
  });

  trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { usePointStyle: true, padding: 20, font: { size: 12 } },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 11 }, maxTicksLimit: 10 },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e2e8f0' },
        ticks: { color: '#94a3b8', font: { size: 11 } },
      },
    },
  };

  // Donut chart
  donutChartData = computed(() => {
    const cats = this.store.categoryBreakdown();
    if (!cats.length) return null;
    return {
      labels: cats.map((c) => c.category),
      datasets: [
        {
          data: cats.map((c) => c.count),
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',   // Bug — red
            'rgba(99, 102, 241, 0.8)',   // Feature — indigo
            'rgba(34, 197, 94, 0.8)',    // Support — green
            'rgba(245, 158, 11, 0.8)',   // Inquiry — amber
          ],
          hoverBackgroundColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(99, 102, 241, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(245, 158, 11, 1)',
          ],
          borderWidth: 0,
        },
      ],
    };
  });

  donutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { usePointStyle: true, padding: 16, font: { size: 12 } },
      },
    },
  };

  ngOnInit() {
    this.store.loadAll();
    this.store.startPolling(15000);
  }

  ngOnDestroy() {
    this.store.stopPolling();
  }
}
