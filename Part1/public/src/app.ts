import { Client, ClientManager, Gender, FitnessProgram } from './types.js';

class ClientApp {
    private clientManager: ClientManager;
    private messageTimeout: number | null = null;

    constructor() {
        this.clientManager = new ClientManager();
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        // Add client form submission
        const addForm = document.getElementById('addClientForm');
        addForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddClient();
        });

        // Search form submission
        const searchForm = document.getElementById('searchForm');
        searchForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Display filters
        document.getElementById('showAllBtn')?.addEventListener('click', () => {
            this.displayClients(this.clientManager.getAllClients());
        });

        document.getElementById('showVIPBtn')?.addEventListener('click', () => {
            this.displayClients(this.clientManager.getVIPClients());
        });
    }

    private getFormData(): Client | null {
        const form = document.getElementById('addClientForm') as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const client: Client = {
                clientID: formData.get('clientID') as string,
                name: formData.get('name') as string,
                dateOfBirth: formData.get('dateOfBirth') as string,
                gender: formData.get('gender') as Gender,
                fitnessProgram: formData.get('fitnessProgram') as FitnessProgram,
                contactInfo: formData.get('contactInfo') as string,
                joinedDate: formData.get('joinedDate') as string,
                endingDate: formData.get('endingDate') as string,
                specialHealthNotes: formData.get('specialHealthNotes') as string,
                isVIP: formData.get('isVIP') === 'on'
            };
            return client;
        } catch (error) {
            this.showMessage('Invalid form data', 'error');
            return null;
        }
    }

    private handleAddClient(): void {
        const client = this.getFormData();
        if (!client) return;

        const success = this.clientManager.addClient(client);
        if (success) {
            this.showMessage('Client added successfully', 'success');
            (document.getElementById('addClientForm') as HTMLFormElement).reset();
            this.displayClients(this.clientManager.getAllClients());
        } else {
            this.showMessage('Client ID already exists', 'error');
        }
    }

    private handleSearch(): void {
        const searchId = (document.getElementById('searchId') as HTMLInputElement).value;
        const client = this.clientManager.getClient(searchId);

        if (client) {
            this.displayClients([client]);
        } else {
            this.showMessage('No client found', 'error');
            this.displayClients([]);
        }
    }

    private displayClients(clients: Client[]): void {
        const clientList = document.getElementById('clientList');
        if (!clientList) return;

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

    private showMessage(message: string, type: 'success' | 'error'): void {
        const messageDiv = document.getElementById('message');
        if (!messageDiv) return;

        messageDiv.innerHTML = `<div class="${type}">${message}</div>`;

        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }

        this.messageTimeout = window.setTimeout(() => {
            if (messageDiv) messageDiv.innerHTML = '';
        }, 3000);
    }

    public deleteClient(clientID: string): void {
        if (!confirm('Are you sure you want to delete this client?')) return;

        if (this.clientManager.deleteClient(clientID)) {
            this.showMessage('Client deleted successfully', 'success');
            this.displayClients(this.clientManager.getAllClients());
        }
    }

    public editClient(clientID: string): void {
        const client = this.clientManager.getClient(clientID);
        if (!client) return;

        // Populate form with client data
        Object.keys(client).forEach(key => {
            const element = document.getElementById(key) as HTMLInputElement;
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = client[key as keyof Client] as boolean;
                } else {
                    element.value = client[key as keyof Client] as string;
                }
            }
        });
    }
}

// Make app globally available
declare global {
    interface Window {
        app: ClientApp;
    }
}

window.app = new ClientApp();