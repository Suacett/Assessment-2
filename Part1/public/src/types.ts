// Enum for Gender options
export enum Gender {
  Female = "Female",
  Male = "Male",
  Unspecified = "Unspecified",
}

// Enum for Fitness Program options
export enum FitnessProgram {
  FatLoss = "fat loss",
  SeniorFitness = "senior fitness",
  MuscleGain = "muscle gain",
  PrePostnatal = "pre/postnatal fitness",
  ContestPrep = "contest preparation",
  Overall = "overall fitness",
}

// Client interface definition
export interface Client {
  clientID: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  fitnessProgram: FitnessProgram;
  contactInfo: string;
  joinedDate: string;
  endingDate: string;
  specialHealthNotes?: string;
  isVIP: boolean;
}

// Client Manager Class
export class ClientManager {
  private clients: Client[] = [];

  constructor() {
    // Initialize with test data
    this.clients = [
      {
        clientID: "PT001",
        name: "John Smith",
        dateOfBirth: "1990-05-15",
        gender: Gender.Male,
        fitnessProgram: FitnessProgram.MuscleGain,
        contactInfo: "johnny.smitt@email.com",
        joinedDate: "2024-01-01",
        endingDate: "2024-12-31",
        specialHealthNotes: "Previous shoulder injury1",
        isVIP: true,
      },
      {
        clientID: "PT002",
        name: "Stinky McSteve McJohnson",
        dateOfBirth: "1988-08-22",
        gender: Gender.Female,
        fitnessProgram: FitnessProgram.FatLoss,
        contactInfo: "sarah.j@email.com",
        joinedDate: "2024-02-01",
        endingDate: "2024-08-01",
        specialHealthNotes: "22",
        isVIP: false,
      },
    ];
  }

  addClient(client: Client): boolean {
    if (this.clients.some((c) => c.clientID === client.clientID)) {
      return false;
    }
    this.clients.push(client);
    return true;
  }

  getClient(id: string): Client | undefined {
    return this.clients.find((client) => client.clientID === id);
  }

  getAllClients(): Client[] {
    return [...this.clients];
  }

  getVIPClients(): Client[] {
    return this.clients.filter((client) => client.isVIP);
  }

  deleteClient(id: string): boolean {
    const initialLength = this.clients.length;
    this.clients = this.clients.filter((client) => client.clientID !== id);
    return this.clients.length !== initialLength;
  }

  // Fixed updateClient method
  updateClient(updatedClient: Client): boolean {
    const index = this.clients.findIndex(
      (client) => client.clientID === updatedClient.clientID
    );
    if (index !== -1) {
      this.clients[index] = updatedClient;
      return true;
    }
    return false;
  }
}
