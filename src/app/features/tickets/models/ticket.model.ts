// ── Status & Priority enums ──
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'PENDING' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TicketCategory = 'BUG' | 'FEATURE' | 'SUPPORT' | 'INQUIRY';

// ── Activity timeline ──
export interface ActivityEntry {
  id: string;
  type: 'status_change' | 'comment' | 'assignment' | 'created' | 'attachment';
  message: string;
  user: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
}

// ── File attachment (UI simulation) ──
export interface Attachment {
  id: string;
  name: string;
  size: number;       // bytes
  type: string;       // mime type
  uploadedAt: string;
  uploadedBy: string;
}

// ── Main Ticket model ──
export interface Ticket {
  id: string;
  title: string;
  description: string;

  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;

  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  tags: string[];
  slaBreached: boolean;
  responseTime: number;   // minutes

  attachments: Attachment[];
  activity: ActivityEntry[];
}

// ── Server-side pagination ──
export interface PagedResponse<T> {
  data: T[];
  totalRecords: number;
  page: number;
  pageSize: number;
}

export interface TicketFilters {
  status?: TicketStatus | null;
  priority?: TicketPriority | null;
  category?: TicketCategory | null;
  assignee?: string | null;
  search?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
}

// ── Analytics DTOs ──
export interface AnalyticsKpis {
  openTickets: number;
  slaBreached: number;
  resolvedToday: number;
  avgResponseTime: number; // minutes
}

export interface TrendPoint {
  date: string;
  opened: number;
  resolved: number;
}

export interface CategoryBreakdown {
  category: TicketCategory;
  count: number;
}

// ── Status workflow ──
export const STATUS_WORKFLOW: Record<TicketStatus, TicketStatus[]> = {
  OPEN: ['IN_PROGRESS'],
  IN_PROGRESS: ['PENDING', 'RESOLVED'],
  PENDING: ['IN_PROGRESS', 'RESOLVED'],
  RESOLVED: ['CLOSED', 'OPEN'],
  CLOSED: ['OPEN'],
};

export const STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  PENDING: 'Pending',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
};

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  BUG: 'Bug',
  FEATURE: 'Feature Request',
  SUPPORT: 'Support',
  INQUIRY: 'Inquiry',
};
