import { Injectable, signal, computed, inject } from '@angular/core';
import {
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  TicketFilters,
  PagedResponse,
  ActivityEntry,
} from '../models/ticket.model';
import { TicketsMockApi } from '../services/ticket.mock';
import { faker } from '@faker-js/faker';

@Injectable({ providedIn: 'root' })
export class TicketsStore {
  private api = inject(TicketsMockApi);

  // ── State ──
  tickets = signal<Ticket[]>([]);
  loading = signal(false);
  selectedTicket = signal<Ticket | null>(null);
  totalRecords = signal(0);

  // Pagination
  page = signal(0);
  pageSize = signal(10);

  // Filters
  statusFilter = signal<TicketStatus | null>(null);
  priorityFilter = signal<TicketPriority | null>(null);
  categoryFilter = signal<TicketCategory | null>(null);
  assigneeFilter = signal<string | null>(null);
  searchQuery = signal<string>('');
  dateFrom = signal<string | null>(null);
  dateTo = signal<string | null>(null);

  // Sort
  sortField = signal<string>('createdAt');
  sortOrder = signal<number>(-1);

  // Bulk selection
  selectedTicketIds = signal<Set<string>>(new Set());

  // ── Computed ──
  filters = computed<TicketFilters>(() => ({
    status: this.statusFilter(),
    priority: this.priorityFilter(),
    category: this.categoryFilter(),
    assignee: this.assigneeFilter(),
    search: this.searchQuery() || null,
    dateFrom: this.dateFrom(),
    dateTo: this.dateTo(),
  }));

  openTickets = computed(() =>
    this.tickets().filter((t) => t.status === 'OPEN'),
  );

  highPriorityTickets = computed(() =>
    this.tickets().filter((t) => t.priority === 'HIGH' || t.priority === 'CRITICAL'),
  );

  hasSelection = computed(() => this.selectedTicketIds().size > 0);
  selectionCount = computed(() => this.selectedTicketIds().size);

  assignees = computed(() => this.api.getAssignees());

  // ── Actions ──

  async loadPaginated() {
    this.loading.set(true);
    try {
      const result: PagedResponse<Ticket> = await this.api.getPaginated(
        this.page(),
        this.pageSize(),
        this.filters(),
        this.sortField(),
        this.sortOrder(),
      );
      console.log('[TicketsStore] Fetched paginated tickets:', result);
      this.tickets.set(result.data);
      this.totalRecords.set(result.totalRecords);
    } finally {
      this.loading.set(false);
    }
  }

  async loadTickets() {
    this.loading.set(true);
    try {
      const data = await this.api.getAll();
      console.log('[TicketsStore] Fetched all tickets:', data);
      this.tickets.set(data);
      this.totalRecords.set(data.length);
    } finally {
      this.loading.set(false);
    }
  }

  async loadTicketById(id: string) {
    this.loading.set(true);
    try {
      const ticket = await this.api.getById(id);
      if (ticket) {
        this.selectedTicket.set(ticket);
      }
    } finally {
      this.loading.set(false);
    }
  }

  async addTicket(ticket: Partial<Ticket>) {
    this.loading.set(true);
    try {
      await this.api.create(ticket);
      await this.loadPaginated();
    } finally {
      this.loading.set(false);
    }
  }

  async updateTicket(id: string, update: Partial<Ticket>) {
    const updated = await this.api.update(id, update);
    this.tickets.update((list) => list.map((t) => (t.id === id ? updated : t)));
    if (this.selectedTicket()?.id === id) {
      this.selectedTicket.set(updated);
    }
  }

  async deleteTicket(id: string) {
    await this.api.delete(id);
    this.tickets.update((list) => list.filter((t) => t.id !== id));
    this.totalRecords.update((n) => n - 1);
    this.selectedTicketIds.update((set) => {
      const next = new Set(set);
      next.delete(id);
      return next;
    });
  }

  // Status workflow
  async changeStatus(id: string, newStatus: TicketStatus) {
    await this.updateTicket(id, { status: newStatus });
  }

  // Add comment to ticket activity
  async addComment(id: string, message: string) {
    const ticket = this.tickets().find((t) => t.id === id) || this.selectedTicket();
    if (!ticket) return;

    const entry: ActivityEntry = {
      id: faker.string.uuid(),
      type: 'comment',
      message,
      user: 'Haritha',
      timestamp: new Date().toISOString(),
    };

    const updatedActivity = [...ticket.activity, entry];
    await this.updateTicket(id, { activity: updatedActivity } as any);
  }

  // ── Bulk Actions ──

  toggleSelection(id: string) {
    this.selectedTicketIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  selectAll(ids: string[]) {
    this.selectedTicketIds.set(new Set(ids));
  }

  clearSelection() {
    this.selectedTicketIds.set(new Set());
  }

  async bulkClose() {
    const ids = Array.from(this.selectedTicketIds());
    if (!ids.length) return;
    this.loading.set(true);
    try {
      await this.api.bulkUpdateStatus(ids, 'CLOSED');
      this.clearSelection();
      await this.loadPaginated();
    } finally {
      this.loading.set(false);
    }
  }

  async bulkDelete() {
    const ids = Array.from(this.selectedTicketIds());
    if (!ids.length) return;
    this.loading.set(true);
    try {
      await this.api.bulkDelete(ids);
      this.clearSelection();
      await this.loadPaginated();
    } finally {
      this.loading.set(false);
    }
  }

  async bulkAssign(assignee: string) {
    const ids = Array.from(this.selectedTicketIds());
    if (!ids.length) return;
    for (const id of ids) {
      await this.api.update(id, { assignedTo: assignee });
    }
    this.clearSelection();
    await this.loadPaginated();
  }

  // ── Pagination / Filter events ──

  onPageChange(page: number, pageSize: number) {
    this.page.set(page);
    this.pageSize.set(pageSize);
    this.loadPaginated();
  }

  onSort(field: string, order: number) {
    this.sortField.set(field);
    this.sortOrder.set(order);
    this.loadPaginated();
  }

  applyFilters() {
    this.page.set(0);
    this.loadPaginated();
  }

  resetFilters() {
    this.statusFilter.set(null);
    this.priorityFilter.set(null);
    this.categoryFilter.set(null);
    this.assigneeFilter.set(null);
    this.searchQuery.set('');
    this.dateFrom.set(null);
    this.dateTo.set(null);
    this.page.set(0);
    this.loadPaginated();
  }
}
