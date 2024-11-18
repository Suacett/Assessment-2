/**
* types.ts
* Defines data types, interfaces, and manages client data for the personal trainer application
*/

// Define available gender options
export enum Gender {
  Female = "Female",
  Male = "Male", 
  Unspecified = "Unspecified"
 }
 
 // Define available fitness program options
 export enum FitnessProgram {
  FatLoss = "fat loss",
  SeniorFitness = "senior fitness", 
  MuscleGain = "muscle gain",
  PrePostnatal = "pre/postnatal fitness",
  ContestPrep = "contest preparation",
  Overall = "overall fitness"
 }
 
 /**
 * Interface defining the structure of a client object
 * Contains personal and training information
 */
 export interface Client {
  clientID: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  fitnessProgram: FitnessProgram;
  contactInfo: string;
  joinedDate: string;
  endingDate: string;
  specialHealthNotes?: string;  // Optional field
  isVIP: boolean;
 }
 
 /**
 * Manages client data and operations like adding, updating, and deleting clients
 */
 export class ClientManager {
  // Array to store client objects
  private clients: Client[] = [];
 
  constructor() {
    // Initialize with sample client data
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
 
  /**
   * Adds a new client if the ID doesn't already exist
   * @param client Client object to add
   * @returns true if added successfully, false if ID exists
   */
  addClient(client: Client): boolean {
    // Check if client ID already exists
    if (this.clients.some((c) => c.clientID === client.clientID)) {
      return false;
    }
    this.clients.push(client);
    return true;
  }
 
  /**
   * Finds and returns a client by their ID
   * @param id Client ID to search for
   * @returns Client object if found, undefined if not
   */
  getClient(id: string): Client | undefined {
    return this.clients.find((client) => client.clientID === id);
  }
 
  /**
   * Returns array of all clients
   * @returns Copy of clients array
   */
  getAllClients(): Client[] {
    return [...this.clients];  // Return copy to prevent direct modification
  }
 
  /**
   * Returns array of VIP clients only
   * @returns Array of clients with VIP status
   */
  getVIPClients(): Client[] {
    return this.clients.filter((client) => client.isVIP);
  }
 
  /**
   * Deletes a client by their ID
   * @param id ID of client to delete
   * @returns true if client was deleted, false if not found
   */
  deleteClient(id: string): boolean {
    const initialLength = this.clients.length;
    this.clients = this.clients.filter((client) => client.clientID !== id);
    return this.clients.length !== initialLength;
  }
 
  /**
   * Updates an existing client's information
   * @param updatedClient Client object with new information
   * @returns true if client was updated, false if not found
   */
  updateClient(updatedClient: Client): boolean {
    // Find client index by ID
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