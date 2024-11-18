/**
 * Component for displaying and managing the list of clients
 * Includes search, filter, and CRUD operations
 */
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
  // Component properties
  clients: Client[] = [];
  searchId: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private clientService: ClientService, private router: Router) {}

  /**
   * Load all clients when component initializes
   */
  ngOnInit() {
    this.loadAllClients();
  }

  /**
   * Fetches and displays all clients from the service
   */
  loadAllClients() {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  /**
   * Filters and displays only VIP clients
   */
  showVIPClients() {
    this.clientService.getVIPClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  /**
   * Searches for a client by ID and displays result
   */
  searchClient() {
    // Validate search input
    if (!this.searchId.trim()) {
      this.showMessage('Please enter a client ID', 'error');
      return;
    }

    // Search and display results
    const client = this.clientService.getClient(this.searchId);
    if (client) {
      this.clients = [client];
      this.searchId = ''; // Clear search input
    } else {
      this.showMessage('No client found with that ID', 'error');
      this.clients = [];
    }
  }

  /**
   * Navigates to edit form for selected client
   * @param clientId ID of client to edit
   */
  editClient(clientId: string) {
    this.router.navigate(['/clients/edit', clientId]);
  }

  /**
   * Deletes a client after confirmation
   * @param clientId ID of client to delete
   */
  deleteClient(clientId: string) {
    if (confirm('Are you sure you want to delete this client?')) {
      if (this.clientService.deleteClient(clientId)) {
        this.showMessage('Client deleted successfully', 'success');
        this.loadAllClients(); // Refresh client list
      } else {
        this.showMessage('Failed to delete client', 'error');
      }
    }
  }

  /**
   * Displays temporary success/error messages
   * @param message Message to display
   * @param type Type of message (success/error)
   */
  private showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
