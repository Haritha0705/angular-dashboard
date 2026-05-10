import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, SlicePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TextareaModule } from 'primeng/textarea';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TicketsStore } from '../../store/tickets.store';
import {
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  STATUS_WORKFLOW,
  STATUS_LABELS,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from '../../models/ticket.model';

@Component({
  standalone: true,
  selector: 'app-ticket-detail',
  imports: [
    FormsModule,
    DatePipe,
    SlicePipe,
    CardModule,
    TagModule,
    ButtonModule,
    TimelineModule,
    DividerModule,
    AvatarModule,
    TextareaModule,
    SkeletonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: 'ticket-detail.html',
})
export class TicketDetailComponent implements OnInit {
  store = inject(TicketsStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  newComment = '';

  get ticket(): Ticket | null {
    return this.store.selectedTicket();
  }

  get nextStatuses(): TicketStatus[] {
    if (!this.ticket) return [];
    return STATUS_WORKFLOW[this.ticket.status] || [];
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.loadTicketById(id);
    }
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }

  editTicket() {
    if (this.ticket) {
      this.router.navigate(['/tickets', this.ticket.id, 'edit']);
    }
  }

  async changeStatus(newStatus: TicketStatus) {
    if (!this.ticket) return;
    await this.store.changeStatus(this.ticket.id, newStatus);
    this.messageService.add({
      severity: 'success',
      summary: 'Status Updated',
      detail: `Moved to ${STATUS_LABELS[newStatus]}`,
    });
    // Reload to get fresh data with activity
    await this.store.loadTicketById(this.ticket.id);
  }

  async addComment() {
    if (!this.ticket || !this.newComment.trim()) return;
    await this.store.addComment(this.ticket.id, this.newComment.trim());
    this.newComment = '';
    this.messageService.add({
      severity: 'success',
      summary: 'Comment Added',
      detail: 'Your comment has been posted.',
    });
    await this.store.loadTicketById(this.ticket.id);
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

  getActivityIcon(type: string): string {
    switch (type) {
      case 'created': return 'pi pi-plus-circle';
      case 'status_change': return 'pi pi-arrow-right-arrow-left';
      case 'comment': return 'pi pi-comment';
      case 'assignment': return 'pi pi-user';
      case 'attachment': return 'pi pi-paperclip';
      default: return 'pi pi-circle';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'created': return 'var(--color-success-500)';
      case 'status_change': return 'var(--color-primary-500)';
      case 'comment': return 'var(--color-info-500)';
      case 'assignment': return 'var(--color-warning-500)';
      default: return 'var(--color-text-muted)';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
}
