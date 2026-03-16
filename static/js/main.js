/**
 * Widerstands-Toolkit - Main JavaScript
 * =====================================
 * Minimal, privacy-respecting JavaScript.
 * Core functionality works WITHOUT JavaScript (Tor-compatible).
 */

(function() {
    'use strict';

    // ========================================
    // Mobile Navigation Toggle
    // ========================================

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');

            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // ========================================
    // Form Validation Helper
    // ========================================

    window.WiderstandsToolkit = window.WiderstandsToolkit || {};

    WiderstandsToolkit.validateForm = function(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return isValid;
    };

    // ========================================
    // Copy to Clipboard Helper
    // ========================================

    WiderstandsToolkit.copyToClipboard = function(text, button) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                const originalText = button.textContent;
                button.textContent = 'Kopiert!';
                button.classList.add('btn-success');

                setTimeout(function() {
                    button.textContent = originalText;
                    button.classList.remove('btn-success');
                }, 2000);
            }).catch(function(err) {
                console.error('Kopieren fehlgeschlagen:', err);
                WiderstandsToolkit.fallbackCopy(text);
            });
        } else {
            WiderstandsToolkit.fallbackCopy(text);
        }
    };

    WiderstandsToolkit.fallbackCopy = function(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            alert('Text wurde kopiert!');
        } catch (err) {
            alert('Kopieren fehlgeschlagen. Bitte manuell kopieren: ' + text);
        }

        document.body.removeChild(textArea);
    };

    // ========================================
    // Local Storage Helper (Privacy-Respecting)
    // ========================================

    WiderstandsToolkit.storage = {
        // Only store non-sensitive preferences locally
        set: function(key, value) {
            try {
                localStorage.setItem('wt_' + key, JSON.stringify(value));
            } catch (e) {
                // localStorage not available (private mode, etc.)
                console.warn('localStorage nicht verfügbar');
            }
        },

        get: function(key, defaultValue) {
            try {
                const item = localStorage.getItem('wt_' + key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        },

        remove: function(key) {
            try {
                localStorage.removeItem('wt_' + key);
            } catch (e) {
                // Ignore
            }
        },

        clear: function() {
            try {
                // Only clear our own keys
                Object.keys(localStorage).forEach(function(key) {
                    if (key.startsWith('wt_')) {
                        localStorage.removeItem(key);
                    }
                });
            } catch (e) {
                // Ignore
            }
        }
    };

    // ========================================
    // Print Helper
    // ========================================

    WiderstandsToolkit.printPage = function() {
        window.print();
    };

    // ========================================
    // Initialization
    // ========================================

    console.log('%c🔒 Widerstands-Toolkit geladen', 'color: #00ff41; font-size: 14px; font-weight: bold;');
    console.log('%cKeine Tracker. Keine Überwachung. Deine Daten bleiben bei dir.', 'color: #a8a8a8;');

})();
