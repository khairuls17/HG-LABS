# DOCKER_SETUP — HG Labs — Midnight Space

This document explains Docker and Docker Compose for HG Labs deployment. It covers container architecture, development vs production setup, networking, restart strategies, and best practices.

## Why Docker?

Docker packages the application and runtime environment into a portable container. This ensures the same app behavior across developer machines and the production VPS.

### Benefits

- Consistent runtime environment.
- Easy dependency management.
- Simplified deployment with container images.
- Isolation from host OS.

## Docker Compose overview

Docker Compose defines multi-container applications using a YAML file. For HG Labs, it ties together the Next.js application container and supporting services.

### Typical compose responsibilities

- Start the app container.
- Share network settings between containers.
- Manage environment variables.
- Define restart policies.

## Container structure

### App container

- Runs Next.js.
- Builds from a `Dockerfile`.
- Exposes a port such as `3000` internally.
- Uses environment variables for Supabase and app settings.

### Optional helper containers

- `nginx` if Nginx is containerized.
- `monitoring` or `logging` tools in future phases.

## Next.js container setup

### Development

- Mount source code into the container.
- Use `npm run dev` or equivalent.
- Enable live reload for quick iteration.
- Example development container uses bind mounts to the host filesystem.

### Production

- Build the app inside the image.
- Serve the built app using `npm run build` and `npm run start`.
- Avoid mounting source code in production.
- Use a lean base image and copy only needed files.

## Development vs production setup

### Development mode

- Focus on fast feedback.
- Use `docker-compose.dev.yml` if multiple compose files are helpful.
- Mount local source.
- Expose ports directly for browser access.
- Use a simpler Nginx setup or development proxy.

### Production mode

- Build once and run the built output.
- Keep environment variables in a secure `.env.production` file.
- Use restart policies and healthchecks.
- Minimize container privileges.

## Restart strategies

### Recommended policy

- `restart: unless-stopped` for production containers.
- `restart: on-failure` for services that should only restart on crashes.

### Why restart policies matter

They help recover from transient failures and keep the app available without manual intervention.

## Networking basics

### Docker networks

- Compose creates a default network for service communication.
- Services can refer to each other by name.
- The app container listens internally on `3000`; Nginx or the host proxies external traffic.

### Ports

- Internal port exposed by the app container: `3000`.
- Host port mapped for local access: typically `3000:3000`.
- For production behind Nginx, the app container only needs internal network access.

## Production deployment tips

- Do not expose the app container directly to the public internet.
- Use Nginx as the only public-facing endpoint.
- Secure environment variables and avoid building secrets into images.

## Example Docker Compose roles

- `app`: Next.js.
- `nginx` (optional): reverse proxy and TLS termination.
- `db` is not used on the VPS because Supabase manages the database.

## Notes for future scaling

- Add a separate proxy container when the app needs more isolation.
- Add cache or metrics containers when monitoring becomes necessary.
- Keep the Docker configuration modular so new services can be added easily.
