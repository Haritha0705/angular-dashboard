import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { NavItem, ProjectNode } from '../models/dashboard-layout.models';

@Component({
  standalone: true,
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatTreeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host ::ng-deep .mat-tree {
        background: transparent;
      }
      :host ::ng-deep .mat-tree-node,
      :host ::ng-deep .mat-nested-tree-node {
        color: inherit;
        min-height: 0;
        background: transparent;
      }
    `,
  ],
  template: `
    <div class="min-h-screen flex bg-slate-50 text-slate-800">
      <aside
        class="bg-slate-900 text-slate-100 shrink-0 transition-all duration-200"
        [class.w-64]="!collapsed()"
        [class.w-16]="collapsed()"
      >
        <div class="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          @if (!collapsed()) {
            <span class="font-bold tracking-wide">EasyTeam</span>
          }
          <button
            type="button"
            (click)="collapsed.set(!collapsed())"
            class="text-slate-400 hover:text-white p-1 rounded"
            aria-label="Toggle navigation"
          >
            <mat-icon fontSet="material-symbols-outlined">{{
              collapsed() ? 'right_panel_close' : 'right_panel_open'
            }}</mat-icon>
          </button>
        </div>

        <nav class="py-3 flex flex-col gap-0.5">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-blue-600 text-white"
              class="flex items-center gap-3 mx-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 transition"
            >
              <mat-icon class="!text-[20px] !w-5 !h-5 leading-5">{{ item.icon }}</mat-icon>
              @if (!collapsed()) {
                <span>{{ item.label }}</span>
              }
            </a>
          }

          @if (!collapsed()) {
            <mat-tree
              #tree
              [dataSource]="projectTree"
              [childrenAccessor]="childrenAccessor"
              class="mt-1"
            >
              <mat-tree-node
                *matTreeNodeDef="let node"
                matTreeNodePadding
                [matTreeNodePaddingIndent]="20"
              >
                <a
                  [routerLink]="['/projects', node.path]"
                  routerLinkActive="bg-blue-600 text-white"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="flex items-center gap-2 mx-2 px-3 py-1.5 rounded text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition w-[calc(100%-1rem)]"
                >
                  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-[18px]">
                    {{ node.icon }}
                  </mat-icon>
                  <span>{{ node.label }}</span>
                </a>
              </mat-tree-node>

              <mat-tree-node
                *matTreeNodeDef="let node; when: hasChild"
                matTreeNodePadding
                [matTreeNodePaddingIndent]="0"
              >
                <button
                  type="button"
                  matTreeNodeToggle
                  class="flex items-center gap-3 mx-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 transition w-[calc(100%-1rem)]"
                >
                  <mat-icon class="!text-[20px] !w-5 !h-5 leading-5">{{ node.icon }}</mat-icon>
                  <span class="flex-1 text-left">{{ node.label }}</span>
                  <mat-icon class="!text-[18px] !w-[18px] !h-[18px] leading-[18px] text-slate-400">
                    {{ tree.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
                  </mat-icon>
                </button>
              </mat-tree-node>
            </mat-tree>
          } @else {
            <a
              routerLink="/projects"
              routerLinkActive="bg-blue-600 text-white"
              class="flex items-center justify-center mx-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 transition"
            >
              <mat-icon class="!text-[20px] !w-5 !h-5 leading-5">work</mat-icon>
            </a>
          }

          @for (item of bottomNavItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-blue-600 text-white"
              class="flex items-center gap-3 mx-2 px-3 py-2 rounded text-sm text-slate-300 hover:bg-slate-800 transition"
            >
              <mat-icon class="!text-[20px] !w-5 !h-5 leading-5">{{ item.icon }}</mat-icon>
              @if (!collapsed()) {
                <span>{{ item.label }}</span>
              }
            </a>
          }
        </nav>
      </aside>

      <div class="flex-1 flex flex-col min-w-0">
        <header
          class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6"
        >
          <h2 class="font-semibold text-slate-700">Dashboard</h2>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="p-2 rounded hover:bg-slate-100 text-slate-600"
              aria-label="Notifications"
            >
              <mat-icon>notifications</mat-icon>
            </button>
            <div
              class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium"
            >
              H
            </div>
          </div>
        </header>
        <main class="flex-1 overflow-auto p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {
  protected readonly collapsed = signal(false);

  protected readonly navItems: readonly NavItem[] = [
    { label: 'Overview', path: '/overview', icon: 'grid_view' },
    { label: 'Analytics', path: '/analytics', icon: 'bar_chart' },
  ];

  protected readonly bottomNavItems: readonly NavItem[] = [
    { label: 'Inbox', path: '/inbox', icon: 'inbox' },
    { label: 'Settings', path: '/settings', icon: 'settings' },
    { label: 'Help', path: '/help', icon: 'help_outline' },
  ];

  protected readonly projectTree: ProjectNode[] = [
    {
      label: 'Projects',
      path: 'projects',
      icon: 'work',
      children: [
        { label: 'Active', path: 'active', icon: 'trending_up' },
        { label: 'Done', path: 'done', icon: 'done_all' },
        { label: 'On Hold', path: 'on-hold', icon: 'pause_circle' },
      ],
    },
  ];

  protected readonly childrenAccessor = (node: ProjectNode) => node.children ?? [];
  protected readonly hasChild = (_: number, node: ProjectNode) =>
    !!node.children && node.children.length > 0;
}
