# ENVIRONMENT — HG Labs — Midnight Space

This document explains environment variables for local and production environments. It includes a `.env.example`, variable meanings, security recommendations, and the difference between local and production setups.

## Why environment variables?

Environment variables keep sensitive and environment-specific values out of source control. They allow the same codebase to run with different settings in development and production.

## `.env.example`

```env
# Supabase public client settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=pk_public_...

# Supabase service role key (server-side only)
SUPABASE_SERVICE_ROLE_KEY=sk_service_role_...

# App settings
NEXT_PUBLIC_APP_NAME=HG Labs — Midnight Space
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Feature toggles
NEXT_PUBLIC_ENABLE_DEBUG=false
NEXT_PUBLIC_ENABLE_CRT_EFFECT=true

# Analytics and tracking (optional)
NEXT_PUBLIC_ANALYTICS_ID=

# Deployment settings
NODE_ENV=production
```

## Variable explanations

- `NEXT_PUBLIC_SUPABASE_URL`: The Supabase project endpoint. Used by client-side code to connect to Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public Supabase API key used by the frontend.
- `SUPABASE_SERVICE_ROLE_KEY`: A privileged server-side key for admin operations and secure backend actions.
- `NEXT_PUBLIC_APP_NAME`: The display name for the application.
- `NEXT_PUBLIC_BASE_URL`: The deployed site URL, used for redirect validation and metadata.
- `NEXT_PUBLIC_ENABLE_DEBUG`: A client-side flag for debugging or temporary developer features.
- `NEXT_PUBLIC_ENABLE_CRT_EFFECT`: A client-side toggle to enable or disable the CRT overlay.
- `NEXT_PUBLIC_ANALYTICS_ID`: Optional tracking identifier for analytics providers.
- `NODE_ENV`: The runtime mode. Use `development` locally and `production` in deployment.

## Security recommendations

- Never commit `.env` or `.env.production` to Git.
- Store secrets securely using the VPS filesystem or secret management tools.
- Use the `anon` key only on client-facing code. Do not expose `SUPABASE_SERVICE_ROLE_KEY` in the browser.
- Restrict access to production environment files on the server.

## Local vs production environment

### Local environment

- Use `.env.local` for machine-specific settings.
- Include development keys and URLs for Supabase staging projects.
- Set `NODE_ENV=development`.
- Enable debug flags as needed.

### Production environment

- Use `.env.production` or host-level environment variables.
- Use the production Supabase project values.
- Disable debug flags.
- Set `NODE_ENV=production`.

## Deployment notes

- Confirm the correct `.env` file is loaded by Docker or the hosting environment.
- Use the production Supabase URL and anon key in production.
- Keep the service role key secret and use it only in server-side code.

## Example local env file

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=pk_test_...
SUPABASE_SERVICE_ROLE_KEY=sk_test_...
NEXT_PUBLIC_APP_NAME=HG Labs — Midnight Space (dev)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_DEBUG=true
NEXT_PUBLIC_ENABLE_CRT_EFFECT=false
NODE_ENV=development
```

## Notes for AI agents and developers

- Always check `ENVIRONMENT.md` before adding new env variables.
- Document new variables with descriptions and whether they are client or server only.
- Keep the `.env.example` in sync with actual required variables.
