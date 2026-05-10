import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { TicketsStore } from '../../store/tickets.store';
import {
  TicketStatus,
  TicketPriority,
  TicketCategory,
  STATUS_LABELS,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from '../../models/ticket.model';

@Component({
  standalone: true,
  selector: 'app-ticket-list',
  imports: [
    FormsModule,
    TableModule,
    TagModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule,
    SkeletonModule,
    CheckboxModule,
    TooltipModule,
    DatePipe,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: 'ticket-list.html',
})
export class TicketListComponent implements OnInit {
  store = inject(TicketsStore);
  private router = inject(Router);
  private confirmService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  // Filter options
  statusOptions = Object.entries(STATUS_LABELS).map(([value, label]) => ({ label, value }));
  priorityOptions = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ label, value }));
  categoryOptions = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ label, value }));
  assigneeOptions: { label: string; value: string }[] = [];

  // Local filter models
  selectedStatus: TicketStatus | null = null;
  selectedPriority: TicketPriority | null = null;
  selectedCategory: TicketCategory | null = null;
  selectedAssignee: string | null = null;
  searchText = '';

  ngOnInit() {
    this.assigneeOptions = this.store.assignees().map((a) => ({ label: a, value: a }));
    // Data is loaded by p-table's onLazyLoad event (fires on init when [lazy]="true")
  }

  // ── Filter actions ──

  applyFilters() {
    this.store.statusFilter.set(this.selectedStatus);
    this.store.priorityFilter.set(this.selectedPriority);
    this.store.categoryFilter.set(this.selectedCategory);
    this.store.assigneeFilter.set(this.selectedAssignee);
    this.store.searchQuery.set(this.searchText);
    this.store.applyFilters();
  }

  resetFilters() {
    this.selectedStatus = null;
    this.selectedPriority = null;
    this.selectedCategory = null;
    this.selectedAssignee = null;
    this.searchText = '';
    this.store.resetFilters();
  }

  onSearch() {
    this.store.searchQuery.set(this.searchText);
    this.store.applyFilters();
  }

  // ── Table events ──

  onLazyLoad(event: TableLazyLoadEvent) {
    const page = Math.floor((event.first || 0) / (event.rows || 10));
    const pageSize = event.rows || 10;

    this.store.page.set(page);
    this.store.pageSize.set(pageSize);

    if (event.sortField) {
      this.store.sortField.set(event.sortField as string);
      this.store.sortOrder.set(event.sortOrder || 1);
    }

    this.store.loadPaginated();
  }

  // ── Selection ──

  onRowSelect(id: string) {
    this.store.toggleSelection(id);
  }

  isSelected(id: string): boolean {
    return this.store.selectedTicketIds().has(id);
  }

  toggleSelectAll(event: any) {
    if (event.checked) {
      const allIds = this.store.tickets().map((t) => t.id);
      this.store.selectAll(allIds);
    } else {
      this.store.clearSelection();
    }
  }

  get allSelected(): boolean {
    const tickets = this.store.tickets();
    return tickets.length > 0 && this.store.selectedTicketIds().size === tickets.length;
  }

  // ── Navigation ──

  viewTicket(id: string) {
    this.router.navigate(['/tickets', id]);
  }

  editTicket(id: string) {
    this.router.navigate(['/tickets', id, 'edit']);
  }

  createTicket() {
    this.router.navigate(['/tickets', 'new']);
  }

  // ── Delete ──

  confirmDelete(id: string) {
    this.confirmService.confirm({
      message: 'Are you sure you want to delete this ticket?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.store.deleteTicket(id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Ticket deleted.' });
      },
    });
  }

  // ── Bulk Actions ──

  bulkClose() {
    this.confirmService.confirm({
      message: `Close ${this.store.selectionCount()} selected tickets?`,
      header: 'Confirm Bulk Close',
      icon: 'pi pi-check-circle',
      accept: async () => {
        await this.store.bulkClose();
        this.messageService.add({ severity: 'success', summary: 'Done', detail: 'Tickets closed.' });
      },
    });
  }

  bulkDelete() {
    this.confirmService.confirm({
      message: `Delete ${this.store.selectionCount()} selected tickets? This cannot be undone.`,
      header: 'Confirm Bulk Delete',
      icon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      accept: async () => {
        await this.store.bulkDelete();
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Tickets deleted.' });
      },
    });
  }

  // ── Severity mappings ──

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (status) {
      case 'OPEN': return 'info';
      case 'IN_PROGRESS': return 'warn';
      case 'PENDING': return 'secondary';
      case 'RESOLVED': return 'success';
      case 'CLOSED': return 'contrast';
      default: return undefined;
    }
  }

  getPrioritySeverity(priority: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (priority) {
      case 'CRITICAL': return 'danger';
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warn';
      case 'LOW': return 'secondary';
      default: return undefined;
    }
  }

  getStatusLabel(status: string): string {
    return STATUS_LABELS[status as TicketStatus] || status;
  }

  getPriorityLabel(priority: string): string {
    return PRIORITY_LABELS[priority as TicketPriority] || priority;
  }

  getCategoryLabel(category: string): string {
    return CATEGORY_LABELS[category as TicketCategory] || category;
  }
}
