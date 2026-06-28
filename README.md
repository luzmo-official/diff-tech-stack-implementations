# Luzmo Embedded Analytics — Different Tech Stacks

This repo contains example implementations of [Luzmo](https://www.luzmo.com/) embedded analytics using different tech stacks.

## Implementations

| Folder | Backend | Frontend |
| --- | --- | --- |
| [py-and-react](./py-and-react) | Python (FastAPI) | React (Vite) |
| [py-and-angular](./py-and-angular) | Python (Django) | Angular |
| [py-and-vue](./py-and-vue) | Python (FastAPI) | Vue (Vite) |
| [node-and-react](./node-and-react) | Node.js (Express) | React (Vite) |
| [node-and-angular](./node-and-angular) | Node.js (Express) | Angular |
| [node-and-vue](./node-and-vue) | Node.js (Express) | Vue (Vite) |

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

## Quick Start (py-and-angular)

### Backend

```bash
cd py-and-angular/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your Luzmo credentials
python manage.py runserver
```

The API runs on `http://localhost:8000`.

### Frontend

```bash
cd py-and-angular/frontend
npm install
ng serve
```

The app runs on `http://localhost:4200`. API requests are proxied to the backend automatically.

> All Luzmo credentials and server URLs are managed in the backend `.env` — no frontend config needed.

## Quick Start (py-and-vue)

### Backend

```bash
cd py-and-vue/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your Luzmo credentials
uvicorn main:app --reload
```

The API runs on `http://localhost:8000`.

### Frontend

```bash
cd py-and-vue/frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. API requests are proxied to the backend automatically.

> All Luzmo credentials, dashboard IDs, and server URLs are managed in the backend `.env` — no frontend config needed.

## Quick Start (node-and-react)

### Backend

```bash
cd node-and-react/backend
npm install
cp .env.example .env   # fill in your Luzmo credentials
node server.js
```

The API runs on `http://localhost:8000`.

### Frontend

```bash
cd node-and-react/frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. API requests are proxied to the backend automatically.

> All Luzmo credentials and server URLs are managed in the backend `.env` — no frontend config needed.

## Quick Start (node-and-angular)

### Backend

```bash
cd node-and-angular/backend
npm install
cp .env.example .env   # fill in your Luzmo credentials
node server.js
```

The API runs on `http://localhost:8000`.

### Frontend

```bash
cd node-and-angular/frontend
npm install
ng serve
```

The app runs on `http://localhost:4200`. API requests are proxied to the backend automatically.

> All Luzmo credentials and server URLs are managed in the backend `.env` — no frontend config needed.

## Quick Start (node-and-vue)

### Backend

```bash
cd node-and-vue/backend
npm install
cp .env.example .env   # fill in your Luzmo credentials
node server.js
```

The API runs on `http://localhost:8000`.

### Frontend

```bash
cd node-and-vue/frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. API requests are proxied to the backend automatically.

> All Luzmo credentials and server URLs are managed in the backend `.env` — no frontend config needed.
