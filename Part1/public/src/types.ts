// Enum for Gender options
export enum Gender {
    Female = "Female",
    Male = "Male",
    Unspecified = "Unspecified"
}

// Enum for Fitness Program options
export enum FitnessProgram {
    FatLoss = "fat loss",
    SeniorFitness = "senior fitness",
    MuscleGain = "muscle gain",
    PrePostnatal = "pre/postnatal fitness",
    ContestPrep = "contest preparation",
    Overall = "overall fitness"
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

    // Add a client if ID doesn't exist
    addClient(client: Client): boolean {
        if (this.clients.some(c => c.clientID === client.clientID)) {
            return false;
        }
        this.clients.push(client);
        return true;
    }

    // Get client by ID
    getClient(id: string): Client | undefined {
        return this.clients.find(client => client.clientID === id);
    }

    // Get all clients
    getAllClients(): Client[] {
        return [...this.clients];
    }

    // Get only VIP clients
    getVIPClients(): Client[] {
        return this.clients.filter(client => client.isVIP);
    }

    // Delete a client by ID
    deleteClient(id: string): boolean {
        const initialLength = this.clients.length;
        this.clients = this.clients.filter(client => client.clientID !== id);
        return this.clients.length !== initialLength;
    }

    // Update existing client
    updateClient(id: string, updatedClient: Client): boolean {
        const index = this.clients.findIndex(client => client.clientID === id);
        if (index === -1) return false;
        this.clients[index] = updatedClient;
        return true;
    }
}