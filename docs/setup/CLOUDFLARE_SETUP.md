# CLOUDFLARE_SETUP — HG Labs — Midnight Space

This document explains how to configure Cloudflare for DNS, SSL, proxying, and security when deploying HG Labs.

## Why Cloudflare?

Cloudflare adds DNS management, optional edge proxying, HTTPS support, and security features. It also helps protect the VPS from direct traffic spikes.

## DNS setup

1. Add your domain to Cloudflare.
2. Set the domain nameservers to Cloudflare’s nameservers at your registrar.
3. In the Cloudflare dashboard, add DNS records for the site.

### A record setup

- Type: `A`
- Name: `@` or the root domain.
- IPv4 address: the public IP of your Azure VPS.
- TTL: Automatic.
- Proxy status: `Proxied` if you want Cloudflare protection; `DNS only` if you prefer direct routing.

### Optional subdomain setup

- Add `www` or custom subdomains.
- Example:
  - `www` → A record → same VPS IP.
  - `lab` → CNAME → root domain.

## Proxy recommendations

- Use `Proxied` mode for the main site to enable Cloudflare security and caching.
- Keep API routes and realtime endpoints compatible with proxying.
- If you experience issues during initial setup, use `DNS only` temporarily while debugging.

## SSL recommendations

- Set SSL/TLS mode to `Full` or `Full (strict)` when an origin certificate is installed on Nginx.
- Use Cloudflare Origin Certificates on the VPS for secure edge-to-origin encryption.
- Ensure Nginx is configured with valid certificates matching the domain.

## Cloudflare security basics

- Enable `Always Use HTTPS` to redirect HTTP to HTTPS.
- Enable `Automatic HTTPS Rewrites`.
- Use `Security Level: Medium` or `Low` initially, then raise if needed.
- Enable `Bot Fight Mode` only if false positives are manageable.

## Recommended settings

- SSL/TLS: `Full (strict)` with origin certificate.
- Edge Certificates: enable `OCSP Stapling` and `HTTP/2`.
- Firewall: allow only necessary traffic, and use WAF rules for known threats.
- Caching: use `Standard` mode for dynamic content and `Cache Everything` with page rules for static assets if appropriate.

## Troubleshooting notes

- If the site shows Cloudflare errors, check the origin server health and DNS records.
- If HTTPS is blocked, verify Nginx certificate paths and Cloudflare SSL mode.
- If proxying breaks websockets, ensure Nginx headers support `Upgrade` and `Connection`.
- Use the Cloudflare Diagnostic Center to review common issues.

## Cloudflare and Nginx integration

- Cloudflare terminates TLS; Nginx should still accept HTTPS from the edge.
- Use a Cloudflare Origin Certificate on the VPS to secure the origin connection.
- Keep firewall rules aligned with Cloudflare IP ranges if you want the VPS to accept traffic only from Cloudflare.

## Development vs production recommendations

- In development, you may bypass Cloudflare by using local DNS or host file overrides.
- In production, prefer Cloudflare proxying for security and performance.
- Keep production DNS records clean and documented in the project docs.
