# -*- coding: utf-8 -*-
"""
Security tests for Widerstands-Toolkit.
Ensures security headers and protections are properly configured.
"""

import glob
import logging
import os
import re

import pytest


class TestSecurityHeaders:
    """Test that all security headers are properly set."""

    def test_csp_header_present(self, client):
        """Content Security Policy header must be set with nonce."""
        response = client.get("/")
        assert "Content-Security-Policy" in response.headers
        csp = response.headers["Content-Security-Policy"]
        assert "default-src 'self'" in csp
        assert "frame-ancestors 'none'" in csp
        # Verify nonce-based CSP (no unsafe-inline)
        assert "'unsafe-inline'" not in csp
        assert "'nonce-" in csp

    def test_csp_nonce_is_unique(self, client):
        """CSP nonce must be unique per request."""
        response1 = client.get("/")
        response2 = client.get("/")
        csp1 = response1.headers["Content-Security-Policy"]
        csp2 = response2.headers["Content-Security-Policy"]
        # Extract nonces
        nonce1 = re.search(r"'nonce-([^']+)'", csp1)
        nonce2 = re.search(r"'nonce-([^']+)'", csp2)
        assert nonce1 and nonce2
        assert nonce1.group(1) != nonce2.group(1), "Nonces must be unique per request"

    def test_hsts_header(self, client):
        """HSTS header must be present for HTTPS enforcement."""
        response = client.get("/")
        hsts = response.headers.get("Strict-Transport-Security", "")
        assert "max-age=" in hsts
        assert "includeSubDomains" in hsts

    def test_x_frame_options(self, client):
        """X-Frame-Options must be DENY to prevent clickjacking."""
        response = client.get("/")
        assert response.headers.get("X-Frame-Options") == "DENY"

    def test_x_content_type_options(self, client):
        """X-Content-Type-Options must be nosniff."""
        response = client.get("/")
        assert response.headers.get("X-Content-Type-Options") == "nosniff"

    def test_referrer_policy(self, client):
        """Referrer-Policy must be no-referrer for privacy."""
        response = client.get("/")
        assert response.headers.get("Referrer-Policy") == "no-referrer"

    def test_permissions_policy(self, client):
        """Permissions-Policy must restrict browser features."""
        response = client.get("/")
        permissions = response.headers.get("Permissions-Policy", "")
        assert "geolocation=()" in permissions
        assert "camera=()" in permissions
        assert "microphone=()" in permissions

    def test_cross_origin_policies(self, client):
        """Cross-Origin policies must be set for isolation."""
        response = client.get("/")
        assert response.headers.get("Cross-Origin-Embedder-Policy") == "require-corp"
        assert response.headers.get("Cross-Origin-Opener-Policy") == "same-origin"
        assert response.headers.get("Cross-Origin-Resource-Policy") == "same-origin"

    def test_x_permitted_cross_domain_policies(self, client):
        """X-Permitted-Cross-Domain-Policies must be none."""
        response = client.get("/")
        assert response.headers.get("X-Permitted-Cross-Domain-Policies") == "none"

    def test_cache_control(self, client):
        """Cache-Control must prevent caching of sensitive data."""
        response = client.get("/")
        cache_control = response.headers.get("Cache-Control", "")
        assert "no-store" in cache_control or "no-cache" in cache_control

    def test_no_server_header_leak(self, client):
        """Server header should not expose sensitive version info."""
        response = client.get("/")
        server = response.headers.get("Server", "")
        # Should not contain detailed version info
        assert "Python" not in server and "Werkzeug" not in server


class TestXSSPrevention:
    """Test XSS prevention measures."""

    def test_html_content_type(self, client):
        """HTML pages should have proper content type."""
        response = client.get("/")
        content_type = response.headers.get("Content-Type", "")
        assert "text/html" in content_type

    def test_script_src_nonce(self, client):
        """CSP should use nonce for script sources, not unsafe-inline."""
        response = client.get("/")
        csp = response.headers.get("Content-Security-Policy", "")
        assert "script-src 'self' 'nonce-" in csp
        assert "'unsafe-inline'" not in csp

    def test_style_src_nonce(self, client):
        """CSP should use nonce for style sources, not unsafe-inline."""
        response = client.get("/")
        csp = response.headers.get("Content-Security-Policy", "")
        assert "style-src 'self' 'nonce-" in csp
        assert "'unsafe-inline'" not in csp

    def test_nonce_in_html(self, client):
        """HTML should contain nonce attributes matching CSP."""
        response = client.get("/")
        csp = response.headers["Content-Security-Policy"]
        nonce_match = re.search(r"'nonce-([^']+)'", csp)
        assert nonce_match, "CSP must contain a nonce"
        nonce = nonce_match.group(1)
        # Check if nonce appears in HTML (for inline styles)
        html = response.data.decode("utf-8")
        assert f'nonce="{nonce}"' in html, "Nonce must be present in HTML"


class TestCSRFProtection:
    """Test CSRF protection configuration."""

    def test_csrf_config_exists(self, app):
        """CSRF protection should be configurable."""
        # In testing mode, CSRF is disabled, but config should exist
        assert "WTF_CSRF_ENABLED" in app.config


