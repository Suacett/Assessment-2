/**
 * app-routing.module.ts
 * Defines all application routes and navigation paths
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SupportComponent } from './support/support.component';

// Define all application routes
const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'clients/new', component: ClientFormComponent }, // Add new client
  { path: 'clients/edit/:id', component: ClientFormComponent }, // Edit client with ID
  { path: 'clients', component: ClientListComponent }, // View all clients
  { path: 'privacy', component: PrivacyComponent }, // Privacy info
  { path: 'help', component: SupportComponent }, // Help/support
  { path: '**', redirectTo: '' }, // Redirect invalid routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure router at root level
  exports: [RouterModule], // Make router available throughout app
})
export class AppRoutingModule {}
