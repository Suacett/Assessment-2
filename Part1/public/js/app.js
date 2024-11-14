import { ClientManager } from "./types.js";
class ClientApp {
    constructor() {
        this.messageTimeout = null;
        this.isEditing = false;
        this.editingClientID = null;
        this.clients = [];
        this.clientManager = new ClientManager();
        this.initializeEventListeners();
        // Display initial data
        this.displayClients(this.clientManager.getAllClients());
    }
    initializeEventListeners() {
        var _a, _b;
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
        (_a = document.getElementById("showAllBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.displayClients(this.clientManager.getAllClients());
        });
        (_b = document.getElementById("showVIPBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.displayClients(this.clientManager.getVIPClients());
        });
    }
    handleSubmit() {
        const client = this.getFormData();
        if (!client)
            return;
        let success;
        if (this.isEditing && this.editingClientID === client.clientID) {
            // Make sure we're passing just the client object
            success = this.clientManager.updateClient(client);
            if (success) {
                this.showMessage("Client updated successfully", "success");
                this.resetForm();
            }
            else {
                this.showMessage("Failed to update client", "error");
            }
        }
        else {
            success = this.clientManager.addClient(client);
            if (success) {
                this.showMessage("Client added successfully", "success");
                this.resetForm();
            }
            else {
                this.showMessage("Client ID already exists", "error");
            }
        }
        if (success) {
            this.displayClients(this.clientManager.getAllClients());
        }
    }
    resetForm() {
        const form = document.getElementById("addClientForm");
        if (form) {
            form.reset();
            this.isEditing = false;
            this.editingClientID = null;
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = "Save Client";
            }
        }
    }
    getFormData() {
        const form = document.getElementById("addClientForm");
        if (!form)
            return null;
        const formData = new FormData(form);
        try {
            const client = {
                clientID: formData.get("clientID"),
                name: formData.get("name"),
                dateOfBirth: formData.get("dateOfBirth"),
                gender: formData.get("gender"),
                fitnessProgram: formData.get("fitnessProgram"),
                contactInfo: formData.get("contactInfo"),
                joinedDate: formData.get("joinedDate"),
                endingDate: formData.get("endingDate"),
                specialHealthNotes: formData.get("specialHealthNotes") || "",
                isVIP: formData.get("isVIP") === "on",
            };
            if (!client.clientID ||
                !client.name ||
                !client.dateOfBirth ||
                !client.contactInfo ||
                !client.joinedDate ||
                !client.endingDate) {
                this.showMessage("All required fields must be filled out", "error");
                return null;
            }
            return client;
        }
        catch (error) {
            console.error("Error getting form data:", error);
            this.showMessage("Invalid form data", "error");
            return null;
        }
    }
    handleSearch() {
        const searchInput = document.getElementById("searchId");
        if (!searchInput)
            return;
        const searchId = searchInput.value.trim();
        if (!searchId) {
            this.showMessage("Enter a valid client ID to search", "error");
            return;
        }
        const client = this.clientManager.getClient(searchId);
        if (client) {
            this.displayClients([client]);
        }
        else {
            this.showMessage("No client found with that ID", "error");
            this.displayClients([]);
        }
    }
    displayClients(clients) {
        const clientList = document.getElementById("clientList");
        if (!clientList)
            return;
        if (clients.length === 0) {
            clientList.innerHTML = "<p>No clients to display</p>";
            return;
        }
        clientList.innerHTML = clients
            .map((client) => `
            <div class="client-card ${client.isVIP ? "vip" : ""}">
                <h3>${client.name} ${client.isVIP ? "(VIP)" : ""}</h3>
                <p>ID: ${client.clientID}</p>
                <p>Program: ${client.fitnessProgram}</p>
                <p>Joined: ${client.joinedDate}</p>
                <div class="button-group">
                    <button onclick="app.editClient('${client.clientID}')">Edit</button>
                    <button onclick="app.deleteClient('${client.clientID}')">Delete</button>
                </div>
            </div>
        `)
            .join("");
    }
    editClient(clientID) {
        const client = this.clientManager.getClient(clientID);
        if (!client)
            return;
        this.isEditing = true;
        this.editingClientID = clientID;
        // Update submit button text
        const submitButton = document.querySelector('#addClientForm button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = "Update Client";
        }
        // Populate form with client data
        const form = document.getElementById("addClientForm");
        if (form) {
            Object.keys(client).forEach((key) => {
                const element = form.elements.namedItem(key);
                if (element) {
                    if (element.type === "checkbox") {
                        element.checked = client[key];
                    }
                    else {
                        element.value = client[key];
                    }
                }
            });
        }
    }
    deleteClient(clientID) {
        if (!confirm("Are you sure you want to delete this client?"))
            return;
        if (this.clientManager.deleteClient(clientID)) {
            this.showMessage("Client deleted successfully", "success");
            this.displayClients(this.clientManager.getAllClients());
        }
    }
    showMessage(message, type) {
        const messageDiv = document.getElementById("message");
        if (!messageDiv)
            return;
        messageDiv.innerHTML = `<div class="${type}">${message}</div>`;
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        this.messageTimeout = window.setTimeout(() => {
            if (messageDiv)
                messageDiv.innerHTML = "";
        }, 3000);
    }
}
window.app = new ClientApp();
