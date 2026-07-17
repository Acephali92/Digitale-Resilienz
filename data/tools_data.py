# -*- coding: utf-8 -*-
"""
Tools-Datenbank fuer Digitale Resilienz
========================================
Synthese aus:
- Privacy Guides (https://privacyguides.org)
- Prism Break (https://prism-break.org)
- Privacy Handbuch (https://privacy-handbuch.de)

Stand: 15. Mai 2026

Diese Daten werden serverseitig gerendert (Jinja2).
Funktioniert vollstaendig ohne JavaScript.
"""

# =============================================================================
# KATEGORIEN - Hierarchisch nach Benutzer-Beduerfnissen
# =============================================================================

CATEGORY_GROUPS = [
    {"id": "browsing", "name": "Web & Suche", "icon": "globe"},
    {"id": "kommunikation", "name": "Kommunikation", "icon": "message-circle"},
    {"id": "authentifizierung", "name": "Authentifizierung", "icon": "key"},
    {"id": "datenschutz", "name": "Daten & Speicher", "icon": "lock"},
    {"id": "netzwerk", "name": "Netzwerk & Anonymitaet", "icon": "wifi"},
    {"id": "system", "name": "System & Plattformen", "icon": "monitor"},
    {"id": "selbsthosting", "name": "Selbsthosting & Offline", "icon": "server"},
]

CATEGORIES = [
    # === INTERNET ===
    {
        "id": "browser-desktop",
        "name": "Browser (Desktop)",
        "group": "browsing",
        "icon": "globe",
        "description": "Privacy-fokussierte Webbrowser fuer Desktop"
    },
    {
        "id": "browser-mobil",
        "name": "Browser (Mobil)",
        "group": "browsing",
        "icon": "smartphone",
        "description": "Private Browser fuer Android und iOS"
    },
    {
        "id": "browser-erweiterungen",
        "name": "Browser-Erweiterungen",
        "group": "browsing",
        "icon": "puzzle",
        "description": "Essentielle Add-ons fuer Datenschutz"
    },
    {
        "id": "suchmaschinen",
        "name": "Suchmaschinen",
        "group": "browsing",
        "icon": "search",
        "description": "Tracking-freie Suchdienste"
    },
    {
        "id": "frontends",
        "name": "Alternative Frontends",
        "group": "browsing",
        "icon": "layout",
        "description": "Privacy-Frontends fuer YouTube, Reddit, etc."
    },

    # === KOMMUNIKATION ===
    {
        "id": "messenger",
        "name": "Messenger",
        "group": "kommunikation",
        "icon": "message-circle",
        "description": "Verschluesselte Nachrichtendienste"
    },
    {
        "id": "email-anbieter",
        "name": "E-Mail-Anbieter",
        "group": "kommunikation",
        "icon": "mail",
        "description": "Sichere E-Mail-Dienste"
    },
    {
        "id": "email-clients",
        "name": "E-Mail-Clients",
        "group": "kommunikation",
        "icon": "inbox",
        "description": "Lokale E-Mail-Programme"
    },
    {
        "id": "email-aliase",
        "name": "E-Mail-Aliase",
        "group": "kommunikation",
        "icon": "at-sign",
        "description": "E-Mail-Weiterleitungsdienste"
    },
    {
        "id": "video-voice",
        "name": "Video & Sprache",
        "group": "kommunikation",
        "icon": "video",
        "description": "Verschluesselte Video-/Sprachanrufe"
    },
    {
        "id": "soziale-netzwerke",
        "name": "Soziale Netzwerke",
        "group": "kommunikation",
        "icon": "users",
        "description": "Dezentrale und private Plattformen"
    },

    # === SICHERHEIT ===
    {
        "id": "passwort-manager",
        "name": "Passwort-Manager",
        "group": "authentifizierung",
        "icon": "key",
        "description": "Sichere Passwortverwaltung"
    },
    {
        "id": "2fa",
        "name": "Zwei-Faktor-Auth",
        "group": "authentifizierung",
        "icon": "shield-check",
        "description": "TOTP-Apps und Hardware-Keys"
    },
    {
        "id": "security-keys",
        "name": "Hardware Security Keys",
        "group": "authentifizierung",
        "icon": "usb",
        "description": "Physische Sicherheitsschluessel"
    },

    # === DATEN SCHUETZEN ===
    {
        "id": "verschluesselung",
        "name": "Verschluesselung",
        "group": "datenschutz",
        "icon": "lock",
        "description": "Datei- und Festplattenverschluesselung"
    },
    {
        "id": "cloud-storage",
        "name": "Cloud-Speicher",
        "group": "datenschutz",
        "icon": "cloud",
        "description": "Verschluesselte Cloud-Dienste"
    },
    {
        "id": "file-sync",
        "name": "Datei-Sync",
        "group": "datenschutz",
        "icon": "refresh-cw",
        "description": "Dezentrale Synchronisation"
    },
    {
        "id": "file-sharing",
        "name": "Datei-Sharing",
        "group": "datenschutz",
        "icon": "share-2",
        "description": "Sichere Dateiuebertragung"
    },
    {
        "id": "backup",
        "name": "Backup",
        "group": "datenschutz",
        "icon": "database",
        "description": "Verschluesselte Datensicherung"
    },
    {
        "id": "metadaten",
        "name": "Metadaten-Entfernung",
        "group": "datenschutz",
        "icon": "trash-2",
        "description": "EXIF und Metadaten loeschen"
    },
    {
        "id": "foto-verwaltung",
        "name": "Foto-Verwaltung",
        "group": "datenschutz",
        "icon": "image",
        "description": "Private Foto-Speicherung"
    },

    # === NETZWERK ===
    {
        "id": "vpn",
        "name": "VPN",
        "group": "netzwerk",
        "icon": "shield",
        "description": "Vertrauenswuerdige VPN-Anbieter"
    },
    {
        "id": "tor-netzwerk",
        "name": "Tor & Anonymisierung",
        "group": "netzwerk",
        "icon": "eye-off",
        "description": "Anonymisierungsnetzwerke"
    },
    {
        "id": "dns",
        "name": "DNS",
        "group": "netzwerk",
        "icon": "server",
        "description": "Verschluesselte DNS-Dienste"
    },

    # === BETRIEBSSYSTEME ===
    {
        "id": "desktop-os",
        "name": "Desktop Linux",
        "group": "system",
        "icon": "monitor",
        "description": "Sichere Desktop-Betriebssysteme"
    },
    {
        "id": "mobile-os",
        "name": "Mobile Systeme",
        "group": "system",
        "icon": "smartphone",
        "description": "Privacy-Android und iOS"
    },
    {
        "id": "live-os",
        "name": "Live-Systeme",
        "group": "system",
        "icon": "disc",
        "description": "Bootfaehige USB-Systeme"
    },
    {
        "id": "router-firmware",
        "name": "Router-Firmware",
        "group": "system",
        "icon": "wifi",
        "description": "Freie Router-Betriebssysteme"
    },
    {
        "id": "android-apps",
        "name": "Android-Apps & Stores",
        "group": "system",
        "icon": "download",
        "description": "App-Quellen ohne Google"
    },

    # === SELBSTHOSTING & UNABHAENGIGKEIT ===
    {
        "id": "selbsthosting",
        "name": "Selbsthosting",
        "group": "selbsthosting",
        "icon": "server",
        "description": "Eigene Server und Dienste"
    },
    {
        "id": "produktivitaet",
        "name": "Produktivitaet",
        "group": "selbsthosting",
        "icon": "edit",
        "description": "Notizen, Office, Kalender"
    },
    {
        "id": "offline-tools",
        "name": "Offline-Tools",
        "group": "selbsthosting",
        "icon": "wifi-off",
        "description": "Funktionieren ohne Internet"
    },
    {
        "id": "finanzen",
        "name": "Finanzen",
        "group": "selbsthosting",
        "icon": "dollar-sign",
        "description": "Privater Zahlungsverkehr"
    },
    {
        "id": "karten-navigation",
        "name": "Karten & Navigation",
        "group": "selbsthosting",
        "icon": "map",
        "description": "Offline-Karten ohne Google"
    },
]

# =============================================================================
# TAG-DEFINITIONEN
# =============================================================================

TAGS = {
    # === LIZENZ (Pflicht - jedes Tool bekommt EINEN) ===
    "foss": {
        "label": "FOSS",
        "title": "Free/Open Source Software - Quellcode offen",
        "color": "green",
        "category": "lizenz"
    },
    "source-available": {
        "label": "Source Available",
        "title": "Quellcode einsehbar, eingeschraenkte Lizenz",
        "color": "lime",
        "category": "lizenz"
    },
    "proprietary": {
        "label": "Proprietaer",
        "title": "Geschlossener Quellcode",
        "color": "gray",
        "category": "lizenz"
    },

    # === KOSTEN (Pflicht - jedes Tool bekommt EINEN) ===
    "kostenlos": {
        "label": "Kostenlos",
        "title": "Vollstaendig kostenlos nutzbar",
        "color": "emerald",
        "category": "kosten"
    },
    "freemium": {
        "label": "Freemium",
        "title": "Basis kostenlos, Premium kostenpflichtig",
        "color": "yellow",
        "category": "kosten"
    },
    "kostenpflichtig": {
        "label": "Bezahlt",
        "title": "Nur gegen Bezahlung",
        "color": "orange",
        "category": "kosten"
    },

    # === SCHWIERIGKEIT (Pflicht - jedes Tool bekommt EINEN) ===
    "einsteiger": {
        "label": "Einsteiger",
        "title": "Einfache Installation, intuitive Bedienung",
        "color": "sky",
        "category": "schwierigkeit"
    },
    "mittel": {
        "label": "Mittel",
        "title": "Grundkenntnisse erforderlich",
        "color": "blue",
        "category": "schwierigkeit"
    },
    "fortgeschritten": {
        "label": "Fortgeschritten",
        "title": "Technisches Wissen noetig",
        "color": "violet",
        "category": "schwierigkeit"
    },

    # === FUNKTIONEN (Optional - mehrere moeglich) ===
    "offline": {
        "label": "Offline",
        "title": "Funktioniert ohne Internet",
        "color": "amber",
        "category": "funktion"
    },
    "dezentral": {
        "label": "Dezentral",
        "title": "Kein zentraler Server, P2P oder foederiert",
        "color": "teal",
        "category": "funktion"
    },
    "selbsthosting": {
        "label": "Selbst-hostbar",
        "title": "Kann auf eigenem Server betrieben werden",
        "color": "indigo",
        "category": "funktion"
    },
    "audit": {
        "label": "Auditiert",
        "title": "Unabhaengige Sicherheitspruefung durchgefuehrt",
        "color": "cyan",
        "category": "funktion"
    },
    "e2ee": {
        "label": "E2EE",
        "title": "Ende-zu-Ende-Verschluesselung",
        "color": "rose",
        "category": "funktion"
    },

    # === QUELLEN (Optional - fuer Referenz) ===
    "privacy-guides": {
        "label": "Privacy Guides",
        "title": "Auf privacyguides.org empfohlen",
        "color": "blue",
        "category": "quelle"
    },
    "prism-break": {
        "label": "Prism Break",
        "title": "Auf prism-break.org gelistet",
        "color": "purple",
        "category": "quelle"
    },
}

