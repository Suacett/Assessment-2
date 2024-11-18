/**
 * Service managing client data and operations throughout the application
 * Uses BehaviorSubject to maintain and share client state
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, INITIAL_CLIENTS } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  // Store clients array and create BehaviorSubject for state management
  private clients: Client[] = INITIAL_CLIENTS;
  private clientsSubject = new BehaviorSubject<Client[]>(this.clients);

  /**
   * Returns observable of all clients
   */
  getClients(): Observable<Client[]> {
    return this.clientsSubject.asObservable();
  }

  /**
   * Returns observable of VIP clients only
   */
  getVIPClients(): Observable<Client[]> {
    const vipClients = this.clients.filter((client) => client.isVIP);
    return new BehaviorSubject<Client[]>(vipClients).asObservable();
  }

  /**
   * Finds and returns a single client by ID
   */
  getClient(id: string): Client | undefined {
    return this.clients.find((client) => client.clientID === id);
  }

  /**
   * Adds a new client if ID doesn't exist
   */
  addClient(client: Client): boolean {
    if (this.clients.some((c) => c.clientID === client.clientID)) {
      return false;
    }
    this.clients.push(client);
    this.clientsSubject.next(this.clients);
    return true;
  }

  /**
   * Updates existing client information
   */
  updateClient(client: Client): boolean {
    const index = this.clients.findIndex((c) => c.clientID === client.clientID);
    if (index !== -1) {
      this.clients[index] = client;
      this.clientsSubject.next(this.clients);
      return true;
    }
    return false;
  }

  /**
   * Deletes client by ID
   */
  deleteClient(id: string): boolean {
    const initialLength = this.clients.length;
    this.clients = this.clients.filter((client) => client.clientID !== id);
    if (this.clients.length !== initialLength) {
      this.clientsSubject.next(this.clients);
      return true;
    }
    return false;
  }
}
