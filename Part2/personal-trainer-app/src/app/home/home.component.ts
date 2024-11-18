/**
 * Home component handling the landing page and statistics display
 */
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Object to store client statistics
  stats = {
    totalClients: 0,
    vipClients: 0,
  };

  constructor(private clientService: ClientService) {}

  /**
   * Initialize component by loading client statistics
   */
  ngOnInit() {
    // Subscribe to client data and calculate statistics
    this.clientService.getClients().subscribe((clients) => {
      // Count total number of clients
      this.stats.totalClients = clients.length;
      // Count number of VIP clients
      this.stats.vipClients = clients.filter((client) => client.isVIP).length;
    });
  }
}
