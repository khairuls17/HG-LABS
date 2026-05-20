# ROADMAP — Phases & milestones

This roadmap organizes work into five phases from MVP to long-term polish and scaling. Each phase includes goals, milestones, and success criteria.

## Phase 1 — Foundation (MVP)

Goal: ship a compelling frontend prototype and basic backend persistence.

Milestones:

- M1: Landing Page (hero + CTA), Interactive Terminal (local commands), Project Explorer skeleton.
- M2: Supabase schema for `users` and `guestbook`; basic guestbook demo.
- M3: Local development Docker setup.

Success criteria:

- User can open site, explore landing hero, open terminal, and post a guestbook entry when authenticated.

## Phase 2 — Interactivity & Presence

Goal: add realtime presence and Focus Room core features.

Milestones:

- M1: Supabase Realtime integration for presence and online counters.
- M2: Focus Room with Pomodoro timer and session recording (client + server).
- M3: Midnight Radio with selectable ambience themes.

Success criteria:

- Realtime online counts are visible; focus session data persists to DB.

## Phase 3 — User Accounts & Social

Goal: polished auth and social interactions.

Milestones:

- M1: Supabase Auth flows (register/login/logout); guest mode preserved.
- M2: Guestbook moderation UI and user profiles.

Success criteria:

- Users can register, authenticate, and manage sessions; guestbook moderation tools exist.

## Phase 4 — Polish & Optimization

Goal: refine visuals, accessibility, and performance.

Milestones:

- M1: Motion tuning and reduced-motion support.
- M2: Asset optimization, critical CSS, and Lighthouse > 90 for performance accessible category.

Success criteria:

- Smooth experience on mid-range devices, accessible for keyboard and screen reader usage.

## Phase 5 — Scaling & Deployment

Goal: production deployment, monitoring, and scaling strategy.

Milestones:

- M1: Dockerized production build, Nginx reverse proxy, SSL readiness.
- M2: Deployment scripts and documented VPS setup.

Success criteria:

- Stable deployment process with simple rollback and zero-downtime strategy for minor updates.

## Release Cadence

- Small releases weekly during Phase 1-2; larger feature releases every 4–6 weeks afterward.

## Prioritization Principles

- Frontend-first: visible, atmospheric features first.
- Small, testable increments: avoid large PRs that modify multiple features.
