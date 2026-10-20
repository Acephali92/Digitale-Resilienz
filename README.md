# Widerstands-Toolkit

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-OWASP-orange)](https://owasp.org/)

**Digitale Resilienz für Aktivisten, Journalisten und kritische Bürger**

Eine Plattform für digitale Selbstverteidigung und Aktivismus. Keine Tracker. Keine Überwachung. Deine Daten bleiben bei dir.

<img width="1839" height="865" alt="Widerstands-Toolkit Screenshot" src="https://github.com/user-attachments/assets/e56b9aa2-f8dc-421c-82d0-3a726ceed176" />

---

## Inhaltsverzeichnis

- [Warum dieses Projekt?](#warum-dieses-projekt)
- [Features](#features)
- [Quickstart](#quickstart)
- [Konfiguration](#konfiguration)
- [Deployment](#deployment)
- [Entwicklung](#entwicklung)
- [Projektstruktur](#projektstruktur)
- [Contributing](#contributing)
- [Lizenz](#lizenz)

---

## Warum dieses Projekt?

In einer Zeit zunehmender digitaler Überwachung brauchen Menschen Werkzeuge zum Schutz. Das Widerstands-Toolkit bietet:

| Zielgruppe | Nutzen |
|------------|--------|
| **Aktivisten** | Schutz bei Demos und Aktionen |
| **Journalisten** | Sichere Kommunikation und Quellenschutz |
| **Kritische Bürger** | Digitale Selbstverteidigung im Alltag |
| **Zivilgesellschaft** | Resilienz gegen Überwachung und Propaganda |

**Kernprinzipien:**
- Praktische Anleitungen statt Theorie
- Lokale Ausführung - alle Daten bleiben auf deinem Gerät
- Offline-Verfügbarkeit ohne Internetabhängigkeit
- Keine Big-Tech-Abhängigkeiten (keine Google Fonts, keine CDNs)

---

## Features

### Bereiche

| Bereich | Beschreibung |
|---------|--------------|
| **Privatsphäre** | EXIF-Entfernung, DSGVO-Anfragen, Tracking-Vermeidung |
| **Sicherheit** | Passwort-Manager, 2FA, Messenger, VPN/Tor, E-Mail-Verschlüsselung |
| **Resilienz** | SIFT-Methode, Prebunking, Euphemismus-Decoder |
| **Aktivismus** | Bedrohungsanalyse, Demo-Checklisten, Beschlagnahme-Rechte |
| **Faktencheck** | Verschwörungs-Filter, Narrativ-Analyse |
| **Frieden** | Petitions-Tools, Burnout-Prävention, Gewaltfreie Kommunikation |

### Interaktive Tools

- **Passphrasen-Generator** - Sichere, merkbare Passwörter (4096 Wörter, ~12 Bit Entropie pro Wort)
- **48-Stunden-Notfallplan** - Vorbereitung auf Worst-Case-Szenarien
- **Offline-Downloads** - Alle Materialien als PDF
- **Open-Source Tool-Sammlung** - Kuratierte Auswahl an Privacy-Tools

### Technische Sicherheit

```
Content-Security-Policy    Nonce-basiert, kein unsafe-inline
IP-Anonymisierung          Logs enthalten keine IP-Adressen
Service Worker             Offline-Funktionalität
HSTS Preload              Erzwungene HTTPS-Verbindungen
```

---

## Quickstart

### Voraussetzungen

- Python 3.9+
- pip
- Git

### Installation

```bash
# Repository klonen
git clone https://github.com/Acephali92/Digitale-Resilienz.git
cd Digitale-Resilienz

# Virtuelle Umgebung erstellen
python -m venv venv

# Aktivieren
source venv/bin/activate        # Linux/Mac
venv\Scripts\activate           # Windows CMD
.\venv\Scripts\Activate.ps1     # Windows PowerShell

# Abhängigkeiten installieren
pip install -r requirements.txt

# Server starten
flask run
```

Die Anwendung ist unter **http://localhost:5000** erreichbar.

---

## Konfiguration

### Umgebungsvariablen

| Variable | Beschreibung | Default |
|----------|--------------|---------|
| `FLASK_ENV` | `development` / `production` / `testing` | `production` |
| `FLASK_DEBUG` | Debug-Modus | `0` |
| `SECRET_KEY` | Kryptografischer Schlüssel | *Auto (Dev)* |

### SECRET_KEY generieren (Production)

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## Deployment

### Production-Anforderungen

1. HTTPS ist Pflicht (HSTS-Header erfordern TLS)
2. SECRET_KEY muss gesetzt sein
3. Reverse Proxy verwenden (Flask nicht direkt exponieren)

### Mit Gunicorn (Linux)

```bash
pip install gunicorn
SECRET_KEY="dein-key" gunicorn -w 4 -b 127.0.0.1:5000 app:app
```

### Mit Waitress (Windows)

```bash
pip install waitress
set SECRET_KEY=dein-key
waitress-serve --host=127.0.0.1 --port=5000 app:app
```

### Docker

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

---

## Entwicklung

### Setup

```bash
pip install -r requirements.txt
pip install pytest pytest-cov flake8 black bandit

flask run --reload
```

### Tests

```bash
pytest tests/ -v                          # Alle Tests
pytest tests/ --cov=app --cov-report=html # Mit Coverage
```

### Code-Qualität

```bash
flake8 app.py config.py    # Linting
black app.py --check       # Format prüfen
bandit -r app.py config.py # Sicherheitsscan
```

---

## Projektstruktur

```
Digitale-Resilienz/
├── app.py                 # Flask-Hauptanwendung
├── config.py              # Konfigurationsklassen
├── requirements.txt       # Python-Abhängigkeiten
│
├── templates/             # Jinja2-Templates
│   ├── base.html          # Basis-Layout mit CSP-Nonce
│   ├── index.html         # Startseite
│   ├── privacy/           # Privatsphäre-Bereich
│   ├── security/          # Sicherheits-Bereich
│   ├── resilience/        # Resilienz-Bereich
│   ├── activism/          # Aktivismus-Bereich
│   ├── conspiracy/        # Faktencheck-Bereich
│   ├── peace/             # Friedens-Bereich
│   ├── tools/             # Interaktive Tools
│   └── errors/            # Fehlerseiten
│
├── static/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript
│   ├── img/               # Bilder & Icons
│   └── downloads/         # Offline-PDFs
│
├── data/                  # JSON-Datenbanken
├── tests/                 # Pytest-Tests
└── docs/                  # Dokumentation
```

### Routen-Übersicht

| Bereich | Route | Beschreibung |
|---------|-------|--------------|
| Home | `/` | Startseite |
| Privatsphäre | `/privacy` | EXIF, DSGVO, Tracking |
| Sicherheit | `/security` | Passwörter, Messenger, 2FA, VPN |
| Resilienz | `/resilience` | SIFT, Prebunking, Quellen |
| Aktivismus | `/activism` | Bedrohungsmodell, Demo-Checkliste |
| Faktencheck | `/conspiracy` | Filter-Tool |
| Frieden | `/peace` | Petitionen, Burnout, Kommunikation |
| Tools | `/tools` | Passphrase, Notfallplan, Downloads |

---

## Contributing

Wir freuen uns über Beiträge! Siehe [CONTRIBUTING.md](docs/CONTRIBUTING.md).

### Quick Guide

1. Fork das Repository
2. Feature-Branch erstellen: `git checkout -b feat/neue-funktion`
3. Entwickeln und testen
4. Commit: `git commit -m "feat: Beschreibung"`
5. Push: `git push origin feat/neue-funktion`
6. Pull Request öffnen

### Commit-Konventionen

| Prefix | Verwendung |
|--------|------------|
| `feat:` | Neue Funktion |
| `fix:` | Bugfix |
| `docs:` | Dokumentation |
| `refactor:` | Code-Umstrukturierung |
| `test:` | Tests |
| `security:` | Sicherheitsverbesserung |

### Gesucht

- Übersetzungen (Englisch)
- Neue Guides und Anleitungen
- Mehr Test-Coverage
- Accessibility-Verbesserungen

---

## Sicherheit

### Prinzipien

| Prinzip | Umsetzung |
|---------|-----------|
| Keine Tracker | Kein Analytics, keine Analyse-Tools |
| Keine externen Ressourcen | Alle Assets lokal gehostet |
| Keine Cookies | Nur technisch notwendige Sessions |
| IP-Anonymisierung | `[IP]` statt echter Adressen in Logs |
| Tor-kompatibel | Grundfunktionen ohne JS nutzbar |

### Sicherheitslücken melden

Bitte **nicht öffentlich** melden:
- [GitHub Security Advisory](https://github.com/Acephali92/Digitale-Resilienz/security/advisories) (empfohlen)
- Verschlüsselte E-Mail (PGP-Key auf Anfrage)

---

## Lizenz

[MIT License](LICENSE) - Frei verwendbar, modifizierbar und verteilbar.

---

## Danksagungen

- [datenanfragen.de](https://www.datenanfragen.de/) - DSGVO-Tools
- [Electronic Frontier Foundation](https://www.eff.org/) - Surveillance Self-Defense
- [Tactical Tech](https://tacticaltech.org/) - Data Detox Kit
- [OWASP](https://owasp.org/) - Security Best Practices

---

<p align="center">
  <strong>Widerstand ist fruchtbar. Schütze dich. Vernetze dich. Bleib wachsam.</strong>
</p>

<p align="center">
  <a href="https://github.com/Acephali92/Digitale-Resilienz/issues">Issues</a> ·
  <a href="https://ko-fi.com/acephali">Support</a>
</p>
