// Import des modules
import { auth } from './auth.js';
import exerciseManager from './exercises.js';

document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM principaux
    const searchInput = document.getElementById('searchInput');
    const verbsTbody = document.getElementById('verbs-tbody');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggle = document.getElementById('themeToggle');
    
    // Éléments d'authentification
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    
    // Éléments des détails de verbe
    const verbDetailsModal = document.getElementById('verb-details-modal');
    const verbDetailsTitle = document.getElementById('verb-details-title');
    const verbBaseForm = document.getElementById('verb-base-form');
    const verbPastForm = document.getElementById('verb-past-form');
    const verbParticipleForm = document.getElementById('verb-participle-form');
    const verbExplanationText = document.getElementById('verb-explanation-text');
    const verbExamplesList = document.getElementById('verb-examples-list');
    const practiceVerbBtn = document.getElementById('practice-verb-btn');
    const pronounceVerbBtn = document.getElementById('pronounce-verb-btn');
    
    // Éléments des exercices
    const exerciseModal = document.getElementById('exercise-modal');
    const exerciseQuestion = document.getElementById('exercise-question');
    const exerciseOptions = document.getElementById('exercise-options');
    const exerciseFeedback = document.getElementById('exercise-feedback');
    const exerciseProgress = document.getElementById('exercise-progress');
    const exerciseTimer = document.getElementById('exercise-timer');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const finishQuizBtn = document.getElementById('finish-quiz-btn');
    const exerciseResults = document.getElementById('exercise-results');
    const scoreDisplay = document.getElementById('score-display');
    const timeSpentDisplay = document.getElementById('time-spent');
    const correctAnswersDisplay = document.getElementById('correct-answers');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const closeQuizBtn = document.getElementById('close-quiz');
    
    // État de l'application
    let currentCategory = 'all';
    let currentVerbs = [];
    let currentSort = { field: 'base', ascending: true };
    
    // Initialisation de l'application
    async function init() {
        console.log('Initialisation de l\'application...');
        
        // Charger le thème sauvegardé ou utiliser les préférences du système
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // Vérifier l'état d'authentification (optionnel - on peut permettre l'utilisation sans auth)
        // if (auth.isAuthenticated) {
        //     updateAuthUI(true);
        // } else {
        //     showAuthModal();
        // }
        
        // Attendre que data.js soit chargé
        if (typeof window.getVerbsByCategory === 'function') {
            // Initialiser les verbes
            currentVerbs = window.getVerbsByCategory(currentCategory);
            renderVerbs(currentVerbs);
        } else {
            // Attendre un peu si data.js n'est pas encore chargé
            setTimeout(() => {
                currentVerbs = window.getVerbsByCategory(currentCategory);
                renderVerbs(currentVerbs);
            }, 100);
        }
        
        // Configurer les écouteurs d'événements
        setupEventListeners();
    }

    // Configuration des écouteurs d'événements
    function setupEventListeners() {
        // Recherche
        searchInput.addEventListener('input', handleSearch);
        
        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.getAttribute('data-category');
                setActiveCategory(category);
            });
        });
        
        // Tri du tableau
        document.querySelectorAll('th[data-sort]').forEach(header => {
            header.addEventListener('click', () => {
                const field = header.getAttribute('data-sort');
                sortVerbs(field);
            });
        });
        
        // Thème
        themeToggle.addEventListener('click', toggleTheme);
        
        // Authentification
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
            // Ajouter l'écouteur sur le bouton de connexion aussi
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleLogin(e);
                });
            }
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
            // Ajouter l'écouteur sur le bouton d'inscription aussi
            const registerBtn = document.getElementById('register-submit');
            if (registerBtn) {
                registerBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleRegister(e);
                });
            }
        }
        
        if (showRegisterLink) {
            showRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                showRegisterForm();
            });
        }
        
        if (showLoginLink) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                showLoginForm();
            });
        }
        
        // Exercices
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => {
                if (!exerciseManager) return;
                
                // Vérifier si on est à la dernière question
                if (exerciseManager.currentQuestionIndex >= exerciseManager.questions.length - 1) {
                    finishQuiz();
                    return;
                }
                
                exerciseManager.nextQuestion();
                showNextQuestion();
            });
        }
        
        if (finishQuizBtn) {
            finishQuizBtn.addEventListener('click', finishQuiz);
        }
        
        if (restartQuizBtn) {
            restartQuizBtn.addEventListener('click', restartQuiz);
        }
        
        if (closeQuizBtn) {
            closeQuizBtn.addEventListener('click', closeQuiz);
        }
        
        // Fermer les modales avec les boutons close
        const closeAuthModal = document.getElementById('close-auth-modal');
        if (closeAuthModal) {
            closeAuthModal.addEventListener('click', () => {
                authModal.classList.remove('active');
            });
        }
        
        const closeExerciseModal = document.getElementById('close-exercise-modal');
        if (closeExerciseModal) {
            closeExerciseModal.addEventListener('click', () => {
                exerciseModal.classList.remove('active');
            });
        }
        
        const closeVerbDetailsModal = document.getElementById('close-verb-details-modal');
        if (closeVerbDetailsModal) {
            closeVerbDetailsModal.addEventListener('click', () => {
                verbDetailsModal.classList.remove('active');
            });
        }
        
        if (practiceVerbBtn) {
            practiceVerbBtn.addEventListener('click', () => {
                verbDetailsModal.classList.remove('active');
                startQuiz('beginner', 60);
            });
        }
        
        if (pronounceVerbBtn) {
            pronounceVerbBtn.addEventListener('click', () => {
                const verbBase = verbBaseForm ? verbBaseForm.textContent : '';
                if (verbBase) {
                    speakWord(verbBase);
                }
            });
        }
        
        // Bouton pour démarrer un exercice
        const startExerciseBtn = document.getElementById('start-exercise-btn');
        if (startExerciseBtn) {
            startExerciseBtn.addEventListener('click', () => {
                startQuiz('beginner', 60);
            });
        }
        
        // Bouton pour télécharger le PDF
        const downloadPdfBtn = document.getElementById('download-pdf-btn');
        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', generateAndDownloadPDF);
        }
        
        // Fermer les modales en cliquant à l'extérieur
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
        
        // Fermer les modales avec le bouton échappe
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    }
    
    // ============================================
    // GESTION DE L'AUTHENTIFICATION
    // ============================================
    
    // Afficher la modale d'authentification
    function showAuthModal() {
        if (authModal) {
            authModal.classList.add('active');
            showLoginForm();
        }
    }
    
    // Afficher le formulaire de connexion
    function showLoginForm() {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
    }
    
    // Afficher le formulaire d'inscription
    function showRegisterForm() {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
    }
    
    // Gérer la connexion
    async function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const result = await auth.login(email, password);
        
        if (result.success) {
            updateAuthUI(true);
            authModal.classList.remove('active');
            showNotification('Connexion réussie !', 'success');
        } else {
            showNotification(result.message || 'Échec de la connexion', 'error');
        }
    }
    
    // Gérer l'inscription
    async function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            showNotification('Les mots de passe ne correspondent pas', 'error');
            return;
        }
        
        const result = await auth.register(username, email, password);
        
        if (result.success) {
            updateAuthUI(true);
            authModal.classList.remove('active');
            showNotification('Inscription réussie !', 'success');
        } else {
            showNotification(result.message || "Échec de l'inscription", 'error');
        }
    }
    
    // Mettre à jour l'interface utilisateur en fonction de l'état d'authentification
    function updateAuthUI(isAuthenticated) {
        const authButtons = document.querySelectorAll('.auth-btn');
        const userMenu = document.getElementById('user-menu');
        
        if (isAuthenticated) {
            authButtons.forEach(btn => btn.style.display = 'none');
            if (userMenu) userMenu.style.display = 'block';
            
            // Mettre à jour le nom d'utilisateur
            const usernameDisplay = document.getElementById('username-display');
            if (usernameDisplay && auth.currentUser) {
                usernameDisplay.textContent = auth.currentUser.username;
            }
        } else {
            authButtons.forEach(btn => btn.style.display = 'inline-block');
            if (userMenu) userMenu.style.display = 'none';
        }
    }
    
    // ============================================
    // GESTION DES EXERCICES
    // ============================================
    
    // Démarrer un nouveau quiz
    function startQuiz(difficulty = 'beginner', timeLimit = 60) {
        if (!exerciseManager) {
            console.error('ExerciseManager not available');
            return;
        }
        
        // Définir le callback pour quand le temps est écoulé
        const onTimeUp = () => {
            console.log('Temps écoulé ! Fin du quiz.');
            finishQuiz();
        };
        
        exerciseManager.startTimedQuiz(difficulty, timeLimit, onTimeUp);
        showNextQuestion();
        
        if (exerciseResults) exerciseResults.style.display = 'none';
        const exerciseContainer = document.getElementById('exercise-container');
        if (exerciseContainer) exerciseContainer.style.display = 'block';
        
        if (exerciseModal) {
            exerciseModal.classList.add('active');
        }
    }
    
    // Afficher la question suivante
    function showNextQuestion() {
        if (!exerciseManager || !exerciseQuestion || !exerciseOptions) return;
        
        // Vérifier si on a terminé toutes les questions
        if (exerciseManager.currentQuestionIndex >= exerciseManager.questions.length) {
            finishQuiz();
            return;
        }
        
        const question = exerciseManager.getCurrentQuestion();
        
        if (!question) {
            finishQuiz();
            return;
        }
        
        // Mettre à jour l'interface
        if (exerciseQuestion) exerciseQuestion.textContent = question.questionText || 'Question';
        if (exerciseProgress) {
            exerciseProgress.textContent = `Question ${exerciseManager.currentQuestionIndex + 1}/${exerciseManager.questions.length}`;
        }
        
        // Effacer les options précédentes
        if (exerciseOptions) exerciseOptions.innerHTML = '';
        
        // Générer les options pour la question
        const verb = question.verb;
        const questionType = question.type || 'multipleChoice';
        let correctAnswer = '';
        let options = [];
        
        if (questionType === 'fillInBlank') {
            const form = Math.random() > 0.5 ? 'past' : 'pastParticiple';
            correctAnswer = verb[form];
            // Générer des options aléatoires
            if (typeof window.getRandomOptions === 'function') {
                options = window.getRandomOptions(verb, form, 4);
            } else {
                // Fallback: utiliser tous les verbes
                const allVerbs = window.allVerbs || [];
                options = [correctAnswer];
                while (options.length < 4 && allVerbs.length > 0) {
                    const randomVerb = allVerbs[Math.floor(Math.random() * allVerbs.length)];
                    const randomForm = randomVerb[form];
                    if (!options.includes(randomForm)) {
                        options.push(randomForm);
                    }
                }
            }
        } else {
            // Multiple choice: demander le past ou pastParticiple
            const forms = ['past', 'pastParticiple'];
            const randomForm = forms[Math.floor(Math.random() * forms.length)];
            correctAnswer = verb[randomForm];
            
            // Générer des options
            const allVerbs = window.allVerbs || [];
            options = [correctAnswer];
            while (options.length < 4 && allVerbs.length > 0) {
                const randomVerb = allVerbs[Math.floor(Math.random() * allVerbs.length)];
                const randomFormValue = randomVerb[randomForm];
                if (!options.includes(randomFormValue)) {
                    options.push(randomFormValue);
                }
            }
        }
        
        // Mélanger les options
        options = options.sort(() => Math.random() - 0.5);
        
        // Ajouter les nouvelles options
        options.forEach((option) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => selectAnswer(option, correctAnswer);
            if (exerciseOptions) exerciseOptions.appendChild(button);
        });
        
        // Stocker la bonne réponse dans la question
        question.correctAnswer = correctAnswer;
        
        // Cacher le bouton suivant jusqu'à ce qu'une réponse soit sélectionnée
        if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
        if (finishQuizBtn) finishQuizBtn.style.display = 'none';
        if (exerciseFeedback) {
            exerciseFeedback.textContent = '';
            exerciseFeedback.className = '';
        }
    }
    
    // Sélectionner une réponse
    function selectAnswer(selectedAnswer, correctAnswer) {
        if (!exerciseManager) return;
        
        const isCorrect = exerciseManager.submitAnswer(selectedAnswer);
        
        // Mettre en surbrillance la bonne et la mauvaise réponse
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedAnswer && !isCorrect) {
                button.classList.add('incorrect');
            }
        });
        
        // Afficher le feedback
        if (exerciseFeedback) {
            if (isCorrect) {
                exerciseFeedback.textContent = 'Correct !';
                exerciseFeedback.className = 'correct';
            } else {
                exerciseFeedback.textContent = `Incorrect. La bonne réponse est : ${correctAnswer}`;
                exerciseFeedback.className = 'incorrect';
            }
        }
        
        // Afficher le bouton suivant ou terminer
        if (exerciseManager.currentQuestionIndex < exerciseManager.questions.length - 1) {
            if (nextQuestionBtn) nextQuestionBtn.style.display = 'inline-block';
        } else {
            if (finishQuizBtn) finishQuizBtn.style.display = 'inline-block';
        }
    }
    
    // Terminer le quiz
    function finishQuiz() {
        if (!exerciseManager) return;
        
        console.log('Fin du quiz - Arrêt du timer');
        
        // Marquer le quiz comme terminé AVANT d'arrêter le timer
        exerciseManager.isQuizFinished = true;
        
        // Arrêter le timer explicitement et de manière sûre
        if (exerciseManager.timer) {
            try {
                clearInterval(exerciseManager.timer);
                console.log('Timer arrêté');
            } catch (e) {
                console.warn('Erreur lors de l\'arrêt du timer:', e);
            }
            exerciseManager.timer = null;
        }
        
        const results = exerciseManager.endQuiz();
        
        // Afficher les résultats
        const exerciseContainer = document.getElementById('exercise-container');
        if (exerciseContainer) exerciseContainer.style.display = 'none';
        if (exerciseResults) exerciseResults.style.display = 'block';
        
        if (scoreDisplay) {
            scoreDisplay.textContent = `Score: ${results.score}/${results.total} (${results.percentage}%)`;
        }
        if (timeSpentDisplay) {
            const timeSpent = exerciseManager.timeLimit - (exerciseManager.timeLeft || 0);
            timeSpentDisplay.textContent = `Temps passé: ${timeSpent} secondes`;
        }
        if (correctAnswersDisplay) {
            correctAnswersDisplay.textContent = `Bonnes réponses: ${results.score} sur ${results.total}`;
        }
        
        // Mettre à jour l'affichage du timer pour montrer qu'il est arrêté
        const timerElement = document.getElementById('exercise-timer');
        if (timerElement) {
            timerElement.textContent = 'Quiz terminé';
        }
    }
    
    // Recommencer le quiz
    function restartQuiz() {
        startQuiz();
    }
    
    // Fermer le quiz
    function closeQuiz() {
        if (exerciseModal) {
            exerciseModal.classList.remove('active');
        }
    }
    
    // ============================================
    // FONCTIONS UTILITAIRES
    // ============================================
    
    // Afficher une notification
    function showNotification(message, type = 'info') {
        // Implémentation de base - peut être améliorée avec une bibliothèque de notifications
        alert(`${type.toUpperCase()}: ${message}`);
    }
    
    // Gérer la recherche
    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length >= 2) {  
            const results = window.searchVerbs ? window.searchVerbs(query) : [];
            renderVerbs(results);
        } else if (query.length === 0) {
            const homeSection = document.getElementById('home');
            const verbsSection = document.getElementById('verbs-container');
            if (homeSection) homeSection.classList.remove('active');
            if (verbsSection) verbsSection.classList.add('active');
        } else if (typeof window.getVerbsByCategory === 'function') {
            console.log('No query, showing category:', currentCategory);
            currentVerbs = window.getVerbsByCategory(currentCategory);
            renderVerbs(currentVerbs);
        }
    }
    
    // Définir la catégorie active
    function setActiveCategory(category) {
        console.log('Setting active category to:', category);
        
        // Mettre à jour la catégorie active
        currentCategory = category;
        
        // Mettre à jour les liens de navigation
        navLinks.forEach(link => {
            const linkCategory = link.getAttribute('data-category');
            if (linkCategory === category) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Mettre à jour l'affichage pour montrer la liste des verbes
        const homeSection = document.getElementById('home');
        const verbsSection = document.getElementById('verbs-container');
        
        if (homeSection) homeSection.classList.remove('active');
        if (verbsSection) verbsSection.classList.add('active');
        
        // Charger les verbes de la catégorie sélectionnée
        if (typeof window.getVerbsByCategory === 'function') {
            currentVerbs = window.getVerbsByCategory(category);
            console.log('Verbs found:', currentVerbs ? currentVerbs.length : 0);
            renderVerbs(currentVerbs || []);
            
            // Faire défiler vers le haut
            window.scrollTo(0, 0);
        } else {
            console.error('getVerbsByCategory is not defined');
            renderVerbs([]);
        }
    }
    
    // Fonction pour prononcer un mot avec l'API Web Speech
    function speakWord(word) {
        if ('speechSynthesis' in window) {
            // Arrêter toute prononciation en cours
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;
            
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('L\'API Web Speech n\'est pas supportée par ce navigateur');
        }
    }
    
    // Données d'exemples et d'explications pour les verbes
    const verbDetailsData = {
        'be': {
            explanation: 'Le verbe "be" (être) est l\'un des verbes les plus irréguliers en anglais. Il change complètement entre les formes.',
            examples: [
                'I am happy. (Je suis heureux.)',
                'She was at home yesterday. (Elle était à la maison hier.)',
                'They have been friends for years. (Ils sont amis depuis des années.)'
            ]
        },
        'go': {
            explanation: 'Le verbe "go" (aller) a une forme passée unique "went" qui ne ressemble pas à la forme de base.',
            examples: [
                'I go to school every day. (Je vais à l\'école tous les jours.)',
                'She went to Paris last summer. (Elle est allée à Paris l\'été dernier.)',
                'They have gone to the store. (Ils sont allés au magasin.)'
            ]
        },
        'do': {
            explanation: 'Le verbe "do" (faire) est très utilisé et a des formes irrégulières.',
            examples: [
                'I do my homework. (Je fais mes devoirs.)',
                'He did his best. (Il a fait de son mieux.)',
                'We have done the work. (Nous avons fait le travail.)'
            ]
        },
        'have': {
            explanation: 'Le verbe "have" (avoir) est utilisé pour exprimer la possession et dans les temps composés.',
            examples: [
                'I have a car. (J\'ai une voiture.)',
                'She had breakfast. (Elle a pris le petit-déjeuner.)',
                'They have had enough. (Ils en ont assez eu.)'
            ]
        },
        'get': {
            explanation: 'Le verbe "get" (obtenir, recevoir) est très polyvalent en anglais.',
            examples: [
                'I get up early. (Je me lève tôt.)',
                'She got a new job. (Elle a obtenu un nouveau travail.)',
                'We have gotten better. (Nous nous sommes améliorés.)'
            ]
        },
        'make': {
            explanation: 'Le verbe "make" (faire, fabriquer) est utilisé pour créer ou produire quelque chose.',
            examples: [
                'I make coffee every morning. (Je fais du café chaque matin.)',
                'She made a cake. (Elle a fait un gâteau.)',
                'They have made progress. (Ils ont fait des progrès.)'
            ]
        },
        'take': {
            explanation: 'Le verbe "take" (prendre) est utilisé dans de nombreux contextes.',
            examples: [
                'I take a shower. (Je prends une douche.)',
                'She took the bus. (Elle a pris le bus.)',
                'We have taken notes. (Nous avons pris des notes.)'
            ]
        },
        'see': {
            explanation: 'Le verbe "see" (voir) décrit l\'action de percevoir avec les yeux.',
            examples: [
                'I see a bird. (Je vois un oiseau.)',
                'She saw a movie. (Elle a vu un film.)',
                'We have seen this before. (Nous avons déjà vu cela.)'
            ]
        },
        'know': {
            explanation: 'Le verbe "know" (savoir, connaître) exprime la connaissance ou la familiarité.',
            examples: [
                'I know the answer. (Je connais la réponse.)',
                'She knew him well. (Elle le connaissait bien.)',
                'We have known each other for years. (Nous nous connaissons depuis des années.)'
            ]
        },
        'think': {
            explanation: 'Le verbe "think" (penser) exprime l\'activité mentale ou l\'opinion.',
            examples: [
                'I think it\'s a good idea. (Je pense que c\'est une bonne idée.)',
                'She thought about it. (Elle y a réfléchi.)',
                'We have thought it through. (Nous y avons réfléchi.)'
            ]
        },
        'come': {
            explanation: 'Le verbe "come" (venir) indique le mouvement vers le locuteur.',
            examples: [
                'I come here often. (Je viens souvent ici.)',
                'She came to visit. (Elle est venue visiter.)',
                'They have come a long way. (Ils ont fait beaucoup de chemin.)'
            ]
        },
        'give': {
            explanation: 'Le verbe "give" (donner) exprime l\'action de transférer quelque chose.',
            examples: [
                'I give presents. (Je donne des cadeaux.)',
                'She gave me a book. (Elle m\'a donné un livre.)',
                'We have given our best. (Nous avons donné notre meilleur.)'
            ]
        },
        'find': {
            explanation: 'Le verbe "find" (trouver) décrit la découverte de quelque chose.',
            examples: [
                'I find it interesting. (Je le trouve intéressant.)',
                'She found her keys. (Elle a trouvé ses clés.)',
                'We have found a solution. (Nous avons trouvé une solution.)'
            ]
        },
        'tell': {
            explanation: 'Le verbe "tell" (dire, raconter) est utilisé pour communiquer des informations.',
            examples: [
                'I tell stories. (Je raconte des histoires.)',
                'She told me the truth. (Elle m\'a dit la vérité.)',
                'We have told them everything. (Nous leur avons tout dit.)'
            ]
        },
        'feel': {
            explanation: 'Le verbe "feel" (sentir, ressentir) exprime les sensations physiques ou émotionnelles.',
            examples: [
                'I feel happy. (Je me sens heureux.)',
                'She felt tired. (Elle se sentait fatiguée.)',
                'We have felt better. (Nous nous sommes sentis mieux.)'
            ]
        }
    };
    
    // Dictionnaire de traductions françaises pour les verbes courants
    const verbTranslations = {
        'cut': 'couper', 'hit': 'frapper', 'put': 'mettre', 'set': 'placer', 'shut': 'fermer',
        'let': 'laisser', 'hurt': 'blesser', 'bet': 'parier', 'bid': 'enchérir', 'cost': 'coûter',
        'quit': 'quitter', 'split': 'diviser', 'spread': 'étaler', 'burst': 'éclater',
        'broadcast': 'diffuser', 'dig': 'creuser', 'build': 'construire', 'burn': 'brûler',
        'deal': 'traiter', 'feed': 'nourrir', 'feel': 'sentir', 'fight': 'se battre',
        'find': 'trouver', 'flee': 'fuir', 'get': 'obtenir', 'grind': 'moudre', 'hang': 'pendre',
        'hear': 'entendre', 'hold': 'tenir', 'keep': 'garder', 'kneel': 's\'agenouiller',
        'lay': 'poser', 'lead': 'mener', 'leave': 'partir', 'lend': 'prêter', 'light': 'allumer',
        'lose': 'perdre', 'mean': 'signifier', 'meet': 'rencontrer', 'pay': 'payer',
        'say': 'dire', 'sell': 'vendre', 'send': 'envoyer', 'shine': 'briller', 'shoot': 'tirer',
        'sit': 's\'asseoir', 'sleep': 'dormir', 'slide': 'glisser', 'spend': 'dépenser',
        'spin': 'tourner', 'spit': 'cracher', 'stand': 'se tenir debout', 'stick': 'coller',
        'sting': 'piquer', 'strike': 'frapper', 'sweep': 'balayer', 'swing': 'se balancer',
        'teach': 'enseigner', 'tell': 'dire', 'think': 'penser', 'understand': 'comprendre',
        'weep': 'pleurer', 'win': 'gagner', 'wind': 'enrouler', 'wring': 'tordre',
        'begin': 'commencer', 'blow': 'souffler', 'break': 'casser', 'choose': 'choisir',
        'draw': 'dessiner', 'drink': 'boire', 'drive': 'conduire', 'eat': 'manger',
        'fall': 'tomber', 'fly': 'voler', 'forget': 'oublier', 'freeze': 'geler',
        'give': 'donner', 'grow': 'grandir', 'hide': 'cacher', 'ride': 'monter',
        'ring': 'sonner', 'rise': 's\'élever', 'run': 'courir', 'shake': 'secouer',
        'sing': 'chanter', 'speak': 'parler', 'steal': 'voler', 'swear': 'jurer',
        'swim': 'nager', 'tear': 'déchirer', 'throw': 'lancer', 'wake': 'réveiller',
        'wear': 'porter', 'weave': 'tisser', 'write': 'écrire', 'arise': 'survenir',
        'awake': 'réveiller', 'bear': 'porter', 'bite': 'mordre', 'forbid': 'interdire',
        'forgive': 'pardonner', 'forsake': 'abandonner', 'mistake': 'se tromper',
        'overcome': 'surmonter', 'overtake': 'dépasser', 'prove': 'prouver', 'sew': 'coudre',
        'show': 'montrer', 'shrink': 'rétrécir', 'sow': 'semer', 'strike': 'frapper',
        'swell': 'gonfler', 'tread': 'marcher', 'withdraw': 'retirer', 'bring': 'apporter',
        'buy': 'acheter', 'catch': 'attraper', 'seek': 'chercher'
    };
    
    // Fonction pour obtenir les détails d'un verbe
    function getVerbDetails(verb) {
        const base = verb.base ? verb.base.toLowerCase() : '';
        const details = verbDetailsData[base];
        
        if (details) {
            return details;
        }
        
        // Obtenir la traduction française du verbe
        const frenchTranslation = verbTranslations[base] || verb.base;
        
        // Générer des exemples par défaut avec de vraies traductions françaises
        const examples = [];
        
        // Exemple 1: Présent simple
        if (base === 'be') {
            examples.push('I am here. (Je suis ici.)');
        } else if (base === 'have') {
            examples.push('I have a book. (J\'ai un livre.)');
        } else {
            examples.push(`I ${verb.base} regularly. (Je ${frenchTranslation} régulièrement.)`);
        }
        
        // Exemple 2: Passé simple
        if (verb.past.includes('/')) {
            // Gérer les verbes avec plusieurs formes passées (ex: was/were)
            const pastForm = verb.past.split('/')[0];
            examples.push(`She ${pastForm} there. (Elle ${frenchTranslation} (passé) là-bas.)`);
        } else {
            examples.push(`She ${verb.past} it yesterday. (Elle l'a ${frenchTranslation} hier.)`);
        }
        
        // Exemple 3: Present Perfect
        if (verb.pastParticiple.includes('/')) {
            const ppForm = verb.pastParticiple.split('/')[0];
            examples.push(`We have ${ppForm} it. (Nous l'avons ${frenchTranslation}.)`);
        } else {
            examples.push(`We have ${verb.pastParticiple} it. (Nous l'avons ${frenchTranslation}.)`);
        }
        
        return {
            explanation: `Le verbe "${verb.base}" (${frenchTranslation}) est un verbe irrégulier. Sa forme passée et son participe passé ne suivent pas la règle standard des verbes réguliers qui ajoutent "-ed".`,
            examples: examples
        };
    }
    
    // Fonction pour afficher les détails d'un verbe
    function showVerbDetails(verb) {
        if (!verb || !verbDetailsModal) return;
        
        // Remplir les formes du verbe
        if (verbBaseForm) verbBaseForm.textContent = verb.base || '';
        if (verbPastForm) verbPastForm.textContent = verb.past || '';
        if (verbParticipleForm) verbParticipleForm.textContent = verb.pastParticiple || '';
        
        // Mettre à jour le titre
        if (verbDetailsTitle) {
            verbDetailsTitle.textContent = `Détails: ${verb.base || 'Verbe'}`;
        }
        
        // Obtenir les détails (explication et exemples)
        const details = getVerbDetails(verb);
        
        // Afficher l'explication
        if (verbExplanationText) {
            verbExplanationText.textContent = details.explanation;
        }
        
        // Afficher les exemples
        if (verbExamplesList) {
            verbExamplesList.innerHTML = '';
            details.examples.forEach(example => {
                const li = document.createElement('li');
                li.textContent = example;
                li.style.marginBottom = '0.5rem';
                verbExamplesList.appendChild(li);
            });
        }
        
        // Ouvrir la modale
        verbDetailsModal.classList.add('active');
    }
    
    // Afficher les verbes dans le tableau
    function renderVerbs(verbs) {
        if (!verbsTbody) return;
        
        // Vider le tableau
        verbsTbody.innerHTML = '';
        
        // Afficher un message si aucun verbe n'est trouvé
        if (!verbs || verbs.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="4" class="no-results" style="text-align: center; padding: 2rem;">
                    Aucun verbe trouvé. Essayez de modifier votre recherche.
                </td>
            `;
            verbsTbody.appendChild(row);
            return;
        }
        
        // Afficher chaque verbe dans une ligne du tableau
        verbs.forEach(verb => {
            const row = document.createElement('tr');
            const audioBtn = document.createElement('button');
            audioBtn.className = 'audio-btn';
            audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            audioBtn.title = 'Prononcer "' + (verb.base || '') + '"';
            audioBtn.onclick = (e) => {
                e.stopPropagation(); // Empêcher le clic sur la ligne
                if (verb.base) {
                    speakWord(verb.base);
                }
            };
            
            const audioCell = document.createElement('td');
            audioCell.appendChild(audioBtn);
            
            row.innerHTML = `
                <td>${verb.base || ''}</td>
                <td>${verb.past || ''}</td>
                <td>${verb.pastParticiple || ''}</td>
            `;
            row.appendChild(audioCell);
            
            // Ajouter un gestionnaire d'événements pour afficher les détails
            row.addEventListener('click', (e) => {
                // Ne pas ouvrir la modale si on clique sur le bouton audio
                if (e.target.closest('.audio-btn')) {
                    return;
                }
                showVerbDetails(verb);
            });
            
            verbsTbody.appendChild(row);
        });
    }
    
    // Trier les verbes
    function sortVerbs(field) {
        console.log('Tri des verbes par:', field);
        
        // Vérifier si les verbes sont disponibles
        if (!currentVerbs || currentVerbs.length === 0) {
            console.warn('Aucun verbe à trier');
            return;
        }
        
        // Inverser l'ordre si on clique deux fois sur le même champ
        if (currentSort.field === field) {
            currentSort.ascending = !currentSort.ascending;
        } else {
            currentSort.field = field;
            currentSort.ascending = true;
        }
        
        // Trier les verbes
        currentVerbs.sort((a, b) => {
            // Gérer les valeurs manquantes ou indéfinies
            const aValue = a[field] || '';
            const bValue = b[field] || '';
            
            // Comparaison insensible à la casse
            const compareResult = String(aValue).localeCompare(
                String(bValue), 
                undefined, 
                {sensitivity: 'base'}
            );
            
            // Inverser le résultat si l'ordre est décroissant
            return currentSort.ascending ? compareResult : -compareResult;
        });
        
        // Mettre à jour l'affichage
        renderVerbs(currentVerbs);
        
        // Mettre à jour les en-têtes de colonne et les icônes de tri
        document.querySelectorAll('th[data-sort]').forEach(header => {
            const icon = header.querySelector('i');
            const headerField = header.getAttribute('data-sort');
            
            if (headerField === field) {
                // Mettre à jour l'attribut de tri
                header.setAttribute('data-sort-order', currentSort.ascending ? 'asc' : 'desc');
                
                // Mettre à jour l'icône
                if (icon) {
                    icon.className = currentSort.ascending ? 'fas fa-sort-up' : 'fas fa-sort-down';
                }
            } else {
                // Réinitialiser les autres en-têtes
                header.removeAttribute('data-sort-order');
                if (icon) {
                    icon.className = 'fas fa-sort';
                }
            }
        });
    }
    
    // Basculer entre les thèmes clair et sombre
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Mettre à jour l'attribut de thème
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Sauvegarder la préférence de thème
        localStorage.setItem('theme', newTheme);
        
        // Mettre à jour l'icône du thème
        updateThemeIcon(newTheme);
        
        // Ajouter une transition fluide
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }
    
    // Mettre à jour l'icône du thème
    function updateThemeIcon(theme) {
        const icon = themeToggle ? themeToggle.querySelector('i') : null;
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            
            // Ajouter une animation à l'icône
            icon.style.animation = 'spin 0.5s ease-in-out';
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        }
    }
    
    // Fonction pour générer et télécharger le PDF
    function generateAndDownloadPDF() {
        if (typeof window.jspdf === 'undefined') {
            alert('La bibliothèque PDF n\'est pas chargée. Veuillez recharger la page.');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configuration
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        const lineHeight = 7;
        let yPosition = margin;
        
        // Fonction pour ajouter une nouvelle page si nécessaire
        const checkPageBreak = (requiredHeight) => {
            if (yPosition + requiredHeight > pageHeight - margin) {
                doc.addPage();
                yPosition = margin;
                return true;
            }
            return false;
        };
        
        // Titre principal
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('English Irregular Verbs', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += lineHeight * 2;
        
        // Informations
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += lineHeight * 1.5;
        
        // Catégories et leurs descriptions
        const categories = {
            'noChange': { name: 'No Change', description: 'Verbs that remain the same in all forms' },
            'vowelChange': { name: 'Vowel Changes', description: 'Verbs with vowel alterations between forms' },
            'samePastParticiple': { name: 'Same Past & Past Participle', description: 'Simple Past = Past Participle ≠ Base' },
            'onlyPPChange': { name: 'Only Past Participle Changes', description: 'Base = Simple Past ≠ Past Participle' },
            'enEnding': { name: 'Past Participle ending in "en"', description: 'Verbs with "-en" ending in Past Participle' },
            'ghtEnding': { name: 'Ending in "ght"', description: 'Simple Past or Past Participle ending in "-ght"' }
        };
        
        // Obtenir les verbes par catégorie
        const categoryMap = {
            'noChange': 'no-change',
            'vowelChange': 'vowel-change',
            'samePastParticiple': 'same-past-participle',
            'onlyPPChange': 'only-pp-change',
            'enEnding': 'en-ending',
            'ghtEnding': 'ght-ending'
        };
        
        // Parcourir chaque catégorie
        Object.entries(categories).forEach(([categoryKey, categoryInfo]) => {
            checkPageBreak(lineHeight * 4);
            
            // Titre de la catégorie
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(52, 152, 219); // Bleu
            doc.text(categoryInfo.name, margin, yPosition);
            yPosition += lineHeight;
            
            // Description
            doc.setFontSize(9);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(100, 100, 100); // Gris
            doc.text(categoryInfo.description, margin, yPosition);
            yPosition += lineHeight * 1.5;
            
            // Obtenir les verbes de cette catégorie
            const categoryId = categoryMap[categoryKey];
            const verbs = typeof window.getVerbsByCategory === 'function' 
                ? window.getVerbsByCategory(categoryId) 
                : [];
            
            if (verbs.length === 0) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                doc.text('Aucun verbe dans cette catégorie', margin + 5, yPosition);
                yPosition += lineHeight * 1.5;
            } else {
                // En-tête du tableau
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                
                const col1X = margin;
                const col2X = margin + 60;
                const col3X = margin + 120;
                
                doc.text('Base Form', col1X, yPosition);
                doc.text('Simple Past', col2X, yPosition);
                doc.text('Past Participle', col3X, yPosition);
                yPosition += lineHeight;
                
                // Ligne de séparation
                doc.setDrawColor(200, 200, 200);
                doc.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
                yPosition += lineHeight * 0.5;
                
                // Verbes
                doc.setFont('helvetica', 'normal');
                verbs.forEach((verb, index) => {
                    checkPageBreak(lineHeight * 2);
                    
                    doc.setFontSize(9);
                    doc.text(verb.base || '', col1X, yPosition);
                    doc.text(verb.past || '', col2X, yPosition);
                    doc.text(verb.pastParticiple || '', col3X, yPosition);
                    yPosition += lineHeight;
                });
            }
            
            yPosition += lineHeight; // Espace entre les catégories
        });
        
        // Pied de page sur chaque page
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(150, 150, 150);
            doc.text(
                `Page ${i} sur ${totalPages} - English Irregular Verbs`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
        }
        
        // Télécharger le PDF
        doc.save('English_Irregular_Verbs.pdf');
    }
    
    // Démarrer l'application
    init();
});
