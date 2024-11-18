/**
 * client.interface.ts
 * Defines the structure and types for client data in the application
 */

/**
 * Interface defining required properties for a client object
 * Ensures consistent data structure throughout the application
 */
export interface Client {
  clientID: string; // Unique identifier for each client
  name: string; // Client's full name
  dateOfBirth: string; // Client's birth date
  // Specific allowed values for gender selection
  gender: 'Female' | 'Male' | 'Unspecified';
  // Available fitness program options
  fitnessProgram:
    | 'fat loss'
    | 'senior fitness'
    | 'muscle gain'
    | 'pre/postnatal fitness'
    | 'contest preparation'
    | 'overall fitness';
  contactInfo: string; // Client's contact information
  joinedDate: string; // Date client started
  endingDate: string; // Program end date
  specialHealthNotes?: string; // Optional health notes (? makes it optional)
  isVIP: boolean; // VIP status flag
}

/**
 * Initial client data for testing and demonstration
 * Provides sample data that matches the Client interface structure
 */
export const INITIAL_CLIENTS: Client[] = [
  {
    // First sample client
    clientID: 'PT001',
    name: 'Jern DINGWIDDLE',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    fitnessProgram: 'muscle gain',
    contactInfo: 'Jernny.DINGWIDDLE@email.com',
    joinedDate: '2024-01-01',
    endingDate: '2024-12-31',
    specialHealthNotes: 'Previous shoulder injury1',
    isVIP: true,
  },
  {
    // Second sample client
    clientID: 'PT002',
    name: 'Stinky McSteve McShikonokonokokoshtantan',
    dateOfBirth: '1988-08-22',
    gender: 'Female',
    fitnessProgram: 'fat loss',
    contactInfo: 'Steve.MSNNNNKTT@email.com',
    joinedDate: '2024-02-01',
    endingDate: '2024-08-01',
    specialHealthNotes: '22',
    isVIP: false,
  },
];
