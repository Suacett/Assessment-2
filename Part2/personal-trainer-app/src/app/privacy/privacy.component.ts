import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent {
  securityMeasures = [
    {
      title: 'Data Protection',
      details:
        'Client information is stored securely and accessible only to authorized personnel.',
    },
    {
      title: 'Input Validation',
      details:
        'All form inputs are validated to prevent malicious data entry and ensure data integrity.',
    },
    {
      title: 'Access Control',
      details:
        'The application implements role-based access control for different user types.',
    },
    {
      title: 'Client Privacy',
      details:
        'Personal information is handled in compliance with privacy regulations.',
    },
  ];
}
