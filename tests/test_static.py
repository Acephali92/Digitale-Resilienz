# -*- coding: utf-8 -*-
"""
Static file tests for Widerstands-Toolkit.
Ensures static assets are properly served.
"""


class TestStaticFiles:
    """Test static file serving."""

    def test_css_accessible(self, client):
        """Main CSS file should be accessible."""
        response = client.get("/static/css/style.css")
        assert response.status_code == 200
        assert "text/css" in response.headers.get("Content-Type", "")

    def test_main_js_accessible(self, client):
        """Main JavaScript file should be accessible."""
        response = client.get("/static/js/main.js")
        assert response.status_code == 200

    def test_passphrase_js_accessible(self, client):
        """Passphrase generator JS should be accessible."""
        response = client.get("/static/js/passphrase.js")
        assert response.status_code == 200


class TestFonts:
    """Test font file serving."""

    def test_jetbrains_mono_font(self, client):
        """JetBrains Mono font should be accessible."""
        response = client.get("/static/fonts/JetBrainsMono-Regular.woff2")
        assert response.status_code == 200

    def test_orbitron_font(self, client):
        """Orbitron font should be accessible."""
        response = client.get("/static/fonts/Orbitron-Regular.woff2")
        assert response.status_code == 200


class TestNoExternalResources:
    """Test that no external resources are loaded."""

    def test_no_google_fonts_in_css(self, client):
        """CSS should not reference Google Fonts."""
        response = client.get("/static/css/style.css")
        css_content = response.data.decode("utf-8")
        assert "fonts.googleapis.com" not in css_content
        assert "fonts.gstatic.com" not in css_content

    def test_no_cdns_in_homepage(self, client):
        """Homepage should not load resources from CDNs."""
        response = client.get("/")
        html_content = response.data.decode("utf-8")
        # Check for common CDN domains
        cdns = ["cdn.", "cdnjs.", "unpkg.com", "jsdelivr.net"]
        for cdn in cdns:
            assert cdn not in html_content, f"Found CDN reference: {cdn}"
