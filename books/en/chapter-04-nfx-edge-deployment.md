# Chapter 4: NFX-Edge reverse proxy

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) is the **only** HTTP/HTTPS reverse proxy in NebulaForgeX (Traefik v3.7). Same pattern as CityPulso: one Traefik; products attach a network and labels. **sites-base** in this repo issues and writes TLS; Traefik has **no** built-in ACME.

- Creates and owns Docker network `nfx-edge`
- Owns host **80 / 443** (container `NFX-Edge-Reverse-Proxy`)
- Certs live at `websites/<site>/cert.crt` + `key.key`, listed in `dynamic/tls.yaml`
- Identity / News / Storages / Documentation must **not** run another Traefik

## Prerequisites

- Chapter 2 freed 80/443 on the NAS
- Chapter 3 Stack is up (products and sites-base also need `nfx-stack`; Traefik itself can start first)
- `task traefik` creates `nfx-edge`; product compose files and Traefik compose mark it `external: true`

## Layout

```
NFX-Edge/
├── .example.env / .example.secure.env
├── docker-compose.traefik.yml   # Reverse-Proxy: task traefik
├── docker-compose.dev.yml       # sites-base + console (dev)
├── docker-compose.yml           # sites-base + console (secure)
├── dynamic/
│   ├── sites.example.yml        # copy to sites.yml
│   ├── sites.yml                # local Host rules (gitignored)
│   ├── tls.example.yaml         # copy to tls.yaml
│   └── tls.yaml                 # file cert list (gitignored)
└── websites/<site>/             # certs written by sites-base
```

## `.env`

```bash
cp .example.env .env
```

`TRAEFIK_API_HOST` / `TRAEFIK_CONSOLE_HOST` are public hostnames for DNS/certs. Product routers match PathPrefix only, so a LAN IP works. The cert root is `./websites` in this repo — there is no separate `CERTS_DIR`.

## Start

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Edge
task traefik
task proto:gen
task atlas:pipeline:run
task run
sudo docker compose -f docker-compose.traefik.yml ps
sudo docker compose -f docker-compose.traefik.yml logs --tail 200
```

- `task traefik`: start `NFX-Edge-Reverse-Proxy`, create `nfx-edge`
- `task traefik:down` / `task traefik:logs` / `task traefik:restart`
- `task run`: sites-base + console (**does not** touch Traefik; missing network tells you to run `task traefik` first)
- `task run:down`: app stack only

Check:

- `:80` **301/308** to `:443` (entrypoint `redirections`; `/.well-known/acme-challenge/` stays on HTTP via `allowACMEByPass` for sites-base)
- Dashboard `/dashboard/` challenges BasicAuth
- `sudo docker compose -f docker-compose.traefik.yml config` interpolates cleanly

## Traefik flags (`docker-compose.traefik.yml`)

- `--entrypoints.web.address=:80`
- `--entrypoints.web.allowACMEByPass=true`
- `--entrypoints.web.http.redirections.entryPoint.to=websecure`
- `--entrypoints.web.http.redirections.entryPoint.scheme=https`
- `--entrypoints.web.http.redirections.entryPoint.permanent=true`
- `--entrypoints.websecure.address=:443` with TLS
- `--entrypoints.websecure.http.tls=true` (file certs; **no** `certificatesresolvers`)
- file provider `/dynamic` with watch
- Docker provider, `exposedbydefault=false`
- `--providers.docker.constraints=LabelRegex(\`traefik.project\`, \`^(nfx-edge|nfx-identity|nfx-news|nfx-storages|nfx-documentation)$\`)`
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

Consoles use PathPrefix `/console/nfx-<product>`; APIs use `/nfx-<product>/...`. Host is not part of the match (except the Documentation site, S3, and static sites). Do not map 80/443 on product compose files.

Documentation uses `Host(\`${DOCS_HOST}\`)` and `traefik.project=nfx-documentation`.

## Certificates

1. Copy `dynamic/tls.example.yaml` → `dynamic/tls.yaml`
2. Paths are inside the container at `/certs/websites` (host `./websites`)
3. Folder names match the site folders sites-base writes:

```yaml
tls:
  certificates:
    - certFile: /certs/websites/<site1>/cert.crt
      keyFile: /certs/websites/<site1>/key.key
```

4. ACME HTTP-01: sites-base Docker labels take `PathPrefix(\`/.well-known/acme-challenge\`)` (Chapter 5). **Do not** enable Traefik `httpchallenge` / `tlschallenge` / `certResolver`.
5. Do not list a path in `tls.yaml` until the files exist — Traefik fails the whole file provider.

Do not commit private keys. Mode `600`.

## Static sites

Copy `dynamic/sites.example.yml` to `dynamic/sites.yml` (gitignored). One file holds www / admin / static Host rules. Product APIs stay on product containers + labels.

## Troubleshooting

- Public fail, LAN works: port forward, NAT loopback, double NAT (Chapter 1)
- Challenge fail: sites-base on `nfx-edge` and inside the LabelRegex
- Wrong routes: overlapping Host / PathPrefix; `priority` (Identity API often `20`, console `1`)
- Dashboard: BasicAuth users are `docker-compose.traefik.yml` labels, not Grafana
- `task run` says the network is missing: run `task traefik` first

Next: sites-base issues certificates for Edge.
