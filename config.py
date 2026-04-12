#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Configuration settings for Widerstands-Toolkit.
Security-focused, privacy-respecting configuration.
"""

import os
from datetime import timedelta


class Config:
    """Base configuration - security first."""

    # Flask core settings
    SECRET_KEY = os.environ.get("SECRET_KEY")  # Must be set; see app.py validation

    # No sessions by default - stateless for privacy
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Strict"
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)

    # Security settings
    WTF_CSRF_ENABLED = True
    WTF_CSRF_TIME_LIMIT = 3600  # 1 hour

    # No tracking
    SEND_FILE_MAX_AGE_DEFAULT = 0  # Don't cache for privacy

    # Template settings
    TEMPLATES_AUTO_RELOAD = True

    # Static files
    STATIC_FOLDER = "static"
    TEMPLATE_FOLDER = "templates"

    # JSON settings (German)
    JSON_AS_ASCII = False  # Support umlauts

    # Disable Flask banner for security
    ENV = "production"

    # German language
    BABEL_DEFAULT_LOCALE = "de"


class DevelopmentConfig(Config):
    """Development configuration."""

    DEBUG = True
    ENV = "development"
    SECRET_KEY = os.environ.get("SECRET_KEY") or os.urandom(32)


class ProductionConfig(Config):
    """Production configuration - maximum security."""

    DEBUG = False
    TESTING = False

    # Strict transport security
    PREFERRED_URL_SCHEME = "https"


class TestingConfig(Config):
    """Testing configuration."""

    TESTING = True
    WTF_CSRF_ENABLED = False


# Configuration mapping
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig,
}
