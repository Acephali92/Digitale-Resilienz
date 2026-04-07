# Widerstands-Toolkit

**Digitale Resilienz für Aktivisten**

Eine Plattform für digitale Selbstverteidigung und Aktivismus. Keine Tracker. Keine Überwachung. Deine Daten bleiben bei dir.

---

## Über dieses Projekt

Das Widerstands-Toolkit ist ein umfassendes Werkzeugset für:

- **Friedensaktivisten** – Schutz bei Demos und Aktionen
- **Kritische Bürger** – Digitale Selbstverteidigung im Alltag
- **Journalisten & Whistleblower** – Sichere Kommunikation
- **Zivilgesellschaft** – Resilienz gegen Überwachung und Propaganda

### Kernfunktionen

| Bereich | Inhalt |
|---------|--------|
| **Privatsphäre** | EXIF-Entfernung, DSGVO-Anfragen, Tracking-Vermeidung |
| **Sicherheit** | Passwort-Manager, 2FA, Messenger, Geräteschutz |
| **Resilienz** | SIFT-Methode, Prebunking, unabhängige Quellen |
| **Aktivismus** | Bedrohungsanalyse, Demo-Checklisten, Rechte |
| **Faktencheck** | Signal vs. Rauschen, Narrativ-Analyse |
| **Frieden** | Petitions-Tools, Anti-Kriegs-Netzwerke, Burnout-Prävention |

---

## Installation

### Voraussetzungen

- Python 3.9+
- pip (Python Package Manager)
- Git

### Schnellstart

```bash
# Repository klonen
git clone git@github.com:Acephali92/Digitale-Resilienz.git
cd Digitale-Resilienz

# Virtuelle Umgebung erstellen
python -m venv venv

# Aktivieren (Linux/Mac)
source venv/bin/activate

# Aktivieren (Windows)
venv\Scripts\activate

# Abhängigkeiten installieren
pip install -r requirements.txt

# Umgebungsvariablen kopieren
cp .env.example .env

# Server starten
flask run
```

Die Anwendung ist dann unter `http://127.0.0.1:5000` erreichbar.

### Entwicklungsmodus

```bash
export FLASK_ENV=development
export FLASK_DEBUG=1
flask run
```

---

## Projektstruktur

```
Digitale-Resilienz/
├── app.py                  # Flask-Anwendung
├── config.py               # Konfiguration
├── requirements.txt        # Python-Abhängigkeiten
├── templates/              # Jinja2-Templates
│   ├── base.html           # Basis-Layout
│   ├── index.html          # Startseite
│   ├── privacy/            # Privatsphäre-Bereich
│   ├── security/           # Sicherheits-Bereich
│   ├── resilience/         # Resilienz-Bereich
│   ├── activism/           # Aktivismus-Bereich
│   ├── conspiracy/         # Faktencheck-Bereich
│   ├── peace/              # Friedens-Bereich
│   └── tools/              # Interaktive Tools
├── static/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript
│   ├── img/                # Bilder & Icons
│   └── downloads/          # Offline-PDFs
├── data/                   # JSON-Daten
├── tests/                  # Tests
└── docs/                   # Dokumentation
```

---

## Sicherheit & Datenschutz

### Unsere Prinzipien

- **Keine Tracker** – Wir nutzen keine Analyse-Tools
- **Keine Cookies** – Außer technisch notwendige Session-Cookies
- **Keine externen Ressourcen** – Alle Assets sind lokal gehostet
- **DSGVO-konform** – Wir sammeln keine personenbezogenen Daten
- **Tor-kompatibel** – Funktioniert auch ohne JavaScript
- **Offline-fähig** – Alle Materialien als PDF downloadbar

### Content Security Policy

Wir nutzen strenge CSP-Header, um XSS und andere Angriffe zu verhindern:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'
```

### Sicherheitslücken melden

Bitte melde Sicherheitslücken **nicht öffentlich**. Sende stattdessen eine verschlüsselte E-Mail oder nutze den [GitHub Security Advisory](https://github.com/Acephali92/Digitale-Resilienz/security/advisories).

---

## Mitwirken

Wir freuen uns über Beiträge! Bitte lies zuerst unsere [CONTRIBUTING.md](docs/CONTRIBUTING.md).

### Entwicklung

```bash
# Tests ausführen
pytest tests/ -v

# Code-Qualität prüfen
flake8 app.py
black app.py --check

# Sicherheitsscan
bandit -r app.py
```

### Pull Requests

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feat/neue-funktion`)
3. Committe deine Änderungen (`git commit -m "feat: Beschreibung"`)
4. Push zum Branch (`git push origin feat/neue-funktion`)
5. Öffne einen Pull Request

---

## Lizenz

MIT License – siehe [LICENSE](LICENSE)

---

## Danksagungen

Dieses Projekt baut auf der Arbeit vieler auf:

- [datenanfragen.de](https://www.datenanfragen.de/) – DSGVO-Tools
- [Electronic Frontier Foundation](https://www.eff.org/) – Surveillance Self-Defense
- [Tactical Tech](https://tacticaltech.org/) – Data Detox Kit
- [Rote Hilfe e.V.](https://www.rote-hilfe.de/) – Rechtliche Unterstützung

---

## Kontakt

- **GitHub Issues**: [github.com/Acephali92/Digitale-Resilienz/issues](https://github.com/Acephali92/Digitale-Resilienz/issues)
- **Sicher kommunizieren**: Nutze Signal oder verschlüsselte E-Mail

---

**Widerstand ist fruchtbar. Schütze dich. Vernetze dich. Bleib wachsam.**
