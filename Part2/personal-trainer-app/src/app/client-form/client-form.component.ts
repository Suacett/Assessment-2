/**
 * Component for handling client form operations - adding and editing clients
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../interfaces/client.interface';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditing = false;
  message = '';
  messageType = '';

  // Available options for fitness programs
  fitnessPrograms = [
    'fat loss',
    'senior fitness',
    'muscle gain',
    'pre/postnatal fitness',
    'contest preparation',
    'overall fitness',
  ];

  // Available options for gender selection
  genders = ['Female', 'Male', 'Unspecified'];

  /**
   * Initialize form and inject required services
   */
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Create form group with validation
    this.clientForm = this.fb.group({
      clientID: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      fitnessProgram: ['', Validators.required],
      contactInfo: ['', Validators.required],
      joinedDate: ['', Validators.required],
      endingDate: ['', Validators.required],
      specialHealthNotes: [''],
      isVIP: [false],
    });
  }

  /**
   * Check for client ID in route and load client data if editing
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      const client = this.clientService.getClient(id);
      if (client) {
        this.clientForm.patchValue(client);
      }
    }
  }

  /**
   * Handle form submission for both adding and updating clients
   */
  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value as Client;
      let success: boolean;

      // Update existing or add new client based on edit mode
      if (this.isEditing) {
        success = this.clientService.updateClient(clientData);
        this.showMessage(
          success ? 'Client updated successfully' : 'Failed to update client',
          success ? 'success' : 'error'
        );
      } else {
        success = this.clientService.addClient(clientData);
        this.showMessage(
          success ? 'Client added successfully' : 'Client ID already exists',
          success ? 'success' : 'error'
        );
      }

      // Navigate back to client list on success
      if (success) {
        setTimeout(() => {
          this.router.navigate(['/clients']);
        }, 1500);
      }
    } else {
      this.showMessage('Please fill in all required fields', 'error');
    }
  }

  /**
   * Display temporary messages to user
   * @param message Message to display
   * @param type Type of message (success/error)
   */
  private showMessage(message: string, type: 'success' | 'error') {
    // Set message and type
    this.message = message;
    this.messageType = type;
    // Clear message after delay
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
}
