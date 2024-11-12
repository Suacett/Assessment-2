import { ClientManager } from './types.js';
class ClientApp {
    constructor() {
        this.messageTimeout = null;
        this.clientManager = new ClientManager();
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        var _a, _b;
        // Add client form submission
        const addForm = document.getElementById('addClientForm');
        addForm === null || addForm === void 0 ? void 0 : addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddClient();
        });
        // Search form submission
        const searchForm = document.getElementById('searchForm');
        searchForm === null || searchForm === void 0 ? void 0 : searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });
        // Display filters
        (_a = document.getElementById('showAllBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.displayClients(this.clientManager.getAllClients());
        });
        (_b = document.getElementById('showVIPBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            this.displayClients(this.clientManager.getVIPClients());
        });
    }
    getFormData() {
        const form = document.getElementById('addClientForm');
        const formData = new FormData(form);
        try {
            const client = {
                clientID: formData.get('clientID'),
                name: formData.get('name'),
                dateOfBirth: formData.get('dateOfBirth'),
                gender: formData.get('gender'),
                fitnessProgram: formData.get('fitnessProgram'),
                contactInfo: formData.get('contactInfo'),
                joinedDate: formData.get('joinedDate'),
                endingDate: formData.get('endingDate'),
                specialHealthNotes: formData.get('specialHealthNotes'),
                isVIP: formData.get('isVIP') === 'on'
            };
            return client;
        }
        catch (error) {
            this.showMessage('Invalid form data', 'error');
            return null;
        }
    }
    handleAddClient() {
        const client = this.getFormData();
        if (!client)
            return;
        const success = this.clientManager.addClient(client);
        if (success) {
            this.showMessage('Client added successfully', 'success');
            document.getElementById('addClientForm').reset();
            this.displayClients(this.clientManager.getAllClients());
        }
        else {
            this.showMessage('Client ID already exists', 'error');
        }
    }
    handleSearch() {
        const searchId = document.getElementById('searchId').value;
        const client = this.clientManager.getClient(searchId);
        if (client) {
            this.displayClients([client]);
        }
        else {
            this.showMessage('No client found', 'error');
            this.displayClients([]);
        }
    }
    displayClients(clients) {
        const clientList = document.getElementById('clientList');
        if (!clientList)
            return;
        clientList.innerHTML = clients.map(client => `
            <div class="client-card ${client.isVIP ? 'vip' : ''}">
                <h3>${client.name} ${client.isVIP ? '(VIP)' : ''}</h3>
                <p>ID: ${client.clientID}</p>
                <p>Program: ${client.fitnessProgram}</p>
                <p>Joined: ${client.joinedDate}</p>
                <div class="button-group">
                    <button onclick="app.editClient('${client.clientID}')">Edit</button>
                    <button onclick="app.deleteClient('${client.clientID}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
    showMessage(message, type) {
        const messageDiv = document.getElementById('message');
        if (!messageDiv)
            return;
        messageDiv.innerHTML = `<div class="${type}">${message}</div>`;
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
        this.messageTimeout = window.setTimeout(() => {
            if (messageDiv)
                messageDiv.innerHTML = '';
        }, 3000);
    }
    deleteClient(clientID) {
        if (!confirm('Are you sure you want to delete this client?'))
            return;
        if (this.clientManager.deleteClient(clientID)) {
            this.showMessage('Client deleted successfully', 'success');
            this.displayClients(this.clientManager.getAllClients());
        }
    }
    editClient(clientID) {
        const client = this.clientManager.getClient(clientID);
        if (!client)
            return;
        // Populate form with client data
        Object.keys(client).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = client[key];
                }
                else {
                    element.value = client[key];
                }
            }
        });
    }
}
window.app = new ClientApp();
