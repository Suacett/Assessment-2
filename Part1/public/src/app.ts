import { Client, ClientManager, Gender, FitnessProgram } from "./types.js";

//cannot edit data
//the test data is not added automatically
class ClientApp {
  private clientManager: ClientManager;
  private messageTimeout: number | null = null;
  private isEditing: boolean = false;
  private editingClientID: string | null = null;
  private clients: Client[] = [];

  constructor() {
    this.clientManager = new ClientManager();
    this.addTestData(); // Add test data on initialization
    this.initializeEventListeners();
    // Display initial data
    this.displayClients(this.clientManager.getAllClients());
  }

  private addTestData(): void {
    const testClients: Client[] = [
      {
        clientID: "PT001",
        name: "John Smith",
        dateOfBirth: "1990-05-15",
        gender: Gender.Male,
        fitnessProgram: FitnessProgram.MuscleGain,
        contactInfo: "john.smith@email.com",
        joinedDate: "2024-01-01",
        endingDate: "2024-12-31",
        specialHealthNotes: "Previous shoulder injury44",
        isVIP: true,
      },
      {
        clientID: "PT002",
        name: "Sarah Johnson",
        dateOfBirth: "1988-08-22",
        gender: Gender.Female,
        fitnessProgram: FitnessProgram.FatLoss,
        contactInfo: "sarah.j@email.com",
        joinedDate: "2024-02-01",
        endingDate: "2024-08-01",
        specialHealthNotes: "55",
        isVIP: false,
      },
    ];

    this.clients = testClients; // Store test clients
  }

  private initializeEventListeners(): void {
    // Add client form submission
    const addForm = document.getElementById("addClientForm");
    if (addForm) {
      addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    // Search form submission
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSearch();
      });
    }

    // Display filters
    document.getElementById("showAllBtn")?.addEventListener("click", () => {
      this.displayClients(this.clientManager.getAllClients());
    });

    document.getElementById("showVIPBtn")?.addEventListener("click", () => {
      this.displayClients(this.clientManager.getVIPClients());
    });
  }

  private handleSubmit(): void {
    const client = this.getFormData();
    if (!client) return;

    let success: boolean;
    if (this.isEditing && this.editingClientID === client.clientID) {
      // Make sure we're passing just the client object
      success = this.clientManager.updateClient(client);
      if (success) {
        this.showMessage("Client updated successfully", "success");
        this.resetForm();
      } else {
        this.showMessage("Failed to update client", "error");
      }
    } else {
      success = this.clientManager.addClient(client);
      if (success) {
        this.showMessage("Client added successfully", "success");
        this.resetForm();
      } else {
        this.showMessage("Client ID already exists", "error");
      }
    }

    if (success) {
      this.displayClients(this.clientManager.getAllClients());
    }
  }

  private resetForm(): void {
    const form = document.getElementById("addClientForm") as HTMLFormElement;
    if (form) {
      form.reset();
      this.isEditing = false;
      this.editingClientID = null;
      const submitButton = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      if (submitButton) {
        submitButton.textContent = "Save Client";
      }
    }
  }

  private getFormData(): Client | null {
    const form = document.getElementById("addClientForm") as HTMLFormElement;
    if (!form) return null;

    const formData = new FormData(form);

    try {
      const client: Client = {
        clientID: formData.get("clientID") as string,
        name: formData.get("name") as string,
        dateOfBirth: formData.get("dateOfBirth") as string,
        gender: formData.get("gender") as Gender,
        fitnessProgram: formData.get("fitnessProgram") as FitnessProgram,
        contactInfo: formData.get("contactInfo") as string,
        joinedDate: formData.get("joinedDate") as string,
        endingDate: formData.get("endingDate") as string,
        specialHealthNotes:
          (formData.get("specialHealthNotes") as string) || "",
        isVIP: formData.get("isVIP") === "on",
      };

      if (
        !client.clientID ||
        !client.name ||
        !client.dateOfBirth ||
        !client.contactInfo ||
        !client.joinedDate ||
        !client.endingDate
      ) {
        this.showMessage("All required fields must be filled out", "error");
        return null;
      }

      return client;
    } catch (error) {
      console.error("Error getting form data:", error);
      this.showMessage("Invalid form data", "error");
      return null;
    }
  }

  private handleSearch(): void {
    const searchInput = document.getElementById("searchId") as HTMLInputElement;
    if (!searchInput) return;

    const searchId = searchInput.value.trim();
    if (!searchId) {
      this.showMessage("Enter a valid client ID to search", "error");
      return;
    }

    const client = this.clientManager.getClient(searchId);

    if (client) {
      this.displayClients([client]);
    } else {
      this.showMessage("No client found with that ID", "error");
      this.displayClients([]);
    }
  }

  private displayClients(clients: Client[]): void {
    const clientList = document.getElementById("clientList");
    if (!clientList) return;

    if (clients.length === 0) {
      clientList.innerHTML = "<p>No clients to display</p>";
      return;
    }

    clientList.innerHTML = clients
      .map(
        (client) => `
            <div class="client-card ${client.isVIP ? "vip" : ""}">
                <h3>${client.name} ${client.isVIP ? "(VIP)" : ""}</h3>
                <p>ID: ${client.clientID}</p>
                <p>Program: ${client.fitnessProgram}</p>
                <p>Joined: ${client.joinedDate}</p>
                <div class="button-group">
                    <button onclick="app.editClient('${
                      client.clientID
                    }')">Edit</button>
                    <button onclick="app.deleteClient('${
                      client.clientID
                    }')">Delete</button>
                </div>
            </div>
        `
      )
      .join("");
  }

  public editClient(clientID: string): void {
    const client = this.clientManager.getClient(clientID);
    if (!client) return;

    this.isEditing = true;
    this.editingClientID = clientID;

    // Update submit button text
    const submitButton = document.querySelector(
      '#addClientForm button[type="submit"]'
    ) as HTMLButtonElement;
    if (submitButton) {
      submitButton.textContent = "Update Client";
    }

    // Populate form with client data
    const form = document.getElementById("addClientForm") as HTMLFormElement;
    if (form) {
      Object.keys(client).forEach((key) => {
        const element = form.elements.namedItem(key) as
          | HTMLInputElement
          | HTMLSelectElement
          | HTMLTextAreaElement;
        if (element) {
          if (element.type === "checkbox") {
            (element as HTMLInputElement).checked = client[
              key as keyof Client
            ] as boolean;
          } else {
            element.value = client[key as keyof Client] as string;
          }
        }
      });
    }
  }
  public deleteClient(clientID: string): void {
    if (!confirm("Are you sure you want to delete this client?")) return;

    if (this.clientManager.deleteClient(clientID)) {
      this.showMessage("Client deleted successfully", "success");
      this.displayClients(this.clientManager.getAllClients());
    }
  }

  private showMessage(message: string, type: "success" | "error"): void {
    const messageDiv = document.getElementById("message");
    if (!messageDiv) return;

    messageDiv.innerHTML = `<div class="${type}">${message}</div>`;

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = window.setTimeout(() => {
      if (messageDiv) messageDiv.innerHTML = "";
    }, 3000);
  }
}

// Make app globally available
declare global {
  interface Window {
    app: ClientApp;
  }
}

window.app = new ClientApp();
