import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  faqItems = [
    {
      question: 'How do I add a new client?',
      answer:
        'Click on "Add Client" in the navigation menu or on the homepage. Fill in all required fields (marked with *) and click Save.',
    },
    {
      question: 'How do I make a client VIP?',
      answer:
        'When adding or editing a client, check the "VIP Client" checkbox at the bottom of the form.',
    },
    {
      question: 'How do I edit client information?',
      answer:
        'Find the client in the client list and click the "Edit" button. Update the information and click Save.',
    },
    {
      question: 'How do I search for a specific client?',
      answer:
        'Go to the client list page and use the search bar at the top. Enter the client ID and click Search.',
    },
  ];

  helpSections = [
    {
      title: 'Client Management',
      items: [
        'Add new clients with required information',
        'Edit existing client details',
        'Delete clients when needed',
        'Mark clients as VIP',
      ],
    },
    {
      title: 'Search and Filter',
      items: [
        'Search by client ID',
        'View all clients',
        'Filter VIP clients only',
        'Sort client list',
      ],
    },
  ];
}
