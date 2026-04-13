# -*- coding: utf-8 -*-
"""
Route tests for Widerstands-Toolkit.
Ensures all pages are accessible and return correct status codes.
"""

import pytest

# All main routes that should return 200
MAIN_ROUTES = [
    "/",
    "/privacy",
    "/privacy/",
    "/security",
    "/security/",
    "/resilience",
    "/resilience/",
    "/activism",
    "/activism/",
    "/conspiracy",
    "/conspiracy/",
    "/peace",
    "/peace/",
    "/tools",
    "/tools/",
]

# Sub-routes organized by section
PRIVACY_ROUTES = [
    "/privacy/exif",
    "/privacy/dsgvo",
    "/privacy/quiz",
]

SECURITY_ROUTES = [
    "/security/passwords",
    "/security/messengers",
    "/security/devices",
    "/security/legal",
]

RESILIENCE_ROUTES = [
    "/resilience/sift",
    "/resilience/prebunking",
    "/resilience/sources",
]

ACTIVISM_ROUTES = [
    "/activism/threat-model",
    "/activism/demo-checklist",
    "/activism/seizure-rights",
]

CONSPIRACY_ROUTES = [
    "/conspiracy/filter",
]

PEACE_ROUTES = [
    "/peace/petitions",
    "/peace/burnout",
]

TOOLS_ROUTES = [
    "/tools/passphrase",
    "/tools/plan48h",
    "/tools/downloads",
]

ALL_ROUTES = (
    MAIN_ROUTES
    + PRIVACY_ROUTES
    + SECURITY_ROUTES
    + RESILIENCE_ROUTES
    + ACTIVISM_ROUTES
    + CONSPIRACY_ROUTES
    + PEACE_ROUTES
    + TOOLS_ROUTES
)


class TestMainRoutes:
    """Test main section index pages."""

    @pytest.mark.parametrize("route", MAIN_ROUTES)
    def test_main_routes_accessible(self, client, route):
        """All main routes should return 200."""
        response = client.get(route)
        assert (
            response.status_code == 200
        ), f"Route {route} returned {response.status_code}"


class TestPrivacyRoutes:
    """Test privacy section routes."""

    @pytest.mark.parametrize("route", PRIVACY_ROUTES)
    def test_privacy_routes_accessible(self, client, route):
        """All privacy routes should return 200."""
        response = client.get(route)
        assert (
            response.status_code == 200
        ), f"Route {route} returned {response.status_code}"


class TestSecurityRoutes:
    """Test security section routes."""

    @pytest.mark.parametrize("route", SECURITY_ROUTES)
    def test_security_routes_accessible(self, client, route):
        """All security routes should return 200."""
        response = client.get(route)
        assert (
            response.status_code == 200
        ), f"Route {route} returned {response.status_code}"


class TestResilienceRoutes:
    """Test resilience section routes."""

    @pytest.mark.parametrize("route", RESILIENCE_ROUTES)
    def test_resilience_routes_accessible(self, client, route):
        """All resilience routes should return 200."""
        response = client.get(route)
        assert (
            response.status_code == 200
        ), f"Route {route} returned {response.status_code}"


class TestActivismRoutes:
    """Test activism section routes."""

    @pytest.mark.parametrize("route", ACTIVISM_ROUTES)
    def test_activism_routes_accessible(self, client, route):
        """All activism routes should return 200."""
        response = client.get(route)
        assert (
            response.status_code == 200
        ), f"Route {route} returned {response.status_code}"


class TestToolsRoutes:
    """Test tools section routes."""

    @pytest.mark.parametrize("route", TOOLS_ROUTES)
    def test_tools_routes_accessible(self, client, route):
        """All tools routes should return 200."""
        response = client.get(route)
        assert (
            response.status_code == 200
        ), f"Route {route} returned {response.status_code}"


class TestErrorHandlers:
    """Test custom error pages."""

    def test_404_page(self, client):
        """404 page should be returned for non-existent routes."""
        response = client.get("/nonexistent-page-that-does-not-exist")
        assert response.status_code == 404

    def test_404_page_content(self, client):
        """404 page should contain helpful content."""
        response = client.get("/nonexistent-page")
        assert response.status_code == 404
        # Page should contain some indication it's a 404
        assert b"404" in response.data or b"nicht gefunden" in response.data.lower()


class TestContentType:
    """Test that responses have correct content types."""

    @pytest.mark.parametrize("route", ALL_ROUTES[:5])  # Test subset for speed
    def test_html_content_type(self, client, route):
        """HTML pages should have text/html content type."""
        response = client.get(route)
        content_type = response.headers.get("Content-Type", "")
        assert "text/html" in content_type


class TestGermanContent:
    """Test that content is in German."""

    def test_homepage_german(self, client):
        """Homepage should contain German text."""
        response = client.get("/")
        # Check for common German words/phrases in the toolkit
        data = response.data.decode("utf-8").lower()
        # Should contain at least one German indicator
        german_indicators = [
            "sicherheit",
            "schutz",
            "aktivist",
            "privatsphäre",
            "widerstand",
        ]
        assert any(
            word in data for word in german_indicators
        ), "Homepage should contain German content"
