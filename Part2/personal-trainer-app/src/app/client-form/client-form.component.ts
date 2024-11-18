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

  fitnessPrograms = [
    'fat loss',
    'senior fitness',
    'muscle gain',
    'pre/postnatal fitness',
    'contest preparation',
    'overall fitness',
  ];

  genders = ['Female', 'Male', 'Unspecified'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value as Client;
      let success: boolean;

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

      if (success) {
        setTimeout(() => {
          this.router.navigate(['/clients']);
        }, 1500);
      }
    } else {
      this.showMessage('Please fill in all required fields', 'error');
    }
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
}
