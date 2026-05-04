# Dunder Mifflin Data Portal

A Luzmo embedded analytics demo — React frontend with a Node.js (Express) backend.

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your Luzmo credentials
node server.js
```

The API runs on `http://localhost:8000`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. API requests are proxied to the backend automatically.

No frontend configuration is needed — all Luzmo credentials and server URLs are managed exclusively in the backend `.env`.

## How It Works

1. **Home page** — pick a persona (David Wallace, Michael Scott, or one of the sales reps).
2. **Dashboard page** — the frontend calls `POST /api/embed` with the selected role.
3. The Express backend uses `@luzmo/nodejs-sdk` to create a short-lived embed authorization token scoped to that persona (with `parameter_overrides` for sales reps to filter by salesperson), and returns it along with the server URLs.
4. The frontend renders the Luzmo dashboard using `@luzmo/react-embed` with the returned credentials.
