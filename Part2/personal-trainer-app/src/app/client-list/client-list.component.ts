import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../interfaces/client.interface';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  searchId: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.loadAllClients();
  }

  loadAllClients() {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  showVIPClients() {
    this.clientService.getVIPClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  searchClient() {
    if (!this.searchId.trim()) {
      this.showMessage('Please enter a client ID', 'error');
      return;
    }

    const client = this.clientService.getClient(this.searchId);
    if (client) {
      this.clients = [client];
      this.searchId = '';
    } else {
      this.showMessage('No client found with that ID', 'error');
      this.clients = [];
    }
  }

  editClient(clientId: string) {
    this.router.navigate(['/clients/edit', clientId]);
  }

  deleteClient(clientId: string) {
    if (confirm('Are you sure you want to delete this client?')) {
      if (this.clientService.deleteClient(clientId)) {
        this.showMessage('Client deleted successfully', 'success');
        this.loadAllClients();
      } else {
        this.showMessage('Failed to delete client', 'error');
      }
    }
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
