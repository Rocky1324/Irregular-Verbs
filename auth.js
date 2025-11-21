// auth.js - Gestion de l'authentification
import db from './db.js';

class Auth {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.loadSession();
    }

    async login(email, password) {
        try {
            const data = db.getAllData();
            const user = Object.values(data.users).find(u => u.email === email);
            
            if (user && await this.verifyPassword(password, user.password)) {
                this.currentUser = user;
                this.isAuthenticated = true;
                this.saveSession(user.id);
                return { success: true, user };
            }
            
            return { success: false, message: 'Email ou mot de passe incorrect' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Une erreur est survenue' };
        }
    }

    async register(username, email, password) {
        try {
            const data = db.getAllData();
            const userExists = Object.values(data.users).some(u => u.email === email);
            
            if (userExists) {
                return { success: false, message: 'Cet email est déjà utilisé' };
            }
            
            const userId = await db.createUser(username, email, password);
            this.currentUser = data.users[userId];
            this.isAuthenticated = true;
            this.saveSession(userId);
            
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: "Échec de l'inscription" };
        }
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.clearSession();
    }

    saveSession(userId) {
        localStorage.setItem('auth_token', userId);
        localStorage.setItem('last_login', new Date().toISOString());
    }

    loadSession() {
        const userId = localStorage.getItem('auth_token');
        if (userId) {
            const data = db.getAllData();
            this.currentUser = data.users[userId];
            this.isAuthenticated = !!this.currentUser;
        }
    }

    clearSession() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('last_login');
    }

    async verifyPassword(password, hashedPassword) {
        const hashed = await db.hashPassword(password);
        return hashed === hashedPassword;
    }
}

// Exporter une instance unique de l'authentification
export const auth = new Auth();
