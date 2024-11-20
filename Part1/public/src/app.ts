/**
 * app.ts
 * Personal trainer client management application that handles
 * adding, editing, deleting and displaying client information
 */
import { Client, ClientManager, Gender, FitnessProgram } from "./types.js";

/**
 * Main application class that manages client data and user interactions
 */
class ClientApp {
  private clientManager: ClientManager;
  private messageTimeout: number | null = null;
  private isEditing: boolean = false;
  private editingClientID: string | null = null;
  private clients: Client[] = [];

  /**
   * Initializes the application with client manager and event listeners
   */
  constructor() {
    // Create new client manager instance
    this.clientManager = new ClientManager();
    this.initializeEventListeners();
    // Display initial client data
    this.displayClients(this.clientManager.getAllClients());
  }

  /**
   * Sets up event listeners for forms and buttons
   */
  private initializeEventListeners(): void {
    // Set up add client form submission handler
    const addForm = document.getElementById("addClientForm");
    if (addForm) {
      addForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission (page reloading)
        this.handleSubmit();
      });
    }

    // Set up search form submission handler
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission
        this.handleSearch();
      });
    }

    // Set up filter buttons for displaying all or VIP clients
    document.getElementById("showAllBtn")?.addEventListener("click", () => {
      this.displayClients(this.clientManager.getAllClients());
    });

    document.getElementById("showVIPBtn")?.addEventListener("click", () => {
      this.displayClients(this.clientManager.getVIPClients());
    });
  }

  /**
   * Handles form submission for adding/updating clients
   */
  private handleSubmit(): void {
    // Get form data and validate
    const client = this.getFormData();
    if (!client) return;

    let success: boolean;
    // Check if we're updating an existing client
    if (this.isEditing && this.editingClientID === client.clientID) {
      // Update existing client
      success = this.clientManager.updateClient(client);
      if (success) {
        this.showMessage("Client updated successfully", "success");
        this.resetForm();
      } else {
        this.showMessage("Failed to update client", "error");
      }
    } else {
      // Add new client
      success = this.clientManager.addClient(client);
      if (success) {
        this.showMessage("Client added successfully", "success");
        this.resetForm();
      } else {
        this.showMessage("Client ID already exists", "error");
      }
    }

    // Refresh client display if operation was successful
    if (success) {
      this.displayClients(this.clientManager.getAllClients());
    }
  }

  /**
   * Resets form fields and editing state back to default
   */
  private resetForm(): void {
    const form = document.getElementById("addClientForm") as HTMLFormElement;
    if (form) {
      // Clear all form fields
      form.reset();
      // Reset editing state
      this.isEditing = false;
      this.editingClientID = null;
      // Update submit button text back to default
      const submitButton = form.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      if (submitButton) {
        submitButton.textContent = "Save Client";
      }
    }
  }

  /**
   * Gets and validates form data to create or update a client
   * @returns Client object if valid, null if validation fails
   */
  private getFormData(): Client | null {
    const form = document.getElementById("addClientForm") as HTMLFormElement;
    if (!form) return null;

    // Create FormData object from form
    const formData = new FormData(form);

    try {
      // Extract all form fields and create client object
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

      // Validate required fields
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

  /**
   * Searches for a client by ID and displays the result
   */
  private handleSearch(): void {
    // Get search input element
    const searchInput = document.getElementById("searchId") as HTMLInputElement;
    if (!searchInput) return;

    // Get and validate search term
    const searchId = searchInput.value.trim();
    if (!searchId) {
      this.showMessage("Enter a valid client ID to search", "error");
      return;
    }

    // Search for client and display results
    const client = this.clientManager.getClient(searchId);
    if (client) {
      this.displayClients([client]);
    } else {
      this.showMessage("No client found with that ID", "error");
      this.displayClients([]);
    }
  }

  /**
   * Displays provided clients list in the UI
   * @param clients Array of clients to display
   */
  private displayClients(clients: Client[]): void {
    // Get client list container
    const clientList = document.getElementById("clientList");
    if (!clientList) return;

    // Show message if no clients to display
    if (clients.length === 0) {
      clientList.innerHTML = "<p>No clients to display</p>";
      return;
    }

    // Generate HTML for client cards
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

  /**
   * Populates form with client data for editing
   * @param clientID ID of client to edit
   */
  public editClient(clientID: string): void {
    // Get client data
    const client = this.clientManager.getClient(clientID);
    if (!client) return;

    // Set editing state
    this.isEditing = true;
    this.editingClientID = clientID;

    // Update submit button text for editing mode
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
          // Handle checkbox fields differently
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

  /**
   * Deletes a client after confirmation
   * @param clientID ID of client to delete
   */
  public deleteClient(clientID: string): void {
    // Show confirmation dialog
    if (!confirm("Are you sure you want to delete this client?")) return;

    // Delete client and refresh display
    if (this.clientManager.deleteClient(clientID)) {
      this.showMessage("Client deleted successfully", "success");
      this.displayClients(this.clientManager.getAllClients());
    }
  }

  /**
   * Shows temporary success/error messages to user
   * @param message Message text to display
   * @param type Type of message ('success' or 'error')
   */
  private showMessage(message: string, type: "success" | "error"): void {
    // Get message container
    const messageDiv = document.getElementById("message");
    if (!messageDiv) return;

    // Display message with appropriate styling
    messageDiv.innerHTML = `<div class="${type}">${message}</div>`;

    // Clear any existing timeout
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    // Set timeout to clear message after 3 seconds
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
