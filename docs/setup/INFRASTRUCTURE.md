# INFRASTRUCTURE — HG Labs — Midnight Space

## Overview

This document describes the infrastructure architecture for HG Labs — Midnight Space. It covers the full request flow, container architecture, cloud and edge integration, and long-term scaling considerations.

HG Labs is designed as a modern internet experience with a frontend-first Next.js application, lightweight backend integration using Supabase, and self-hosted deployment on an Azure Ubuntu VPS behind Nginx.

## Architecture Summary

- Frontend: Next.js App Router, Tailwind CSS, Framer Motion.
- Backend: Supabase Cloud for Auth, Postgres, Realtime features.
- Hosting: Azure VPS running Docker and Docker Compose.
- Proxy: Nginx reverse proxy handles incoming traffic, HTTPS, and routing.
- DNS: Cloudflare manages domain resolution and optional proxying.

## Request Flow

1. User opens the browser and enters the site URL.
2. Cloudflare resolves DNS, applies security and caching rules, and forwards traffic to the VPS.
3. Nginx on the VPS receives the request and routes it to the Next.js application container.
4. Next.js serves the frontend or server-side content.
5. The application communicates with Supabase Cloud for authentication, realtime events, and database operations.

### Simple flow diagram

```text
User
 ↓
Cloudflare
 ↓
Nginx Reverse Proxy (VPS)
 ↓
Next.js App (Docker)
 ↓
Supabase Cloud
 ↓
PostgreSQL
```

## Frontend / Backend Communication

### Frontend responsibilities

- Render pages and app shell with Next.js.
- Host interactive UI and visual effects locally.
- Call Supabase directly from the browser for realtime, auth, and database operations.
- Use Next.js API routes for server-side operations and proxies when necessary.

### Backend responsibilities

- Manage users and sessions with Supabase Auth.
- Store persistent data in PostgreSQL.
- Publish realtime presence and event updates.
- Provide API keys and secure environment variables for the Next.js app.

### Integration flow

- The frontend uses Supabase client libraries for auth, realtime, and data access.
- Next.js API routes can act as a server-side layer for private operations, if needed.
- Supabase Realtime informs the frontend of presence, guestbook updates, and focus session changes.

## Docker Architecture

### Container roles

- `app`: the Next.js application container.
- `nginx`: optionally a separate Nginx container, or the host-level Nginx service.
- `db` is not hosted on the same VPS in this architecture; the database is managed by Supabase Cloud.

### Why Docker

- Isolation: app runs in a consistent environment.
- Reproducibility: same container image on local machines and production.
- Scalability: containers can later be moved to a cluster or cloud host.

### Docker Compose role

- Defines the application service and any local development helpers.
- Simplifies startup commands and shared networking.
- Allows future expansion with services such as monitoring or cache.

## Cloudflare → Nginx → App Flow

### Cloudflare

- Provides DNS resolution and optional proxy/caching.
- Protects the site with DDoS mitigation and HTTPS.
- Can cache static assets while forwarding dynamic API calls to the VPS.

### Nginx

- Serves as a reverse proxy for HTTP/HTTPS traffic.
- Terminates SSL if configured at the server.
- Routes requests to the Next.js container or other backend services.
- Adds security headers and gzip compression.

### App

- Runs inside Docker and listens on a local port.
- Receives proxied traffic from Nginx.
- Performs page generation, API handling, and static asset delivery.

## Supabase Integration Flow

- Supabase is the central backend service.
- Auth flow uses Supabase Auth for registration, login, and session management.
- Database tables store `users`, `guestbook`, `focus_sessions`, `presence`, and `projects`.
- Realtime updates are published from Supabase and consumed by the frontend.

### Why Supabase

- Rapid backend setup for auth and realtime.
- Built-in Postgres database with managed hosting.
- Secure API key handling through environment variables.
- Minimal backend maintenance compared to self-hosted databases.

## Deployment Architecture

### Production architecture

- Domain DNS points to Cloudflare.
- Cloudflare proxies traffic to the VPS public IP.
- VPS runs Docker Compose with Nginx and the Next.js app.
- Next.js app communicates with Supabase Cloud over HTTPS.

### Local development architecture

- Developers run Docker Compose locally.
- Local app uses environment variables to connect to Supabase development project.
- Nginx may be optional in local development.

## Scaling Considerations

### Short-term scaling

- Use a robust VPS plan with stable CPU, memory, and network.
- Tune Docker restart policies and monitor container health.
- Offload database and realtime to Supabase to reduce VPS load.

### Mid-term scaling

- Add a dedicated Nginx container or separate proxy host.
- Use Cloudflare caching rules for static assets and CDN delivery.
- Split feature modules into separate microservices if necessary.

### Long-term scaling

- Migrate to a container orchestration platform if traffic grows significantly.
- Consider managed Next.js platforms or edge hosting for static content.
- Use Supabase edge functions or serverless endpoints for compute-heavy flows.

## Security and Reliability Notes

- Keep secrets in environment variables, not in source control.
- Use Cloudflare to limit direct access to the VPS.
- Enable Nginx security headers and basic rate limiting.
- Use Docker restart policies for resilience.
- Store backups for Supabase data and deploy configs.
