/**
 * Widerstands-Toolkit Service Worker
 * ===================================
 * Offline-Funktionalität für digitale Selbstverteidigung.
 * Weil Widerstand auch ohne Internet funktionieren muss.
 */

'use strict';

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `widerstands-toolkit-${CACHE_VERSION}`;

// Critical resources that must be cached for offline use
const PRECACHE_URLS = [
    '/',
    '/privacy',
    '/security',
    '/resilience',
    '/activism',
    '/conspiracy',
    '/peace',
    '/tools',
    '/tools/passphrase',
    '/tools/downloads',
    '/static/css/style.css',
    '/static/js/main.js',
    '/static/js/passphrase.js',
    '/static/fonts/JetBrainsMono-Regular.woff2',
    '/static/fonts/Orbitron-Regular.woff2',
    '/static/img/logo.svg'
];

// Install event - precache critical resources
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Precaching critical resources');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                // Activate immediately without waiting
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Precache failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('widerstands-toolkit-') && name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[ServiceWorker] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                // Take control of all pages immediately
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached response and update cache in background
                    event.waitUntil(updateCache(request));
                    return cachedResponse;
                }

                // Not in cache - fetch from network
                return fetchAndCache(request);
            })
            .catch((error) => {
                console.error('[ServiceWorker] Fetch failed:', error);
                // Return offline fallback for HTML pages
                if (request.headers.get('Accept').includes('text/html')) {
                    return caches.match('/');
                }
                throw error;
            })
    );
});

// Fetch from network and cache the response
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);

        // Only cache successful responses
        if (response.ok) {
            const responseClone = response.clone();
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, responseClone);
        }

        return response;
    } catch (error) {
        console.error('[ServiceWorker] Network fetch failed:', error);
        throw error;
    }
}

// Update cache in background (stale-while-revalidate)
async function updateCache(request) {
    try {
        const response = await fetch(request);

        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response);
            console.log('[ServiceWorker] Cache updated:', request.url);
        }
    } catch (error) {
        // Network failed, but we already served from cache
        console.log('[ServiceWorker] Background update failed (offline?):', request.url);
    }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('[ServiceWorker] Cache cleared');
        });
    }
});

console.log('[ServiceWorker] Loaded - Widerstand ist auch offline fruchtbar.');
