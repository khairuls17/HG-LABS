# DEPLOYMENT — HG Labs — Midnight Space

This document explains the deployment workflow for HG Labs, including Docker deployment, Git pull workflows, build process, Nginx integration, restart procedure, and update strategy.

## Deployment workflow overview

The initial deployment strategy is manual, production-oriented, and repeatable. It relies on GitHub for source control, a self-hosted Azure VPS for runtime, Docker for containerization, and Nginx for reverse proxying.

### Deployment steps

1. Prepare the VPS and environment variables.
2. Pull the latest code from GitHub.
3. Build the Docker image.
4. Start or restart containers.
5. Ensure Nginx is routing traffic correctly.
6. Confirm Supabase connectivity.

## Git pull workflow

### On the VPS

1. Navigate to the project directory:
   - `cd /home/ubuntu/hglabs/app`
2. Fetch the latest changes:
   - `git fetch origin`
3. Check out the production branch:
   - `git checkout main`
4. Pull changes:
   - `git pull origin main`
5. Review any environment or config changes before restarting.

## Build process

### Docker build

1. Build the production image locally on the VPS:
   - `docker-compose build app`
2. If using a Dockerfile directly:
   - `docker build -t hglabs-app:latest .`
3. Verify the build logs for errors.

### Asset and environment checks

- Ensure `.env.production` is present.
- Confirm the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are valid.
- Confirm the app can access the Supabase project.

## Docker deployment flow

### Start containers

- Use Docker Compose to start or restart services:
  - `docker-compose up -d`
- This command pulls the updated image and starts containers in detached mode.

### Service management

- Restart a single service:
  - `docker-compose restart app`
- View logs:
  - `docker-compose logs -f app`
- Check container status:
  - `docker-compose ps`

## Nginx integration

### Ensure Nginx is running

- If Nginx is installed on the host:
  - `sudo systemctl status nginx`
- If Nginx is containerized:
  - `docker-compose ps`

### Reload Nginx after config changes

- Host-level Nginx:
  - `sudo nginx -t`
  - `sudo systemctl reload nginx`
- Containerized Nginx:
  - `docker-compose restart nginx`

### Verify routing

- Confirm requests to the domain go through Nginx and reach the app.
- Use `curl -I http://localhost` or `curl -I https://your-domain.com`.

## Production restart workflow

### Safe restart

1. Pull code changes.
2. Build the app image.
3. Restart the app container.
4. Monitor logs for startup issues.

### Minimal downtime

- Use `docker-compose up -d --no-deps --build app` to rebuild only the app container.
- Keep Nginx running during the app restart.
- Confirm app health before resuming full traffic.

## Update workflow

### Regular updates

- Pull from GitHub regularly.
- Rebuild the Docker image after dependency changes.
- Apply config or environment updates carefully.
- Maintain a deployment checklist for each release.

### Rollback strategy

- Keep the last working Docker image tagged.
- Use `docker image ls` to inspect available images.
- Roll back by starting a previous image tag if needed.

## Verification and smoke testing

### After deployment

- Open the site in a browser.
- Verify the landing page loads.
- Check the terminal and public features.
- Confirm user auth and Supabase connectivity.
- Review logs for errors.

## Troubleshooting

- If the app does not start, inspect build output and container logs.
- If Nginx returns 502, verify the app container is listening on the expected port.
- If the site is slow, check VPS resource usage.
- If Supabase fails, confirm environment variables and network connectivity.
