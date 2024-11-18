import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  stats = {
    totalClients: 0,
    vipClients: 0,
  };

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    // Get total clients
    this.clientService.getClients().subscribe((clients) => {
      this.stats.totalClients = clients.length;
      this.stats.vipClients = clients.filter((client) => client.isVIP).length;
    });
  }
}
