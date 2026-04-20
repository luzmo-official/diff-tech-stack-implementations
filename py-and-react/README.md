# Dunder Mifflin Data Portal

A simple Luzmo embedded analytics demo — React frontend with a Python (FastAPI) backend.

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
uvicorn main:app --reload
```

The API runs on `http://localhost:8000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. API requests are proxied to the backend automatically.

No frontend configuration is needed — all Luzmo credentials, dashboard IDs, and server URLs are managed exclusively in the backend `.env`.

## How It Works

1. **Home page** — pick a persona (David Wallace, Michael Scott, or Dwight Schrute).
2. **Dashboard page** — the frontend calls `POST /api/embed` with the selected role.
3. The Python backend uses `luzmo-sdk` to create a short-lived embed authorization token scoped to that persona, and returns it along with the dashboard ID and server URLs.
4. The frontend renders the Luzmo dashboard using `@luzmo/react-embed` with the returned credentials.
