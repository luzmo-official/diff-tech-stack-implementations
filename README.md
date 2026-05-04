# Luzmo Embedded Analytics — Different Tech Stacks

This repo contains example implementations of [Luzmo](https://www.luzmo.com/) embedded analytics using different tech stacks.

## Implementations

| Folder | Backend | Frontend |
| --- | --- | --- |
| [py-and-react](./py-and-react) | Python (FastAPI) | React (Vite) |

## Quick Start (py-and-react)

### Backend

```bash
cd py-and-react/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your Luzmo credentials
uvicorn main:app --reload
```

The API runs on `http://localhost:8000`.

### Frontend

```bash
cd py-and-react/frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. API requests are proxied to the backend automatically.

> All Luzmo credentials, dashboard IDs, and server URLs are managed in the backend `.env` — no frontend config needed.
