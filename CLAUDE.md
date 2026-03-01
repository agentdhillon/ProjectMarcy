# ProjectMarcy — Claude Code Guide

This file provides guidance to Claude Code when working in this repository.

## Project Overview

> Describe the purpose and goals of this project here.

## Repository Structure

```
ProjectMarcy/
├── CLAUDE.md        # This file — Claude Code guidance
└── ...              # Add your project directories/files here
```

## Development Setup

> Add setup instructions here (e.g., dependencies, environment variables, build steps).

## Common Commands

```bash
# Install dependencies
# <your install command>

# Run tests
# <your test command>

# Build / start
# <your build/start command>

# Lint / format
# <your lint command>
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
