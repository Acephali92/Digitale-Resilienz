#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Widerstands-Toolkit - Digitale Resilienz für Aktivist*innen
============================================================
Eine Plattform für digitale Selbstverteidigung und Aktivismus.
Keine Tracker. Keine Überwachung. Deine Daten bleiben bei dir.
"""

import os
import json
import secrets
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, render_template, send_from_directory, request, g
from functools import wraps

# Initialize Flask app
app = Flask(__name__)

# Configure logging
def setup_logging(app):
    """Configure structured logging for production use."""
    # Ensure logs directory exists
    if not os.path.exists('logs'):
        os.makedirs('logs')

    # File handler with rotation
    file_handler = RotatingFileHandler(
        'logs/widerstands-toolkit.log',
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    # Console handler for development
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s'
    ))
    console_handler.setLevel(logging.DEBUG if app.debug else logging.WARNING)
    app.logger.addHandler(console_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('Widerstands-Toolkit startup')

setup_logging(app)
app.config.from_object('config.Config')


# ============================================================================
# SECURITY MIDDLEWARE
# ============================================================================

@app.before_request
def generate_csp_nonce():
    """Generate a cryptographically secure nonce for CSP."""
    g.csp_nonce = secrets.token_urlsafe(32)


@app.context_processor
def inject_csp_nonce():
    """Make CSP nonce available in all templates."""
    return {'csp_nonce': getattr(g, 'csp_nonce', '')}


@app.after_request
def add_security_headers(response):
    """Add security headers to every response - no tracking, maximum privacy."""
    nonce = getattr(g, 'csp_nonce', '')

    # Content Security Policy - strict, nonce-based for inline scripts/styles
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        f"script-src 'self' 'nonce-{nonce}'; "
        f"style-src 'self' 'nonce-{nonce}'; "
        "img-src 'self' data:; "
        "font-src 'self'; "
        "frame-ancestors 'none'; "
        "form-action 'self'; "
        "base-uri 'self'; "
        "upgrade-insecure-requests"
    )

    # HSTS - Force HTTPS for 1 year
    response.headers['Strict-Transport-Security'] = (
        'max-age=31536000; includeSubDomains; preload'
    )

    # Prevent clickjacking
    response.headers['X-Frame-Options'] = 'DENY'

    # Prevent MIME sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'

    # Referrer Policy - don't leak information
    response.headers['Referrer-Policy'] = 'no-referrer'

    # Permissions Policy - disable all browser features we don't need
    response.headers['Permissions-Policy'] = (
        'geolocation=(), microphone=(), camera=(), '
        'payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    )

    # Cross-Origin policies for additional isolation
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Resource-Policy'] = 'same-origin'

    # Prevent Adobe cross-domain policies
    response.headers['X-Permitted-Cross-Domain-Policies'] = 'none'

    # Don't cache sensitive content
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, private'
    response.headers['Pragma'] = 'no-cache'

    return response


# ============================================================================
# MAIN ROUTES
# ============================================================================

@app.route('/')
def index():
    """Landing page - Schütze dich vor dem System."""
    return render_template('index.html')


# ============================================================================
# PRIVACY SECTION (Demo-Modus)
# ============================================================================

@app.route('/privacy')
@app.route('/privacy/')
def privacy_index():
    """Privacy overview page."""
    return render_template('privacy/index.html')


@app.route('/privacy/exif')
def privacy_exif():
    """EXIF metadata removal guide."""
    return render_template('privacy/exif.html')


@app.route('/privacy/dsgvo')
def privacy_dsgvo():
    """DSGVO request templates and tools."""
    return render_template('privacy/dsgvo.html')


@app.route('/privacy/quiz')
def privacy_quiz():
    """'Bist du trackbar?' interactive quiz."""
    return render_template('privacy/quiz.html')


# ============================================================================
# SECURITY SECTION (Aktivisten-Sicherheit)
# ============================================================================

@app.route('/security')
@app.route('/security/')
def security_index():
    """Security overview page."""
    return render_template('security/index.html')


@app.route('/security/passwords')
def security_passwords():
    """Password manager recommendations."""
    return render_template('security/passwords.html')


@app.route('/security/messengers')
def security_messengers():
    """Secure messenger comparison."""
    return render_template('security/messengers.html')


@app.route('/security/devices')
def security_devices():
    """Device hardening guide (GrapheneOS, BFU/AFU)."""
    return render_template('security/devices.html')


@app.route('/security/legal')
def security_legal():
    """Legal rights - PIN vs biometrics (BGH 2025)."""
    return render_template('security/legal.html')


# ============================================================================
# RESILIENCE SECTION (Propaganda-Resilienz)
# ============================================================================

@app.route('/resilience')
@app.route('/resilience/')
def resilience_index():
    """Resilience against propaganda overview."""
    return render_template('resilience/index.html')


@app.route('/resilience/sift')
def resilience_sift():
    """Extended SIFT method for fact-checking."""
    return render_template('resilience/sift.html')


@app.route('/resilience/prebunking')
def resilience_prebunking():
    """Prebunking techniques."""
    return render_template('resilience/prebunking.html')


@app.route('/resilience/sources')
def resilience_sources():
    """Independent news sources with transparency info - SecuChart style."""
    # Load sources from JSON file
    sources_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'news_sources.json')
    data = {'sources': [], 'properties_meta': {}}
    try:
        if os.path.exists(sources_file):
            with open(sources_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
        app.logger.info(f"Loaded {len(data.get('sources', []))} news sources")
        return render_template('resilience/sources.html',
                         sources=data.get('sources', []),
                         properties_meta=data.get('properties_meta', {}),
                         data_json=json.dumps(data))
    except json.JSONDecodeError as e:
        app.logger.error(f"Invalid JSON in news_sources.json: {e}")
        return render_template('errors/500.html'), 500
    except Exception as e:
        app.logger.error(f"Failed to load news sources: {e}", exc_info=True)
        return render_template('errors/500.html'), 500


# ============================================================================
# ACTIVISM SECTION (Aktivismus-Detox)
# ============================================================================

@app.route('/activism')
@app.route('/activism/')
def activism_index():
    """Activism tools overview."""
    return render_template('activism/index.html')


@app.route('/activism/threat-model')
def activism_threat_model():
    """Interactive threat modeling matrix."""
    return render_template('activism/threat-model.html')


@app.route('/activism/demo-checklist')
def activism_demo_checklist():
    """Demo preparation checklist."""
    return render_template('activism/demo-checklist.html')


@app.route('/activism/seizure-rights')
def activism_seizure_rights():
    """Rights during device seizures."""
    return render_template('activism/seizure-rights.html')


# ============================================================================
# CONSPIRACY CHECK SECTION (Verschwörungs-Check)
# ============================================================================

@app.route('/conspiracy')
@app.route('/conspiracy/')
def conspiracy_index():
    """Conspiracy check overview."""
    return render_template('conspiracy/index.html')


@app.route('/conspiracy/filter')
def conspiracy_filter():
    """Signal vs. Rauschen filter tool."""
    return render_template('conspiracy/filter.html')


# ============================================================================
# PEACE TOOLS SECTION (Friedens-Tools)
# ============================================================================

@app.route('/peace')
@app.route('/peace/')
def peace_index():
    """Peace tools overview."""
    return render_template('peace/index.html')


@app.route('/peace/petitions')
def peace_petitions():
    """Petition tools and resources."""
    return render_template('peace/petitions.html')


@app.route('/peace/burnout')
def peace_burnout():
    """Activist burnout prevention."""
    return render_template('peace/burnout.html')


# ============================================================================
# INTERACTIVE TOOLS
# ============================================================================

@app.route('/tools')
@app.route('/tools/')
def tools_index():
    """Tools overview page."""
    return render_template('tools/index.html')


@app.route('/tools/passphrase')
def tools_passphrase():
    """Passphrase generator and tester."""
    return render_template('tools/passphrase.html')


@app.route('/tools/plan48h')
def tools_plan48h():
    """48-hour emergency plan generator."""
    return render_template('tools/plan48h.html')


@app.route('/tools/downloads')
def tools_downloads():
    """Offline PDF downloads."""
    return render_template('tools/downloads.html')


# ============================================================================
# STATIC FILES & DOWNLOADS
# ============================================================================

@app.route('/downloads/<path:filename>')
def download_file(filename):
    """Serve downloadable PDF files."""
    return send_from_directory(
        os.path.join(app.static_folder, 'downloads'),
        filename,
        as_attachment=True
    )


@app.route('/service-worker.js')
def service_worker():
    """Serve service worker for offline capability."""
    return send_from_directory(app.static_folder, 'js/service-worker.js')


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def page_not_found(e):
    """Custom 404 page."""
    return render_template('errors/404.html'), 404


@app.errorhandler(500)
def server_error(e):
    """Custom 500 page."""
    return render_template('errors/500.html'), 500


# ============================================================================
# DEVELOPMENT SERVER
# ============================================================================

if __name__ == '__main__':
    # Development mode only - use gunicorn/waitress for production
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True,
        use_reloader=False
    )
