// db.js - Gestion du stockage local
class Database {
    constructor() {
        this.prefix = 'irregularVerbs_';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.prefix + 'initialized')) {
            this.resetDatabase();
        }
    }

    resetDatabase() {
        const defaultData = {
            users: {},
            userSettings: {
                currentUser: null,
                theme: 'light',
                difficulty: 'beginner',
                language: 'fr'
            },
            userProgress: {},
            customLists: {},
            statistics: {
                totalPracticed: 0,
                correctAnswers: 0,
                streak: 0,
                lastPracticed: null
            }
        };

        this.saveAllData(defaultData);
        localStorage.setItem(this.prefix + 'initialized', 'true');
    }

    getAllData() {
        const data = localStorage.getItem(this.prefix + 'data');
        if (!data) {
            this.resetDatabase();
            return this.getAllData();
        }
        return JSON.parse(data);
    }

    saveAllData(data) {
        localStorage.setItem(this.prefix + 'data', JSON.stringify(data));
    }

    // Gestion des utilisateurs
    async createUser(username, email, password) {
        const data = this.getAllData();
        const userId = 'user_' + Date.now();
        
        const newUser = {
            id: userId,
            username,
            email,
            password: await this.hashPassword(password),
            createdAt: new Date().toISOString()
        };

        data.users[userId] = newUser;
        data.userProgress[userId] = this.getDefaultProgress();
        data.customLists[userId] = [];
        
        this.saveAllData(data);
        return userId;
    }

    // Méthodes utilitaires
    async hashPassword(password) {
        // Implémentation basique - à remplacer par un hachage sécurisé en production
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    getDefaultProgress() {
        return {
            masteredVerbs: [],
            difficultVerbs: [],
            practiceHistory: [],
            stats: {
                totalAttempts: 0,
                correctAttempts: 0,
                currentStreak: 0,
                bestStreak: 0,
                lastPracticed: null
            }
        };
    }
}

// Exporter une instance unique de la base de données
const db = new Database();
export default db;
