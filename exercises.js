// exercises.js - Gestion des exercices interactifs
import db from './db.js';
import { auth } from './auth.js';

class ExerciseManager {
    constructor() {
        this.currentExercise = null;
        this.timer = null;
        this.timeLimit = 60; // 60 secondes par défaut
        this.currentQuestionIndex = 0;
        this.questions = [];
        this.score = 0;
        this.onTimeUp = null; // Callback quand le temps est écoulé
        this.isQuizFinished = false; // Flag pour indiquer si le quiz est terminé
    }

    // Initialiser un nouveau quiz chronométré
    startTimedQuiz(difficulty = 'beginner', timeLimit = 60, onTimeUpCallback = null, allVerbs = []) {
        // Arrêter le timer précédent s'il existe
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.timeLimit = timeLimit;
        this.timeLeft = timeLimit;
        this.score = 0;
        this.questions = this.generateQuestions(difficulty, allVerbs);
        this.currentQuestionIndex = 0;
        this.isQuizFinished = false;
        this.onTimeUp = onTimeUpCallback;
        
        // Démarrer le timer
        const timerInterval = () => {
            // Vérifier si le quiz est déjà terminé
            if (this.isQuizFinished) {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                return;
            }
            
            // Vérifier si le quiz est terminé (plus de questions)
            if (this.currentQuestionIndex >= this.questions.length) {
                this.isQuizFinished = true;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                return;
            }
            
            // Décrémenter le temps
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.updateTimerDisplay();
            }
            
            // Si le temps est écoulé
            if (this.timeLeft <= 0) {
                this.isQuizFinished = true;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                
                // Appeler le callback pour terminer le quiz
                if (this.onTimeUp && typeof this.onTimeUp === 'function') {
                    // Utiliser setTimeout pour s'assurer que le callback est appelé après l'arrêt du timer
                    setTimeout(() => {
                        this.onTimeUp();
                    }, 0);
                }
            }
        };
        
        this.timer = setInterval(timerInterval, 1000);

