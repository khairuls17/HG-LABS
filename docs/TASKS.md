# TASKS — HG Labs — Midnight Space

This file is the canonical task tracker for feature development. Tasks are organized by priority, area (frontend/backend/infra/design), and milestone. Each task is intentionally small and AI-agent friendly.

---

## How to use this file

1. Pick a single task (`[]`) and assign it to a branch `task/<id>-short-slug`.
2. Implement only files referenced in the task body.
3. Add a short test or manual verification steps.
4. Open a PR with a descriptive title and link to the task line.

---

## Task keys
- `F` = Frontend
- `B` = Backend
- `I` = Infra
- `D` = Design
- `P` = Polish

## Phase 0 — Project Initialization

- [ ] (F-000) Initialize Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.
  - Files: `package.json`, `tsconfig.json`, `next-env.d.ts`, `next.config.mjs`, `postcss.config.js`, `tailwind.config.js`, `app/layout.tsx`, `app/page.tsx`, `styles/globals.css`, `styles/vars.css`
  - Verify: `npm run dev` starts locally and the landing route renders.

---

## Backlog (Unassigned)

- [ ] (F-001) Create Landing Page hero component with canvas background and `enter lab` CTA. Include CSS variables for color tokens and a Tailwind-enabled layout.
  - Files: `features/landing/Hero.tsx`, `styles/vars.css`
  - Verify: `npm run dev` and open `/`.

- [ ] (F-002) Build fake Interactive Terminal base component with input, history, and blink cursor.
  - Files: `features/terminal/Terminal.tsx`, `ui/TerminalLine.tsx`
  - Commands to implement: `help`, `about`, `whoami`, `clear`.

- [ ] (F-003) Create Project Explorer card component with hover float and glow.
  - Files: `features/projects/ProjectCard.tsx`

- [ ] (F-004) Create Focus Room shell layout (no backend) with Pomodoro timer UI.
  - Files: `features/focus/FocusRoom.tsx`, `features/focus/Pomodoro.tsx`

- [ ] (B-001) Define Supabase schema for `guestbook`, `focus_sessions`, `presence` and provide migration SQL.
  - Files: `db/migrations/001_init.sql`, `docs/setup/SUPABASE_SETUP.md`

- [ ] (I-001) Create `docker-compose.yml` skeleton and development `Dockerfile` for Next.js app.
  - Files: `docker-compose.yml`, `Dockerfile`

## In-Progress

- [ ] (F-010) Implement responsive floating-window UI primitive used across cards and panels.

## Ready / Review

- [ ] (F-020) Landing page responsive polish: spacing, CRT overlay opacity variable, and font fallback.

## Milestone M1 — MVP (top priority)

- [ ] (M1-F1) Landing page (F-001) — implement hero, canvas, CTA.
- [ ] (M1-F2) Terminal UI (F-002) — base terminal + static commands.
- [ ] (M1-B1) Supabase schema (B-001) — tables for guestbook and users.
- [ ] (M1-I1) Docker Compose dev environment (I-001)

## Labels and Conventions

- Task title must start with `(AREA-###)` where AREA is one of `F/B/I/D` and ### is a number.
- Keep tasks under 250 lines of changes.

---

This file should be updated by the team and AI agents as tasks are completed or split. Prefer creating new tasks rather than editing existing ones to preserve history.
