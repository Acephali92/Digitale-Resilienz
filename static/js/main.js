/**
 * WIDERSTANDS-TOOLKIT
 * Interactive Features & Effects
 * ================================
 * Cyberpunk resistance aesthetic with matrix effects.
 * Privacy-respecting, no tracking.
 */

(function() {
    'use strict';

    // ========================================
    // Matrix Rain Background Effect
    // ========================================

    class MatrixRain {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            this.fontSize = 14;
            this.columns = 0;
            this.drops = [];
            this.isRunning = false;

            this.init();
            this.bindEvents();
        }

        init() {
            this.resize();
            this.start();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.columns = Math.floor(this.canvas.width / this.fontSize);

            // Reset drops
            this.drops = [];
            for (let i = 0; i < this.columns; i++) {
                this.drops[i] = Math.random() * -100;
            }
        }

        draw() {
            // Semi-transparent black to create trail effect
            this.ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Green text
            this.ctx.fillStyle = '#00ff41';
            this.ctx.font = this.fontSize + 'px JetBrains Mono, monospace';

            for (let i = 0; i < this.drops.length; i++) {
                // Random character
                const char = this.characters[Math.floor(Math.random() * this.characters.length)];

                // Draw character
                const x = i * this.fontSize;
                const y = this.drops[i] * this.fontSize;

                // Vary opacity for depth
                this.ctx.globalAlpha = Math.random() * 0.3 + 0.1;
                this.ctx.fillText(char, x, y);

                // Reset drop when it reaches bottom
                if (y > this.canvas.height && Math.random() > 0.98) {
                    this.drops[i] = 0;
                }

                this.drops[i]++;
            }

            this.ctx.globalAlpha = 1;
        }

        start() {
            if (this.isRunning) return;
            this.isRunning = true;
            this.animate();
        }

        stop() {
            this.isRunning = false;
        }

        animate() {
            if (!this.isRunning) return;
            this.draw();
            requestAnimationFrame(() => this.animate());
        }

        bindEvents() {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => this.resize(), 200);
            });

            // Reduce animation when not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.stop();
                } else {
                    this.start();
                }
            });
        }
    }

    // Initialize matrix rain if canvas exists
    const matrixCanvas = document.getElementById('matrix-bg');
    if (matrixCanvas) {
        // Add styles for the canvas
        matrixCanvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -10;
            opacity: 0.15;
            pointer-events: none;
        `;
        new MatrixRain(matrixCanvas);
    }

    // ========================================
    // Mobile Navigation
    // ========================================

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('is-open');
            this.setAttribute('aria-expanded', isOpen);
            this.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
    }

    // ========================================
    // Scroll Animations
    // ========================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.card, .feature-card, .alert').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        animateOnScroll.observe(el);
    });

    // ========================================
    // Typing Effect for Terminal Prompts
    // ========================================

    class TypeWriter {
        constructor(element, text, speed = 50) {
            this.element = element;
            this.text = text;
            this.speed = speed;
            this.index = 0;
        }

        type() {
            if (this.index < this.text.length) {
                this.element.textContent += this.text.charAt(this.index);
                this.index++;
                setTimeout(() => this.type(), this.speed);
            }
        }

        start() {
            this.element.textContent = '';
            this.type();
        }
    }

    // Initialize typing effects
    document.querySelectorAll('[data-typing]').forEach(el => {
        const text = el.getAttribute('data-typing');
        const typewriter = new TypeWriter(el, text);

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typewriter.start();
                observer.disconnect();
            }
        });

        observer.observe(el);
    });

    // ========================================
    // Glitch Effect on Hover
    // ========================================

    document.querySelectorAll('.hero-title').forEach(title => {
        title.setAttribute('data-text', title.textContent);
    });

    // ========================================
    // Copy to Clipboard
    // ========================================

    window.WiderstandsToolkit = window.WiderstandsToolkit || {};

    WiderstandsToolkit.copyToClipboard = function(text, button) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(button, true);
            }).catch(() => {
                fallbackCopy(text, button);
            });
        } else {
            fallbackCopy(text, button);
        }
    };

    function showCopyFeedback(button, success) {
        const originalText = button.textContent;
        const originalClass = button.className;

        button.textContent = success ? '✓ Kopiert!' : '✗ Fehler';
        button.classList.add(success ? 'btn-success' : 'btn-danger');

        setTimeout(() => {
            button.textContent = originalText;
            button.className = originalClass;
        }, 2000);
    }

    function fallbackCopy(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showCopyFeedback(button, true);
        } catch (err) {
            showCopyFeedback(button, false);
        }

        document.body.removeChild(textarea);
    }

    // ========================================
    // Local Storage (Privacy-Respecting)
    // ========================================

    WiderstandsToolkit.storage = {
        prefix: 'wt_',

        set(key, value) {
            try {
                localStorage.setItem(this.prefix + key, JSON.stringify(value));
            } catch (e) {
                // Storage unavailable (private browsing, quota exceeded, etc.)
                console.warn('WiderstandsToolkit: localStorage.set failed for key "' + key + '":', e);
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(this.prefix + key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(this.prefix + key);
            } catch (e) {
                console.warn('WiderstandsToolkit: localStorage.remove failed for key "' + key + '":', e);
            }
        },

        clear() {
            try {
                Object.keys(localStorage)
                    .filter(key => key.startsWith(this.prefix))
                    .forEach(key => localStorage.removeItem(key));
            } catch (e) {
                console.warn('WiderstandsToolkit: localStorage.clear failed:', e);
            }
        }
    };

    // ========================================
    // Smooth Scroll
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.focus({ preventScroll: true });
            }
        });
    });

    // ========================================
    // Print Function
    // ========================================

    WiderstandsToolkit.print = function() {
        window.print();
    };

    // ========================================
    // Keyboard Shortcuts
    // ========================================

    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + P to print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            // Default browser print
        }

        // Escape to close modals/menus
        if (e.key === 'Escape') {
            // Close any open menus
            document.querySelectorAll('.is-open').forEach(el => {
                el.classList.remove('is-open');
            });
        }
    });

    // ========================================
    // Console Easter Egg
    // ========================================

    console.log('%c' + `
    ██╗    ██╗██╗██████╗ ███████╗██████╗ ███████╗████████╗ █████╗ ███╗   ██╗██████╗
    ██║    ██║██║██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔══██╗████╗  ██║██╔══██╗
    ██║ █╗ ██║██║██║  ██║█████╗  ██████╔╝███████╗   ██║   ███████║██╔██╗ ██║██║  ██║
    ██║███╗██║██║██║  ██║██╔══╝  ██╔══██╗╚════██║   ██║   ██╔══██║██║╚██╗██║██║  ██║
    ╚███╔███╔╝██║██████╔╝███████╗██║  ██║███████║   ██║   ██║  ██║██║ ╚████║██████╔╝
     ╚══╝╚══╝ ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝
    `, 'color: #00ff41; font-family: monospace; font-size: 10px;');

    console.log('%c🔒 Keine Tracker. Keine Überwachung. Deine Daten bleiben bei dir.', 'color: #888; font-size: 12px;');
    console.log('%c⚡ Quellcode: https://github.com/Acephali92/Digitale-Resilienz', 'color: #00d4ff; font-size: 11px;');

    // ========================================
    // Service Worker Registration
    // ========================================

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration) {
                    console.log('%c✓ Service Worker registriert - Offline-Modus verfügbar', 'color: #00ff41; font-size: 11px;');

                    // Check for updates
                    registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                console.log('%c↻ Neue Version verfügbar - Seite neu laden für Update', 'color: #ffaa00; font-size: 11px;');
                            }
                        });
                    });
                })
                .catch(function(error) {
                    console.log('%c✗ Service Worker Registrierung fehlgeschlagen:', 'color: #ff0040; font-size: 11px;', error);
                });

            // Show visible banner when service worker signals a new version
            navigator.serviceWorker.addEventListener('message', function(event) {
                if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                    var banner = document.createElement('div');
                    banner.className = 'sw-update-banner';
                    banner.innerHTML = '&#8635; Neue Version verfügbar. <button id="sw-reload-btn">Neu laden</button>';
                    document.body.appendChild(banner);
                    document.getElementById('sw-reload-btn').addEventListener('click', function() {
                        window.location.reload();
                    });
                }
            });
        });
    }

})();
