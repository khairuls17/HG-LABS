 # PLAN — HG Labs — Midnight Space

 ## Project Vision

 HG Labs — Midnight Space is an immersive, atmospheric, developer-centered internet experience: a midnight coding sanctuary, cozy digital developer room, and a creative interactive web experience. The objective is to create a cinematic, polished, and deeply personal web world prioritizing atmosphere, motion, and modularity.

 ## High-Level Goals

 - Build a frontend-first interactive website with strong visual identity and modular components.
 - Ship an MVP that includes the Cinematic Landing Page, Interactive Terminal, Project Explorer, Focus Room, Midnight Radio, and Guestbook.
 - Backend: lightweight, production-ready Supabase + PostgreSQL for auth, realtime presence, guestbook, and focus session storage.
 - Deploy on self-hosted VPS using Docker, Nginx, and Cloudflare for DNS and CDN-like features.
 - Keep everything AI-agent friendly: thorough, modular docs and small, single-purpose tasks.

 ## Architecture Overview

 System components:

 - Frontend: Next.js App Router (React), TailwindCSS, Framer Motion, JetBrains Mono for terminal UI.
 - Backend: Next.js API routes + Supabase; Postgres for persistent data.
 - Realtime: Supabase Realtime (or Realtime over Postgres / replication) for presence and analytics.
 - Infrastructure: Docker Compose on Ubuntu VPS, Nginx reverse proxy, Cloudflare DNS.

 Request flow (simple):

 User → Cloudflare → Nginx (VPS) → Next.js (Docker) → Supabase (Cloud)

 Notes:

 - Keep the Next.js app as a single monorepo with clear separation of features (apps/ or src/ features). Keep API routes minimal — prefer Supabase functions for heavy-lifting where appropriate.

 ## Feature Explanations

 - Cinematic Landing Page: fullscreen hero with animated background, pixel rain, floating particles and CRT atmosphere; `enter lab` CTA leads to the main app shell.
 - Interactive Terminal: local-first fake terminal UI backed by simple client-side command handlers and progressively enhanced by backend APIs for dynamic content.
 - Project Explorer: floating workspace cards showcasing projects with GitHub and live preview links.
 - Focus Room: pomodoro timer, ambient audio, minimal todo list, session tracking for logged-in users.
 - Midnight Radio: ambient player with curated themes and optional background streaming.
 - Guestbook: read-only for guests; authenticated users can post messages; stored in Supabase.
 - Realtime Presence: show online counts and presence notifications via Supabase realtime changes.

 ## User Experience Philosophy

 - Atmosphere-first: every interaction should reinforce the midnight, cozy, cinematic identity.
 - Minimal friction: lightweight auth and guest modes, smooth transitions, and preserved visual consistency.
 - Progressive enhancement: features should work offline or client-side with graceful upgrades to realtime when available.

 ## Frontend Architecture

 - Component-driven: compose UI from small, well-documented components.
 - Feature folders: each major feature (terminal, focus-room, radio) lives in its own folder with UI, hooks, styles, tests, and docs.
 - Shared primitives: `ui/` for shared components (floating-window, glass-card, audio-player), `lib/` for hooks (usePresence, useAuth), `styles/` for tokens.
 - Visual tokens: colors, spacing, typography defined in Tailwind config + CSS variables for runtime atmospheric effects.

 ## Backend Architecture

 - Supabase-managed Postgres for primary persistence.
 - Tables: `users`, `guestbook`, `focus_sessions`, `presence`, `projects`.
 - Next.js API routes act as authenticated proxies or for server-side rendering of dynamic pages. Use server components for SEO-sensitive pages only.
 - Realtime presence uses Supabase Realtime (or client-side presence via websocket to a small service if needed).

 ## Data Model (brief)

 - `users`: id, username, created_at, profile
 - `guestbook`: id, user_id (nullable), message, created_at
 - `focus_sessions`: id, user_id, start_at, end_at, tags, duration, created_at
 - `presence`: id, user_id (nullable), room, last_seen, meta
 - `projects`: id, title, description, stack, github_url, live_url

 ## AI-Agent Workflow Instructions

 1. Read `docs/PLAN.md` and the feature-specific docs.
 2. Pick one task from `docs/TASKS.md` (must be single-purpose and small).
 3. Open the feature folder and edit only relevant files.
 4. Run unit or integration tests scoped to the feature.
 5. Submit changes as a focused commit / PR with descriptive message.

 Agent rules:

 - Do not modify unrelated components.
 - Keep visual style consistent with `docs/DESIGN.md`.
 - Break work into incremental, testable steps.

 ## Modular Development Strategy

 - Frontend-first, feature-driven: deliver UI and client-side behavior first, then wire backend.
 - Keep small tasks in `docs/TASKS.md` and label them with `frontend|backend|infra|design|polish`.
 - Use feature branches per task and PRs for review.

 ## Security and Privacy

 - Minimal user data retention: keep guestbook public, do not log unnecessary PII.
 - Use Supabase Auth; store no plaintext secrets in repo.

 ## Monitoring, Logging, and Metrics

 - Lightweight logging: container logs aggregated with `docker logs` + optional log shipper.
 - Analytics: atmospheric, non-invasive counts via Supabase functions.

 ## Next Steps (short-term)

 1. Create documentation files (this commit).
 2. Implement Landing Page and Terminal UI prototypes.
 3. Wire Supabase with example schemas.
