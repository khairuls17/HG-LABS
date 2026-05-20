# VPS_SETUP — HG Labs — Midnight Space

This document explains how to prepare and manage an Azure Ubuntu VPS for the HG Labs deployment. It is written for beginners and engineers who need a production-ready deployment host.

## Why use a VPS?

A VPS gives full control over the runtime environment, reverse proxy configuration, Docker containers, and network settings. It is ideal for a self-hosted deployment where the app and proxy live together.

## Recommended VPS specs

- CPU: 2 vCPUs minimum; 4 vCPUs recommended for production.
- RAM: 4 GB minimum; 8 GB recommended for smooth Docker operation.
- Storage: 40 GB SSD or larger.
- Network: stable public IPv4 address; 1 Gbps burst if available.
- OS: Ubuntu 24.04 LTS or Ubuntu 22.04 LTS.

## Azure VPS preparation

1. Sign in to the Azure portal.
2. Create a new Virtual Machine.
3. Select Ubuntu Server 24.04 LTS or 22.04 LTS.
4. Choose the recommended size and storage.
5. Configure inbound ports: allow SSH (port 22), HTTP (80), and HTTPS (443).
6. Create or attach an SSH key pair for secure access.

## Ubuntu setup

1. Connect to the VPS using SSH.
2. Update packages:
   - `sudo apt update`
   - `sudo apt upgrade -y`
3. Install essential packages:
   - `sudo apt install -y curl git ufw`
4. Set the timezone if needed:
   - `sudo timedatectl set-timezone UTC`

## SSH setup

1. Use SSH key authentication only.
2. Disable password authentication in `/etc/ssh/sshd_config`:
   - `PasswordAuthentication no`
   - `PermitRootLogin no`
3. Restart SSH:
   - `sudo systemctl restart sshd`
4. Test login from your workstation before closing any active session.

## Firewall basics

1. Enable UFW (Uncomplicated Firewall):
   - `sudo ufw allow OpenSSH`
   - `sudo ufw allow http`
   - `sudo ufw allow https`
   - `sudo ufw enable`
2. Confirm rules with `sudo ufw status`.
3. If using a separate Nginx container or host-level Nginx, allow traffic on ports 80 and 443 only.

## fail2ban basics

1. Install fail2ban:
   - `sudo apt install -y fail2ban`
2. Create a local config:
   - `sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local`
3. Enable SSH protection in `/etc/fail2ban/jail.local`:
   - `[sshd]`
   - `enabled = true`
4. Restart fail2ban:
   - `sudo systemctl restart fail2ban`
5. Monitor status:
   - `sudo fail2ban-client status sshd`

## Recommended folder structure

Use a clear, predictable directory layout for deployments.

- `/home/ubuntu/hglabs` — project root.
- `/home/ubuntu/hglabs/app` — source code and Docker files.
- `/home/ubuntu/hglabs/config` — Nginx and deployment configs.
- `/home/ubuntu/hglabs/logs` — application and container logs (optional).
- `/home/ubuntu/hglabs/data` — persistent data if needed.

### Example structure

```text
/home/ubuntu/hglabs/
  ├─ app/
  │   ├─ docker-compose.yml
  │   ├─ Dockerfile
  │   ├─ .env.production
  │   └─ source files
  ├─ config/
  │   └─ nginx.conf
  ├─ logs/
  └─ backups/
```

## Production recommendations

- Keep the VPS OS updated with security patches.
- Use SSH keys and disable root login.
- Run Docker as a non-root user when possible.
- Keep only necessary inbound ports open.
- Use Cloudflare or another edge service to reduce direct exposure.
- Backup environment variables and config files securely.
- Monitor disk space and memory usage regularly.

## Useful commands

- Check memory: `free -h`
- Check disk: `df -h`
- Check running containers: `docker ps`
- Update OS packages: `sudo apt update && sudo apt upgrade -y`

## Troubleshooting notes

- If SSH fails after config changes, use the Azure serial console to recover.
- If firewall blocks access, allow the required ports or disable UFW temporarily.
- If Docker services fail, inspect logs with `docker-compose logs`.
