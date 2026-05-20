# NGINX_SETUP — HG Labs — Midnight Space

This document explains Nginx configuration for the HG Labs deployment, including reverse proxy setup, websocket support, domain routing, gzip tuning, and production best practices.

## Why Nginx?

Nginx is a reliable reverse proxy and web server used to route incoming traffic, terminate SSL, and optimize performance. It shields the app container from direct internet exposure.

## Reverse proxy explanation

A reverse proxy accepts inbound requests and forwards them to a backend service. For HG Labs, Nginx receives traffic on ports 80 and 443 and proxies it to the Next.js app running in Docker.

### Benefits

- Centralized SSL termination.
- Security headers.
- Compression and caching.
- Ability to route multiple domains or services.

## Nginx architecture

1. Client sends request to the domain.
2. Cloudflare (optional) forwards the request to the VPS.
3. Nginx listens on the public interface.
4. Nginx proxies the request to the Next.js app container.
5. Response flows back through Nginx to the client.

## Domain routing

Nginx uses server blocks to route traffic based on hostname.

- `server_name example.com;` handles the main site.
- Additional blocks can be added for subdomains or staging.
- Each block can proxy to a different backend service.

## Websocket support

Next.js or future realtime services may use websockets. Nginx can proxy websocket upgrades using the following headers:

- `Upgrade`
- `Connection`

This ensures realtime connections remain stable.

## Example `nginx.conf`

```nginx
worker_processes auto;
events {
  worker_connections 1024;
}
http {
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  gzip on;
  gzip_disable "msie6";
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 5;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

  server_tokens off;
  server_names_hash_bucket_size 64;

  include /etc/nginx/conf.d/*.conf;
}
```

## Example server block

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://app:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## TLS and HTTPS

For production, use HTTPS. If Cloudflare is managing SSL, Nginx can still terminate TLS using a certificate from Certbot or a Cloudflare Origin Certificate.

### Example HTTPS block

```nginx
server {
  listen 443 ssl http2;
  server_name your-domain.com;

  ssl_certificate /etc/ssl/certs/fullchain.pem;
  ssl_certificate_key /etc/ssl/private/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_pass http://app:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Gzip recommendations

- Enable gzip to compress text-based assets.
- Use moderate compression level `5` for a good speed / size balance.
- Add `gzip_vary on;` for proxy compatibility.

## Production recommendations

- Disable `server_tokens` to hide Nginx version information.
- Set `keepalive_timeout` to a reasonable value for persistent connections.
- Use security headers such as:
  - `X-Frame-Options SAMEORIGIN`
  - `X-Content-Type-Options nosniff`
  - `Referrer-Policy no-referrer-when-downgrade`
  - `Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"`

- Use `proxy_read_timeout` and `proxy_send_timeout` if needed for long-running requests.

## Troubleshooting

- If the app is unreachable, inspect Nginx error logs: `/var/log/nginx/error.log`.
- If Nginx cannot connect to the app container, verify container name and network settings.
- If websockets fail, confirm `proxy_set_header Upgrade $http_upgrade;` and `proxy_set_header Connection "upgrade";` are present.
- If SSL fails, check certificate paths and renewal status.

## Notes on host vs containerized Nginx

- Host-level Nginx is simple and avoids extra container complexity.
- Containerized Nginx is portable and can be bundled with Docker Compose.
- Both options are valid; choose based on operational preference.
