# ProjectMarcy — Claude Code Guide

This file provides guidance to Claude Code when working in this repository.

## Project Overview

**ProjectMarcy** is a community platform for salespeople — a safe space to vent, connect, share memes, listen to music together, and de-stress. Think Reddit, but built specifically for the emotional reality of sales.

Key features:
- Reddit-style posts, comments, and upvotes
- Meme and image sharing
- Anonymous posting OR real-identity accounts (user's choice)
- Private chat rooms for 2+ people (real-time via WebSockets)
- Synchronized music listening rooms
- AI companion (Claude) for empathetic listening and mood-based content curation

## Repository Structure

```
ProjectMarcy/
├── CLAUDE.md                  # This file — Claude Code guidance
├── .gitignore
├── backend/                   # Python + FastAPI
│   ├── requirements.txt
│   ├── .env.example
│   ├── main.py                # FastAPI app + Socket.IO server entry point
│   └── app/
│       ├── ai/
│       │   └── claude.py      # AI companion (listener + content curator)
│       ├── routes/            # REST API route modules (add as you build)
│       └── models/            # SQLAlchemy database models
└── frontend/                  # Next.js 15 + TypeScript
    ├── package.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── .env.example
    └── src/
        ├── app/               # Next.js App Router pages
        └── lib/
            ├── api.ts         # Axios client for backend REST calls
            └── socket.ts      # Socket.IO client (real-time rooms + music)
```

## Development Setup

**Prerequisites:** Python 3.11+, Node.js 20+, PostgreSQL, Redis

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # then fill in ANTHROPIC_API_KEY, DATABASE_URL, etc.
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local    # then fill in values
```

## Common Commands

```bash
# --- Backend ---
cd backend
uvicorn main:socket_app --reload --port 8000   # start dev server

# --- Frontend ---
cd frontend
npm run dev      # start Next.js dev server on http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Code Style & Conventions

- Follow existing patterns in the codebase.
- Keep changes focused and minimal — avoid unrelated refactors.
- Write clear commit messages that explain *why*, not just *what*.

## Testing

- Run all tests before committing.
- Do not skip failing tests; fix the root cause.

## Git Workflow

- Branch naming: `claude/<description>-<id>`
- Always push to the designated feature branch.
- Never force-push to `main`/`master`.

## Notes for Claude

- Prefer editing existing files over creating new ones.
- Do not add unnecessary comments, docstrings, or boilerplate.
- Ask before taking irreversible or high-blast-radius actions.
