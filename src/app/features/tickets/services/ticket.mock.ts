import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import {
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  ActivityEntry,
  Attachment,
  PagedResponse,
  TicketFilters,
  AnalyticsKpis,
  TrendPoint,
  CategoryBreakdown,
} from '../models/ticket.model';

const STATUSES: TicketStatus[] = ['OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED'];
const PRIORITIES: TicketPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const CATEGORIES: TicketCategory[] = ['BUG', 'FEATURE', 'SUPPORT', 'INQUIRY'];
const ASSIGNEES = ['Sasha Lee', 'Jordan Park', 'Casey Wu', 'Riley Chen', 'Morgan Davis', 'Taylor Kim', 'Alex Rivera', 'Sam Patel'];
const FILE_TYPES = [
  { name: 'screenshot.png', type: 'image/png' },
  { name: 'error-log.txt', type: 'text/plain' },
  { name: 'report.pdf', type: 'application/pdf' },
  { name: 'design-spec.figma', type: 'application/octet-stream' },
  { name: 'video-capture.mp4', type: 'video/mp4' },
];

@Injectable({ providedIn: 'root' })
export class TicketsMockApi {
  private tickets: Ticket[] = this.generateTickets(120);

  // ── Generators ──

  private generateTickets(count: number): Ticket[] {
    return Array.from({ length: count }).map(() => {
      const createdAt = faker.date.past({ years: 0.25 });
      const status = faker.helpers.arrayElement(STATUSES);
      const id = faker.string.uuid();
      const assignee = faker.helpers.arrayElement(ASSIGNEES);

      return {
        id,
        title: faker.hacker.phrase(),
        description: faker.lorem.paragraph(3),
        status,
        priority: faker.helpers.arrayElement(PRIORITIES),
        category: faker.helpers.arrayElement(CATEGORIES),
        assignedTo: assignee,
        createdBy: faker.helpers.arrayElement(ASSIGNEES),
        createdAt: createdAt.toISOString(),
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
        tags: faker.helpers.arrayElements(['bug', 'ui', 'backend', 'urgent', 'api', 'mobile', 'security', 'performance'], { min: 1, max: 3 }),
        slaBreached: faker.datatype.boolean({ probability: 0.15 }),
        responseTime: faker.number.int({ min: 5, max: 480 }),
        attachments: this.generateAttachments(),
        activity: this.generateActivity(id, status, assignee, createdAt),
      };
    });
  }

  private generateAttachments(): Attachment[] {
    const count = faker.number.int({ min: 0, max: 3 });
    return Array.from({ length: count }).map(() => {
      const file = faker.helpers.arrayElement(FILE_TYPES);
      return {
        id: faker.string.uuid(),
        name: file.name,
        size: faker.number.int({ min: 10240, max: 5242880 }),
        type: file.type,
        uploadedAt: faker.date.recent().toISOString(),
        uploadedBy: faker.helpers.arrayElement(ASSIGNEES),
      };
    });
  }

