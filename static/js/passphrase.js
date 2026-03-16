/**
 * Widerstands-Toolkit - Passphrase Generator
 * ===========================================
 * Kryptographisch sicher, vollständig clientseitig.
 */

(function() {
    'use strict';

    // German word list (EFF-inspired, common German words)
    const wordList = [
        'apfel', 'baum', 'wolke', 'haus', 'stern', 'fluss', 'berg', 'wald',
        'sonne', 'mond', 'blume', 'vogel', 'pferd', 'hund', 'katze', 'fisch',
        'brot', 'wasser', 'feuer', 'erde', 'wind', 'regen', 'schnee', 'himmel',
        'tisch', 'stuhl', 'lampe', 'buch', 'stift', 'papier', 'fenster', 'tuer',
        'strasse', 'bruecke', 'schiff', 'auto', 'rad', 'zug', 'flugzeug', 'boot',
        'garten', 'wiese', 'feld', 'see', 'meer', 'insel', 'kueste', 'strand',
        'morgen', 'abend', 'nacht', 'tag', 'woche', 'monat', 'jahr', 'zeit',
        'freund', 'kind', 'mutter', 'vater', 'schwester', 'bruder', 'oma', 'opa',
        'musik', 'tanz', 'lied', 'kunst', 'bild', 'farbe', 'form', 'licht',
        'kraft', 'mut', 'liebe', 'freude', 'hoffnung', 'traum', 'glueck', 'friede',
        'arbeit', 'spiel', 'sport', 'reise', 'wandern', 'laufen', 'schwimmen', 'fliegen',
        'kaffee', 'tee', 'milch', 'saft', 'kuchen', 'eis', 'salat', 'suppe',
        'mantel', 'schuh', 'hut', 'hemd', 'kleid', 'jacke', 'tasche', 'brille',
        'uhr', 'ring', 'kette', 'perle', 'gold', 'silber', 'stein', 'kristall',
        'tiger', 'loewe', 'baer', 'wolf', 'fuchs', 'hase', 'reh', 'eule',
        'rose', 'tulpe', 'lilie', 'nelke', 'veilchen', 'kaktus', 'efeu', 'moos',
        'buche', 'eiche', 'tanne', 'kiefer', 'birke', 'linde', 'ahorn', 'weide',
        'kerze', 'flamme', 'glut', 'asche', 'rauch', 'dampf', 'nebel', 'dunst',
        'gruen', 'blau', 'rot', 'gelb', 'weiss', 'schwarz', 'grau', 'braun',
        'klein', 'gross', 'lang', 'kurz', 'dick', 'duenn', 'alt', 'neu',
        'leise', 'laut', 'schnell', 'langsam', 'warm', 'kalt', 'hell', 'dunkel',
        'oben', 'unten', 'links', 'rechts', 'vorne', 'hinten', 'innen', 'aussen',
        'herz', 'kopf', 'hand', 'fuss', 'auge', 'ohr', 'nase', 'mund',
        'schloss', 'turm', 'mauer', 'tor', 'treppe', 'dach', 'keller', 'boden',
        'hammer', 'nagel', 'saege', 'zange', 'schraube', 'draht', 'kabel', 'rohr',
        'welle', 'sturm', 'blitz', 'donner', 'hagel', 'frost', 'tau', 'reif',
        'frieden', 'freiheit', 'wahrheit', 'recht', 'pflicht', 'ehre', 'treue', 'stolz',
        'denken', 'fuehlen', 'hoeren', 'sehen', 'riechen', 'schmecken', 'tasten', 'ahnen',
        'fragen', 'antwort', 'raetsel', 'loesung', 'problem', 'idee', 'plan', 'ziel',
        'anfang', 'ende', 'mitte', 'rand', 'grenze', 'weg', 'pfad', 'spur'
    ];

    // Cryptographically secure random number
    function secureRandom(max) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] % max;
    }

    // Generate passphrase
    window.generatePassphrase = function() {
        const wordCount = parseInt(document.getElementById('word-count').value);
        const separator = document.getElementById('separator').value;
        const addNumber = document.getElementById('add-number').checked;
        const capitalize = document.getElementById('capitalize').checked;

        let words = [];
        const usedIndices = new Set();

        // Select random words without repetition
        while (words.length < wordCount) {
            const index = secureRandom(wordList.length);
            if (!usedIndices.has(index)) {
                usedIndices.add(index);
                let word = wordList[index];
                if (capitalize) {
                    word = word.charAt(0).toUpperCase() + word.slice(1);
                }
                words.push(word);
            }
        }

        let passphrase = words.join(separator);

        // Add number if requested
        if (addNumber) {
            const num = secureRandom(100);
            passphrase += separator + num;
        }

        // Display result
        document.getElementById('passphrase-output').value = passphrase;
        document.getElementById('generated-passphrase').classList.remove('hidden');

        // Calculate entropy
        const entropy = calculateEntropy(passphrase, wordCount, addNumber);
        document.getElementById('entropy-info').innerHTML =
            '&#128274; Entropie: ~' + entropy + ' Bits ' +
            '(' + getEntropyLabel(entropy) + ')';
    };

    function calculateEntropy(passphrase, wordCount, hasNumber) {
        // Each word from a 256-word list ≈ 8 bits
        // Plus number adds ~6.6 bits (0-99)
        let bits = wordCount * Math.log2(wordList.length);
        if (hasNumber) bits += Math.log2(100);
        return Math.round(bits);
    }

    function getEntropyLabel(bits) {
        if (bits < 40) return 'schwach';
        if (bits < 60) return 'akzeptabel';
        if (bits < 80) return 'stark';
        return 'sehr stark';
    }

    // Copy to clipboard
    window.copyPassphrase = function() {
        const output = document.getElementById('passphrase-output');
        output.select();

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(output.value).then(function() {
                showCopyFeedback(true);
            }).catch(function() {
                showCopyFeedback(false);
            });
        } else {
            try {
                document.execCommand('copy');
                showCopyFeedback(true);
            } catch (err) {
                showCopyFeedback(false);
            }
        }
    };

    function showCopyFeedback(success) {
        const btn = document.querySelector('#generated-passphrase .btn-secondary');
        const originalText = btn.textContent;
        btn.textContent = success ? '✓ Kopiert!' : '✗ Fehler';
        setTimeout(function() {
            btn.textContent = originalText;
        }, 2000);
    }

    // Test passphrase strength
    window.testPassphrase = function() {
        const passphrase = document.getElementById('test-passphrase').value;
        const resultDiv = document.getElementById('strength-result');

        if (passphrase.length === 0) {
            resultDiv.classList.add('hidden');
            return;
        }

        resultDiv.classList.remove('hidden');

        const strength = analyzeStrength(passphrase);
        const bar = document.getElementById('strength-bar');
        const label = document.getElementById('strength-label');
        const tips = document.getElementById('strength-tips');

        // Reset classes
        bar.className = 'strength-bar';

        if (strength.score < 25) {
            bar.classList.add('strength-weak');
            label.innerHTML = '&#128308; <strong>Schwach</strong> - Leicht zu knacken';
        } else if (strength.score < 50) {
            bar.classList.add('strength-fair');
            label.innerHTML = '&#128992; <strong>Akzeptabel</strong> - Könnte besser sein';
        } else if (strength.score < 75) {
            bar.classList.add('strength-good');
            label.innerHTML = '&#128994; <strong>Gut</strong> - Schwer zu erraten';
        } else {
            bar.classList.add('strength-strong');
            label.innerHTML = '&#128154; <strong>Stark</strong> - Ausgezeichnet!';
        }

        // Show tips
        if (strength.tips.length > 0) {
            tips.innerHTML = '<li>' + strength.tips.join('</li><li>') + '</li>';
        } else {
            tips.innerHTML = '<li>Sehr gute Passphrase!</li>';
        }
    };

    function analyzeStrength(passphrase) {
        let score = 0;
        const tips = [];

        // Length
        if (passphrase.length >= 20) {
            score += 30;
        } else if (passphrase.length >= 15) {
            score += 20;
        } else if (passphrase.length >= 10) {
            score += 10;
        } else {
            tips.push('Mindestens 15 Zeichen empfohlen');
        }

        // Word count (spaces or separators)
        const words = passphrase.split(/[\s\-_\.]+/);
        if (words.length >= 5) {
            score += 30;
        } else if (words.length >= 4) {
            score += 20;
        } else if (words.length >= 3) {
            score += 10;
        } else {
            tips.push('Mehr Wörter machen die Passphrase stärker');
        }

        // Character variety
        const hasLower = /[a-z]/.test(passphrase);
        const hasUpper = /[A-Z]/.test(passphrase);
        const hasNumber = /[0-9]/.test(passphrase);
        const hasSpecial = /[^a-zA-Z0-9\s]/.test(passphrase);

        let variety = 0;
        if (hasLower) variety++;
        if (hasUpper) variety++;
        if (hasNumber) variety++;
        if (hasSpecial) variety++;

        score += variety * 10;

        if (!hasNumber && !hasSpecial) {
            tips.push('Eine Zahl oder Sonderzeichen könnte helfen');
        }

        // Common patterns to avoid
        const commonPatterns = [
            /^123/, /123$/, /password/i, /passwort/i, /qwerty/i,
            /^admin/i, /letmein/i, /welcome/i, /monkey/i
        ];

        for (const pattern of commonPatterns) {
            if (pattern.test(passphrase)) {
                score -= 20;
                tips.push('Vermeide häufige Muster wie "123" oder "password"');
                break;
            }
        }

        // Repetition penalty
        if (/(.)\1{2,}/.test(passphrase)) {
            score -= 10;
            tips.push('Vermeide wiederholte Zeichen');
        }

        return {
            score: Math.max(0, Math.min(100, score)),
            tips: tips
        };
    }

    // Toggle password visibility
    window.toggleVisibility = function() {
        const input = document.getElementById('test-passphrase');
        input.type = input.type === 'password' ? 'text' : 'password';
    };

})();
