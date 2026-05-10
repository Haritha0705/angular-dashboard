import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketsApi {
  private baseUrl = '/api/mock/tickets';

  getTickets(): Promise<Ticket[]> {
    return fetch(this.baseUrl).then((res) => res.json());
  }

  getTicketById(id: string): Promise<Ticket> {
    return fetch(`${this.baseUrl}/${id}`).then((res) => res.json());
  }

  createTicket(ticket: Partial<Ticket>): Promise<Ticket> {
    return fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(ticket),
    }).then((res) => res.json());
  }

  updateTicket(id: string, ticket: Partial<Ticket>): Promise<Ticket> {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticket),
    }).then((res) => res.json());
  }

  deleteTicket(id: string): Promise<void> {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  }
}
