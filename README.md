# Widerstands-Toolkit

**Digitale Resilienz für Aktivist\*innen, Journalist\*innen und kritische Bürger\*innen**

Eine Plattform für digitale Selbstverteidigung und Aktivismus. Keine Tracker. Keine Überwachung. Deine Daten bleiben bei dir.

---

<img width="1839" height="865" alt="Widerstands-Toolkit Screenshot" src="https://github.com/user-attachments/assets/e56b9aa2-f8dc-421c-82d0-3a726ceed176" />

---

## Inhaltsverzeichnis

- [Über dieses Projekt](#über-dieses-projekt)
- [Features](#features)
- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Alle Routen & Seiten](#alle-routen--seiten)
- [Sicherheit & Datenschutz](#sicherheit--datenschutz)
- [Deployment](#deployment)
- [Entwicklung](#entwicklung)
- [Projektstruktur](#projektstruktur)
- [Troubleshooting](#troubleshooting)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)
- [Danksagungen](#danksagungen)

---

## Über dieses Projekt

Das Widerstands-Toolkit ist ein umfassendes Werkzeugset für digitale Selbstverteidigung. Es richtet sich an:

- **Friedensaktivist\*innen** – Schutz bei Demos und Aktionen
- **Kritische Bürger\*innen** – Digitale Selbstverteidigung im Alltag
- **Journalist\*innen & Whistleblower** – Sichere Kommunikation und Quellenschutz
- **Zivilgesellschaft** – Resilienz gegen Überwachung und Propaganda

### Warum dieses Projekt?

In einer Zeit zunehmender digitaler Überwachung und Desinformation brauchen Menschen Werkzeuge, um sich zu schützen. Dieses Toolkit bietet:

- **Praktische Anleitungen** statt theoretischer Abhandlungen
- **Lokale Ausführung** – alle Daten bleiben auf deinem Gerät
- **Offline-Verfügbarkeit** – funktioniert auch ohne Internet
- **Keine Abhängigkeiten von Big Tech** – keine Google Fonts, keine CDNs

---

## Features

### Kernbereiche

| Bereich | Beschreibung | Inhalte |
|---------|--------------|---------|
| **Privatsphäre** | Schutz deiner digitalen Identität | EXIF-Entfernung, DSGVO-Anfragen, Tracking-Vermeidung, Fingerprinting-Schutz |
| **Sicherheit** | Absicherung deiner Geräte & Kommunikation | Passwort-Manager, 2FA, sichere Messenger, VPN/Tor, E-Mail-Verschlüsselung, Backup-Strategien |
| **Resilienz** | Widerstandsfähigkeit gegen Manipulation | SIFT-Methode, Prebunking, Euphemismus-Decoder, unabhängige Nachrichtenquellen |
| **Aktivismus** | Werkzeuge für sichere Aktionen | Bedrohungsanalyse, Demo-Checklisten, Beschlagnahme-Rechte, Bezugsgruppen |
| **Faktencheck** | Unterscheide Signal von Rauschen | Verschwörungs-Filter, Narrativ-Analyse |
| **Frieden** | Vernetzung & Selbstfürsorge | Petitions-Tools, Anti-Kriegs-Netzwerke, Burnout-Prävention, Gewaltfreie Kommunikation |

### Interaktive Tools

- **Passphrasen-Generator** – Erstelle sichere, merkbare Passwörter (4096 Wörter, ~12 Bit Entropie pro Wort)
- **48-Stunden-Notfallplan** – Vorbereitung auf Worst-Case-Szenarien
- **"Bist du trackbar?" Quiz** – Teste deine digitale Sicherheit
- **Offline-Downloads** – Alle Materialien als PDF

### Technische Features

- **Nonce-basierte CSP** – Kein `unsafe-inline`, maximale XSS-Prävention
- **IP-Anonymisierung** – Logs enthalten keine IP-Adressen (IPv4 & IPv6)
- **Service Worker** – Offline-Funktionalität mit Update-Benachrichtigung
- **robots.txt** – Kontrolliertes Crawler-Verhalten
- **HSTS Preload** – Erzwungene HTTPS-Verbindungen

---

## Installation

### Voraussetzungen

- Python 3.9 oder höher
- pip (Python Package Manager)
- Git
- (Optional) Virtuelle Umgebung

### Schnellstart

```bash
# Repository klonen
git clone https://github.com/Acephali92/Digitale-Resilienz.git
cd Digitale-Resilienz

# Virtuelle Umgebung erstellen (empfohlen)
python -m venv venv

# Aktivieren (Linux/Mac)
source venv/bin/activate

# Aktivieren (Windows CMD)
venv\Scripts\activate

# Aktivieren (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Abhängigkeiten installieren
pip install -r requirements.txt

# Server starten (Development)
flask run
```

Die Anwendung ist dann unter **http://localhost:5000** erreichbar.

### Windows-Hinweis

Falls `flask run` nicht funktioniert, stelle sicher dass `python-dotenv` installiert ist:

```bash
pip install python-dotenv
```

Die `.flaskenv` Datei setzt automatisch die Entwicklungsumgebung:

```ini
FLASK_ENV=development
FLASK_APP=app.py
FLASK_DEBUG=1
```

---

## Konfiguration

### Umgebungsvariablen

| Variable | Beschreibung | Default | Erforderlich |
|----------|--------------|---------|--------------|
| `FLASK_ENV` | Umgebung: `development`, `production`, `testing` | `production` | Nein |
| `FLASK_APP` | Einstiegspunkt der Anwendung | `app.py` | Nein |
| `FLASK_DEBUG` | Debug-Modus aktivieren | `0` | Nein |
| `SECRET_KEY` | Kryptografischer Schlüssel für Sessions | Auto-generiert (Dev) | **Ja (Production)** |

### SECRET_KEY generieren

Für Production **muss** ein sicherer SECRET_KEY gesetzt werden:

```bash
# Schlüssel generieren
python -c "import secrets; print(secrets.token_hex(32))"

# Setzen (Linux/Mac)
export SECRET_KEY="dein-generierter-schlüssel"

# Setzen (Windows CMD)
set SECRET_KEY=dein-generierter-schlüssel

# Setzen (Windows PowerShell)
$env:SECRET_KEY="dein-generierter-schlüssel"
```

### Konfigurationsklassen

| Klasse | FLASK_ENV | Beschreibung |
|--------|-----------|--------------|
| `DevelopmentConfig` | `development` | Debug aktiv, Auto-SECRET_KEY |
| `ProductionConfig` | `production` | Strenge Sicherheit, SECRET_KEY erforderlich |
| `TestingConfig` | `testing` | Für automatisierte Tests |

---

## Alle Routen & Seiten

### Hauptseiten

| Route | Beschreibung |
|-------|--------------|
| `/` | Startseite – Übersicht aller Bereiche |

### Privatsphäre (`/privacy`)

| Route | Beschreibung |
|-------|--------------|
| `/privacy` | Übersicht Privatsphäre-Tools |
| `/privacy/exif` | EXIF-Metadaten aus Fotos entfernen |
| `/privacy/dsgvo` | DSGVO-Anfragen: Auskunft, Löschung, Widerspruch |
| `/privacy/quiz` | "Bist du trackbar?" – Interaktiver Selbsttest |
| `/privacy/tracking` | Tracking-Vermeidung: IMEI, Fingerprinting, 5G-Mythen |

### Sicherheit (`/security`)

| Route | Beschreibung |
|-------|--------------|
| `/security` | Übersicht Sicherheits-Tools |
| `/security/passwords` | Passwort-Manager Empfehlungen |
| `/security/messengers` | Sichere Messenger im Vergleich |
| `/security/devices` | Geräteschutz: GrapheneOS, BFU/AFU |
| `/security/legal` | Rechtliche Situation: PIN vs. Biometrie (BGH 2025) |
| `/security/2fa` | Zwei-Faktor-Authentifizierung: TOTP, WebAuthn, Hardware-Keys |
| `/security/vpn-tor` | VPN und Tor: Wann nutze ich was? |
| `/security/email` | Sichere E-Mail-Anbieter im Vergleich |
| `/security/backup` | Sichere Backup- und Recovery-Strategien |

### Resilienz (`/resilience`)

| Route | Beschreibung |
|-------|--------------|
| `/resilience` | Übersicht Propaganda-Resilienz |
| `/resilience/sift` | Erweiterte SIFT-Methode für Faktencheck |
| `/resilience/prebunking` | Prebunking-Techniken gegen Desinformation |
| `/resilience/euphemismen` | Euphemismus-Decoder: Propaganda-Sprache entlarven |
| `/resilience/sources` | Unabhängige Nachrichtenquellen mit Transparenz-Infos |

### Aktivismus (`/activism`)

| Route | Beschreibung |
|-------|--------------|
| `/activism` | Übersicht Aktivismus-Tools |
| `/activism/threat-model` | Interaktive Bedrohungsanalyse-Matrix |
| `/activism/demo-checklist` | Demo-Vorbereitungs-Checkliste |
| `/activism/seizure-rights` | Rechte bei Gerätebeschlagnahme |
| `/activism/bezugsgruppen` | Bezugsgruppen: Sichere kollektive Aktion |

### Verschwörungs-Check (`/conspiracy`)

| Route | Beschreibung |
|-------|--------------|
| `/conspiracy` | Übersicht Faktencheck |
| `/conspiracy/filter` | Signal vs. Rauschen – Filter-Tool |

### Friedens-Tools (`/peace`)

| Route | Beschreibung |
|-------|--------------|
| `/peace` | Übersicht Friedens-Tools |
| `/peace/petitions` | Petitions-Tools und Ressourcen |
| `/peace/burnout` | Burnout-Prävention für Aktivist\*innen |
| `/peace/antiwar-networks` | Anti-Kriegs-Netzwerke und Friedensorganisationen |
| `/peace/communication` | Friedenskommunikation: Framing, Storytelling, GFK |

### Interaktive Tools (`/tools`)

| Route | Beschreibung |
|-------|--------------|
| `/tools` | Übersicht aller Tools |
| `/tools/passphrase` | Passphrasen-Generator und -Tester |
| `/tools/plan48h` | 48-Stunden-Notfallplan Generator |
| `/tools/downloads` | Offline-PDF-Downloads |

### System-Routen

| Route | Beschreibung |
|-------|--------------|
| `/robots.txt` | Crawler-Anweisungen (blockiert `/tools/` und `/downloads/`) |
| `/service-worker.js` | Service Worker für Offline-Funktionalität |
| `/downloads/<filename>` | PDF-Downloads |

---

## Sicherheit & Datenschutz

### Unsere Prinzipien

| Prinzip | Umsetzung |
|---------|-----------|
| **Keine Tracker** | Kein Google Analytics, kein Matomo, keine Analyse-Tools |
| **Keine externen Ressourcen** | Alle Fonts, CSS, JS lokal gehostet |
| **Keine Cookies** | Nur technisch notwendige Session-Cookies |
| **DSGVO-konform** | Keine Speicherung personenbezogener Daten |
| **IP-Anonymisierung** | Logs enthalten `[IP]` statt echter Adressen |
| **Tor-kompatibel** | Grundfunktionen ohne JavaScript nutzbar |
| **Offline-fähig** | Service Worker + PDF-Downloads |

### Security Headers

Jede Antwort enthält folgende Sicherheits-Header:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-<random>';
                         style-src 'self' 'nonce-<random>'; img-src 'self' data:;
                         font-src 'self'; frame-ancestors 'none'; form-action 'self';
                         base-uri 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
X-Permitted-Cross-Domain-Policies: none
```

### Cache-Strategie

| Ressource | Cache-Control |
|-----------|---------------|
| HTML-Seiten | `no-store, no-cache, must-revalidate, private` |
| CSS, JS, Fonts, Bilder | `public, max-age=31536000, immutable` |
| Service Worker | `no-cache` |
| robots.txt | `public, max-age=86400` |

### Sicherheitslücken melden

Bitte melde Sicherheitslücken **nicht öffentlich**:

- [GitHub Security Advisory](https://github.com/Acephali92/Digitale-Resilienz/security/advisories) (empfohlen)
- Verschlüsselte E-Mail (PGP-Key auf Anfrage)

---

## Deployment

### Production-Anforderungen

1. **HTTPS ist Pflicht** – HSTS-Header erfordern TLS
2. **SECRET_KEY setzen** – Ohne startet die App nicht
3. **Reverse Proxy** – Flask nicht direkt exponieren

### Mit Gunicorn (Linux)

```bash
# Installation
pip install gunicorn

# Start
SECRET_KEY="dein-key" gunicorn -w 4 -b 127.0.0.1:5000 app:app
```

### Mit Waitress (Windows)

```bash
# Installation
pip install waitress

# Start
set SECRET_KEY=dein-key
waitress-serve --host=127.0.0.1 --port=5000 app:app
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name example.org;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.org;

    ssl_certificate     /etc/letsencrypt/live/example.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.org/privkey.pem;

    # Security Headers (optional, da Flask sie bereits setzt)
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    # Static files caching
    location /static/ {
        alias /path/to/app/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Caddy Reverse Proxy

```caddyfile
example.org {
    reverse_proxy 127.0.0.1:5000
    # Caddy übernimmt HTTPS automatisch via Let's Encrypt
}
```

### Docker (optional)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY . .
ENV FLASK_ENV=production
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

### Tor Hidden Service

Ein `.onion`-Dienst ist geplant, aber noch nicht umgesetzt. Für eigene Einrichtung siehe [Tor Project Docs](https://community.torproject.org/onion-services/).

---

## Entwicklung

### Setup

```bash
# Abhängigkeiten für Entwicklung
pip install -r requirements.txt
pip install pytest pytest-cov flake8 black bandit

# Development Server mit Auto-Reload
flask run --reload
```

### Tests ausführen

```bash
# Alle Tests
pytest tests/ -v

# Mit Coverage-Report
pytest tests/ --cov=app --cov-report=html

# Einzelne Test-Klasse
pytest tests/test_security.py::TestSecurityHeaders -v
```

### Code-Qualität

```bash
# Linting
flake8 app.py config.py

# Formatierung prüfen
black app.py --check

# Formatierung anwenden
black app.py

# Sicherheitsscan
bandit -r app.py config.py
```

### Pre-Commit Hooks (empfohlen)

```bash
pip install pre-commit
pre-commit install
```

---

## Projektstruktur

```
Digitale-Resilienz/
├── app.py                    # Flask-Hauptanwendung
├── config.py                 # Konfigurationsklassen
├── requirements.txt          # Python-Abhängigkeiten
├── .flaskenv                 # Flask-Umgebungsvariablen (Development)
├── .env.example              # Beispiel für Production-Variablen
│
├── templates/                # Jinja2-Templates
│   ├── base.html             # Basis-Layout mit CSP-Nonce
│   ├── index.html            # Startseite
│   ├── risikokompetenz.html  # Risikokompetenz-Seite
│   │
│   ├── privacy/              # Privatsphäre-Bereich
│   │   ├── index.html
│   │   ├── exif.html
│   │   ├── dsgvo.html
│   │   ├── quiz.html
│   │   └── tracking.html
│   │
│   ├── security/             # Sicherheits-Bereich
│   │   ├── index.html
│   │   ├── passwords.html
│   │   ├── messengers.html
│   │   ├── devices.html
│   │   ├── legal.html
│   │   ├── 2fa.html
│   │   ├── vpn-tor.html
│   │   ├── email.html
│   │   └── backup.html
│   │
│   ├── resilience/           # Resilienz-Bereich
│   │   ├── index.html
│   │   ├── sift.html
│   │   ├── prebunking.html
│   │   ├── euphemismen.html
│   │   └── sources.html
│   │
│   ├── activism/             # Aktivismus-Bereich
│   │   ├── index.html
│   │   ├── threat-model.html
│   │   ├── demo-checklist.html
│   │   ├── seizure-rights.html
│   │   └── bezugsgruppen.html
│   │
│   ├── conspiracy/           # Faktencheck-Bereich
│   │   ├── index.html
│   │   └── filter.html
│   │
│   ├── peace/                # Friedens-Bereich
│   │   ├── index.html
│   │   ├── petitions.html
│   │   ├── burnout.html
│   │   ├── antiwar-networks.html
│   │   └── communication.html
│   │
│   ├── tools/                # Interaktive Tools
│   │   ├── index.html
│   │   ├── passphrase.html
│   │   ├── plan48h.html
│   │   └── downloads.html
│   │
│   └── errors/               # Fehlerseiten
│       ├── 404.html
│       └── 500.html
│
├── static/
│   ├── css/
│   │   └── style.css         # Hauptstylesheet
│   ├── js/
│   │   ├── main.js           # Haupt-JavaScript
│   │   ├── passphrase.js     # Passphrasen-Generator (4096 Wörter)
│   │   └── service-worker.js # Offline-Funktionalität
│   ├── img/                  # Bilder & Icons
│   └── downloads/            # Offline-PDFs
│
├── data/
│   └── news_sources.json     # Nachrichtenquellen-Datenbank
│
├── tests/
│   ├── conftest.py           # Pytest-Fixtures
│   ├── test_routes.py        # Routen-Tests
│   ├── test_security.py      # Sicherheits-Tests
│   └── test_static.py        # Static-File-Tests
│
├── docs/
│   └── CONTRIBUTING.md       # Beitragsrichtlinien
│
├── logs/                     # Log-Dateien (auto-generiert)
│   └── widerstands-toolkit.log
│
├── .github/
│   ├── workflows/
│   │   └── ci.yml            # GitHub Actions CI/CD
│   ├── FUNDING.yml           # Sponsoring-Links
│   └── SECURITY.md           # Security Policy
│
├── LICENSE                   # MIT-Lizenz
└── README.md                 # Diese Datei
```

---

## Troubleshooting

### "SECRET_KEY environment variable must be set in production"

**Ursache:** Flask läuft im Production-Modus ohne SECRET_KEY.

**Lösung:**
```bash
# Option 1: Development-Modus verwenden
export FLASK_ENV=development  # Linux/Mac
set FLASK_ENV=development     # Windows CMD

# Option 2: SECRET_KEY setzen
export SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
```

### "http://127.0.0.1:5000 nicht erreichbar"

**Lösungen:**
1. Verwende `http://localhost:5000` statt `127.0.0.1`
2. Prüfe ob Flask läuft: `flask run` in separatem Terminal
3. Prüfe Firewall-Einstellungen
4. Versuche anderen Port: `flask run --port 5001`

### "ModuleNotFoundError: No module named 'flask'"

**Lösung:**
```bash
pip install -r requirements.txt
```

### ".flaskenv wird nicht geladen"

**Lösung:**
```bash
pip install python-dotenv
```

### "Template not found"

**Ursache:** Template-Datei fehlt oder falscher Pfad.

**Lösung:** Prüfe ob alle Templates in `templates/` vorhanden sind.

### Tests schlagen fehl

```bash
# Abhängigkeiten aktualisieren
pip install -r requirements.txt --upgrade

# Tests mit Verbose-Output
pytest tests/ -v --tb=long
```

---

## Mitwirken

Wir freuen uns über Beiträge! Bitte lies zuerst unsere [CONTRIBUTING.md](docs/CONTRIBUTING.md).

### Quick Guide

1. Fork das Repository
2. Erstelle einen Feature-Branch: `git checkout -b feat/neue-funktion`
3. Entwickle und teste lokal
4. Committe mit aussagekräftiger Message: `git commit -m "feat: Beschreibung"`
5. Push zum Branch: `git push origin feat/neue-funktion`
6. Öffne einen Pull Request

### Commit-Konventionen

```
feat:     Neue Funktion
fix:      Bugfix
docs:     Dokumentation
style:    Formatierung (kein Code-Change)
refactor: Code-Umstrukturierung
test:     Tests hinzufügen/ändern
chore:    Wartungsarbeiten
security: Sicherheitsverbesserung
```

### Was wird gebraucht?

- **Übersetzungen** – Englische Version
- **Inhalte** – Neue Guides und Anleitungen
- **Tests** – Mehr Test-Coverage
- **Accessibility** – Barrierefreiheit verbessern
- **Design** – UI/UX-Verbesserungen

---

## Lizenz

MIT License – siehe [LICENSE](LICENSE)

Du darfst dieses Projekt frei verwenden, modifizieren und verteilen.

---

## Danksagungen

Dieses Projekt baut auf der Arbeit vieler auf:

- [datenanfragen.de](https://www.datenanfragen.de/) – DSGVO-Tools und Templates
- [Electronic Frontier Foundation](https://www.eff.org/) – Surveillance Self-Defense Guides
- [Tactical Tech](https://tacticaltech.org/) – Data Detox Kit
- [Rote Hilfe e.V.](https://www.rote-hilfe.de/) – Rechtliche Unterstützung für Aktivist\*innen
- [SecuChart](https://berty.tech/faq#what-is-the-chat-apps-chart) – Messenger-Vergleichsmethodik
- [OWASP](https://owasp.org/) – Security Best Practices

---

## Kontakt & Support

- **GitHub Issues**: [github.com/Acephali92/Digitale-Resilienz/issues](https://github.com/Acephali92/Digitale-Resilienz/issues)
- **Sicher kommunizieren**: Nutze Signal oder verschlüsselte E-Mail
- **Spenden**: [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/acephali)

---

<p align="center">
  <strong>Widerstand ist fruchtbar. Schütze dich. Vernetze dich. Bleib wachsam.</strong>
</p>

<p align="center">
  Made with resistance by activists, for activists.
</p>
