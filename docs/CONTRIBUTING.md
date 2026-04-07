# Mitarbeit am Widerstands-Toolkit

**Digitale Resilienz ist kein Luxus – sie ist eine Notwendigkeit.**

---

## Willkommen

Du hast dieses Repository gefunden, weil du verstehst: Wir leben in einer Welt, in der Überwachung nicht die Ausnahme, sondern die Infrastruktur ist. Konzerne sammeln, Staaten aggregieren, Algorithmen kategorisieren. Dieses Projekt existiert, um dem etwas entgegenzusetzen.

Das **Widerstands-Toolkit** baut Werkzeuge für Menschen, die ihre digitale Selbstbestimmung nicht an der Garderobe abgeben wollen. Für Aktivisten, die auf Demos gehen. Für Journalisten, die unbequeme Fragen stellen. Für alle, die verstanden haben, dass „Ich habe nichts zu verbergen" der Satz derer ist, die noch nie Ziel eines Machtapparats waren.

Wenn du zu diesem Projekt beiträgst, baust du nicht nur Software. Du baust Infrastruktur für Widerstand.

---

## Grundwerte

### 1. Autonomie über Abhängigkeit

Jede Architekturentscheidung fragt: **Erhöht das die Kontrolle der Nutzer\*innen über ihre eigenen Daten?**

- Wir bevorzugen clientseitige Verarbeitung gegenüber Server-Roundtrips
- Wir bevorzugen lokale Speicherung gegenüber Cloud-Diensten
- Wir bevorzugen Offline-Funktionalität gegenüber Always-On-Anforderungen
- Wir bevorzugen Open Source gegenüber proprietären Abhängigkeiten

**Beispiel:** Der Passphrase-Generator (`static/js/passphrase.js`) läuft vollständig im Browser. Keine Passphrase verlässt jemals das Gerät. Das ist kein Feature – das ist ein Prinzip.

### 2. Dezentralisierung über Zentralisierung

Zentralisierte Systeme sind Honeypots. Sie konzentrieren Macht und Daten an einem Punkt, der kompromittiert, beschlagnahmt oder abgeschaltet werden kann.

- Keine externen CDNs für Fonts oder JavaScript-Bibliotheken
- Keine Analytics-Dienste, auch keine „datenschutzfreundlichen"
- Keine Abhängigkeit von Diensten einzelner Anbieter
- Alle Assets werden lokal ausgeliefert

**Das bedeutet konkret:** Wenn du eine Bibliothek hinzufügen willst, muss sie lokal eingebunden werden. Wenn du einen externen Dienst integrieren willst, muss die Antwort lauten: „Warum können wir das nicht selbst?"

### 3. Klarheit über Verschleierung

Machtverhältnisse existieren. Wir benennen sie.

- Wir sagen „Überwachung", nicht „Datenerhebung zur Serviceverbesserung"
- Wir sagen „Tech-Monopole", nicht „führende Digitalunternehmen"
- Wir sagen „Staatliche Repression", nicht „Sicherheitsmaßnahmen"

In der Dokumentation, im Code, in den Commit-Messages: Klartext. Euphemismen sind das Werkzeug derer, die Verantwortung verwischen wollen.

### 4. Datensparsamkeit als Imperativ

**Was wir nicht haben, können wir nicht verlieren.**

Dieser Grundsatz gilt nicht nur für die Anwendung selbst, sondern für den gesamten Entwicklungsprozess:

- Commits enthalten keine personenbezogenen Daten
- Pull Requests enthalten keine echten Nutzerdaten
- Logs protokollieren keine IP-Adressen oder Identifikatoren
- Screenshots in Issues zeigen keine realen Informationen

---

## Arten der Mitarbeit

### Code-Beiträge

