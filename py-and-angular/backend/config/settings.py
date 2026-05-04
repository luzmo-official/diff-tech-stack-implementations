import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

SECRET_KEY = "django-insecure-dev-only-key"
DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "corsheaders",
    "rest_framework",
    "embed",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
    ],
    "UNAUTHENTICATED_USER": None,
}

DATABASES = {}

LUZMO_API_KEY = os.environ["LUZMO_API_KEY"]
LUZMO_API_TOKEN = os.environ["LUZMO_API_TOKEN"]
LUZMO_API_HOST = os.environ.get("LUZMO_API_HOST", "https://api.luzmo.com")
LUZMO_APP_SERVER = os.environ.get("LUZMO_APP_SERVER", "https://app.luzmo.com")
LUZMO_COLLECTION_ID = os.environ["LUZMO_COLLECTION_ID"]
