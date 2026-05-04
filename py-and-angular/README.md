# Dunder Mifflin Data Portal

A Luzmo embedded analytics demo — Angular frontend with a Python (Django) backend.

## Setup

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and fill in your Luzmo credentials:

```bash
cp .env.example .env
```

Start the server:

```bash
python manage.py runserver
```

The API runs on `http://localhost:8000`.

### 2. Frontend

```bash
cd frontend
npm install
ng serve
```

The app runs on `http://localhost:4200`. API requests are proxied to the backend automatically via `proxy.conf.json`.

No frontend configuration is needed — all Luzmo credentials and server URLs are managed exclusively in the backend `.env`.

## How It Works

1. **Home page** — pick a persona (David Wallace, Michael Scott, or one of the sales reps).
2. **Dashboard page** — the frontend calls `POST /api/embed` with the selected role.
3. The Django backend uses `luzmo-sdk` to create a short-lived embed authorization token scoped to that persona (with `parameter_overrides` for sales reps to filter by salesperson), and returns it along with the server URLs.
4. The frontend renders the Luzmo dashboard using `@luzmo/ngx-embed` with the returned credentials.