**Was wir suchen:**
- Neue Werkzeuge für digitale Selbstverteidigung
- Sicherheitsverbesserungen (CSP-Härtung, Input-Validierung)
- Performance-Optimierungen (weniger ist mehr)
- Barrierefreiheit (a11y) – Widerstand muss für alle zugänglich sein
- Offline-Funktionalität (Service Worker, PWA)

**Was wir nicht suchen:**
- Tracking jeder Art (auch nicht „anonymisiert")
- Abhängigkeiten von zentralisierten Diensten
- Komplexität ohne klaren Nutzen
- Frameworks um der Frameworks willen

### Dokumentation

Gute Dokumentation ist Multiplikator. Sie ermöglicht Menschen, sich selbst zu helfen.

- **Anleitungen übersetzen:** Das Toolkit soll perspektivisch mehrsprachig werden
- **Erklärungen verbessern:** Sicherheitskonzepte verständlich machen
- **Fehler korrigieren:** Tippfehler, veraltete Informationen, unklare Formulierungen

### Sicherheits-Audits

Du hast Erfahrung mit Penetration Testing oder Security Research? Wir brauchen dich.

**Fokusgebiete:**
- XSS-Vektoren in Templates und JavaScript
- CSRF-Schutz
- CSP-Bypasses
- Informationslecks in HTTP-Headern
- Timing-Attacks in kryptographischen Operationen

**Responsible Disclosure:** Sicherheitslücken meldest du **nicht** über öffentliche Issues. Nutze stattdessen:
- [GitHub Security Advisories](https://github.com/Acephali92/Digitale-Resilienz/security/advisories)
- Verschlüsselte E-Mail (GPG-Key im Repository)

### Inhaltliche Beiträge

- Neue Quellen für `data/news_sources.json` (mit Belegen für die Bewertungen)
- Aktualisierungen zu rechtlichen Informationen
- Korrekturen bei Sicherheitsempfehlungen

---

## Technisches Setup

### Voraussetzungen

```
Python >= 3.9
pip (aktuell)
Git
Ein Terminal, das du verstehst
```

### Lokale Entwicklungsumgebung

```bash
# 1. Repository klonen
git clone git@github.com:Acephali92/Digitale-Resilienz.git
cd Digitale-Resilienz

# 2. Virtuelle Umgebung erstellen und aktivieren
python -m venv .venv

# Linux/macOS:
source .venv/bin/activate

# Windows (PowerShell):
.venv\Scripts\Activate.ps1

# Windows (CMD):
.venv\Scripts\activate.bat

# 3. Abhängigkeiten installieren
pip install -r requirements.txt

# 4. Umgebungsvariablen konfigurieren
cp .env.example .env
# SECRET_KEY generieren:
python -c "import os; print(os.urandom(32).hex())"
# Diesen Wert in .env eintragen

# 5. Entwicklungsserver starten
flask run --debug

# Anwendung läuft unter http://127.0.0.1:5000
```

### Verzeichnisstruktur verstehen

```
Digitale-Resilienz/
├── app.py                 # Flask-Anwendung, Routen, Security-Header
├── config.py              # Konfigurationsklassen (Dev/Prod/Test)
├── requirements.txt       # Python-Abhängigkeiten (minimal halten!)
├── templates/             # Jinja2-Templates
│   ├── base.html          # Basis-Layout, Navigation, Footer
│   ├── privacy/           # Datenschutz-Werkzeuge
│   ├── security/          # Sicherheits-Guides
│   ├── resilience/        # Medienkompetenz, Quellen
│   ├── activism/          # Aktivismus-Tools
│   ├── conspiracy/        # Faktencheck
│   ├── peace/             # Friedens-Ressourcen
│   ├── tools/             # Interaktive Werkzeuge
│   └── errors/            # Fehlerseiten
├── static/
│   ├── css/style.css      # Gesamtes Styling (kein Framework)
│   ├── js/                # Clientseitige Logik
│   │   ├── main.js        # Matrix-Effekt, Navigation
│   │   ├── passphrase.js  # Kryptografischer Generator
│   │   ├── secuchart.js   # Interaktive Vergleichstabelle
│   │   └── quiz.js        # Trackbarkeits-Quiz
│   ├── fonts/             # Lokal gehostete Schriften
│   └── img/               # Bilder, Icons
├── data/
│   └── news_sources.json  # Strukturierte Quellendatenbank
├── tests/                 # pytest-Testsuite
│   ├── conftest.py        # Fixtures
│   ├── test_routes.py     # Erreichbarkeit aller Routen
│   ├── test_security.py   # Security-Header-Tests
│   └── test_static.py     # Statische Assets
└── docs/
    └── CONTRIBUTING.md    # Diese Datei
```

### Code-Qualität sicherstellen

Bevor du einen Commit erstellst:

```bash
# Linting
flake8 app.py config.py --max-line-length=120

# Formatierung prüfen
black app.py config.py --check

# Formatierung anwenden
black app.py config.py

# Sicherheitsscan
bandit -r app.py config.py

# Tests ausführen
pytest tests/ -v

# Tests mit Coverage
pytest tests/ -v --cov=. --cov-report=term-missing
```

**Ziel:** Alle Checks müssen grün sein, bevor du pushst.

---

## Entwicklungsworkflow

### Branching-Strategie

```
main
  │
  ├── feat/passphrase-entropy    # Neue Features
  ├── fix/csp-header-bypass      # Bugfixes
  ├── docs/threat-model-update   # Dokumentation
  ├── sec/input-validation       # Sicherheitsverbesserungen
  └── refactor/blueprint-routes  # Refactoring
```

**Branch-Namenskonvention:** `<typ>/<kurze-beschreibung>`

| Präfix | Verwendung |
|--------|------------|
| `feat/` | Neue Funktionalität |
| `fix/` | Fehlerbehebung |
| `sec/` | Sicherheitsverbesserung |
| `docs/` | Dokumentation |
| `refactor/` | Code-Umstrukturierung ohne Funktionsänderung |
| `test/` | Tests hinzufügen oder verbessern |
| `style/` | Formatierung, keine Logik-Änderungen |

### Commit-Messages

Wir folgen [Conventional Commits](https://www.conventionalcommits.org/):

```
<typ>(<scope>): <beschreibung>

[optionaler body]

[optionaler footer]
```

**Beispiele:**

```bash
# Feature
git commit -m "feat(passphrase): add entropy display for generated phrases"

# Sicherheitsfix
git commit -m "fix(security): remove unsafe-inline from CSP script-src"

# Dokumentation
git commit -m "docs(readme): clarify offline installation steps"

# Breaking Change
git commit -m "feat(api)!: change news_sources.json schema

BREAKING CHANGE: properties_meta.categories is now required"
```

**Sprache:** Commit-Messages auf Englisch. Das erleichtert internationale Zusammenarbeit.

### Lokale Tests vor Push

```bash
# Vollständige Prüfung
black app.py config.py --check && \
flake8 app.py config.py --max-line-length=120 && \
bandit -r app.py config.py -ll && \
pytest tests/ -v

# Bei Erfolg: Push
git push origin feat/dein-feature
```

---

## Pull Request Prozess

### 1. Vorbereitung

- [ ] Alle lokalen Tests bestanden
- [ ] Code mit `black` formatiert
- [ ] Keine `flake8`-Warnungen
- [ ] Keine `bandit`-Findings (HIGH/MEDIUM)
- [ ] Keine PII in Code, Commits oder Screenshots
- [ ] CHANGELOG.md aktualisiert (falls vorhanden)

### 2. PR erstellen

**Titel:** Folgt dem Commit-Message-Format
```
feat(tools): add secure note encryption tool
```

**Beschreibung:** Nutze das Template:

```markdown
## Zusammenfassung
<!-- Was macht dieser PR? Warum? -->

## Änderungen
-
-
-

## Sicherheitsrelevanz
<!-- Betrifft dieser PR sicherheitskritische Bereiche? -->
- [ ] Ja – Review durch Security-affine Person erforderlich
- [ ] Nein

## Screenshots
<!-- Falls UI-Änderungen, Screenshots OHNE PII -->

## Testplan
- [ ] Bestehende Tests laufen durch
- [ ] Neue Tests für neue Funktionalität
- [ ] Manuell in Firefox getestet
- [ ] Manuell in Tor Browser getestet
- [ ] Funktioniert ohne JavaScript
```

### 3. Review-Prozess

**Was wir prüfen:**

1. **Sicherheit:** Keine neuen Angriffsvektoren? XSS? CSRF? Informationslecks?
2. **Privatsphäre:** Werden Daten gesammelt? An wen? Warum?
3. **Abhängigkeiten:** Neue externe Abhängigkeiten müssen begründet werden
4. **Komplexität:** Ist die Lösung so einfach wie möglich?
5. **Barrierefreiheit:** Funktioniert es mit Screenreader? Ohne Maus?
6. **Offline:** Funktioniert es ohne Internetverbindung?

**Feedback:** Wir geben konstruktives, technisch präzises Feedback. Nimm es nicht persönlich – wir schützen das Projekt, nicht unsere Egos.

### 4. Merge

Nach Approval wird der PR von einem Maintainer via **Squash and Merge** zusammengeführt. Das hält die Git-History sauber.

---

## Code-Standards

### Python

```python
# Imports: Standard Library, Third-Party, Local
import os
import json

from flask import Flask, render_template

from config import Config

# Funktionen: Klare Namen, Docstrings für nicht-triviale Logik
def calculate_entropy(passphrase: str, word_count: int) -> int:
    """
    Calculate entropy bits for a passphrase.

    Args:
        passphrase: The generated passphrase
        word_count: Number of words used

    Returns:
        Estimated entropy in bits
    """
    # Implementation

# Fehlerbehandlung: Explizit, niemals silent
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    app.logger.error(f"Required file not found: {file_path}")
    raise
except json.JSONDecodeError as e:
    app.logger.error(f"Invalid JSON in {file_path}: {e}")
    raise
```

### JavaScript

```javascript
// Strict Mode: Immer
'use strict';

// IIFE für Isolation
(function() {
    // Kryptografisch sichere Zufallszahlen
    function secureRandom(max) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] % max;
    }

    // DOM-Manipulation: Niemals innerHTML mit User-Daten
    // FALSCH:
    element.innerHTML = userInput;

    // RICHTIG:
    element.textContent = userInput;
    // oder
    const div = document.createElement('div');
    div.textContent = userInput;
    element.appendChild(div);

    // Event-Handler: Passiv wo möglich
    element.addEventListener('scroll', handler, { passive: true });
})();
```

### HTML/Jinja2

```html
<!-- Accessibility: Immer -->
<button
    class="nav-toggle"
    aria-label="Menü öffnen"
    aria-expanded="false"
    aria-controls="nav-menu">

<!-- Escaping: Automatisch durch Jinja2, aber bewusst sein -->
{{ user_input }}          <!-- escaped -->
{{ user_input | safe }}   <!-- GEFÄHRLICH - nur für trusted content -->

<!-- Externe Links: Immer mit Schutz -->
<a href="https://example.org"
   target="_blank"
   rel="noopener noreferrer">
   Link
</a>

<!-- Bilder: Alt-Text pflicht -->
<img src="image.png" alt="Beschreibender Text" loading="lazy">
```

### CSS

```css
/* Custom Properties für Konsistenz */
:root {
    --color-matrix: #00ff41;
    --space-md: 1rem;
}

/* Keine ID-Selektoren für Styling */
/* FALSCH: */
#main-content { }

/* RICHTIG: */
.main-content { }

/* Accessibility: Reduced Motion respektieren */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* High Contrast Support */
@media (prefers-contrast: high) {
    .card {
        border-width: 2px;
    }
}
```

---

## Sicherheitsrichtlinien

### Was in Commits NIEMALS erscheinen darf

- API-Keys, Tokens, Passwörter
- Echte E-Mail-Adressen
- Echte Namen (außer in der Attribution)
- IP-Adressen
- Session-IDs
- Jegliche PII (Personally Identifiable Information)

### Prüfung vor Commit

```bash
# Durchsuche staged files nach Patterns
git diff --cached | grep -iE "(api[_-]?key|secret|password|token|@.*\.(de|com|org))"

# Falls etwas gefunden: NICHT committen
git reset HEAD <datei>
```

### Security-Header Checkliste

Jede Route muss diese Header setzen (passiert automatisch via `@app.after_request`):

| Header | Erwarteter Wert |
|--------|-----------------|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'nonce-...'` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `no-referrer` |
| Permissions-Policy | `geolocation=(), camera=(), microphone=()` |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` |

---

## Verhaltenskodex

### Was wir fördern

- **Lösungsorientierung:** Kritik benennt das Problem UND schlägt einen Weg vor
- **Technische Präzision:** Behauptungen mit Evidenz belegen
- **Transparente Kommunikation:** Sag, was du meinst. Mein, was du sagst.
- **Respektvoller Dissens:** Uneinigkeit ist produktiv, wenn sie sachlich bleibt
- **Geduld mit Lernenden:** Jeder hat mal angefangen

### Was wir nicht tolerieren

- Persönliche Angriffe oder Beleidigungen
- Diskriminierung jeder Form
- Doxxing oder Veröffentlichung privater Informationen
- Trolling oder absichtlich destruktives Verhalten
- Kommerzielle Werbung ohne Kontext

### Konfliktlösung

1. **Direkt ansprechen:** Die meisten Konflikte lösen sich durch ein klärendes Gespräch
2. **Maintainer einbeziehen:** Wenn direkte Klärung scheitert
3. **Temporäre Suspendierung:** Bei wiederholten Verstößen
4. **Permanenter Ausschluss:** Bei schwerwiegenden Verstößen

### Keine Stellvertreter-Diskussionen

Dieses Projekt hat eine klare politische Haltung: Es steht auf der Seite derer, die sich gegen Überwachung und für digitale Selbstbestimmung einsetzen. Wir führen keine Grundsatzdiskussionen darüber, ob Überwachung vielleicht doch ihre Berechtigung hat.

Wenn du damit nicht einverstanden bist, ist das dein Recht. Aber dann ist dieses Projekt nicht das richtige für dich.

---

## Erste Schritte für Neue

### Good First Issues

Wir taggen Issues, die sich für den Einstieg eignen, mit:
- `good first issue` – Überschaubare Aufgaben mit klarem Scope
- `documentation` – Textarbeit ohne tiefes Code-Verständnis
- `help wanted` – Wir brauchen Unterstützung

### Fragen stellen

- **GitHub Discussions:** Für allgemeine Fragen
- **Issues:** Für konkrete Bugs oder Feature-Requests
- **Nicht:** E-Mail an individuelle Maintainer (wir wollen Wissen teilen, nicht horten)

### Mentoring

Wenn du dich unsicher fühlst: Sag es. Wir helfen gern. Niemand wird für Fragen kritisiert. Wir kritisieren nur, wenn jemand so tut, als wüsste er alles, und dann die Codebasis kaputt macht.

---

## Danksagung

Jeder Beitrag zu diesem Projekt ist ein Beitrag zur digitalen Selbstverteidigung von Menschen, die ihn brauchen. Danke, dass du deine Zeit und deine Fähigkeiten einbringst.

**Widerstand ist fruchtbar.**

---

*Letzte Aktualisierung: April 2025*
