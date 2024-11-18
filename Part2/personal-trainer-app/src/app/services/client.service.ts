import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, INITIAL_CLIENTS } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: Client[] = INITIAL_CLIENTS;
  private clientsSubject = new BehaviorSubject<Client[]>(this.clients);

  getClients(): Observable<Client[]> {
    return this.clientsSubject.asObservable();
  }

  getVIPClients(): Observable<Client[]> {
    const vipClients = this.clients.filter(client => client.isVIP);
    return new BehaviorSubject<Client[]>(vipClients).asObservable();
  }

  getClient(id: string): Client | undefined {
    return this.clients.find(client => client.clientID === id);
  }

  addClient(client: Client): boolean {
    if (this.clients.some(c => c.clientID === client.clientID)) {
      return false;
    }
    this.clients.push(client);
    this.clientsSubject.next(this.clients);
    return true;
  }

  updateClient(client: Client): boolean {
    const index = this.clients.findIndex(c => c.clientID === client.clientID);
    if (index !== -1) {
      this.clients[index] = client;
      this.clientsSubject.next(this.clients);
      return true;
    }
    return false;
  }

  deleteClient(id: string): boolean {
    const initialLength = this.clients.length;
    this.clients = this.clients.filter(client => client.clientID !== id);
    if (this.clients.length !== initialLength) {
      this.clientsSubject.next(this.clients);
      return true;
    }
    return false;
  }
}