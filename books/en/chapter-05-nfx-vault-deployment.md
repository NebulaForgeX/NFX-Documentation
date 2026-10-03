# Chapter 5: NFX-Edge certificates

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) **sites-base** (Go: tls / dns / file / analysis) plus a React console issues, renews, and writes TLS for Edge. The DNS package stores Namecheap-style credentials. The cert process now lives in Edge; do not run a second Traefik.

Login is **NFX-Identity** (Chapter 6). sites-base dials Identity as a client: `${GRPC_HOST_AUTH}:${GRPC_EXT_PORT_AUTH}` (dev host port `10031`, secure `10036`). This repo's `.env` has **no** `GRPC_PORT_AUTH`. `50071` is Identity's in-container listen, not a listen port on sites-base.

The old Python / Pqttec article tables **do not exist**.

## Order

1. Stack: Postgres / Redis / Kafka / OTEL (Chapter 3)
2. Edge: Traefik is on 80/443 (Chapter 4)
3. Identity: console login and JWT (API can come up before the UI)

## Ports

In-container sites gRPC is `GRPC_PORT_SITES=50072`, HTTP is `HTTP_PORT=8080`. The host only maps `HTTP_EXT_*` / `GRPC_EXT_*` / `CONSOLE_EXTERNAL_PORT` (**never** set `GRPC_EXT_* == GRPC_PORT_*`):

| Role | Container | Host (dev) | Host (secure) |
|------|-----------|------------|---------------|
| sites HTTP | `HTTP_PORT=8080` | `HTTP_EXT_PORT_SITES=10110` | `10113` |
| sites gRPC | `GRPC_PORT_SITES=50072` | `GRPC_EXT_PORT_SITES=10111` | `10114` |
| Console | `CONSOLE_PORT=80` | `CONSOLE_EXTERNAL_PORT=10112` | `10115` |
| Identity auth (client dial, not listened here) | Identity in-container `50071` | `GRPC_EXT_PORT_AUTH=10031` | `10036` |
| Vite | — | `VITE_PORT=5175` | same |

Fiber still serves `/edge/tls` `/edge/dns` `/edge/file` `/edge/analysis` after Traefik StripPrefix. This repo has **no** `API_GATEWAY_PREFIX`.

Browser variables:

- dev: `VITE_API_URL=/dev/nfx-edge`, `VITE_BASE=/dev/console/nfx-edge/`, `VITE_IDENTITY_API_URL=/dev/nfx-identity`
- secure: `VITE_API_URL=/nfx-edge`, `VITE_BASE=/console/nfx-edge/`, `VITE_IDENTITY_API_URL=/nfx-identity`

`GRPC_HOST_AUTH` is the Identity NAS **IP** (the `.example.env` sample is `192.168.1.64`), not an Identity compose container name. sites-base dials `${GRPC_HOST_AUTH}:${GRPC_EXT_PORT_AUTH}`.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Edge
cp .example.env .env
# TOKEN_SECRET_KEY / TOKEN_ISSUER=nfxidentity must match Identity exactly
# cert output dir is ./websites in this repo (Traefik mounts /certs/websites read-only)
task traefik
task proto:gen
task atlas:pipeline:run
task console:i
task run
```

Postgres names come from `.env` (often `nfxedge_dev` / `nfxedge` / shadow `nfxedge_diff`). Compose uses `POSTGRES_CONTAINER_NAME=NFX-Stack-PostgreSQL`; host tools use LAN:`10004`. Kafka: `KAFKA_BROKERS=NAS_IP:10008`. Redis: LAN:`10006`. OTLP: `NAS_IP:10016`.

## HTTP routes (Fiber)

Public i18n: `GET …/locales/:lang`, `GET …/messages/:lang`. Everything else is `TokenAuth` unless noted.

### TLS `/edge/tls`

| Method | Path | Notes |
|--------|------|--------|
| GET | `/.well-known/acme-challenge/:token` | HTTP-01 on the **app root**, not under `/edge/tls` |
| GET | `/check` | list |
| GET | `/detail-by-id/:certificateId` | detail |
| POST | `/apply` | issue |
| POST | `/reapply` | retry |
| POST | `/create` | create |
| PUT | `/update/manual-add` | manual import |
| DELETE | `/delete` | delete |
| POST | `/search` | search |
| POST | `/parse-preview` | preview |
| POST | `/invalidate-cache` | drop cache |

### FILE `/edge/file`

`GET /list`, `GET /content`, `GET /download`, `POST /export`, `POST /export-single`, `DELETE /delete`.

### DNS `/edge/dns`

| Method | Path |
|--------|------|
| GET | `/outbound-ip` |
| GET/POST | `/credentials` |
| GET/PUT/DELETE | `/credentials/:id` |
| POST | `/credentials/:id/verify` |
| GET | `/credentials/:id/balances` |
| GET | `/credentials/:id/domains` |
| GET | `/credentials/:id/ssl` |
| GET | `/credentials/:id/domains/:domain` |
| POST | `/credentials/:id/hosts` |
| PATCH | `/credentials/:id/hosts` |
| DELETE | `/credentials/:id/hosts` |
| POST | `/credentials/:id/hosts/bulk/preview` |
| POST | `/credentials/:id/hosts/bulk` |

### ANALYSIS `/edge/analysis`

`POST /tls` (protected).

## Console routes (`console/src/navigations/routes.ts`)

Guest: `/auth/login`, `/auth/signup`. After login the profile tree is still `/user/profile/overview|edit|identities` and `/user/settings` (**not** Identity's `/forger/*` tree yet). Product pages:

- `/certs`, `/certs/overview`, `/certs/add`, `/certs/:certificateId`, `/certs/:certificateId/edit`
- `/analysis/tls`
- `/filefolder`
- `/namecheap`, `/namecheap/overview`, `/namecheap/new`
- `/namecheap/:credentialId`, `/namecheap/:credentialId/edit`
- `/namecheap/:credentialId/domains`, `/namecheap/:credentialId/domains/bulk`
- `/namecheap/:credentialId/domains/:domain`, `/namecheap/:credentialId/ssl`

Login uses nfx-ui hooks against Identity; cert APIs use this repo's axios client. Pin **nfx-ui 0.36.0**.

## Database (current schemas)

Schema `sites` only. There is no `dns` schema and no DDNS table.

- `sites.tls_certificates`: unique `domain`; `certificate` / `private_key` text; `folder_name` maps to an Edge site folder; `status`; `sans` JSONB; `not_before` / `not_after`
- `sites.namecheap_credentials`: Namecheap XML API credentials (`label` / `api_user` / `api_key` / `client_ip` / `sandbox`)

## Kafka

sites process `inputs/sites/configuration/dev.toml` (secure uses the same keys):

```toml
[kafka.producer_topics]
    cert = "nfxedge.cert"
    cert_poison = "nfxedge.cert_poison"
    file = "nfxedge.file"
    file_poison = "nfxedge.file_poison"

[kafka.consumer_topics]
    cert = "nfxedge.cert"
    cert_poison = "nfxedge.cert_poison"
    file = "nfxedge.file"
    file_poison = "nfxedge.file_poison"
```

Brokers: `NAS_IP:10008` (Stack EXTERNAL). kafkax package usage is in Chapter 6.

## Handshake with Edge

1. sites-base writes `websites/<folder>/cert.crt` + `key.key`
2. Update Edge `dynamic/tls.yaml` (do not list a path until the files exist)
3. ACME HTTP-01 is `dynamic/edge.project.yml`, aimed at the sites host HTTP port (secure is `10113`). Traefik has **no** `certResolver`
4. Never commit private keys

Next: Identity, the login hub.