# Tag-Kategorien fuer Filter-Gruppierung
TAG_CATEGORIES = {
    "lizenz": {"name": "Lizenz", "order": 1},
    "kosten": {"name": "Kosten", "order": 2},
    "schwierigkeit": {"name": "Level", "order": 3},
    "funktion": {"name": "Features", "order": 4},
    "quelle": {"name": "Quellen", "order": 5},
}

# =============================================================================
# TOOLS-DATENBANK - Vollstaendig aus allen Quellen
# =============================================================================

TOOLS = [
    # =========================================================================
    # BROWSER (DESKTOP)
    # =========================================================================
    {
        "id": "firefox",
        "name": "Firefox",
        "category": "browser-desktop",
        "slogan": "Der unabhaengige Browser",
        "description": "Open-Source-Browser von Mozilla. Mit Haertung (arkenfox user.js) sehr privat. Einzige echte Alternative zum Chromium-Monopol. Enhanced Tracking Protection standardmaessig.",
        "website": "https://www.mozilla.org/firefox/",
        "review_url": "https://www.privacyguides.org/en/desktop-browsers/",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Unabhaengig von Google, starke Community"
    },
    {
        "id": "tor-browser",
        "name": "Tor Browser",
        "category": "browser-desktop",
        "slogan": "Anonymitaet im Netz",
        "description": "Vorkonfigurierter Firefox mit Tor-Integration. Alle Verbindungen laufen durch das Tor-Netzwerk. Standard fuer anonymes Surfen.",
        "website": "https://www.torproject.org",
        "review_url": "https://www.privacyguides.org/en/tor/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "offline", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Funktioniert in zensierten Laendern"
    },
    {
        "id": "mullvad-browser",
        "name": "Mullvad Browser",
        "category": "browser-desktop",
        "slogan": "Tor Browser ohne Tor",
        "description": "Zusammenarbeit von Tor Project und Mullvad VPN. Starker Fingerprinting-Schutz des Tor Browsers, aber ohne Tor-Geschwindigkeitseinbussen. Ideal mit VPN.",
        "website": "https://mullvad.net/browser",
        "review_url": "https://www.privacyguides.org/en/desktop-browsers/",
        "tags": ["foss", "kostenlos", "mittel", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Beste Kombination aus Geschwindigkeit und Privacy"
    },
    {
        "id": "brave-desktop",
        "name": "Brave",
        "category": "browser-desktop",
        "slogan": "Privacy by Default",
        "description": "Chromium-basiert mit eingebautem Werbeblocker, Tracking-Schutz und Shields. Kontroverses Crypto-Feature (BAT) komplett abschaltbar.",
        "website": "https://brave.com",
        "review_url": "https://www.privacyguides.org/en/desktop-browsers/",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Funktioniert out-of-the-box ohne Konfiguration"
    },
    {
        "id": "librewolf",
        "name": "LibreWolf",
        "category": "browser-desktop",
        "slogan": "Gehaerteter Firefox",
        "description": "Firefox-Fork mit Privacy-Haertung ab Werk. Telemetrie entfernt, uBlock Origin vorinstalliert, strenge Einstellungen.",
        "website": "https://librewolf.net",
        "review_url": None,
        "tags": ["foss", "kostenlos", "fortgeschritten", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Keine Mozilla-Telemetrie"
    },

    # =========================================================================
    # BROWSER (MOBIL)
    # =========================================================================
    {
        "id": "tor-browser-android",
        "name": "Tor Browser (Android)",
        "category": "browser-mobil",
        "slogan": "Tor auf dem Handy",
        "description": "Offizieller Tor Browser fuer Android. Gleiche Anonymitaet wie auf dem Desktop.",
        "website": "https://www.torproject.org",
        "review_url": "https://www.privacyguides.org/en/tor/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides", "prism-break"],
        "platforms": ["Android"],
        "resilience": "Mobile Anonymitaet"
    },
    {
        "id": "brave-mobil",
        "name": "Brave (Mobil)",
        "category": "browser-mobil",
        "slogan": "Privacy-Browser fuer Smartphones",
        "description": "Mobiler Brave mit Shields, Werbeblocker und Fingerprinting-Schutz. Auch auf iOS verfuegbar.",
        "website": "https://brave.com",
        "review_url": "https://www.privacyguides.org/en/mobile-browsers/",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides"],
        "platforms": ["Android", "iOS"],
        "resilience": "Cross-Platform-Sync moeglich"
    },
    {
        "id": "cromite",
        "name": "Cromite",
        "category": "browser-mobil",
        "slogan": "Chromium mit Privacy",
        "description": "Chromium-Fork fuer Android mit eingebautem Ad-Blocking und Fingerprinting-Schutz. Nachfolger von Bromite.",
        "website": "https://github.com/nicholasbraman/nicholasbraman.github.io/releases/tag/nicholasbraman.github.io",
        "review_url": "https://www.privacyguides.org/en/mobile-browsers/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "Chromium-Kompatibilitaet mit Privacy"
    },
    {
        "id": "firefox-android",
        "name": "Firefox (Android)",
        "category": "browser-mobil",
        "slogan": "Firefox fuer Android",
        "description": "Mobiler Firefox mit Add-on-Unterstuetzung (uBlock Origin etc.). Enhanced Tracking Protection.",
        "website": "https://www.mozilla.org/firefox/mobile/",
        "review_url": "https://www.privacyguides.org/en/mobile-browsers/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides", "prism-break"],
        "platforms": ["Android"],
        "resilience": "Erweiterungen auf Mobilgeraeten"
    },
    {
        "id": "fennec",
        "name": "Fennec F-Droid",
        "category": "browser-mobil",
        "slogan": "Firefox ohne proprietaere Bits",
        "description": "Firefox-Build aus F-Droid ohne proprietaere Komponenten. Fuer maximale FOSS-Reinheit.",
        "website": "https://f-droid.org/packages/org.mozilla.fennec_fdroid/",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "prism-break"],
        "platforms": ["Android"],
        "resilience": "100% Open Source"
    },
    {
        "id": "onion-browser",
        "name": "Onion Browser",
        "category": "browser-mobil",
        "slogan": "Tor fuer iOS",
        "description": "Tor-Browser fuer iPhone und iPad. Einzige offizielle Tor-Option auf iOS.",
        "website": "https://onionbrowser.com",
        "review_url": "https://www.privacyguides.org/en/tor/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["iOS"],
        "resilience": "Anonymitaet auf Apple-Geraeten"
    },
    {
        "id": "safari",
        "name": "Safari",
        "category": "browser-mobil",
        "slogan": "Apple's Browser",
        "description": "iOS-Standardbrowser mit Intelligent Tracking Prevention und Fingerprinting-Schutz. Private Relay fuer iCloud+.",
        "website": "https://www.apple.com/safari/",
        "review_url": "https://www.privacyguides.org/en/mobile-browsers/",
        "tags": ["proprietary", "kostenlos", "einsteiger", "privacy-guides"],
        "platforms": ["iOS", "macOS"],
        "resilience": "Beste Option fuer iOS ohne Jailbreak"
    },

    # =========================================================================
    # BROWSER-ERWEITERUNGEN
    # =========================================================================
    {
        "id": "ublock-origin",
        "name": "uBlock Origin",
        "category": "browser-erweiterungen",
        "slogan": "Der Goldstandard-Werbeblocker",
        "description": "Effizienter Werbeblocker mit geringem Ressourcenverbrauch. Blockiert Werbung, Tracker und Malware. Essentiell fuer jeden Browser.",
        "website": "https://ublockorigin.com",
        "review_url": "https://www.privacyguides.org/en/browser-extensions/",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides", "prism-break"],
        "platforms": ["Firefox", "Chrome", "Edge"],
        "resilience": "Schuetzt vor Malvertising und Tracking"
    },
    {
        "id": "ublock-origin-lite",
        "name": "uBlock Origin Lite",
        "category": "browser-erweiterungen",
        "slogan": "uBlock fuer Manifest V3",
        "description": "Manifest V3-kompatible Version von uBlock Origin. Weniger maechtig, aber zukunftssicher fuer Chrome.",
        "website": "https://github.com/nicholasbraman/nicholasbraman.github.io/releases/tag/nicholasbraman.github.io",
        "review_url": "https://www.privacyguides.org/en/browser-extensions/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Chrome", "Edge"],
        "resilience": "Funktioniert auch nach Manifest V3"
    },
    {
        "id": "noscript",
        "name": "NoScript",
        "category": "browser-erweiterungen",
        "slogan": "JavaScript-Kontrolle",
        "description": "Blockiert JavaScript, Java, Flash standardmaessig. Whitelist-basierte Freigabe pro Seite. Maximale Sicherheit.",
        "website": "https://noscript.net",
        "review_url": "https://www.privacyguides.org/en/browser-extensions/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "prism-break"],
        "platforms": ["Firefox"],
        "resilience": "Stoppt die meisten Browser-Exploits"
    },
    {
        "id": "multi-account-containers",
        "name": "Multi-Account Containers",
        "category": "browser-erweiterungen",
        "slogan": "Identitaetstrennung",
        "description": "Trennt Cookies und Speicher in isolierte Container. Social Media, Banking, Arbeit - alle separat.",
        "website": "https://addons.mozilla.org/firefox/addon/multi-account-containers/",
        "review_url": "https://www.privacyguides.org/en/browser-extensions/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Firefox"],
        "resilience": "Verhindert Cross-Site-Tracking"
    },
    {
        "id": "temporary-containers",
        "name": "Temporary Containers",
        "category": "browser-erweiterungen",
        "slogan": "Automatische Isolation",
        "description": "Oeffnet neue Tabs automatisch in temporaeren Containern. Cookies werden nach Schliessen geloescht.",
        "website": "https://addons.mozilla.org/firefox/addon/temporary-containers/",
        "review_url": None,
        "tags": ["foss", "kostenlos", "fortgeschritten", "prism-break"],
        "platforms": ["Firefox"],
        "resilience": "Automatische Tracking-Isolation"
    },
    {
        "id": "privacy-badger",
        "name": "Privacy Badger",
        "category": "browser-erweiterungen",
        "slogan": "Tracker-Lernen",
        "description": "Von der EFF. Lernt automatisch welche Domains tracken und blockiert sie. Ergaenzt uBlock Origin.",
        "website": "https://privacybadger.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "einsteiger", "prism-break"],
        "platforms": ["Firefox", "Chrome", "Edge"],
        "resilience": "Heuristische Tracker-Erkennung"
    },
    {
        "id": "decentraleyes",
        "name": "Decentraleyes",
        "category": "browser-erweiterungen",
        "slogan": "CDN-Emulation",
        "description": "Emuliert CDNs lokal. Verhindert Tracking durch Google CDN, cdnjs, etc. Schnelleres Laden.",
        "website": "https://decentraleyes.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "prism-break"],
        "platforms": ["Firefox", "Chrome"],
        "resilience": "Kein CDN-Tracking"
    },
    {
        "id": "adguard-ios",
        "name": "AdGuard (iOS)",
        "category": "browser-erweiterungen",
        "slogan": "Werbeblocker fuer Safari",
        "description": "Content-Blocker fuer Safari auf iOS. Blockiert Werbung und Tracker systemweit.",
        "website": "https://adguard.com",
        "review_url": "https://www.privacyguides.org/en/browser-extensions/",
        "tags": ["proprietary", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["iOS"],
        "resilience": "Safari-Privacy auf iOS"
    },

    # =========================================================================
    # SUCHMASCHINEN
    # =========================================================================
    {
        "id": "duckduckgo",
        "name": "DuckDuckGo",
        "category": "suchmaschinen",
        "slogan": "Die private Suchmaschine",
        "description": "Tracking-freie Suchmaschine mit guten Ergebnissen. Nutzt Bing im Hintergrund, speichert aber keine Suchanfragen.",
        "website": "https://duckduckgo.com",
        "review_url": "https://www.privacyguides.org/en/search-engines/",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides", "prism-break"],
        "platforms": ["Web"],
        "resilience": "Einfacher Umstieg, gute Ergebnisse"
    },
    {
        "id": "startpage",
        "name": "Startpage",
        "category": "suchmaschinen",
        "slogan": "Google ohne Google",
        "description": "Proxy fuer Google-Suche. Google-Qualitaet ohne dass Google dich sieht. Anonymous View fuer Ergebnisse.",
        "website": "https://www.startpage.com",
        "review_url": "https://www.privacyguides.org/en/search-engines/",
        "tags": ["proprietary", "kostenlos", "einsteiger", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "Beste Ergebnisse mit Privatsphaere"
    },
    {
        "id": "brave-search",
        "name": "Brave Search",
        "category": "suchmaschinen",
        "slogan": "Unabhaengiger Suchindex",
        "description": "Eigener Suchindex, nicht nur Bing-Proxy. Privacy-fokussiert, kein Tracking.",
        "website": "https://search.brave.com",
        "review_url": "https://www.privacyguides.org/en/search-engines/",
        "tags": ["proprietary", "kostenlos", "einsteiger", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "Eigener Index, keine Abhaengigkeit"
    },
    {
        "id": "searxng",
        "name": "SearXNG",
        "category": "suchmaschinen",
        "slogan": "Selbst-hostbare Metasuchmaschine",
        "description": "Open-Source-Metasuchmaschine. Aggregiert Ergebnisse von vielen Quellen. Viele oeffentliche Instanzen, oder selbst hosten.",
        "website": "https://docs.searxng.org",
        "review_url": "https://www.privacyguides.org/en/search-engines/",
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "selbsthosting", "privacy-guides", "prism-break"],
        "platforms": ["Web", "Selbsthosting"],
        "resilience": "Volle Kontrolle durch Selbsthosting"
    },

    # =========================================================================
    # ALTERNATIVE FRONTENDS
    # =========================================================================
    {
        "id": "freetube",
        "name": "FreeTube",
        "category": "frontends",
        "slogan": "YouTube ohne Google",
        "description": "Desktop-YouTube-Client ohne Google-Tracking. Lokale Abonnements, keine Anmeldung noetig.",
        "website": "https://freetubeapp.io",
        "review_url": "https://www.privacyguides.org/en/frontends/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "YouTube ohne Account"
    },
    {
        "id": "newpipe",
        "name": "NewPipe",
        "category": "frontends",
        "slogan": "YouTube fuer Android",
        "description": "Leichtgewichtiger YouTube-Client fuer Android. Hintergrundwiedergabe, Download, keine Werbung.",
        "website": "https://newpipe.net",
        "review_url": "https://www.privacyguides.org/en/frontends/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides", "prism-break"],
        "platforms": ["Android"],
        "resilience": "YouTube ohne Google-Dienste"
    },
    {
        "id": "libretube",
        "name": "LibreTube",
        "category": "frontends",
        "slogan": "Piped-Client fuer Android",
        "description": "Android-App die Piped als Backend nutzt. Sync zwischen Geraeten, keine lokale Verarbeitung.",
        "website": "https://libretube.dev",
        "review_url": "https://www.privacyguides.org/en/frontends/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "Kein Google-Konto noetig"
    },
    {
        "id": "invidious",
        "name": "Invidious",
        "category": "frontends",
        "slogan": "YouTube-Web-Frontend",
        "description": "Selbst-hostbares YouTube-Frontend. Viele oeffentliche Instanzen verfuegbar. RSS-Feeds, kein JavaScript noetig.",
        "website": "https://invidious.io",
        "review_url": "https://www.privacyguides.org/en/frontends/",
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "YouTube im Browser ohne Google"
    },
    {
        "id": "piped",
        "name": "Piped",
        "category": "frontends",
        "slogan": "Modernes YouTube-Frontend",
        "description": "Privacy-YouTube-Frontend mit modernem Design. Sponsorblock integriert, Account-Sync.",
        "website": "https://piped.video",
        "review_url": "https://www.privacyguides.org/en/frontends/",
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "YouTube ohne Tracking"
    },
    {
        "id": "redlib",
        "name": "Redlib",
        "category": "frontends",
        "slogan": "Reddit ohne Reddit",
        "description": "Privacy-Frontend fuer Reddit. Kein JavaScript noetig, keine Tracker.",
        "website": "https://github.com/redlib-org/redlib",
        "review_url": "https://www.privacyguides.org/en/frontends/",
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "Reddit lesen ohne Account"
    },
    {
        "id": "proxitok",
        "name": "ProxiTok",
        "category": "frontends",
        "slogan": "TikTok ohne TikTok",
        "description": "Privacy-Frontend fuer TikTok. Videos ansehen ohne App und Tracking.",
        "website": "https://github.com/pablouser1/ProxiTok",
        "review_url": "https://www.privacyguides.org/en/frontends/",
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "TikTok ohne China-Tracking"
    },

    # =========================================================================
    # MESSENGER
    # =========================================================================
    {
        "id": "signal",
        "name": "Signal",
        "category": "messenger",
        "slogan": "Der Goldstandard-Messenger",
        "description": "Ende-zu-Ende-verschluesselt mit dem Signal-Protokoll. Minimale Metadaten, keine Werbung. Von Sicherheitsexperten weltweit empfohlen.",
        "website": "https://signal.org",
        "review_url": "https://www.privacyguides.org/en/real-time-communication/",
        "tags": ["foss", "kostenlos", "einsteiger", "e2ee", "audit", "privacy-guides", "prism-break"],
        "platforms": ["Android", "iOS", "Windows", "macOS", "Linux"],
        "resilience": "Bewaehrtes Protokoll, minimale Metadaten"
    },
    {
        "id": "briar",
        "name": "Briar",
        "category": "messenger",
        "slogan": "Peer-to-Peer Messenger",
        "description": "Serverloser Messenger. Funktioniert ueber Tor, WiFi, Bluetooth - auch ohne Internet. Entwickelt fuer Aktivisten und Journalisten.",
        "website": "https://briarproject.org",
        "review_url": "https://www.privacyguides.org/en/real-time-communication/",
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "offline", "dezentral", "privacy-guides", "prism-break"],
        "platforms": ["Android"],
        "resilience": "Funktioniert bei Internet-Abschaltung"
    },
    {
        "id": "simplex",
        "name": "SimpleX Chat",
        "category": "messenger",
        "slogan": "Kein Account, keine Identitaet",
        "description": "Erster Messenger ohne Benutzer-IDs. Selbst der Server kennt deine Kontakte nicht. Neuer Ansatz fuer maximale Privatsphaere.",
        "website": "https://simplex.chat",
        "review_url": "https://www.privacyguides.org/en/real-time-communication/",
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "dezentral", "audit", "privacy-guides"],
        "platforms": ["Android", "iOS", "Windows", "macOS", "Linux"],
        "resilience": "Keine Benutzer-IDs, keine Metadaten"
    },
    {
        "id": "element",
        "name": "Element",
        "category": "messenger",
        "slogan": "Matrix-Client",
        "description": "Client fuer das Matrix-Protokoll. Foederiert wie E-Mail, verschluesselt mit E2EE. Selbsthosting moeglich.",
        "website": "https://element.io",
        "review_url": "https://www.privacyguides.org/en/real-time-communication/",
        "tags": ["foss", "kostenlos", "einsteiger", "e2ee", "dezentral", "selbsthosting", "privacy-guides", "prism-break"],
        "platforms": ["Android", "iOS", "Windows", "macOS", "Linux", "Web"],
        "resilience": "Dezentral, kein Single Point of Failure"
    },
    {
        "id": "session",
        "name": "Session",
        "category": "messenger",
        "slogan": "Anonymer Messenger",
        "description": "Dezentraler Messenger ohne Telefonnummer. Onion-Routing ueber das Oxen-Netzwerk. Maximale Anonymitaet.",
        "website": "https://getsession.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "dezentral", "prism-break"],
        "platforms": ["Android", "iOS", "Windows", "macOS", "Linux"],
        "resilience": "Keine Telefonnummer noetig"
    },
    {
        "id": "conversations",
        "name": "Conversations",
        "category": "messenger",
        "slogan": "XMPP fuer Android",
        "description": "XMPP/Jabber-Client mit OMEMO-Verschluesselung. Foederiertes Protokoll, viele Server zur Auswahl.",
        "website": "https://conversations.im",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "dezentral", "prism-break"],
        "platforms": ["Android"],
        "resilience": "Offenes Protokoll, viele Server"
    },
    {
        "id": "dino",
        "name": "Dino",
        "category": "messenger",
        "slogan": "XMPP fuer Desktop",
        "description": "Moderner XMPP-Client fuer Linux. OMEMO-Verschluesselung, schoene Oberflaeche.",
        "website": "https://dino.im",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "dezentral", "prism-break"],
        "platforms": ["Linux"],
        "resilience": "Desktop-XMPP mit gutem UX"
    },

    # =========================================================================
    # E-MAIL-ANBIETER
    # =========================================================================
    {
        "id": "protonmail",
        "name": "Proton Mail",
        "category": "email-anbieter",
        "slogan": "Verschluesselte E-Mail aus der Schweiz",
        "description": "Ende-zu-Ende-verschluesselter E-Mail-Dienst seit 2013. Zero-Access-Verschluesselung: Proton kann deine Mails nicht lesen. 500 MB kostenlos.",
        "website": "https://proton.me/mail",
        "review_url": "https://www.privacyguides.org/en/email/",
        "tags": ["source-available", "freemium", "einsteiger", "e2ee", "audit", "privacy-guides", "prism-break"],
        "platforms": ["Web", "Android", "iOS"],
        "resilience": "Schweizer Datenschutz, Zero-Knowledge"
    },
    {
        "id": "tuta",
        "name": "Tuta",
        "category": "email-anbieter",
        "slogan": "Sichere E-Mail aus Deutschland",
        "description": "Deutscher E-Mail-Anbieter (frueher Tutanota) seit 2011. Volle Ende-zu-Ende-Verschluesselung inkl. Kalender. 1 GB kostenlos.",
        "website": "https://tuta.com",
        "review_url": "https://www.privacyguides.org/en/email/",
        "tags": ["foss", "freemium", "einsteiger", "e2ee", "privacy-guides", "prism-break"],
        "platforms": ["Web", "Android", "iOS", "Windows", "macOS", "Linux"],
        "resilience": "100% Open Source, deutsche Server"
    },
    {
        "id": "mailbox-org",
        "name": "mailbox.org",
        "category": "email-anbieter",
        "slogan": "Deutscher Privacy-E-Mail",
        "description": "Deutscher E-Mail-Anbieter seit 2014 mit starkem Datenschutz. PGP-Unterstuetzung, Kalender, Cloud. 2 GB, 100% Oeko-Strom.",
        "website": "https://mailbox.org",
        "review_url": "https://www.privacyguides.org/en/email/",
        "tags": ["foss", "freemium", "mittel", "privacy-guides"],
        "platforms": ["Web", "IMAP/SMTP"],
        "resilience": "DSGVO, deutsche Rechtslage"
    },
    {
        "id": "riseup",
        "name": "Riseup",
        "category": "email-anbieter",
        "slogan": "E-Mail fuer Aktivisten",
        "description": "Aktivisten-Kollektiv seit 1999. Kostenlose E-Mail fuer soziale Bewegungen. Keine Logs, keine Werbung.",
        "website": "https://riseup.net",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "prism-break"],
        "platforms": ["Web", "IMAP/SMTP"],
        "resilience": "Von Aktivisten fuer Aktivisten"
    },
    {
        "id": "kolab-now",
        "name": "Kolab Now",
        "category": "email-anbieter",
        "slogan": "Schweizer Groupware",
        "description": "Schweizer E-Mail mit Kalender, Kontakten, Dateien. Kolab-Groupware-Suite. Fuer Unternehmen geeignet.",
        "website": "https://kolabnow.com",
        "review_url": None,
        "tags": ["foss", "kostenpflichtig", "mittel", "prism-break"],
        "platforms": ["Web", "IMAP/SMTP"],
        "resilience": "Schweizer Datenschutz"
    },

    # =========================================================================
    # E-MAIL-CLIENTS
    # =========================================================================
    {
        "id": "thunderbird",
        "name": "Thunderbird",
        "category": "email-clients",
        "slogan": "Der freie E-Mail-Client",
        "description": "Open-Source E-Mail-Client von Mozilla. PGP-Unterstuetzung (OpenPGP) eingebaut, Kalender, RSS.",
        "website": "https://www.thunderbird.net",
        "review_url": "https://www.privacyguides.org/en/email-clients/",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Lokale E-Mail-Verwaltung"
    },
    {
        "id": "k9-mail",
        "name": "K-9 Mail",
        "category": "email-clients",
        "slogan": "E-Mail fuer Android",
        "description": "Open-Source E-Mail-Client fuer Android. Wird zu Thunderbird Mobile. PGP via OpenKeychain.",
        "website": "https://k9mail.app",
        "review_url": "https://www.privacyguides.org/en/email-clients/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides", "prism-break"],
        "platforms": ["Android"],
        "resilience": "PGP auf dem Handy"
    },
    {
        "id": "fairemail",
        "name": "FairEmail",
        "category": "email-clients",
        "slogan": "Privacy-E-Mail fuer Android",
        "description": "Privacy-fokussierter E-Mail-Client. Blockiert Tracking-Pixel, zeigt Original-Absender.",
        "website": "https://email.faircode.eu",
        "review_url": "https://www.privacyguides.org/en/email-clients/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "Anti-Tracking eingebaut"
    },
    {
        "id": "apple-mail",
        "name": "Apple Mail",
        "category": "email-clients",
        "slogan": "Standard auf macOS",
        "description": "Apples E-Mail-Client mit S/MIME-Unterstuetzung. Mail Privacy Protection blockiert Tracker.",
        "website": "https://www.apple.com/macos/",
        "review_url": "https://www.privacyguides.org/en/email-clients/",
        "tags": ["proprietary", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["macOS", "iOS"],
        "resilience": "Integriert in Apple-Oekosystem"
    },

    # =========================================================================
    # E-MAIL-ALIASE
    # =========================================================================
    {
        "id": "simplelogin",
        "name": "SimpleLogin",
        "category": "email-aliase",
        "slogan": "E-Mail-Aliase",
        "description": "E-Mail-Alias-Dienst (jetzt Teil von Proton). Erstelle unbegrenzt Aliase, keine echte Adresse preisgeben.",
        "website": "https://simplelogin.io",
        "review_url": "https://www.privacyguides.org/en/email-aliasing/",
        "tags": ["foss", "freemium", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Web", "Browser-Extension"],
        "resilience": "Schuetzt echte E-Mail-Adresse"
    },
    {
        "id": "addy-io",
        "name": "addy.io",
        "category": "email-aliase",
        "slogan": "Anonyme E-Mail-Weiterleitung",
        "description": "E-Mail-Alias-Dienst (frueher AnonAddy). Open Source, selbst hostbar.",
        "website": "https://addy.io",
        "review_url": "https://www.privacyguides.org/en/email-aliasing/",
        "tags": ["foss", "freemium", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Web", "Browser-Extension"],
        "resilience": "Selbsthosting moeglich"
    },

    # =========================================================================
    # VIDEO & SPRACHE
    # =========================================================================
    {
        "id": "jitsi",
        "name": "Jitsi Meet",
        "category": "video-voice",
        "slogan": "Verschluesselte Videokonferenzen",
        "description": "Open-Source-Videokonferenz ohne Account. Kann selbst gehostet werden. E2EE optional.",
        "website": "https://jitsi.org",
        "review_url": "https://www.privacyguides.org/en/real-time-communication/",
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "selbsthosting", "privacy-guides", "prism-break"],
        "platforms": ["Web", "Android", "iOS"],
        "resilience": "Kein Account, selbst hostbar"
    },
    {
        "id": "signal-calls",
        "name": "Signal (Anrufe)",
        "category": "video-voice",
        "slogan": "Verschluesselte Anrufe",
        "description": "Signal unterstuetzt verschluesselte Sprach- und Videoanrufe. Gleiche Sicherheit wie Nachrichten.",
        "website": "https://signal.org",
        "review_url": "https://www.privacyguides.org/en/real-time-communication/",
        "tags": ["foss", "kostenlos", "mittel", "audit", "privacy-guides"],
        "platforms": ["Android", "iOS", "Desktop"],
        "resilience": "Bewaehrtes Signal-Protokoll"
    },
    {
        "id": "jami",
        "name": "Jami",
        "category": "video-voice",
        "slogan": "Peer-to-Peer Videotelefonie",
        "description": "Dezentraler Video-/Sprachanruf-Dienst. Kein Server noetig, direkte Verbindung.",
        "website": "https://jami.net",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "dezentral", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Kein zentraler Server"
    },
    {
        "id": "mumble",
        "name": "Mumble",
        "category": "video-voice",
        "slogan": "Verschluesselte Sprachchats",
        "description": "Open-Source Sprachkommunikation. Niedrige Latenz, ideal fuer Gaming. Selbst hostbar.",
        "website": "https://www.mumble.info",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Eigener Server moeglich"
    },

    # =========================================================================
    # SOZIALE NETZWERKE
    # =========================================================================
    {
        "id": "mastodon",
        "name": "Mastodon",
        "category": "soziale-netzwerke",
        "slogan": "Dezentrales Social Network",
        "description": "Foederiertes soziales Netzwerk. Wie Twitter/X, aber dezentral. Viele unabhaengige Server.",
        "website": "https://joinmastodon.org",
        "review_url": "https://www.privacyguides.org/en/social-networks/",
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "privacy-guides", "prism-break"],
        "platforms": ["Web", "Android", "iOS"],
        "resilience": "Kein zentraler Betreiber"
    },
    {
        "id": "pixelfed",
        "name": "Pixelfed",
        "category": "soziale-netzwerke",
        "slogan": "Dezentrales Instagram",
        "description": "Foederierte Foto-Plattform. Instagram-Alternative im Fediverse.",
        "website": "https://pixelfed.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "prism-break"],
        "platforms": ["Web", "Android", "iOS"],
        "resilience": "Fotos ohne Meta"
    },
    {
        "id": "peertube",
        "name": "PeerTube",
        "category": "soziale-netzwerke",
        "slogan": "Dezentrales YouTube",
        "description": "Foederierte Video-Plattform. P2P-Streaming entlastet Server. Teil des Fediverse.",
        "website": "https://joinpeertube.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "selbsthosting", "prism-break"],
        "platforms": ["Web"],
        "resilience": "Videos ohne Google"
    },
    {
        "id": "diaspora",
        "name": "diaspora*",
        "category": "soziale-netzwerke",
        "slogan": "Dezentrales Facebook",
        "description": "Eines der ersten dezentralen sozialen Netzwerke. Pods von verschiedenen Betreibern.",
        "website": "https://diasporafoundation.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "prism-break"],
        "platforms": ["Web"],
        "resilience": "Pionier der Dezentralisierung"
    },

    # =========================================================================
    # PASSWORT-MANAGER
    # =========================================================================
    {
        "id": "bitwarden",
        "name": "Bitwarden",
        "category": "passwort-manager",
        "slogan": "Open-Source-Passwortverwaltung",
        "description": "Plattformuebergreifender Passwort-Manager mit E2E-Verschluesselung. Kostenlose Version ausreichend. Selbsthosting mit Vaultwarden.",
        "website": "https://bitwarden.com",
        "review_url": "https://www.privacyguides.org/en/passwords/",
        "tags": ["foss", "freemium", "einsteiger", "e2ee", "selbsthosting", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS", "Web", "Browser"],
        "resilience": "Selbsthosting moeglich"
    },
    {
        "id": "keepassxc",
        "name": "KeePassXC",
        "category": "passwort-manager",
        "slogan": "Lokale Passwortdatenbank",
        "description": "Offline-Passwort-Manager mit lokaler Datenbankdatei. Kein Cloud-Zwang. TOTP und YubiKey.",
        "website": "https://keepassxc.org",
        "review_url": "https://www.privacyguides.org/en/passwords/",
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "offline", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Komplett offline, keine Abhaengigkeit"
    },
    {
        "id": "keepassdx",
        "name": "KeePassDX",
        "category": "passwort-manager",
        "slogan": "KeePass fuer Android",
        "description": "Android-Client fuer KeePass-Datenbanken. Autofill, Biometrie, Material Design.",
        "website": "https://www.keepassdx.com",
        "review_url": "https://www.privacyguides.org/en/passwords/",
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "offline", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "KeePass auf dem Handy"
    },
    {
        "id": "proton-pass",
        "name": "Proton Pass",
        "category": "passwort-manager",
        "slogan": "Passwort-Manager von Proton",
        "description": "Neuer Passwort-Manager im Proton-Oekosystem. E2E-verschluesselt, mit E-Mail-Aliasen.",
        "website": "https://proton.me/pass",
        "review_url": "https://www.privacyguides.org/en/passwords/",
        "tags": ["foss", "freemium", "mittel", "e2ee", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS", "Browser"],
        "resilience": "Teil des Proton-Oekosystems"
    },
    {
        "id": "1password",
        "name": "1Password",
        "category": "passwort-manager",
        "slogan": "Benutzerfreundlicher Passwort-Manager",
        "description": "Kommerzieller Passwort-Manager mit exzellentem UX. Security-Audits, Travel Mode.",
        "website": "https://1password.com",
        "review_url": "https://www.privacyguides.org/en/passwords/",
        "tags": ["proprietary", "kostenpflichtig", "einsteiger", "e2ee", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS", "Browser"],
        "resilience": "Sehr benutzerfreundlich"
    },

    # =========================================================================
    # ZWEI-FAKTOR-AUTHENTIFIZIERUNG
    # =========================================================================
    {
        "id": "aegis",
        "name": "Aegis Authenticator",
        "category": "2fa",
        "slogan": "Sichere 2FA-App fuer Android",
        "description": "Open-Source TOTP/HOTP-App. Verschluesseltes Backup, Import von anderen Apps.",
        "website": "https://getaegis.app",
        "review_url": "https://www.privacyguides.org/en/multi-factor-authentication/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides", "prism-break"],
        "platforms": ["Android"],
        "resilience": "Verschluesseltes Export-Backup"
    },
    {
        "id": "ente-auth",
        "name": "Ente Auth",
        "category": "2fa",
        "slogan": "Cloud-Sync 2FA",
        "description": "2FA-App mit E2E-verschluesseltem Cloud-Sync. Von den Machern von Ente Photos.",
        "website": "https://ente.io/auth",
        "review_url": "https://www.privacyguides.org/en/multi-factor-authentication/",
        "tags": ["foss", "kostenlos", "mittel", "audit", "privacy-guides"],
        "platforms": ["Android", "iOS", "Web", "macOS", "Linux"],
        "resilience": "Sync zwischen Geraeten"
    },
    {
        "id": "andotp",
        "name": "andOTP",
        "category": "2fa",
        "slogan": "Open-Source 2FA",
        "description": "Einfache Open-Source TOTP-App fuer Android. Verschluesseltes Backup.",
        "website": "https://github.com/andOTP/andOTP",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline", "prism-break"],
        "platforms": ["Android"],
        "resilience": "Einfach und sicher"
    },
    {
        "id": "tofu",
        "name": "Tofu",
        "category": "2fa",
        "slogan": "2FA fuer iOS",
        "description": "Open-Source TOTP-App fuer iOS. Einfach, sicher, keine Cloud.",
        "website": "https://www.tofuauth.com",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline", "prism-break"],
        "platforms": ["iOS"],
        "resilience": "iOS-2FA ohne Cloud"
    },

    # =========================================================================
    # HARDWARE SECURITY KEYS
    # =========================================================================
    {
        "id": "yubikey",
        "name": "YubiKey",
        "category": "security-keys",
        "slogan": "Der Standard-Security-Key",
        "description": "Physischer Sicherheitsschluessel fuer FIDO2/WebAuthn, OTP, OpenPGP. Phishing-resistent.",
        "website": "https://www.yubico.com",
        "review_url": "https://www.privacyguides.org/en/security-keys/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides"],
        "platforms": ["USB-A", "USB-C", "NFC"],
        "resilience": "Phishing unmoeglich, kein Akku"
    },
    {
        "id": "nitrokey",
        "name": "Nitrokey",
        "category": "security-keys",
        "slogan": "Open-Hardware Security Key",
        "description": "Open-Source Hardware-Key aus Deutschland. FIDO2, OpenPGP, OTP.",
        "website": "https://www.nitrokey.com",
        "review_url": "https://www.privacyguides.org/en/security-keys/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["USB-A", "USB-C"],
        "resilience": "Open Hardware"
    },
    {
        "id": "solokeys",
        "name": "SoloKeys",
        "category": "security-keys",
        "slogan": "Open-Source FIDO2",
        "description": "Open-Source FIDO2-Security-Key. Community-Projekt, guenstiger Einstieg.",
        "website": "https://solokeys.com",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel"],
        "platforms": ["USB-A", "USB-C", "NFC"],
        "resilience": "Guenstige Open-Source-Option"
    },

    # =========================================================================
    # VERSCHLUESSELUNG
    # =========================================================================
    {
        "id": "veracrypt",
        "name": "VeraCrypt",
        "category": "verschluesselung",
        "slogan": "Festplattenverschluesselung",
        "description": "TrueCrypt-Nachfolger. Container und Full-Disk-Encryption. Hidden Volumes fuer plausible Abstreitbarkeit.",
        "website": "https://www.veracrypt.fr",
        "review_url": "https://www.privacyguides.org/en/encryption/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "e2ee", "offline", "audit", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Hidden Volumes bei Zwang"
    },
    {
        "id": "cryptomator",
        "name": "Cryptomator",
        "category": "verschluesselung",
        "slogan": "Cloud-Verschluesselung",
        "description": "Verschluesselt Dateien vor Cloud-Upload transparent. Funktioniert mit jeder Cloud.",
        "website": "https://cryptomator.org",
        "review_url": "https://www.privacyguides.org/en/encryption/",
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Nutze unsichere Clouds sicher"
    },
    {
        "id": "age",
        "name": "age",
        "category": "verschluesselung",
        "slogan": "Moderne Dateiverschluesselung",
        "description": "Einfaches, modernes Verschluesselungstool. Nachfolger von PGP fuer Dateien. Minimalistisch.",
        "website": "https://age-encryption.org",
        "review_url": "https://www.privacyguides.org/en/encryption/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "e2ee", "offline", "privacy-guides"],
        "platforms": ["CLI"],
        "resilience": "Einfacher als PGP"
    },
    {
        "id": "kryptor",
        "name": "Kryptor",
        "category": "verschluesselung",
        "slogan": "GUI fuer moderne Verschluesselung",
        "description": "Einfache Dateiverschluesselung mit GUI. Moderne Kryptographie, simpel zu benutzen.",
        "website": "https://www.kryptor.co.uk",
        "review_url": "https://www.privacyguides.org/en/encryption/",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Verschluesselung ohne Terminal"
    },
    {
        "id": "gnupg",
        "name": "GnuPG",
        "category": "verschluesselung",
        "slogan": "OpenPGP-Standard",
        "description": "GNU Privacy Guard. Standard fuer OpenPGP-Verschluesselung und Signaturen.",
        "website": "https://gnupg.org",
        "review_url": "https://www.privacyguides.org/en/encryption/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "e2ee", "offline", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Der Standard fuer Signaturen"
    },

    # =========================================================================
    # CLOUD-SPEICHER
    # =========================================================================
    {
        "id": "proton-drive",
        "name": "Proton Drive",
        "category": "cloud-storage",
        "slogan": "Verschluesselte Cloud",
        "description": "E2E-verschluesselter Cloud-Speicher von Proton. Zero-Knowledge, Schweizer Datenschutz.",
        "website": "https://proton.me/drive",
        "review_url": "https://www.privacyguides.org/en/cloud/",
        "tags": ["source-available", "freemium", "mittel", "e2ee", "audit", "privacy-guides"],
        "platforms": ["Web", "Windows", "macOS", "Android", "iOS"],
        "resilience": "Schweizer Datenschutz"
    },
    {
        "id": "tresorit",
        "name": "Tresorit",
        "category": "cloud-storage",
        "slogan": "Zero-Knowledge Cloud",
        "description": "Schweizer Cloud-Speicher mit clientseitiger Verschluesselung. DSGVO-konform, fuer Business.",
        "website": "https://tresorit.com",
        "review_url": "https://www.privacyguides.org/en/cloud/",
        "tags": ["proprietary", "freemium", "mittel", "e2ee", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS", "Web"],
        "resilience": "Business-tauglich"
    },
    {
        "id": "peergos",
        "name": "Peergos",
        "category": "cloud-storage",
        "slogan": "P2P verschluesselte Cloud",
        "description": "Dezentrales, verschluesseltes Dateisystem. Peer-to-Peer, selbst hostbar.",
        "website": "https://peergos.org",
        "review_url": "https://www.privacyguides.org/en/cloud/",
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "selbsthosting", "privacy-guides"],
        "platforms": ["Web", "Java"],
        "resilience": "Dezentral und verschluesselt"
    },

    # =========================================================================
    # DATEI-SYNC
    # =========================================================================
    {
        "id": "syncthing",
        "name": "Syncthing",
        "category": "file-sync",
        "slogan": "Dezentrale Sync",
        "description": "Sync ohne Cloud. Synchronisiert direkt zwischen Geraeten. Keine Server, keine Accounts.",
        "website": "https://syncthing.net",
        "review_url": "https://www.privacyguides.org/en/file-sharing/",
        "tags": ["foss", "kostenlos", "einsteiger", "e2ee", "offline", "dezentral", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux", "Android"],
        "resilience": "Keine Cloud-Abhaengigkeit"
    },
    {
        "id": "nextcloud",
        "name": "Nextcloud",
        "category": "file-sync",
        "slogan": "Selbstgehostete Cloud",
        "description": "Google Drive Alternative. Dateien, Kalender, Kontakte, Office. Selbst hosten oder Privacy-Hoster.",
        "website": "https://nextcloud.com",
        "review_url": "https://www.privacyguides.org/en/productivity/",
        "tags": ["foss", "freemium", "fortgeschritten", "dezentral", "selbsthosting", "privacy-guides", "prism-break"],
        "platforms": ["Web", "Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Volle Datenkontrolle"
    },
    {
        "id": "etesync",
        "name": "EteSync",
        "category": "file-sync",
        "slogan": "E2E Kalender/Kontakte-Sync",
        "description": "Ende-zu-Ende-verschluesselte Synchronisation fuer Kalender, Kontakte, Aufgaben.",
        "website": "https://www.etesync.com",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "prism-break"],
        "platforms": ["Android", "Web"],
        "resilience": "Verschluesselte PIM-Sync"
    },

    # =========================================================================
    # DATEI-SHARING
    # =========================================================================
    {
        "id": "onionshare",
        "name": "OnionShare",
        "category": "file-sharing",
        "slogan": "Anonym Dateien teilen",
        "description": "Dateien teilen ueber Tor. Empfaenger benoetigt Tor Browser. Kein Server.",
        "website": "https://onionshare.org",
        "review_url": "https://www.privacyguides.org/en/file-sharing/",
        "tags": ["foss", "kostenlos", "mittel", "e2ee", "dezentral", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Anonym und direkt"
    },
    {
        "id": "send",
        "name": "Send",
        "category": "file-sharing",
        "slogan": "Verschluesselte Dateiuebertragung",
        "description": "E2E-verschluesselte Dateiuebertragung. Urspruenglich Firefox Send, jetzt Community-Fork.",
        "website": "https://send.vis.ee",
        "review_url": "https://www.privacyguides.org/en/file-sharing/",
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "Einfach verschluesselt teilen"
    },

    # =========================================================================
    # BACKUP
    # =========================================================================
    {
        "id": "borgbackup",
        "name": "BorgBackup",
        "category": "backup",
        "slogan": "Deduplizierendes Backup",
        "description": "Effizientes, verschluesseltes Backup. Deduplizierung spart Speicher. Standard fuer Server.",
        "website": "https://www.borgbackup.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline", "prism-break"],
        "platforms": ["Linux", "macOS", "BSD"],
        "resilience": "Verschluesselt, effizient"
    },
    {
        "id": "restic",
        "name": "Restic",
        "category": "backup",
        "slogan": "Schnelles Backup",
        "description": "Modernes Backup mit Verschluesselung. Viele Backends (S3, SFTP, rclone, etc.).",
        "website": "https://restic.net",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Flexibel, verschluesselt"
    },

    # =========================================================================
    # METADATEN-ENTFERNUNG
    # =========================================================================
    {
        "id": "mat2",
        "name": "MAT2",
        "category": "metadaten",
        "slogan": "Metadata Anonymisation Toolkit",
        "description": "Entfernt Metadaten aus vielen Dateiformaten. CLI und GUI verfuegbar.",
        "website": "https://0xacab.org/jvoisin/mat2",
        "review_url": "https://www.privacyguides.org/en/data-redaction/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides"],
        "platforms": ["Linux"],
        "resilience": "Umfassende Metadaten-Entfernung"
    },
    {
        "id": "exiferaser",
        "name": "ExifEraser",
        "category": "metadaten",
        "slogan": "EXIF-Entfernung fuer Android",
        "description": "Entfernt EXIF-Daten aus Fotos auf Android. Bevor du teilst.",
        "website": "https://github.com/nicholasbraman/nicholasbraman.github.io/releases/tag/nicholasbraman.github.io",
        "review_url": "https://www.privacyguides.org/en/data-redaction/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "Standort aus Fotos entfernen"
    },
    {
        "id": "exiftool",
        "name": "ExifTool",
        "category": "metadaten",
        "slogan": "Der Metadaten-Standard",
        "description": "Lesen, schreiben, bearbeiten von Metadaten aller Formate. CLI-Tool, extrem maechtig.",
        "website": "https://exiftool.org",
        "review_url": "https://www.privacyguides.org/en/data-redaction/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "offline", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Volle Kontrolle ueber Metadaten"
    },

    # =========================================================================
    # FOTO-VERWALTUNG
    # =========================================================================
    {
        "id": "ente-photos",
        "name": "Ente Photos",
        "category": "foto-verwaltung",
        "slogan": "Verschluesselte Foto-Cloud",
        "description": "E2E-verschluesselte Foto-/Video-Speicherung. Google Photos Alternative mit Privacy.",
        "website": "https://ente.io",
        "review_url": "https://www.privacyguides.org/en/photo-management/",
        "tags": ["foss", "freemium", "mittel", "e2ee", "audit", "privacy-guides"],
        "platforms": ["Android", "iOS", "Web", "macOS", "Linux"],
        "resilience": "Fotos ohne Big Tech"
    },
    {
        "id": "immich",
        "name": "Immich",
        "category": "foto-verwaltung",
        "slogan": "Selbstgehostetes Google Photos",
        "description": "High-Performance Foto-Backup mit KI-Features. Selbst hosten, volle Kontrolle.",
        "website": "https://immich.app",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting"],
        "platforms": ["Docker", "Web", "Android", "iOS"],
        "resilience": "Fotos auf eigenem Server"
    },

    # =========================================================================
    # VPN
    # =========================================================================
    {
        "id": "mullvad-vpn",
        "name": "Mullvad VPN",
        "category": "vpn",
        "slogan": "VPN ohne Account",
        "description": "Schwedischer VPN ohne E-Mail oder Passwort. Nur Accountnummer. Akzeptiert Bargeld und Monero.",
        "website": "https://mullvad.net",
        "review_url": "https://www.privacyguides.org/en/vpn/",
        "tags": ["foss", "freemium", "einsteiger", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Kein Account, keine Identitaet"
    },
    {
        "id": "proton-vpn",
        "name": "Proton VPN",
        "category": "vpn",
        "slogan": "VPN von Proton",
        "description": "Schweizer VPN mit kostenlosem Tier. Secure Core durch mehrere Laender. 112+ Standorte.",
        "website": "https://protonvpn.com",
        "review_url": "https://www.privacyguides.org/en/vpn/",
        "tags": ["foss", "kostenlos", "einsteiger", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Kostenlose Option verfuegbar"
    },
    {
        "id": "ivpn",
        "name": "IVPN",
        "category": "vpn",
        "slogan": "Privacy-VPN",
        "description": "Gibraltar-basierter VPN. Multi-Hop, WireGuard. Akzeptiert Monero und Bargeld.",
        "website": "https://www.ivpn.net",
        "review_url": "https://www.privacyguides.org/en/vpn/",
        "tags": ["foss", "freemium", "mittel", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Transparente Audits"
    },

    # =========================================================================
    # TOR & ANONYMISIERUNG
    # =========================================================================
    {
        "id": "tor",
        "name": "Tor Network",
        "category": "tor-netzwerk",
        "slogan": "Anonymitaet durch Schichten",
        "description": "Dezentrales Anonymisierungsnetzwerk. Drei Relays, keine direkte Verbindung zum Ziel.",
        "website": "https://www.torproject.org",
        "review_url": "https://www.privacyguides.org/en/tor/",
        "tags": ["foss", "kostenlos", "mittel", "dezentral", "privacy-guides", "prism-break"],
        "platforms": ["Alle"],
        "resilience": "Hoechste Anonymitaet"
    },
    {
        "id": "orbot",
        "name": "Orbot",
        "category": "tor-netzwerk",
        "slogan": "Tor fuer Android",
        "description": "Tor-Proxy fuer Android. Leitet Apps durch Tor, auch ohne Root.",
        "website": "https://orbot.app",
        "review_url": "https://www.privacyguides.org/en/tor/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides", "prism-break"],
        "platforms": ["Android"],
        "resilience": "Tor fuer alle Android-Apps"
    },
    {
        "id": "i2p",
        "name": "I2P",
        "category": "tor-netzwerk",
        "slogan": "Das unsichtbare Internet",
        "description": "Alternatives Anonymisierungsnetz. Optimiert fuer versteckte Dienste (eepsites).",
        "website": "https://geti2p.net",
        "review_url": "https://www.privacyguides.org/en/advanced/tor-i2p/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "dezentral", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux", "Android"],
        "resilience": "Alternative zu Tor"
    },
    {
        "id": "snowflake",
        "name": "Snowflake",
        "category": "tor-netzwerk",
        "slogan": "Tor-Zensur umgehen",
        "description": "Hilft zensierten Nutzern Tor zu erreichen. Du wirst zur Bridge fuer andere.",
        "website": "https://snowflake.torproject.org",
        "review_url": "https://www.privacyguides.org/en/tor/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Browser-Extension"],
        "resilience": "Hilf anderen, Zensur zu umgehen"
    },

    # =========================================================================
    # DNS
    # =========================================================================
    {
        "id": "quad9",
        "name": "Quad9",
        "category": "dns",
        "slogan": "Sicherer DNS",
        "description": "Schweizer Non-Profit DNS mit Malware-Blocking. DoH, DoT, keine Logs.",
        "website": "https://quad9.net",
        "review_url": "https://www.privacyguides.org/en/dns/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Alle"],
        "resilience": "Schweizer Rechtslage"
    },
    {
        "id": "mullvad-dns",
        "name": "Mullvad DNS",
        "category": "dns",
        "slogan": "DNS von Mullvad",
        "description": "Verschluesselter DNS von Mullvad. Mit Werbeblocker-Option.",
        "website": "https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/",
        "review_url": "https://www.privacyguides.org/en/dns/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Alle"],
        "resilience": "Vertrauenswuerdiger Anbieter"
    },
    {
        "id": "pi-hole",
        "name": "Pi-hole",
        "category": "dns",
        "slogan": "Netzwerk-Werbeblocker",
        "description": "DNS-Werbeblocker fuer das ganze Netzwerk. Raspberry Pi oder Docker.",
        "website": "https://pi-hole.net",
        "review_url": "https://www.privacyguides.org/en/dns/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "selbsthosting", "prism-break"],
        "platforms": ["Linux", "Docker"],
        "resilience": "Schuetzt alle Geraete"
    },
    {
        "id": "dnscrypt-proxy",
        "name": "DNSCrypt-Proxy",
        "category": "dns",
        "slogan": "DNS-Verschluesselung",
        "description": "Lokaler DNS-Proxy mit Verschluesselung (DNSCrypt, DoH, DoT). Lokal betreiben.",
        "website": "https://dnscrypt.info",
        "review_url": "https://www.privacyguides.org/en/dns/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Volle DNS-Kontrolle"
    },

    # =========================================================================
    # DESKTOP-BETRIEBSSYSTEME
    # =========================================================================
    {
        "id": "qubes",
        "name": "Qubes OS",
        "category": "desktop-os",
        "slogan": "Sicherheit durch Isolation",
        "description": "Extrem sicheres OS mit Virtualisierung. Jede App in eigener VM. Von Snowden empfohlen.",
        "website": "https://www.qubes-os.org",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "privacy-guides", "prism-break"],
        "platforms": ["x86-64"],
        "resilience": "Kompromittierung bleibt isoliert"
    },
    {
        "id": "fedora",
        "name": "Fedora Linux",
        "category": "desktop-os",
        "slogan": "Aktuelles Linux",
        "description": "Cutting-Edge Linux mit SELinux. Schnelle Sicherheitsupdates, moderne Features.",
        "website": "https://fedoraproject.org",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides", "prism-break"],
        "platforms": ["x86-64", "ARM"],
        "resilience": "Aktuellste Sicherheitspatches"
    },
    {
        "id": "opensuse-tw",
        "name": "openSUSE Tumbleweed",
        "category": "desktop-os",
        "slogan": "Rolling Release",
        "description": "Rolling-Release Linux. Immer aktuell, gutes Tooling (YaST), AppArmor.",
        "website": "https://get.opensuse.org/tumbleweed/",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["x86-64", "ARM"],
        "resilience": "Kontinuierliche Updates"
    },
    {
        "id": "arch-linux",
        "name": "Arch Linux",
        "category": "desktop-os",
        "slogan": "Keep It Simple",
        "description": "Minimalistisches Rolling-Release. Du baust dein System selbst. AUR fuer Software.",
        "website": "https://archlinux.org",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "privacy-guides"],
        "platforms": ["x86-64"],
        "resilience": "Volle Kontrolle"
    },
    {
        "id": "debian",
        "name": "Debian",
        "category": "desktop-os",
        "slogan": "Das universelle OS",
        "description": "Stabiles, freies Betriebssystem. Basis fuer Ubuntu und viele andere.",
        "website": "https://www.debian.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "prism-break"],
        "platforms": ["x86-64", "ARM", "viele andere"],
        "resilience": "Extrem stabil, lange Unterstuetzung"
    },
    {
        "id": "nixos",
        "name": "NixOS",
        "category": "desktop-os",
        "slogan": "Deklaratives Linux",
        "description": "Reproduzierbare Systemkonfiguration. Rollbacks, Isolation. Steile Lernkurve.",
        "website": "https://nixos.org",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "privacy-guides"],
        "platforms": ["x86-64", "ARM"],
        "resilience": "Reproduzierbare Systeme"
    },
    {
        "id": "kicksecure",
        "name": "Kicksecure",
        "category": "desktop-os",
        "slogan": "Gehaertetes Debian",
        "description": "Sicherheitsgehaertetes Debian. Von den Whonix-Machern. Weniger radikal als Qubes.",
        "website": "https://www.kicksecure.com",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["x86-64"],
        "resilience": "Gehaertetes Linux"
    },

    # =========================================================================
    # MOBILE BETRIEBSSYSTEME
    # =========================================================================
    {
        "id": "grapheneos",
        "name": "GrapheneOS",
        "category": "mobile-os",
        "slogan": "Das sicherste mobile OS",
        "description": "Gehaertetes Android. Memory-Safety, Sandboxing, minimale Angriffsflaeche. Nur fuer Pixel.",
        "website": "https://grapheneos.org",
        "review_url": "https://www.privacyguides.org/en/android/",
        "tags": ["foss", "kostenlos", "einsteiger", "audit", "privacy-guides"],
        "platforms": ["Google Pixel"],
        "resilience": "Maximale Sicherheit"
    },
    {
        "id": "calyxos",
        "name": "CalyxOS",
        "category": "mobile-os",
        "slogan": "Privacy-Android",
        "description": "Benutzerfreundliches Privacy-Android. microG fuer Google-Kompatibilitaet.",
        "website": "https://calyxos.org",
        "review_url": "https://www.privacyguides.org/en/android/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "privacy-guides"],
        "platforms": ["Google Pixel", "Fairphone"],
        "resilience": "Guter Kompromiss"
    },
    {
        "id": "divestos",
        "name": "DivestOS",
        "category": "mobile-os",
        "slogan": "Privacy fuer alte Handys",
        "description": "Sicherheitsfokussiertes Android fuer aeltere Geraete. Laengere Unterstuetzung.",
        "website": "https://divestos.org",
        "review_url": "https://www.privacyguides.org/en/android/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "privacy-guides"],
        "platforms": ["Diverse Android-Geraete"],
        "resilience": "Neues Leben fuer alte Handys"
    },

    # =========================================================================
    # LIVE-SYSTEME
    # =========================================================================
    {
        "id": "tails",
        "name": "Tails",
        "category": "live-os",
        "slogan": "Das amnesische System",
        "description": "Bootfaehiges Linux vom USB-Stick. Keine Spuren, alles durch Tor. Vergisst alles.",
        "website": "https://tails.net",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "offline", "privacy-guides", "prism-break"],
        "platforms": ["USB-Boot"],
        "resilience": "Keine Spuren hinterlassen"
    },
    {
        "id": "whonix",
        "name": "Whonix",
        "category": "live-os",
        "slogan": "Anonymitaet by Design",
        "description": "Zwei-VM-System das alle Verbindungen durch Tor zwingt. IP-Leaks technisch unmoeglich.",
        "website": "https://www.whonix.org",
        "review_url": "https://www.privacyguides.org/en/desktop/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "privacy-guides", "prism-break"],
        "platforms": ["VirtualBox", "Qubes", "KVM"],
        "resilience": "Anonymitaet auch bei Bugs"
    },

    # =========================================================================
    # ROUTER-FIRMWARE
    # =========================================================================
    {
        "id": "openwrt",
        "name": "OpenWrt",
        "category": "router-firmware",
        "slogan": "Freie Router-Firmware",
        "description": "Linux fuer Router. Volle Kontrolle ueber dein Netzwerk. Viele unterstuetzte Geraete.",
        "website": "https://openwrt.org",
        "review_url": "https://www.privacyguides.org/en/router/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "privacy-guides", "prism-break"],
        "platforms": ["Viele Router"],
        "resilience": "Freie Firmware"
    },
    {
        "id": "opnsense",
        "name": "OPNsense",
        "category": "router-firmware",
        "slogan": "Open Source Firewall",
        "description": "FreeBSD-basierte Firewall/Router. Web-GUI, VPN, IDS/IPS. Fuer dedizierte Hardware.",
        "website": "https://opnsense.org",
        "review_url": "https://www.privacyguides.org/en/router/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["x86 Hardware", "VM"],
        "resilience": "Enterprise-Grade Firewall"
    },

    # =========================================================================
    # ANDROID APPS & STORES
    # =========================================================================
    {
        "id": "f-droid",
        "name": "F-Droid",
        "category": "android-apps",
        "slogan": "FOSS App Store",
        "description": "App-Store nur fuer Open-Source-Apps. Keine proprietaere Software.",
        "website": "https://f-droid.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "einsteiger", "prism-break"],
        "platforms": ["Android"],
        "resilience": "100% Open Source Apps"
    },
    {
        "id": "aurora-store",
        "name": "Aurora Store",
        "category": "android-apps",
        "slogan": "Play Store ohne Google",
        "description": "Anonymer Zugang zum Play Store. Kein Google-Konto noetig.",
        "website": "https://auroraoss.com",
        "review_url": "https://www.privacyguides.org/en/android/#aurora-store",
        "tags": ["foss", "kostenlos", "einsteiger", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "Play Store Apps anonym"
    },
    {
        "id": "obtainium",
        "name": "Obtainium",
        "category": "android-apps",
        "slogan": "Updates direkt von Quellen",
        "description": "Holt App-Updates direkt von GitHub, GitLab, etc. Kein App Store noetig.",
        "website": "https://github.com/nicholasbraman/nicholasbraman.github.io/releases/tag/nicholasbraman.github.io",
        "review_url": "https://www.privacyguides.org/en/android/#obtainium",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "Updates ohne Store"
    },
    {
        "id": "shelter",
        "name": "Shelter",
        "category": "android-apps",
        "slogan": "Work Profile Management",
        "description": "Isoliert Apps in Androids Work Profile. Trennt Arbeit von Privat.",
        "website": "https://gitea.angry.im/nicholasbraman/nicholasbraman.github.io",
        "review_url": "https://www.privacyguides.org/en/android/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Android"],
        "resilience": "App-Isolation"
    },

    # =========================================================================
    # SELBSTHOSTING
    # =========================================================================
    {
        "id": "vaultwarden",
        "name": "Vaultwarden",
        "category": "selbsthosting",
        "slogan": "Selbstgehosteter Bitwarden",
        "description": "Leichtgewichtige Bitwarden-Server-Implementation. Alle Premium-Features. Wenig Ressourcen.",
        "website": "https://github.com/dani-garcia/vaultwarden",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline"],
        "platforms": ["Docker", "Linux"],
        "resilience": "Passwoerter unter Kontrolle"
    },
    {
        "id": "home-assistant",
        "name": "Home Assistant",
        "category": "selbsthosting",
        "slogan": "Smart Home ohne Cloud",
        "description": "Open-Source Smart-Home-Zentrale. 2000+ Integrationen, lokal kontrolliert.",
        "website": "https://www.home-assistant.io",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline"],
        "platforms": ["Raspberry Pi", "Docker", "VM"],
        "resilience": "Smart Home ohne Cloud"
    },
    {
        "id": "wireguard",
        "name": "WireGuard",
        "category": "selbsthosting",
        "slogan": "Modernes VPN-Protokoll",
        "description": "Schnelles, einfaches VPN-Protokoll. Nur 4000 Zeilen Code. Eigenen VPN-Server betreiben.",
        "website": "https://www.wireguard.com",
        "review_url": "https://www.privacyguides.org/en/vpn/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides", "prism-break"],
        "platforms": ["Linux", "Windows", "macOS", "Android", "iOS"],
        "resilience": "Eigener VPN-Server"
    },
    {
        "id": "paperless-ngx",
        "name": "Paperless-ngx",
        "category": "selbsthosting",
        "slogan": "Dokumentenmanagement",
        "description": "Selbstgehostetes Dokumentenarchiv mit OCR. Scannt, kategorisiert, durchsucht.",
        "website": "https://docs.paperless-ngx.com",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline"],
        "platforms": ["Docker", "Linux"],
        "resilience": "Dokumente digitalisiert"
    },
    {
        "id": "gitea",
        "name": "Gitea",
        "category": "selbsthosting",
        "slogan": "Selbstgehostetes GitHub",
        "description": "Leichtgewichtiger Git-Server. GitHub-Alternative fuer eigene Infrastruktur.",
        "website": "https://gitea.io",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "prism-break"],
        "platforms": ["Docker", "Linux", "Windows", "macOS"],
        "resilience": "Code unter Kontrolle"
    },
    {
        "id": "cryptpad",
        "name": "CryptPad",
        "category": "selbsthosting",
        "slogan": "Verschluesselte Zusammenarbeit",
        "description": "E2E-verschluesselte Office-Suite. Docs, Sheets, Kanban. Kollaborativ und privat.",
        "website": "https://cryptpad.fr",
        "review_url": "https://www.privacyguides.org/en/productivity/",
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "privacy-guides", "prism-break"],
        "platforms": ["Web"],
        "resilience": "Google Docs Alternative"
    },

    # =========================================================================
    # PRODUKTIVITAET
    # =========================================================================
    {
        "id": "standard-notes",
        "name": "Standard Notes",
        "category": "produktivitaet",
        "slogan": "E2E-verschluesselte Notizen",
        "description": "Verschluesselte Notizen mit Sync. Einfach, sicher, langlebig.",
        "website": "https://standardnotes.com",
        "review_url": "https://www.privacyguides.org/en/notebooks/",
        "tags": ["foss", "kostenlos", "mittel", "audit", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS", "Web"],
        "resilience": "Notizen verschluesselt"
    },
    {
        "id": "joplin",
        "name": "Joplin",
        "category": "produktivitaet",
        "slogan": "Markdown-Notizen mit Sync",
        "description": "Open-Source Notiz-App mit E2EE-Sync. Markdown, Tagging, Notebooks.",
        "website": "https://joplinapp.org",
        "review_url": "https://www.privacyguides.org/en/notebooks/",
        "tags": ["foss", "kostenlos", "mittel", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Evernote-Alternative"
    },
    {
        "id": "cryptee",
        "name": "Cryptee",
        "category": "produktivitaet",
        "slogan": "Verschluesselte Docs und Fotos",
        "description": "E2E-verschluesselte Dokumente und Fotos. Web-basiert, Zero-Knowledge.",
        "website": "https://crypt.ee",
        "review_url": "https://www.privacyguides.org/en/notebooks/",
        "tags": ["foss", "freemium", "mittel", "e2ee", "privacy-guides"],
        "platforms": ["Web"],
        "resilience": "Docs in der Cloud, verschluesselt"
    },
    {
        "id": "libreoffice",
        "name": "LibreOffice",
        "category": "produktivitaet",
        "slogan": "Freies Office-Paket",
        "description": "Vollstaendige Office-Suite. Word/Excel/PowerPoint-kompatibel. Kein Abo.",
        "website": "https://www.libreoffice.org",
        "review_url": "https://www.privacyguides.org/en/productivity/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Unabhaengig von Microsoft"
    },
    {
        "id": "onlyoffice",
        "name": "OnlyOffice",
        "category": "produktivitaet",
        "slogan": "MS-Office-kompatibel",
        "description": "Office-Suite mit bester MS-Kompatibilitaet. Docs, Sheets, Slides. Selbst hostbar.",
        "website": "https://www.onlyoffice.com",
        "review_url": "https://www.privacyguides.org/en/productivity/",
        "tags": ["foss", "kostenlos", "mittel", "selbsthosting", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux", "Web"],
        "resilience": "Office-Dateien ohne Microsoft"
    },

    # =========================================================================
    # OFFLINE-TOOLS
    # =========================================================================
    {
        "id": "obsidian",
        "name": "Obsidian",
        "category": "offline-tools",
        "slogan": "Lokale Markdown-Wissensbasis",
        "description": "Markdown-Notizen mit Verlinkung. Lokale Dateien, keine Cloud noetig. Graph-Ansicht.",
        "website": "https://obsidian.md",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Deine Notizen, deine Dateien"
    },
    {
        "id": "kiwix",
        "name": "Kiwix",
        "category": "offline-tools",
        "slogan": "Wikipedia offline",
        "description": "Liest ZIM-Dateien: Wikipedia, Stack Overflow, Gutenberg offline. Wissen ohne Internet.",
        "website": "https://www.kiwix.org",
        "review_url": None,
        "tags": ["foss", "kostenlos", "mittel", "offline"],
        "platforms": ["Windows", "macOS", "Linux", "Android", "iOS"],
        "resilience": "Wissen ohne Internet"
    },
    {
        "id": "ollama",
        "name": "Ollama",
        "category": "offline-tools",
        "slogan": "Lokale KI",
        "description": "Lokale LLMs ausfuehren. Llama, Mistral, etc. auf eigenem Rechner. Keine Cloud.",
        "website": "https://ollama.com",
        "review_url": "https://www.privacyguides.org/en/ai-chatbots/",
        "tags": ["foss", "kostenlos", "mittel", "offline", "privacy-guides"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "KI ohne Cloud"
    },

    # =========================================================================
    # FINANZEN
    # =========================================================================
    {
        "id": "monero",
        "name": "Monero",
        "category": "finanzen",
        "slogan": "Private Kryptowaehrung",
        "description": "Privacy-by-Default Kryptowaehrung. Transaktionen nicht nachverfolgbar.",
        "website": "https://www.getmonero.org",
        "review_url": "https://www.privacyguides.org/en/cryptocurrency/",
        "tags": ["foss", "kostenlos", "fortgeschritten", "dezentral", "privacy-guides", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux", "Android"],
        "resilience": "Finanziell anonym"
    },
    {
        "id": "bisq",
        "name": "Bisq",
        "category": "finanzen",
        "slogan": "Dezentrale Krypto-Boerse",
        "description": "Peer-to-Peer Kryptowaehrungshandel. Kein Account, keine Verifizierung.",
        "website": "https://bisq.network",
        "review_url": None,
        "tags": ["foss", "kostenlos", "fortgeschritten", "dezentral", "prism-break"],
        "platforms": ["Windows", "macOS", "Linux"],
        "resilience": "Krypto ohne Boerse"
    },

    # =========================================================================
    # KARTEN & NAVIGATION
    # =========================================================================
    {
        "id": "organic-maps",
        "name": "Organic Maps",
        "category": "karten-navigation",
        "slogan": "Offline-Karten",
        "description": "Offline-Karten basierend auf OpenStreetMap. Wandern, Radfahren, Autofahren.",
        "website": "https://organicmaps.app",
        "review_url": "https://www.privacyguides.org/en/mobile-apps/",
        "tags": ["foss", "kostenlos", "einsteiger", "offline", "privacy-guides"],
        "platforms": ["Android", "iOS"],
        "resilience": "Navigation ohne Internet"
    },
    {
        "id": "osmand",
        "name": "OsmAnd",
        "category": "karten-navigation",
        "slogan": "Maechtiges Offline-OSM",
        "description": "Umfangreiche Offline-Navigation mit OSM. Viele Features, auch komplexe Routen.",
        "website": "https://osmand.net",
        "review_url": "https://www.privacyguides.org/en/mobile-apps/",
        "tags": ["foss", "kostenlos", "einsteiger", "offline", "privacy-guides", "prism-break"],
        "platforms": ["Android", "iOS"],
        "resilience": "Volle Kontrolle ueber Karten"
    },
]


# =============================================================================
# FEATURED CATEGORIES - Hero-Bereich (vereinfacht, keine Beispiel-Tools)
# =============================================================================

FEATURED_CATEGORIES = [
    {
        "id": "browser",
        "name": "Browser",
        "icon": "🌐",
        "description": "Surfe ohne Tracking",
        "anchor": "browser-desktop"  # Scroll-Ziel
    },
    {
        "id": "email",
        "name": "E-Mail",
        "icon": "✉️",
        "description": "Verschluesselt kommunizieren",
        "anchor": "email-anbieter"
    },
    {
        "id": "messenger",
        "name": "Messenger",
        "icon": "💬",
        "description": "Sicher chatten",
        "anchor": "messenger"
    },
    {
        "id": "passwords",
        "name": "Passwoerter",
        "icon": "🔑",
        "description": "Sichere Verwaltung",
        "anchor": "passwort-manager"
    },
    {
        "id": "cloud",
        "name": "Cloud & Sync",
        "icon": "☁️",
        "description": "Deine Daten, deine Kontrolle",
        "anchor": "file-sync"
    },
    {
        "id": "search",
        "name": "Suchmaschinen",
        "icon": "🔍",
        "description": "Suchen ohne Tracking",
        "anchor": "suchmaschinen"
    }
]


# =============================================================================
# HILFSFUNKTIONEN
# =============================================================================

def get_tools_by_category(category_id):
    """Gibt alle Tools einer Kategorie zurueck."""
    return [t for t in TOOLS if t["category"] == category_id]


def get_categories_by_group(group_id):
    """Gibt alle Kategorien einer Gruppe zurueck."""
    return [c for c in CATEGORIES if c["group"] == group_id]


def get_tools_with_tag(tag):
    """Gibt alle Tools mit einem bestimmten Tag zurueck."""
    return [t for t in TOOLS if tag in t.get("tags", [])]


def search_tools(query):
    """Einfache Suche ueber Name, Slogan und Beschreibung."""
    query = query.lower()
    results = []
    for tool in TOOLS:
        if (query in tool["name"].lower() or
            query in tool["slogan"].lower() or
            query in tool["description"].lower()):
            results.append(tool)
    return results


def get_all_tools_grouped():
    """Gibt alle Tools gruppiert nach Kategorien zurueck."""
    grouped = {}
    for group in CATEGORY_GROUPS:
        grouped[group["id"]] = {
            "name": group["name"],
            "icon": group["icon"],
            "categories": []
        }
        for cat in get_categories_by_group(group["id"]):
            cat_tools = get_tools_by_category(cat["id"])
            if cat_tools:  # Nur Kategorien mit Tools
                grouped[group["id"]]["categories"].append({
                    "id": cat["id"],
                    "name": cat["name"],
                    "icon": cat["icon"],
                    "description": cat["description"],
                    "tools": cat_tools
                })
    return grouped
