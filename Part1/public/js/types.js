// Enum for Gender options
export var Gender;
(function (Gender) {
    Gender["Female"] = "Female";
    Gender["Male"] = "Male";
    Gender["Unspecified"] = "Unspecified";
})(Gender || (Gender = {}));
// Enum for Fitness Program options
export var FitnessProgram;
(function (FitnessProgram) {
    FitnessProgram["FatLoss"] = "fat loss";
    FitnessProgram["SeniorFitness"] = "senior fitness";
    FitnessProgram["MuscleGain"] = "muscle gain";
    FitnessProgram["PrePostnatal"] = "pre/postnatal fitness";
    FitnessProgram["ContestPrep"] = "contest preparation";
    FitnessProgram["Overall"] = "overall fitness";
})(FitnessProgram || (FitnessProgram = {}));
// Client Manager Class
export class ClientManager {
    constructor() {
        this.clients = [];
    }
    // Add a client if ID doesn't exist
    addClient(client) {
        if (this.clients.some(c => c.clientID === client.clientID)) {
            return false;
        }
        this.clients.push(client);
        return true;
    }
    // Get client by ID
    getClient(id) {
        return this.clients.find(client => client.clientID === id);
    }
    // Get all clients
    getAllClients() {
        return [...this.clients];
    }
    // Get only VIP clients
    getVIPClients() {
        return this.clients.filter(client => client.isVIP);
    }
    // Delete a client by ID
    deleteClient(id) {
        const initialLength = this.clients.length;
        this.clients = this.clients.filter(client => client.clientID !== id);
        return this.clients.length !== initialLength;
    }
    // Update existing client
    updateClient(id, updatedClient) {
        const index = this.clients.findIndex(client => client.clientID === id);
        if (index === -1)
            return false;
        this.clients[index] = updatedClient;
        return true;
    }
}
