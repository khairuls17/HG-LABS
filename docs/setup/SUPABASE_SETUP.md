# SUPABASE_SETUP — HG Labs — Midnight Space

This document explains how to configure Supabase for HG Labs, including project creation, API keys, environment variables, authentication, realtime, database setup, and integration with Next.js.

## Why Supabase?

Supabase provides managed Postgres, authentication, realtime subscriptions, and API access. It is a good fit for HG Labs because it reduces backend overhead while supporting auth and persistent data.

## Supabase project setup

### Create a Supabase project

1. Sign in to supabase.com.
2. Create a new project.
3. Choose a project name like `hglabs-midnight-space`.
4. Select a secure password for the database.
5. Choose a region close to your expected users.

### Access keys

1. Open the project dashboard.
2. Navigate to `Settings › API`.
3. Copy the `anon` public key and the `service_role` key.
4. Keep these keys secure. Never publish the `service_role` key publicly.

## Environment variables

### Required variables

- `NEXT_PUBLIC_SUPABASE_URL` — the Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public client key.
- `SUPABASE_SERVICE_ROLE_KEY` — service role key for server-side operations.
- `NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL` — optional, if using Supabase Functions.

### Local and production storage

- In local development, store these values in `.env.local`.
- In production, store them in `.env.production` on the VPS or the container environment.
- Do not commit secrets to source control.

## Authentication setup

### Enable Supabase Auth

1. In the Supabase dashboard, open `Authentication › Settings`.
2. Enable email/password sign-up.
3. Configure redirect URLs for local and production environments.
4. Optionally enable OAuth providers later.

### Why use Supabase Auth

- Provides secure login and registration flows.
- Manages session tokens automatically.
- Integrates with Next.js and the Supabase client easily.

## Realtime setup

### Using Supabase Realtime

- Supabase Realtime can publish changes from Postgres tables.
- Enable realtime for the required tables or the entire database.
- Use the client SDK to subscribe to updates on `presence`, `guestbook`, and `focus_sessions`.

### Best practices

- Keep realtime subscriptions specific to the user’s current room or view.
- Use presence tables to track active users and room counts.
- Unsubscribe cleanly when the component unmounts.

## Database integration

### Database tables

Recommended tables:

- `users`
- `guestbook`
- `focus_sessions`
- `presence`
- `projects`

### Example schema notes

- Use UUID or Supabase-managed IDs.
- Keep `created_at` timestamps on all tables.
- Use foreign keys for relationships to `users`.

### Supabase policies

- Configure row-level security (RLS) for protected tables.
- Allow public `guestbook` read access, but restrict inserts to authenticated users or service roles.
- Use Supabase policies to protect `focus_sessions` and `presence` records.

## Next.js integration

### Frontend setup

1. Install `@supabase/supabase-js`.
2. Create a reusable Supabase client using environment variables.
3. Use Supabase Auth hooks or the client directly for login and auth state.
4. Use realtime subscriptions in components that need live updates.

### Server-side setup

- For server-side API routes, use the service role key with caution.
- Prefer client-side access for public data that does not require privileged keys.
- Use the service role key only for secure backend operations such as scheduled jobs or admin tasks.

## Optional enhancements

- Use Supabase Storage later for asset or media uploads.
- Use Supabase Functions for custom backend endpoints.
- Leverage Supabase Edge runtime for future serverless logic.

## Troubleshooting

- If auth fails, verify redirect URLs and API keys.
- If realtime updates do not arrive, ensure the table is enabled for realtime and check network logs.
- If environment variables are missing, confirm `.env` files are loaded and not committed accidentally.
