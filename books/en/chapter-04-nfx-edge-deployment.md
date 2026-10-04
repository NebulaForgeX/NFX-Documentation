# Chapter 4: NFX-Edge reverse proxy

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) is the only HTTP/HTTPS ingress (Traefik **v3.7.13**, image tag in `docker-compose.traefik.yml`). Docker runs services. Traefik only reverse-proxies. Product Compose has **no** Traefik labels and does **not** join a shared Docker network.

- Owns host **80 / 443** (container `NFX-Edge-Reverse-Proxy`)
- Static config is `traefik.yml` (file provider, `watch: true`)
- Routes live in `dynamic/*.project.yml`. Templates are `dynamic.example/`. Live files are gitignored
- Backends are `NAS_IP:host port`. Both NAS machines use the same port numbers
- **sites-base** writes certs under `websites/<site>/`. Traefik does **not** issue them

## Prerequisites

- Chapter 2 has freed 80/443 on the NAS
- Chapter 3 Stack publishes the data plane on `10000–10024`
- The router forwards only 80/443 to the NAS that runs Traefik

## Layout

```
NFX-Edge/
├── traefik.yml
├── docker-compose.traefik.yml
├── dynamic.example/          # committed templates, including example.project.yml
│   ├── identity.project.yml
│   ├── news.project.yml
│   ├── storages.project.yml
│   ├── edge.project.yml
│   ├── documentation.project.yml
│   ├── sites.project.yml
│   ├── minio.project.yml
│   ├── dashboard.project.yml
│   └── tls.yaml
├── dynamic/                  # live routes, gitignored
└── websites/                 # certificates
```

`NAS1_IP` / `NAS2_IP` in `.env` are injected into Traefik. Dynamic files use `http://{{ env "NAS1_IP" }}:10030`. Editing `dynamic/` reloads Traefik; a restart is not required.

## Start

```bash
cp .example.env .env
# NAS1_IP / NAS2_IP
cp dynamic.example/*.project.yml dynamic/   # this glob does not copy tls.yaml
task traefik
```

The `*.project.yml` glob leaves `tls.yaml` behind. Copy it only after the cert files already exist under `websites/<site>/`:

```bash
cp dynamic.example/tls.yaml dynamic/tls.yaml
```

Do not put it in `dynamic/` while those files are missing, or the whole file provider fails to load. `task traefik` starts the proxy only. It does not create a Docker network.

## How products are reached

Business Compose publishes HTTP, gRPC, and the console on `${NAS_IP}:host port`. Traefik does not use container names.

Dev (`task run` default):

- Identity auth HTTP `10030`, asset HTTP `10032`, console `10034`
- News from `10050`, Storages from `10080`, Edge sites HTTP `10110`, Documentation `10120`
- Secure ports are the second half of the same product block (Identity auth HTTP `10035`)

Path prefixes are unchanged. `/nfx-identity/auth` strips `/nfx-identity`, so Fiber still sees `/auth`. Storages S3 is Host `s3.nebulaforgex.com` with no strip. ACME `/.well-known/acme-challenge` is in `edge.project.yml` on the `web` entrypoint, so the 80→443 redirect does not swallow it.

Moving a service to the other NAS is a URL change from `NAS1_IP` to `NAS2_IP`.

## LAN console redirects

In `dynamic/*.project.yml` (templates under `dynamic.example/`), the LAN routers `*-console-lan` and `documentation-lan` (`Host(NAS1_IP)`) use a `redirectRegex` middleware with `permanent: false`, so the response is HTTP 302. Opening `https://<NAS1_IP>/console/nfx-*` sends the browser to `http://<NAS1_IP>:<port>/console/nfx-*/`. Different ports keep each console's login state separate.

| Route | Port |
|-------|------|
| `/console/nfx-identity` | `10039` |
| `/console/nfx-edge` | `10115` |
| `/console/nfx-news` | `10075` |
| `/console/nfx-storages` | `10101` |
| `/console/nfx-documentation` | `10120` |

Domain routers (`*-console-host`, `documentation-host`) do not use this middleware and stay on Traefik HTTPS. Documentation's public Host is `docs.nebulaforgex.com`.

## Console nginx (for the LAN port)

After the redirect, APIs no longer go through Traefik. Each product's **secure** console nginx forwards them. Identity, Edge, News, and Storages `console/nginx.conf` add `/nfx-*` proxies that strip the product prefix and forward to the local secure backend.

| Console | Backend after the prefix is stripped |
|---------|--------------------------------------|
| Identity | auth `10035`, asset `10037` |
| Edge | sites `10113`, plus `/nfx-identity/auth` `10035` and `/nfx-identity/asset` `10037` |
| News | source `10063`, news `10065`, crawl `10067`, report `10069`, notify `10071`, mcp `10073`, plus Identity `10035` / `10037` |
| Storages | admin `10093`, object `10095`, iam `10097`, notify `10099`, plus Identity `10035` / `10037` |

All four configs set `absolute_redirect off`, `client_max_body_size 0`, WebSocket upgrade headers, and `proxy_read_timeout 600s`. The Dockerfile copies the file to `/etc/nginx/templates/default.conf.template`. Secure compose passes `NAS_IP` and `NGINX_ENVSUBST_FILTER=NAS_IP`, and the official nginx image runs envsubst. Documentation's `console/nginx.conf` only adds `absolute_redirect off` and still copies to `/etc/nginx/conf.d/default.conf`. It has no API proxy.

## Certificates

1. `dynamic/tls.yaml` lists `cert.crt` / `key.key` that already exist
2. Paths are `/certs/websites` inside the container (host `./websites`)
3. Do not list a missing file — the whole file provider fails to load
4. Do **not** enable Traefik `httpchallenge`, `tlschallenge`, or `certResolver`

Do not commit private keys.

## Static sites

`sites.project.yml`: `aquawork.ca` → `NAS1_IP:10400`, `timetablecraft.com` → `NAS1_IP:10401`. Those ports start at `10400`, outside the NFX blocks.

## Console overlays

Confirm, search, file, and tooltip overlays mount from Edge `ModalProvider` as `@radix-ui/themes` `Dialog`s. Overlay and border use Radix tokens.

## Troubleshooting

- Public fail, LAN works: 80/443 must forward to the NAS that runs Traefik
- 502: the backend must be bound on `NAS_IP`, and the dynamic file port must match `.env`
- Challenge fail: the ACME router in `edge.project.yml` must point at the sites HTTP port
- Dashboard: BasicAuth is `dashboard.project.yml`, not Grafana

Next: sites-base issues certificates.