  private generateActivity(ticketId: string, currentStatus: TicketStatus, assignee: string, createdAt: Date): ActivityEntry[] {
    const entries: ActivityEntry[] = [
      {
        id: faker.string.uuid(),
        type: 'created',
        message: 'Ticket created',
        user: faker.helpers.arrayElement(ASSIGNEES),
        timestamp: createdAt.toISOString(),
      },
      {
        id: faker.string.uuid(),
        type: 'assignment',
        message: `Assigned to ${assignee}`,
        user: faker.helpers.arrayElement(ASSIGNEES),
        timestamp: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
        newValue: assignee,
      },
    ];

    if (currentStatus !== 'OPEN') {
      entries.push({
        id: faker.string.uuid(),
        type: 'status_change',
        message: `Status changed from Open to ${currentStatus.replace('_', ' ')}`,
        user: assignee,
        timestamp: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
        oldValue: 'OPEN',
        newValue: currentStatus,
      });
    }

    // Add some comments
    const commentCount = faker.number.int({ min: 0, max: 4 });
    for (let i = 0; i < commentCount; i++) {
      entries.push({
        id: faker.string.uuid(),
        type: 'comment',
        message: faker.lorem.sentence(),
        user: faker.helpers.arrayElement(ASSIGNEES),
        timestamp: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
      });
    }

    // Sort by timestamp ascending
    return entries.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  private delay<T>(data: T, ms?: number): Promise<T> {
    const wait = ms ?? faker.number.int({ min: 200, max: 800 });
    return new Promise((resolve) => setTimeout(() => resolve(data), wait));
  }

  // ── CRUD ──

  getAll(): Promise<Ticket[]> {
    return this.delay([...this.tickets]);
  }

  getById(id: string): Promise<Ticket | undefined> {
    return this.delay(this.tickets.find((t) => t.id === id));
  }

  create(ticket: Partial<Ticket>): Promise<Ticket> {
    const now = new Date().toISOString();
    const id = faker.string.uuid();
    const assignee = ticket.assignedTo || faker.helpers.arrayElement(ASSIGNEES);

    const newTicket: Ticket = {
      id,
      title: ticket.title || '',
      description: ticket.description || '',
      status: 'OPEN',
      priority: ticket.priority || 'MEDIUM',
      category: ticket.category || 'SUPPORT',
      assignedTo: assignee,
      createdBy: 'Haritha',
      createdAt: now,
      updatedAt: now,
      tags: ticket.tags || [],
      slaBreached: false,
      responseTime: 0,
      attachments: ticket.attachments || [],
      activity: [
        {
          id: faker.string.uuid(),
          type: 'created',
          message: 'Ticket created',
          user: 'Haritha',
          timestamp: now,
        },
      ],
    };

    this.tickets.unshift(newTicket);
    return this.delay(newTicket);
  }

  update(id: string, update: Partial<Ticket>): Promise<Ticket> {
    const index = this.tickets.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Ticket ${id} not found`);

    const old = this.tickets[index];

    // If status changed, add activity entry
    if (update.status && update.status !== old.status) {
      const entry: ActivityEntry = {
        id: faker.string.uuid(),
        type: 'status_change',
        message: `Status changed from ${old.status.replace('_', ' ')} to ${update.status.replace('_', ' ')}`,
        user: 'Haritha',
        timestamp: new Date().toISOString(),
        oldValue: old.status,
        newValue: update.status,
      };
      update.activity = [...(old.activity || []), entry];
    }

    this.tickets[index] = {
      ...old,
      ...update,
      updatedAt: new Date().toISOString(),
    };

    return this.delay({ ...this.tickets[index] });
  }

  delete(id: string): Promise<void> {
    this.tickets = this.tickets.filter((t) => t.id !== id);
    return this.delay(undefined);
  }

  // ── Pagination + Filtering ──

  getPaginated(
    page: number,
    pageSize: number,
    filters?: TicketFilters,
    sortField?: string,
    sortOrder?: number, // 1 = asc, -1 = desc
  ): Promise<PagedResponse<Ticket>> {
    let filtered = [...this.tickets];

    // Apply filters
    if (filters) {
      if (filters.status) {
        filtered = filtered.filter((t) => t.status === filters.status);
      }
      if (filters.priority) {
        filtered = filtered.filter((t) => t.priority === filters.priority);
      }
      if (filters.category) {
        filtered = filtered.filter((t) => t.category === filters.category);
      }
      if (filters.assignee) {
        filtered = filtered.filter((t) => t.assignedTo === filters.assignee);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.id.toLowerCase().includes(q),
        );
      }
      if (filters.dateFrom) {
        const from = new Date(filters.dateFrom).getTime();
        filtered = filtered.filter((t) => new Date(t.createdAt).getTime() >= from);
      }
      if (filters.dateTo) {
        const to = new Date(filters.dateTo).getTime();
        filtered = filtered.filter((t) => new Date(t.createdAt).getTime() <= to);
      }
    }

    // Sort
    if (sortField) {
      const order = sortOrder ?? 1;
      filtered.sort((a: any, b: any) => {
        const va = a[sortField] ?? '';
        const vb = b[sortField] ?? '';
        if (va < vb) return -1 * order;
        if (va > vb) return 1 * order;
        return 0;
      });
    } else {
      // Default: newest first
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const totalRecords = filtered.length;
    const start = page * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return this.delay({ data, totalRecords, page, pageSize });
  }

  // ── Bulk Operations ──

  bulkUpdateStatus(ids: string[], newStatus: TicketStatus): Promise<Ticket[]> {
    const updated: Ticket[] = [];
    for (const id of ids) {
      const index = this.tickets.findIndex((t) => t.id === id);
      if (index !== -1) {
        const old = this.tickets[index];
        const entry: ActivityEntry = {
          id: faker.string.uuid(),
          type: 'status_change',
          message: `Bulk action: Status changed to ${newStatus.replace('_', ' ')}`,
          user: 'Haritha',
          timestamp: new Date().toISOString(),
          oldValue: old.status,
          newValue: newStatus,
        };
        this.tickets[index] = {
          ...old,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          activity: [...old.activity, entry],
        };
        updated.push({ ...this.tickets[index] });
      }
    }
    return this.delay(updated);
  }

  bulkDelete(ids: string[]): Promise<void> {
    const idSet = new Set(ids);
    this.tickets = this.tickets.filter((t) => !idSet.has(t.id));
    return this.delay(undefined);
  }

  // ── Analytics ──

  getAnalytics(): Promise<AnalyticsKpis> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const openTickets = this.tickets.filter((t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS' || t.status === 'PENDING').length;
    const slaBreached = this.tickets.filter((t) => t.slaBreached && t.status !== 'CLOSED').length;
    const resolvedToday = this.tickets.filter((t) => {
      const updated = new Date(t.updatedAt);
      return (t.status === 'RESOLVED' || t.status === 'CLOSED') && updated >= today;
    }).length;
    const responseTimes = this.tickets.map((t) => t.responseTime).filter(Boolean);
    const avgResponseTime = responseTimes.length
      ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
      : 0;

    return this.delay({
      openTickets,
      slaBreached,
      resolvedToday: resolvedToday || faker.number.int({ min: 5, max: 18 }),
      avgResponseTime,
    });
  }

  getTrends(days: number = 30): Promise<TrendPoint[]> {
    const trends: TrendPoint[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toISOString().split('T')[0],
        opened: faker.number.int({ min: 2, max: 15 }),
        resolved: faker.number.int({ min: 1, max: 12 }),
      });
    }

    return this.delay(trends, 400);
  }

  getByCategory(): Promise<CategoryBreakdown[]> {
    const counts: Record<string, number> = {};
    for (const t of this.tickets) {
      counts[t.category] = (counts[t.category] || 0) + 1;
    }

    const breakdown: CategoryBreakdown[] = CATEGORIES.map((cat) => ({
      category: cat,
      count: counts[cat] || 0,
    }));

    return this.delay(breakdown, 300);
  }

  // ── Helpers ──

  getAssignees(): string[] {
    return [...ASSIGNEES];
  }
}
