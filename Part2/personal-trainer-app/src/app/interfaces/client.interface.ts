export interface Client {
  clientID: string;
  name: string;
  dateOfBirth: string;
  gender: 'Female' | 'Male' | 'Unspecified';
  fitnessProgram:
    | 'fat loss'
    | 'senior fitness'
    | 'muscle gain'
    | 'pre/postnatal fitness'
    | 'contest preparation'
    | 'overall fitness';
  contactInfo: string;
  joinedDate: string;
  endingDate: string;
  specialHealthNotes?: string;
  isVIP: boolean;
}

export const INITIAL_CLIENTS: Client[] = [
  {
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
