/**
 * Widerstands-Toolkit - Trackbarkeits-Quiz
 * =========================================
 * Vollständig clientseitig - keine Daten werden gesendet.
 */

(function() {
    'use strict';

    // Quiz questions
    const questions = [
        {
            question: "Welchen Browser nutzt du hauptsächlich?",
            options: [
                { text: "Tor Browser oder Firefox mit strengen Einstellungen", score: 0 },
                { text: "Firefox oder Brave mit Standard-Einstellungen", score: 1 },
                { text: "Chrome oder Safari", score: 2 },
                { text: "Ich weiß nicht / Standard-Browser", score: 3 }
            ]
        },
        {
            question: "Nutzt du einen VPN-Dienst?",
            options: [
                { text: "Ja, einen vertrauenswürdigen (z.B. Mullvad, ProtonVPN)", score: 0 },
                { text: "Ja, einen kostenlosen VPN", score: 2 },
                { text: "Nur manchmal", score: 2 },
                { text: "Nein, nie", score: 3 }
            ]
        },
        {
            question: "Wie gehst du mit Standortdiensten auf deinem Smartphone um?",
            options: [
                { text: "Immer aus, außer wenn unbedingt nötig", score: 0 },
                { text: "Nur für bestimmte Apps aktiviert", score: 1 },
                { text: "Meistens an", score: 2 },
                { text: "Immer an / Ich achte nicht darauf", score: 3 }
            ]
        },
        {
            question: "Welchen Messenger nutzt du hauptsächlich?",
            options: [
                { text: "Signal, Briar oder Threema", score: 0 },
                { text: "Telegram (mit Secret Chats)", score: 1 },
                { text: "WhatsApp", score: 2 },
                { text: "Facebook Messenger, Instagram DMs", score: 3 }
            ]
        },
        {
            question: "Wie oft löschst du Browser-Cookies und Verlauf?",
            options: [
                { text: "Automatisch bei jedem Schließen", score: 0 },
                { text: "Regelmäßig (wöchentlich)", score: 1 },
                { text: "Manchmal", score: 2 },
                { text: "Selten oder nie", score: 3 }
            ]
        },
        {
            question: "Nutzt du Social Media mit deinem echten Namen?",
            options: [
                { text: "Kein Social Media oder nur mit Pseudonym", score: 0 },
                { text: "Gemischt - teils echt, teils Pseudonym", score: 1 },
                { text: "Ja, mit echtem Namen aber privaten Konten", score: 2 },
                { text: "Ja, mit echtem Namen und öffentlichen Profilen", score: 3 }
            ]
        },
        {
            question: "Verwendest du einen Passwort-Manager?",
            options: [
                { text: "Ja, einen guten (Bitwarden, KeePassXC)", score: 0 },
                { text: "Ja, den im Browser integrierten", score: 1 },
                { text: "Nein, aber unterschiedliche Passwörter", score: 2 },
                { text: "Nein, ich nutze ähnliche Passwörter", score: 3 }
            ]
        },
        {
            question: "Wie ist dein Smartphone entsperrt?",
            options: [
                { text: "Starke PIN/Passwort (6+ Zeichen), keine Biometrie", score: 0 },
                { text: "PIN und Biometrie kombiniert", score: 1 },
                { text: "Nur Biometrie (Fingerabdruck, Face ID)", score: 2 },
                { text: "Muster oder kurze PIN (4 Zeichen)", score: 3 }
            ]
        },
        {
            question: "Entfernst du EXIF-Daten aus Fotos bevor du sie teilst?",
            options: [
                { text: "Ja, immer", score: 0 },
                { text: "Bei sensiblen Fotos ja", score: 1 },
                { text: "Selten", score: 2 },
                { text: "Was sind EXIF-Daten?", score: 3 }
            ]
        },
        {
            question: "Nutzt du Zwei-Faktor-Authentifizierung (2FA)?",
            options: [
                { text: "Ja, mit Hardware-Key oder Authenticator-App", score: 0 },
                { text: "Ja, mit SMS", score: 1 },
                { text: "Bei manchen Diensten", score: 2 },
                { text: "Nein", score: 3 }
            ]
        }
    ];

    // State
    let currentQuestionIndex = 0;
    let answers = [];

    // Initialize quiz
    window.startQuiz = function() {
        currentQuestionIndex = 0;
        answers = [];
        document.getElementById('quiz-start').classList.add('hidden');
        document.getElementById('quiz-questions').classList.remove('hidden');
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('total-questions').textContent = questions.length;
        showQuestion();
    };

    window.restartQuiz = function() {
        startQuiz();
    };

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        const container = document.getElementById('question-container');

        let html = '<h3>' + escapeHtml(question.question) + '</h3><div class="options mt-lg">';

        question.options.forEach((option, index) => {
            const selected = answers[currentQuestionIndex] === index ? 'selected' : '';
            html += '<button class="quiz-option ' + selected + '" onclick="selectOption(' + index + ')">' +
                    escapeHtml(option.text) + '</button>';
        });

        html += '</div>';
        container.innerHTML = html;

        // Update navigation
        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;

        if (currentQuestionIndex === questions.length - 1) {
            document.getElementById('next-btn').textContent = 'Ergebnis anzeigen';
        } else {
            document.getElementById('next-btn').textContent = 'Weiter →';
        }
    }

    window.selectOption = function(index) {
        answers[currentQuestionIndex] = index;

        // Visual feedback
        document.querySelectorAll('.quiz-option').forEach((btn, i) => {
            btn.classList.toggle('selected', i === index);
        });
    };

    window.nextQuestion = function() {
        if (answers[currentQuestionIndex] === undefined) {
            alert('Bitte wähle eine Antwort aus.');
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResults();
        }
    };

    window.prevQuestion = function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    };

    function showResults() {
        document.getElementById('quiz-questions').classList.add('hidden');
        document.getElementById('quiz-results').classList.remove('hidden');

        // Calculate score
        let totalScore = 0;
        answers.forEach((answerIndex, questionIndex) => {
            totalScore += questions[questionIndex].options[answerIndex].score;
        });

        const maxScore = questions.length * 3;
        const percentage = Math.round((totalScore / maxScore) * 100);
        const trackability = 100 - Math.round(((maxScore - totalScore) / maxScore) * 100);

        // Display score
        const scoreCircle = document.getElementById('score-circle');
        const scoreValue = document.getElementById('score-value');
        const scoreLabel = document.getElementById('score-label');

        scoreValue.textContent = trackability + '%';

        if (trackability <= 30) {
            scoreCircle.className = 'score-circle score-low';
            scoreLabel.innerHTML = '<strong>Gut geschützt!</strong><br>Du hinterlässt wenig Spuren.';
        } else if (trackability <= 60) {
            scoreCircle.className = 'score-circle score-medium';
            scoreLabel.innerHTML = '<strong>Verbesserungspotenzial</strong><br>Einige Bereiche könnten sicherer sein.';
        } else {
            scoreCircle.className = 'score-circle score-high';
            scoreLabel.innerHTML = '<strong>Hohe Trackbarkeit</strong><br>Du hinterlässt viele digitale Spuren.';
        }

        // Generate recommendations
        generateRecommendations();
    }

    function generateRecommendations() {
        const container = document.getElementById('recommendations');
        let html = '<h3>Empfehlungen</h3><ul class="checklist">';

        answers.forEach((answerIndex, questionIndex) => {
            const score = questions[questionIndex].options[answerIndex].score;
            if (score >= 2) {
                html += getRecommendation(questionIndex);
            }
        });

        html += '</ul>';
        container.innerHTML = html;
    }

    function getRecommendation(questionIndex) {
        const recommendations = [
            '<li>Wechsle zu Firefox mit Privacy-Erweiterungen oder dem Tor Browser</li>',
            '<li>Nutze einen vertrauenswürdigen VPN wie Mullvad (keine Logs, anonym zahlbar)</li>',
            '<li>Deaktiviere Standortdienste standardmäßig und aktiviere sie nur bei Bedarf</li>',
            '<li>Wechsle zu Signal für private Kommunikation</li>',
            '<li>Stelle deinen Browser so ein, dass Cookies automatisch gelöscht werden</li>',
            '<li>Überprüfe deine Social-Media-Privatsphäre-Einstellungen</li>',
            '<li>Installiere einen Passwort-Manager wie Bitwarden</li>',
            '<li>Nutze eine starke PIN statt Biometrie - das schützt auch rechtlich</li>',
            '<li>Installiere eine App zum EXIF-Entfernen oder nutze Online-Tools vor dem Teilen</li>',
            '<li>Aktiviere 2FA mit einer Authenticator-App (z.B. Aegis) für alle wichtigen Konten</li>'
        ];
        return recommendations[questionIndex] || '';
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
