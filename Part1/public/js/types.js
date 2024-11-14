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
        // Initialize with test data
        this.clients = [
            {
                clientID: "PT001",
                name: "Jern DINGWIDDLE",
                dateOfBirth: "1990-05-15",
                gender: Gender.Male,
                fitnessProgram: FitnessProgram.MuscleGain,
                contactInfo: "Jernny.DINGWIDDLE@email.com",
                joinedDate: "2024-01-01",
                endingDate: "2024-12-31",
                specialHealthNotes: "Previous shoulder injury1",
                isVIP: true,
            },
            {
                clientID: "PT002",
                name: "Stinky McSteve McShikonokonokokoshtantan",
                dateOfBirth: "1988-08-22",
                gender: Gender.Female,
                fitnessProgram: FitnessProgram.FatLoss,
                contactInfo: "Steve.MSNNNNKTT@email.com",
                joinedDate: "2024-02-01",
                endingDate: "2024-08-01",
                specialHealthNotes: "22",
                isVIP: false,
            },
        ];
    }
    addClient(client) {
        if (this.clients.some((c) => c.clientID === client.clientID)) {
            return false;
        }
        this.clients.push(client);
        return true;
    }
    getClient(id) {
        return this.clients.find((client) => client.clientID === id);
    }
    getAllClients() {
        return [...this.clients];
    }
    getVIPClients() {
        return this.clients.filter((client) => client.isVIP);
    }
    deleteClient(id) {
        const initialLength = this.clients.length;
        this.clients = this.clients.filter((client) => client.clientID !== id);
        return this.clients.length !== initialLength;
    }
    // Fixed updateClient method
    updateClient(updatedClient) {
        const index = this.clients.findIndex((client) => client.clientID === updatedClient.clientID);
        if (index !== -1) {
            this.clients[index] = updatedClient;
            return true;
        }
        return false;
    }
}
