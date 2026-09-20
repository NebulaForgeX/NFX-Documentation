# Chapter 4: NFX-Edge reverse proxy

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) is the **only** HTTP/HTTPS reverse proxy in NebulaForgeX (Traefik v3.7). Same pattern as CityPulso: one Traefik; products attach a network and labels.

- Creates and owns Docker network `nfx-edge`
- Owns host **80 / 443** (container `NFX-Edge-Reverse-Proxy`)
- Certificates come from files (Vault in Chapter 5). Traefik built-in ACME is **not** aimed at the product stacks
- Identity / Vault / News / Storages / Documentation must **not** run another Traefik

## Prerequisites

- Chapter 2 freed 80/443 on the NAS
- Chapter 3 Stack is up (products also need `nfx-stack`; Edge itself can start first)
- This compose creates `nfx-edge`; product compose files mark it `external: true`

## Layout

```
NFX-Edge/
├── .env.example
├── docker-compose.yml
├── docker-compose.example.yml
├── start.sh                     # sudo docker compose -f docker-compose.yml up --build -d
├── dynamic/
│   ├── acme-challenge.yml       # currently http: {}; ACME is Vault labels
│   ├── tls.example.yaml         # copy to tls.yaml
│   └── *.yml                    # static Host rules
└── public/nginx.conf
```

## `.env`

```bash
cp .env.example .env
```

Set at least:

| Variable | Meaning |
|----------|---------|
| `CERTS_DIR` | Absolute cert root, mounted read-only as `/certs/websites` |
| `DASHBOARD_HOST` | Traefik dashboard Host (compose may hard-code; follow the repo) |
| `SITE*_WWW_DIR` / `SITE*_ADMIN_DIR` | Optional static site dirs |
| `NGINX_CONFIG_FILE` | Nginx config for static sites |

Paths must exist on the host.

## Start

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Edge
./start.sh
sudo docker compose ps
sudo docker compose logs --tail 200 NFX-Edge-Reverse-Proxy
```

Check:

- `http://<your-host>` **301/308** to `https://`
- Dashboard Host challenges BasicAuth
- `sudo docker compose config` interpolates cleanly

Ops:

```bash
sudo docker compose up --build -d
sudo docker compose logs -f NFX-Edge-Reverse-Proxy
sudo docker compose restart NFX-Edge-Reverse-Proxy
```

## Traefik flags (`docker-compose.yml`)

- `--entrypoints.web.address=:80`
- permanent HTTP → HTTPS redirect onto `websecure`, priority `1`
- `--entrypoints.websecure.address=:443` with TLS
- file provider `/dynamic` with watch
- Docker provider, `exposedbydefault=false`
- `--providers.docker.constraints=LabelRegex(\`traefik.project\`, \`^(nfx-edge|nfx-identity|nfx-vault|nfx-news|nfx-storages|nfx-documentation)$\`)`
- `--providers.docker.network=nfx-edge`
- dashboard on, `api.insecure=false`

Containers whose `traefik.project` is **not** in that regex are invisible to Traefik. A new product must update the regex, set the label, and join `nfx-edge`.

`extra_hosts: host.docker.internal:host-gateway` lets containers reach the host.

## How products attach

HTTP services join `nfx-edge` (and `nfx-stack` when they need data). Identity (`docker-compose.dev.yml`) example:

```yaml
labels:
  traefik.enable: "true"
  traefik.project: "nfx-identity"
  traefik.http.services.identity-auth-base.loadbalancer.server.port: "${HTTP_PORT}"
  traefik.http.middlewares.nfx-identity-auth-gw.stripprefix.prefixes: ${API_GATEWAY_PREFIX}
  traefik.http.routers.identity-auth-base.rule: PathPrefix(`${API_GATEWAY_PREFIX}${API_PREFIX_PATH_AUTH}`)
  traefik.http.routers.identity-auth-base.middlewares: nfx-identity-auth-gw
  traefik.http.routers.identity-auth-base-secure.tls: "true"
```

The browser hits `http://<lan>/nfx-identity/auth/...`. After StripPrefix of `/nfx-identity`, Fiber still mounts `/auth`.

Consoles use **Host** rules (`TRAEFIK_CONSOLE_HOST`). Do not map 80/443 on product compose files.

Documentation uses `Host(\`${DOCS_HOST}\`)` and `traefik.project=nfx-documentation`.

## Certificates

1. Copy `dynamic/tls.example.yaml` → `dynamic/tls.yaml`
2. Paths are inside the container at `/certs/websites` (host `CERTS_DIR`)
3. Folder names usually match Vault site folders:

```yaml
tls:
  certificates:
    - certFile: /certs/websites/<site1>/cert.crt
      keyFile: /certs/websites/<site1>/key.key
```

4. ACME HTTP-01: **do not** proxy to a deleted per-app Traefik port. `dynamic/acme-challenge.yml` is empty `http: {}`. Challenges are served by NFX-Vault **tls-api** Docker labels (`GET /.well-known/acme-challenge/:token`, Chapter 5)

Do not commit private keys. Mode `600`.

## Static sites

Edge can host Nginx dirs plus `dynamic/www-*.yml` Host rules. Product APIs stay on product containers + labels.

## Troubleshooting

- Public fail, LAN works: port forward, NAT loopback, double NAT (Chapter 1)
- Challenge fail: Vault tls-api on `nfx-edge` and inside the LabelRegex
- Wrong routes: overlapping Host / PathPrefix; `priority` (Identity API often `20`, console `1`)
- Dashboard: BasicAuth users are compose labels, not Grafana

Next: Vault issues certificates for Edge.