        return this.getCurrentQuestion();
    }

    // Générer des questions en fonction de la difficulté
    generateQuestions(difficulty, verbs = []) {
        if (verbs.length === 0) {
            console.error('No verbs available');
            return [];
        }
        
        const questionCount = this.getQuestionCountByDifficulty(difficulty);
        const selectedVerbs = this.selectRandomVerbs(verbs, questionCount);
        
        return selectedVerbs.map(verb => ({
            verb,
            type: this.getRandomQuestionType(),
            options: [],
            userAnswer: null,
            isCorrect: null,
            correctAnswer: null
        }));
    }

    // Obtenir la question actuelle
    getCurrentQuestion() {
        if (this.questions.length === 0) return null;
        const question = this.questions[this.currentQuestionIndex];
        return {
            ...question,
            questionText: this.getQuestionText(question),
            progress: `${this.currentQuestionIndex + 1}/${this.questions.length}`
        };
    }

    // Soumettre une réponse
    submitAnswer(answer) {
        const question = this.questions[this.currentQuestionIndex];
        question.userAnswer = answer;
        question.isCorrect = this.checkAnswer(question, answer);
        
        if (question.isCorrect) {
            this.score++;
        }

        // Mettre à jour les statistiques
        this.updateUserProgress(question.verb, question.isCorrect);

        return question.isCorrect;
    }

    // Passer à la question suivante
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return this.getCurrentQuestion();
        }
        return null; // Fin du quiz
    }

    // Terminer le quiz prématurément
    endQuiz() {
        // Marquer le quiz comme terminé
        this.isQuizFinished = true;
        
        // Arrêter le timer de manière sûre
        if (this.timer) {
            try {
                clearInterval(this.timer);
            } catch (e) {
                console.warn('Erreur lors de l\'arrêt du timer:', e);
            }
            this.timer = null;
        }
        
        // Enregistrer les résultats
        this.saveQuizResults();
        
        return {
            score: this.score,
            total: this.questions.length,
            percentage: this.questions.length > 0 ? Math.round((this.score / this.questions.length) * 100) : 0
        };
    }

    // Méthodes utilitaires
    getQuestionCountByDifficulty(difficulty) {
        const counts = {
            beginner: 5,
            intermediate: 10,
            advanced: 15
        };
        return counts[difficulty] || 5;
    }

    getRandomQuestionType() {
        const types = ['fillInBlank', 'multipleChoice', 'matching'];
        return types[Math.floor(Math.random() * types.length)];
    }

    generateOptions(correctVerb, allVerbs) {
        // Cette fonction n'est plus utilisée - les options sont générées dans app.js
        const options = [correctVerb.base, correctVerb.past, correctVerb.pastParticiple];
        return [...new Set(options)].slice(0, 4); // Éviter les doublons
    }

    checkAnswer(question, answer) {
        // Vérifier la réponse en comparant avec la bonne réponse stockée
        if (question.correctAnswer) {
            return question.correctAnswer === answer;
        }
        
        // Fallback: vérifier la réponse en fonction du type de question
        switch(question.type) {
            case 'fillInBlank':
                return question.verb.past === answer || question.verb.pastParticiple === answer;
            case 'multipleChoice':
                return question.verb.base === answer || 
                       question.verb.past === answer || 
                       question.verb.pastParticiple === answer;
            case 'matching':
                // Logique de correspondance
                return true;
            default:
                return false;
        }
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('exercise-timer');
        if (timerElement) {
            if (this.timeLeft <= 0) {
                timerElement.textContent = 'Temps écoulé !';
            } else {
                timerElement.textContent = `Temps restant: ${this.timeLeft}s`;
            }
        }
    }

    async updateUserProgress(verb, isCorrect) {
        if (!auth.isAuthenticated) return;
        
        const data = db.getAllData();
        const userId = auth.currentUser.id;
        
        // Mettre à jour les statistiques
        const progress = data.userProgress[userId] || db.getDefaultProgress();
        progress.stats.totalAttempts++;
        
        if (isCorrect) {
            progress.stats.correctAttempts++;
            progress.stats.currentStreak++;
            progress.stats.bestStreak = Math.max(progress.stats.bestStreak, progress.stats.currentStreak);
            
            // Ajouter aux verbes maîtrisés si nécessaire
            if (!progress.masteredVerbs.includes(verb.base)) {
                progress.masteredVerbs.push(verb.base);
            }
        } else {
            progress.stats.currentStreak = 0;
            
            // Ajouter aux verbes difficiles
            if (!progress.difficultVerbs.includes(verb.base)) {
                progress.difficultVerbs.push(verb.base);
            }
        }
        
        progress.stats.lastPracticed = new Date().toISOString();
        
        // Sauvegarder les modifications
        data.userProgress[userId] = progress;
        db.saveAllData(data);
    }

    saveQuizResults() {
        if (!auth.isAuthenticated) return;
        
        const data = db.getAllData();
        const userId = auth.currentUser.id;
        
        const result = {
            date: new Date().toISOString(),
            score: this.score,
            total: this.questions.length,
            timeSpent: this.timeLimit - this.timeLeft
        };
        
        if (!data.statistics[userId]) {
            data.statistics[userId] = [];
        }
        
        data.statistics[userId].push(result);
        data.statistics[userId] = data.statistics[userId].slice(-100); // Garder les 100 derniers résultats
        
        db.saveAllData(data);
    }

    // Sélectionner aléatoirement des verbes
    selectRandomVerbs(verbs, count) {
        const shuffled = [...verbs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, verbs.length));
    }

    // Obtenir le texte de la question en fonction du type
    getQuestionText(question) {
        const { verb, type } = question;
        
        switch(type) {
            case 'fillInBlank':
                const form = Math.random() > 0.5 ? 'past' : 'pastParticiple';
                return `Quelle est la forme ${form === 'past' ? 'prétérite' : 'participe passé'} de "${verb.base}" ?`;
                
            case 'multipleChoice':
                return `Sélectionnez la bonne forme du verbe "${verb.base}" :`;
                
            case 'matching':
                return `Faites correspondre les formes du verbe "${verb.base}" :`;
                
            default:
                return '';
        }
    }
}

// Exporter une instance unique du gestionnaire d'exercices
const exerciseManager = new ExerciseManager();
export default exerciseManager;