class TestIPAnonymization:
    """Verify no IP addresses appear in application logs."""

    def test_ip_filter_removes_ipv4(self):
        """IPAnonymizingFilter must replace IPv4 addresses with [IP]."""
        from app import IPAnonymizingFilter

        f = IPAnonymizingFilter()
        record = logging.LogRecord(
            name="test",
            level=logging.INFO,
            pathname="",
            lineno=0,
            msg="Request from 192.168.1.42 processed",
            args=(),
            exc_info=None,
        )
        f.filter(record)
        assert "192.168.1.42" not in record.msg
        assert "[IP]" in record.msg

    def test_werkzeug_logger_suppressed(self):
        """Werkzeug access log must be set to ERROR or higher to avoid IP logging."""
        werkzeug_logger = logging.getLogger("werkzeug")
        assert werkzeug_logger.level >= logging.ERROR


class TestDifferentiatedCaching:
    """Verify Cache-Control is differentiated by response type."""

    def test_html_response_no_store(self, client):
        """HTML pages must not be cached."""
        response = client.get("/")
        cache = response.headers.get("Cache-Control", "")
        assert "no-store" in cache or "no-cache" in cache

    def test_css_asset_long_cache(self, client):
        """CSS static assets must have a long cache TTL for Service Worker."""
        static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "css")
        css_files = glob.glob(os.path.join(static_dir, "*.css"))
        if not css_files:
            pytest.skip("No CSS files found under static/css/")
        css_name = os.path.basename(css_files[0])
        response = client.get(f"/static/css/{css_name}")
        if response.status_code == 404:
            pytest.skip(f"Static file not found: {css_name}")
        cache = response.headers.get("Cache-Control", "")
        assert "max-age=" in cache
        assert "no-store" not in cache

    def test_service_worker_no_cache(self, client):
        """Service worker must use no-cache (not no-store) to allow SW updates."""
        response = client.get("/service-worker.js")
        cache = response.headers.get("Cache-Control", "")
        assert "no-cache" in cache
        assert "no-store" not in cache


class TestProductionSecretKey:
    """Verify SECRET_KEY enforcement for production config."""

    def test_development_config_has_fallback(self):
        """DevelopmentConfig must provide a SECRET_KEY even without ENV."""
        import os

        env_backup = os.environ.pop("SECRET_KEY", None)
        try:
            import importlib
            import config as cfg

            importlib.reload(cfg)
            assert cfg.DevelopmentConfig.SECRET_KEY is not None
            assert len(cfg.DevelopmentConfig.SECRET_KEY) > 0
        finally:
            if env_backup is not None:
                os.environ["SECRET_KEY"] = env_backup

    def test_production_config_no_fallback(self):
        """ProductionConfig must NOT silently generate a key — SECRET_KEY is None when unset."""
        import os

        env_backup = os.environ.pop("SECRET_KEY", None)
        try:
            import importlib
            import config as cfg

            importlib.reload(cfg)
            assert cfg.ProductionConfig.SECRET_KEY is None
        finally:
            if env_backup is not None:
                os.environ["SECRET_KEY"] = env_backup

    def test_production_startup_raises_without_secret_key(self):
        """app.py must raise RuntimeError when FLASK_ENV=production and SECRET_KEY unset."""
        import os
        import importlib

        env_backup = os.environ.copy()
        os.environ["FLASK_ENV"] = "production"
        os.environ.pop("SECRET_KEY", None)
        try:
            import app as app_module

            with pytest.raises(RuntimeError, match="SECRET_KEY"):
                importlib.reload(app_module)
        finally:
            os.environ.clear()
            os.environ.update(env_backup)


class TestIPAnonymizingFilterArgs:
    """Cover record.args branches in IPAnonymizingFilter.filter()."""

    def _make_filter(self):
        from app import IPAnonymizingFilter

        return IPAnonymizingFilter()

    def _make_record(self, msg, args):
        return logging.LogRecord(
            name="test",
            level=logging.INFO,
            pathname="",
            lineno=0,
            msg=msg,
            args=args,
            exc_info=None,
        )

    def test_ip_in_tuple_args_is_redacted(self):
        """IP inside a tuple arg must be replaced with [IP]."""
        f = self._make_filter()
        record = self._make_record("host %s port %s", ("10.0.0.1", "8080"))
        f.filter(record)
        assert "10.0.0.1" not in record.args
        assert "[IP]" in record.args[0]
        assert record.args[1] == "8080"

    def test_non_tuple_args_is_wrapped_and_redacted(self):
        """A bare string arg (non-tuple) must be wrapped into a 1-tuple."""
        f = self._make_filter()
        record = self._make_record("client %s", "172.16.0.5")
        f.filter(record)
        assert isinstance(record.args, tuple)
        assert "172.16.0.5" not in record.args[0]
        assert "[IP]" in record.args[0]

    def test_non_string_arg_passes_through_unchanged(self):
        """Integer/non-string args must not be converted or modified."""
        f = self._make_filter()
        record = self._make_record("port %d", (443,))
        f.filter(record)
        assert record.args == (443,)

    def test_dict_args_values_are_redacted(self):
        """dict-style args (%(key)s format) must have IP values scrubbed."""
        f = self._make_filter()
        record = self._make_record(
            "Request from %(ip)s", {"ip": "192.168.0.1", "user": "alice"}
        )
        f.filter(record)
        assert isinstance(record.args, dict)
        assert "192.168.0.1" not in record.args["ip"]
        assert "[IP]" in record.args["ip"]
        assert record.args["user"] == "alice"


class TestCacheControlElseBranch:
    """Verify the catch-all Cache-Control branch for non-whitelisted content types."""

    def test_non_whitelisted_static_content_type_gets_no_store(self, client):
        """Responses not matching the static-asset allowlist must get no-store."""
        response = client.get("/")
        # The HTML index route returns text/html, which is not in _STATIC_CONTENT_TYPES
        cache = response.headers.get("Cache-Control", "")
        assert "no-store" in cache
