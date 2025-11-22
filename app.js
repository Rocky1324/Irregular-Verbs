// Import des modules
import { auth } from './auth.js';
import exerciseManager from './exercises.js';
import { allVerbs, getVerbsByCategory, searchVerbs, getRandomOptions, verbDetailsData, verbTranslations } from './data.js';

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
    const loginNavBtn = document.getElementById('login-nav-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authButtonsDiv = document.getElementById('auth-buttons');
    const userMenuDiv = document.getElementById('user-menu');
    const usernameDisplay = document.getElementById('username-display');

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

    // Missing elements
    const closeAuthModal = document.getElementById('closeAuthModal');
    const closeExerciseModal = document.getElementById('closeExerciseModal');
    const closeVerbDetailsModal = document.getElementById('closeVerbDetailsModal');
    const startExerciseBtn = document.getElementById('startExerciseBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    // État de l'application
    let currentCategory = 'all';
    let currentVerbs = [];
    let currentSort = { field: 'base', ascending: true };
    let favoriteVerbs = [];

    // ============================================
    // GESTION DES FAVORIS
    // ============================================

    // Charger les favoris depuis localStorage
    function loadFavoriteVerbs() {
        const storedFavorites = localStorage.getItem('favoriteVerbs');
        if (storedFavorites) {
            favoriteVerbs = JSON.parse(storedFavorites);
        }
    }

    // Sauvegarder les favoris dans localStorage
    function saveFavoriteVerbs() {
        localStorage.setItem('favoriteVerbs', JSON.stringify(favoriteVerbs));
    }

    // Basculer l'état de favori d'un verbe
    function toggleFavorite(verbBase, event) {
        event.stopPropagation(); // Empêcher le clic sur la ligne
        const index = favoriteVerbs.indexOf(verbBase);
        if (index > -1) {
            favoriteVerbs.splice(index, 1);
        } else {
            favoriteVerbs.push(verbBase);
        }
        saveFavoriteVerbs();
        // Re-rendre la vue actuelle pour mettre à jour l'icône de l'étoile
        renderVerbs(currentVerbs);
    }

    // Initialisation de l'application
    async function init() {
        console.log('Initialisation de l\'application...');

        loadFavoriteVerbs();

        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        if (auth.isAuthenticated) {
            updateAuthUI(true);
        } else {
            updateAuthUI(false);
        }

        currentVerbs = getVerbsByCategory(currentCategory);
        renderVerbs(currentVerbs);

        setupEventListeners();
    }

    // Configuration des écouteurs d'événements
    function setupEventListeners() {
        searchInput.addEventListener('input', handleSearch);

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = link.getAttribute('data-category');
                setActiveCategory(category);
            });
        });

        document.querySelectorAll('th[data-sort]').forEach(header => {
            header.addEventListener('click', () => {
                const field = header.getAttribute('data-sort');
                sortVerbs(field);
            });
        });

        themeToggle.addEventListener('click', toggleTheme);

        // --- Auth Event Listeners ---
        loginNavBtn.addEventListener('click', showAuthModal);
        logoutBtn.addEventListener('click', handleLogout);

        loginForm.addEventListener('submit', handleLogin);
        const loginBtn = document.getElementById('login-btn');
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogin(e);
        });

        registerForm.addEventListener('submit', handleRegister);
        const registerBtn = document.getElementById('register-submit');
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleRegister(e);
        });

        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            showRegisterForm();
        });

        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });

        // Exercices
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => {
                if (!exerciseManager) return;

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

        // Fermer les modales
        closeAuthModal.addEventListener('click', () => authModal.classList.remove('active'));
        closeExerciseModal.addEventListener('click', () => exerciseModal.classList.remove('active'));
        closeVerbDetailsModal.addEventListener('click', () => verbDetailsModal.classList.remove('active'));

        practiceVerbBtn.addEventListener('click', () => {
            verbDetailsModal.classList.remove('active');
            startQuiz('beginner', 60);
        });

        pronounceVerbBtn.addEventListener('click', () => {
            const verbBase = verbBaseForm.textContent;
            if (verbBase) speakWord(verbBase);
        });

        startExerciseBtn.addEventListener('click', () => startQuiz('beginner', 60));
        downloadPdfBtn.addEventListener('click', generateAndDownloadPDF);

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

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

    function showAuthModal() {
        authModal.classList.add('active');
        showLoginForm();
    }

    function showLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }

    function showRegisterForm() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }

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

    function handleLogout() {
        auth.logout();
        updateAuthUI(false);
        showNotification('Déconnexion réussie !', 'success');
    }

    function updateAuthUI(isAuthenticated) {
        if (isAuthenticated) {
            authButtonsDiv.style.display = 'none';
            userMenuDiv.style.display = 'flex';
            if (auth.currentUser) {
                usernameDisplay.textContent = `Welcome, ${auth.currentUser.username}`;
            }
        } else {
            authButtonsDiv.style.display = 'flex';
            userMenuDiv.style.display = 'none';
            usernameDisplay.textContent = '';
        }
    }

    // ============================================
    // GESTION DES EXERCICES
    // ============================================

    function startQuiz(difficulty = 'beginner', timeLimit = 60) {
        if (!exerciseManager) {
            console.error('ExerciseManager not available');
            return;
        }

        const onTimeUp = () => {
            console.log('Temps écoulé ! Fin du quiz.');
            finishQuiz();
        };

        exerciseManager.startTimedQuiz(difficulty, timeLimit, onTimeUp, allVerbs);
        showNextQuestion();

        exerciseResults.style.display = 'none';
        document.getElementById('exercise-container').style.display = 'block';
        exerciseModal.classList.add('active');
    }

    function showNextQuestion() {
        if (!exerciseManager || !exerciseQuestion || !exerciseOptions) return;

        if (exerciseManager.currentQuestionIndex >= exerciseManager.questions.length) {
            finishQuiz();
            return;
        }

        const question = exerciseManager.getCurrentQuestion();
        if (!question) {
            finishQuiz();
            return;
        }

        exerciseQuestion.textContent = question.questionText || 'Question';
        exerciseProgress.textContent = `Question ${exerciseManager.currentQuestionIndex + 1}/${exerciseManager.questions.length}`;
        exerciseOptions.innerHTML = '';

        const verb = question.verb;
        const questionType = question.type || 'multipleChoice';
        let correctAnswer = '';
        let options = [];

        if (questionType === 'fillInBlank') {
            const form = Math.random() > 0.5 ? 'past' : 'pastParticiple';
            correctAnswer = verb[form];
            options = getRandomOptions(verb, form, 4);
        } else {
            const forms = ['past', 'pastParticiple'];
            const randomForm = forms[Math.floor(Math.random() * forms.length)];
            correctAnswer = verb[randomForm];

            options = [correctAnswer];
            while (options.length < 4 && allVerbs.length > 0) {
                const randomVerb = allVerbs[Math.floor(Math.random() * allVerbs.length)];
                const randomFormValue = randomVerb[randomForm];
                if (!options.includes(randomFormValue)) {
                    options.push(randomFormValue);
                }
            }
        }

        options = options.sort(() => Math.random() - 0.5);

        options.forEach((option) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = () => selectAnswer(option, correctAnswer);
            exerciseOptions.appendChild(button);
        });

        question.correctAnswer = correctAnswer;

        nextQuestionBtn.style.display = 'none';
        finishQuizBtn.style.display = 'none';
        exerciseFeedback.textContent = '';
        exerciseFeedback.className = '';
    }

    function selectAnswer(selectedAnswer, correctAnswer) {
        if (!exerciseManager) return;

        const isCorrect = exerciseManager.submitAnswer(selectedAnswer);

        document.querySelectorAll('.option-btn').forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else if (button.textContent === selectedAnswer && !isCorrect) {
                button.classList.add('incorrect');
            }
        });

        if (isCorrect) {
            exerciseFeedback.textContent = 'Correct !';
            exerciseFeedback.className = 'correct';
        } else {
            exerciseFeedback.textContent = `Incorrect. La bonne réponse est : ${correctAnswer}`;
            exerciseFeedback.className = 'incorrect';
        }

        if (exerciseManager.currentQuestionIndex < exerciseManager.questions.length - 1) {
            nextQuestionBtn.style.display = 'inline-block';
        } else {
            finishQuizBtn.style.display = 'inline-block';
        }
    }

    function finishQuiz() {
        if (!exerciseManager) return;

        console.log('Fin du quiz - Arrêt du timer');

        exerciseManager.isQuizFinished = true;

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

        document.getElementById('exercise-container').style.display = 'none';
        exerciseResults.style.display = 'block';

        scoreDisplay.textContent = `Score: ${results.score}/${results.total} (${results.percentage}%)`;
        const timeSpent = exerciseManager.timeLimit - (exerciseManager.timeLeft || 0);
        timeSpentDisplay.textContent = `Temps passé: ${timeSpent} secondes`;
        correctAnswersDisplay.textContent = `Bonnes réponses: ${results.score} sur ${results.total}`;

        const timerElement = document.getElementById('exercise-timer');
        if (timerElement) {
            timerElement.textContent = 'Quiz terminé';
        }
    }

    function restartQuiz() {
        startQuiz();
    }

    function closeQuiz() {
        exerciseModal.classList.remove('active');
    }

    // ============================================
    // FONCTIONS UTILITAIRES
    // ============================================

    function showNotification(message, type = 'success') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `toast-notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length >= 2) {
            const results = searchVerbs(query);
            renderVerbs(results);
        } else if (query.length === 0) {
            document.getElementById('home').classList.remove('active');
            document.getElementById('verbs-container').classList.add('active');
        } else {
            currentVerbs = getVerbsByCategory(currentCategory);
            renderVerbs(currentVerbs);
        }
    }

    function setActiveCategory(category) {
        currentCategory = category;

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-category') === category);
        });

        document.getElementById('home').classList.remove('active');
        document.getElementById('verbs-container').classList.add('active');

        if (category === 'favorites') {
            currentVerbs = allVerbs.filter(verb => favoriteVerbs.includes(verb.base));
        } else {
            currentVerbs = getVerbsByCategory(category);
        }

        renderVerbs(currentVerbs || []);
        window.scrollTo(0, 0);
    }

    function speakWord(word) {
        if ('speechSynthesis' in window) {
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

    function getVerbDetails(verb) {
        const base = verb.base ? verb.base.toLowerCase() : '';
        const details = verbDetailsData[base];

        if (details) return details;

        const frenchTranslation = verbTranslations[base] || verb.base;
        const examples = [];

        if (base === 'be') {
            examples.push('I am here. (Je suis ici.)');
        } else if (base === 'have') {
            examples.push('I have a book. (J\'ai un livre.)');
        } else {
            examples.push(`I ${verb.base} regularly. (Je ${frenchTranslation} régulièrement.)`);
        }

        if (verb.past.includes('/')) {
            const pastForm = verb.past.split('/')[0];
            examples.push(`She ${pastForm} there. (Elle ${frenchTranslation} (passé) là-bas.)`);
        } else {
            examples.push(`She ${verb.past} it yesterday. (Elle l'a ${frenchTranslation} hier.)`);
        }

        if (verb.pastParticiple.includes('/')) {
            const ppForm = verb.pastParticiple.split('/')[0];
            examples.push(`We have ${ppForm} it. (Nous l'avons ${frenchTranslation}.)`);
        } else {
            examples.push(`We have ${verb.pastParticiple} it. (Nous l'avons ${frenchTranslation}.)`);
        }

        return {
            explanation: `Le verbe "${verb.base}" (${frenchTranslation}) est un verbe irrégulier...`,
            examples: examples
        };
    }

    function showVerbDetails(verb) {
        if (!verb || !verbDetailsModal) return;

        verbBaseForm.textContent = verb.base || '';
        verbPastForm.textContent = verb.past || '';
        verbParticipleForm.textContent = verb.pastParticiple || '';
        verbDetailsTitle.textContent = `Détails: ${verb.base || 'Verbe'}`;

        const details = getVerbDetails(verb);
        verbExplanationText.textContent = details.explanation;

        verbExamplesList.innerHTML = '';
        details.examples.forEach(example => {
            const li = document.createElement('li');
            li.textContent = example;
            li.style.marginBottom = '0.5rem';
            verbExamplesList.appendChild(li);
        });

        verbDetailsModal.classList.add('active');
    }

    function renderVerbs(verbs) {
        if (!verbsTbody) return;
        verbsTbody.innerHTML = '';

        if (!verbs || verbs.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="5" class="no-results" style="text-align: center; padding: 2rem;">Aucun verbe trouvé.</td>`;
            verbsTbody.appendChild(row);
            return;
        }

        verbs.forEach(verb => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group even:bg-slate-50/50 dark:even:bg-slate-800/50';

            const audioBtn = document.createElement('button');
            audioBtn.className = 'audio-btn w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100';
            audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            audioBtn.title = `Pronounce "${verb.base || ''}"`;
            audioBtn.onclick = (e) => {
                e.stopPropagation();
                if (verb.base) speakWord(verb.base);
            };
            const audioCell = document.createElement('td');
            audioCell.className = 'p-3 text-center';
            audioCell.appendChild(audioBtn);

            const isFavorite = favoriteVerbs.includes(verb.base);
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = `favorite-btn w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFavorite ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`;
            favoriteBtn.innerHTML = `<i class="${isFavorite ? 'fas' : 'far'} fa-star"></i>`;
            favoriteBtn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
            favoriteBtn.onclick = (e) => toggleFavorite(verb.base, e);
            const favoriteCell = document.createElement('td');
            favoriteCell.className = 'p-3 text-center';
            favoriteCell.appendChild(favoriteBtn);

            row.innerHTML = `
                <td class="p-4 font-medium text-slate-900 dark:text-slate-100">${verb.base || ''}</td>
                <td class="p-4">${verb.past || ''}</td>
                <td class="p-4">${verb.pastParticiple || ''}</td>
            `;
            row.appendChild(audioCell);
            row.appendChild(favoriteCell);

            row.addEventListener('click', (e) => {
                if (e.target.closest('.audio-btn') || e.target.closest('.favorite-btn')) return;
                showVerbDetails(verb);
            });

            verbsTbody.appendChild(row);
        });
    }

    function sortVerbs(field) {
        if (!currentVerbs || currentVerbs.length === 0) return;

        if (currentSort.field === field) {
            currentSort.ascending = !currentSort.ascending;
        } else {
            currentSort.field = field;
            currentSort.ascending = true;
        }

        currentVerbs.sort((a, b) => {
            const aValue = a[field] || '';
            const bValue = b[field] || '';
            const compareResult = String(aValue).localeCompare(String(bValue), undefined, { sensitivity: 'base' });
            return currentSort.ascending ? compareResult : -compareResult;
        });

        renderVerbs(currentVerbs);

        const headers = document.querySelectorAll('th[data-sort]');
        let sortIndex = -1;

        headers.forEach((header, index) => {
            const icon = header.querySelector('i');
            const headerField = header.getAttribute('data-sort');

            if (headerField === field) {
                header.setAttribute('data-sort-order', currentSort.ascending ? 'asc' : 'desc');
                if (icon) icon.className = currentSort.ascending ? 'fas fa-sort-up' : 'fas fa-sort-down';
                sortIndex = index;
            } else {
                header.removeAttribute('data-sort-order');
                if (icon) icon.className = 'fas fa-sort';
            }
        });

        if (sortIndex !== -1) {
            document.querySelectorAll('#verbs-tbody tr').forEach(row => {
                row.querySelectorAll('td').forEach(td => td.classList.remove('sorted-column'));
                const cell = row.querySelector(`td:nth-child(${sortIndex + 1})`);
                if (cell) cell.classList.add('sorted-column');
            });
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.animation = 'spin 0.5s ease-in-out';
            setTimeout(() => { icon.style.animation = '' }, 500);
        }
    }

    function generateAndDownloadPDF() {
        if (typeof window.jspdf === 'undefined') {
            showNotification('La bibliothèque PDF n\'est pas chargée.', 'error');
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
            const verbs = getVerbsByCategory(categoryId);

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

    init();
});
