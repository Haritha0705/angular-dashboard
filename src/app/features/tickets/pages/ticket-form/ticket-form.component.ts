import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TicketsStore } from '../../store/tickets.store';
import {
  TicketPriority,
  TicketCategory,
  Attachment,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
} from '../../models/ticket.model';
import { faker } from '@faker-js/faker';

@Component({
  standalone: true,
  selector: 'app-ticket-form',
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    FileUploadModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: 'ticket-form.html',
})
export class TicketFormComponent implements OnInit {
  store = inject(TicketsStore);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private messageService = inject(MessageService);

  form!: FormGroup;
  isEditMode = false;
  ticketId: string | null = null;
  simulatedFiles: Attachment[] = [];

  priorityOptions = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ label, value }));
  categoryOptions = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ label, value }));
  assigneeOptions: { label: string; value: string }[] = [];

  ngOnInit() {
    this.assigneeOptions = this.store.assignees().map((a) => ({ label: a, value: a }));

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['MEDIUM' as TicketPriority, Validators.required],
      category: ['SUPPORT' as TicketCategory, Validators.required],
      assignedTo: ['', Validators.required],
    });

    // Check if edit mode
    this.ticketId = this.route.snapshot.paramMap.get('id');
    if (this.ticketId && this.ticketId !== 'new') {
      this.isEditMode = true;
      this.loadTicket(this.ticketId);
    }
  }

  private async loadTicket(id: string) {
    await this.store.loadTicketById(id);
    const ticket = this.store.selectedTicket();
    if (ticket) {
      this.form.patchValue({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        category: ticket.category,
        assignedTo: ticket.assignedTo,
      });
      this.simulatedFiles = [...ticket.attachments];
    }
  }

  // Simulated file upload — just adds to local array
  onFileSelect(event: any) {
    for (const file of event.files) {
      this.simulatedFiles.push({
        id: faker.string.uuid(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Haritha',
      });
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Added',
      detail: `${event.files.length} file(s) attached (simulated).`,
    });
  }

  removeFile(id: string) {
    this.simulatedFiles = this.simulatedFiles.filter((f) => f.id !== id);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      ...this.form.value,
      attachments: this.simulatedFiles,
    };

    if (this.isEditMode && this.ticketId) {
      await this.store.updateTicket(this.ticketId, data);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Ticket updated successfully.' });
    } else {
      await this.store.addTicket(data);
      this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Ticket created successfully.' });
    }

    setTimeout(() => this.router.navigate(['/tickets']), 800);
  }

  cancel() {
    this.router.navigate(['/tickets']);
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
}
