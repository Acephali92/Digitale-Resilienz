# -*- coding: utf-8 -*-
"""
Security tests for Widerstands-Toolkit.
Ensures security headers and protections are properly configured.
"""

import pytest
import re


class TestSecurityHeaders:
    """Test that all security headers are properly set."""

    def test_csp_header_present(self, client):
        """Content Security Policy header must be set with nonce."""
        response = client.get('/')
        assert 'Content-Security-Policy' in response.headers
        csp = response.headers['Content-Security-Policy']
        assert "default-src 'self'" in csp
        assert "frame-ancestors 'none'" in csp
        # Verify nonce-based CSP (no unsafe-inline)
        assert "'unsafe-inline'" not in csp
        assert "'nonce-" in csp

    def test_csp_nonce_is_unique(self, client):
        """CSP nonce must be unique per request."""
        response1 = client.get('/')
        response2 = client.get('/')
        csp1 = response1.headers['Content-Security-Policy']
        csp2 = response2.headers['Content-Security-Policy']
        # Extract nonces
        nonce1 = re.search(r"'nonce-([^']+)'", csp1)
        nonce2 = re.search(r"'nonce-([^']+)'", csp2)
        assert nonce1 and nonce2
        assert nonce1.group(1) != nonce2.group(1), "Nonces must be unique per request"

    def test_hsts_header(self, client):
        """HSTS header must be present for HTTPS enforcement."""
        response = client.get('/')
        hsts = response.headers.get('Strict-Transport-Security', '')
        assert 'max-age=' in hsts
        assert 'includeSubDomains' in hsts

    def test_x_frame_options(self, client):
        """X-Frame-Options must be DENY to prevent clickjacking."""
        response = client.get('/')
        assert response.headers.get('X-Frame-Options') == 'DENY'

    def test_x_content_type_options(self, client):
        """X-Content-Type-Options must be nosniff."""
        response = client.get('/')
        assert response.headers.get('X-Content-Type-Options') == 'nosniff'

    def test_referrer_policy(self, client):
        """Referrer-Policy must be no-referrer for privacy."""
        response = client.get('/')
        assert response.headers.get('Referrer-Policy') == 'no-referrer'

    def test_permissions_policy(self, client):
        """Permissions-Policy must restrict browser features."""
        response = client.get('/')
        permissions = response.headers.get('Permissions-Policy', '')
        assert 'geolocation=()' in permissions
        assert 'camera=()' in permissions
        assert 'microphone=()' in permissions

    def test_cross_origin_policies(self, client):
        """Cross-Origin policies must be set for isolation."""
        response = client.get('/')
        assert response.headers.get('Cross-Origin-Embedder-Policy') == 'require-corp'
        assert response.headers.get('Cross-Origin-Opener-Policy') == 'same-origin'
        assert response.headers.get('Cross-Origin-Resource-Policy') == 'same-origin'

    def test_x_permitted_cross_domain_policies(self, client):
        """X-Permitted-Cross-Domain-Policies must be none."""
        response = client.get('/')
        assert response.headers.get('X-Permitted-Cross-Domain-Policies') == 'none'

    def test_cache_control(self, client):
        """Cache-Control must prevent caching of sensitive data."""
        response = client.get('/')
        cache_control = response.headers.get('Cache-Control', '')
        assert 'no-store' in cache_control or 'no-cache' in cache_control

    def test_no_server_header_leak(self, client):
        """Server header should not expose sensitive version info."""
        response = client.get('/')
        server = response.headers.get('Server', '')
        # Should not contain detailed version info
        assert 'Python' not in server or 'Werkzeug' not in server


class TestXSSPrevention:
    """Test XSS prevention measures."""

    def test_html_content_type(self, client):
        """HTML pages should have proper content type."""
        response = client.get('/')
        content_type = response.headers.get('Content-Type', '')
        assert 'text/html' in content_type

    def test_script_src_nonce(self, client):
        """CSP should use nonce for script sources, not unsafe-inline."""
        response = client.get('/')
        csp = response.headers.get('Content-Security-Policy', '')
        assert "script-src 'self' 'nonce-" in csp
        assert "'unsafe-inline'" not in csp

    def test_style_src_nonce(self, client):
        """CSP should use nonce for style sources, not unsafe-inline."""
        response = client.get('/')
        csp = response.headers.get('Content-Security-Policy', '')
        assert "style-src 'self' 'nonce-" in csp
        assert "'unsafe-inline'" not in csp

    def test_nonce_in_html(self, client):
        """HTML should contain nonce attributes matching CSP."""
        response = client.get('/')
        csp = response.headers['Content-Security-Policy']
        nonce_match = re.search(r"'nonce-([^']+)'", csp)
        assert nonce_match, "CSP must contain a nonce"
        nonce = nonce_match.group(1)
        # Check if nonce appears in HTML (for inline styles)
        html = response.data.decode('utf-8')
        assert f'nonce="{nonce}"' in html, "Nonce must be present in HTML"


class TestCSRFProtection:
    """Test CSRF protection configuration."""

    def test_csrf_config_exists(self, app):
        """CSRF protection should be configurable."""
        # In testing mode, CSRF is disabled, but config should exist
        assert 'WTF_CSRF_ENABLED' in app.config
