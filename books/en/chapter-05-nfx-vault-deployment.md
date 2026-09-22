# Chapter 5: NFX-Edge certificates

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) **sites-base** (Go: tls / dns / file / analysis) plus a React console issues, renews, and writes TLS for Edge. The DNS package stores Namecheap-style credentials. The cert process now lives in Edge; do not run a second Traefik.

Login is **NFX-Identity** (Chapter 6). `GRPC_PORT_AUTH=50071` is a **client** port toward Identity, not a listen port on sites-base.

The old Python / Pqttec article tables **do not exist**.

## Order

1. Stack: Postgres / Redis / Kafka / OTEL (Chapter 3)
2. Edge: `nfx-edge` exists (Chapter 4)
3. Identity: console login and JWT (API can come up before the UI)

## Ports

In-container `GRPC_PORT_*` = 50072. The host only maps `GRPC_EXT_*` (**never** set `GRPC_EXT_* == GRPC_PORT_*`):

| Process | `GRPC_PORT` | `GRPC_EXT` | HTTP prefix after StripPrefix |
|---------|-------------|------------|-------------------------------|
| AUTH client | 50071 | (not mapped; talks to Identity) | — |
| SITES | 50072 | **10219** | `/edge` (Fiber still serves `/edge/tls` `/edge/dns` `/edge/file` `/edge/analysis`) |
| Console | — | **10221** (`CONSOLE_EXTERNAL_PORT`) | Host `TRAEFIK_CONSOLE_HOST` |
| Vite | — | `VITE_PORT=5175` | local dev |

Gateway: `API_GATEWAY_PREFIX=/nfx-edge`. Browser `VITE_API_URL` is Edge `/nfx-edge`; `VITE_IDENTITY_API_URL` is `/nfx-identity`.

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

Postgres names come from `.env` (often `nfxedge_dev` / `nfxedge` / shadow `nfxedge_diff`). Compose uses `POSTGRES_CONTAINER_NAME=NFX-Stack-PostgreSQL`; host tools use LAN:`10104`. Kafka: `KAFKA_BROKERS=kafka:9092`. Redis: LAN:`10106`. OTLP: `otel-collector:4317`.

`GRPC_HOST_AUTH` in Edge sites-base is often `NFX-Identity-Auth-Base-Dev` (Identity container name), not Identity’s own `GRPC_HOST_AUTH=auth-base` — sites-base is a **cross-stack client**.

## HTTP routes (Fiber)

Public i18n: `GET …/locales/:lang`, `GET …/messages/:lang`. Everything else is `TokenAuth` unless noted.

### TLS `/edge/tls`

| Method | Path | Notes |
|--------|------|--------|
| GET | `/.well-known/acme-challenge/:token` | HTTP-01 on the **app root**, not under `/edge/tls` |
| GET | `/check` | list |
| GET | `/detail-by-id/:certificateId` | detail |
| POST | `/apply` `/reapply` `/create` | issue / retry / create |
| PUT | `/update/manual-add` | manual import |
| DELETE | `/delete` | delete |
| POST | `/search` `/parse-preview` `/invalidate-cache` | search / preview / cache |

### FILE `/edge/file`

`GET /list`, `GET /content`, `GET /download`, `POST /export`, `POST /export-single`, `DELETE /delete`.

### DNS `/edge/dns`

| Method | Path |
|--------|------|
| GET/PUT/DELETE | `/credential` |
| POST | `/credential/verify` |
| GET | `/domains` `/hosts` `/outbound-ip` |
| GET/PUT/DELETE | `/ddns-hosts` |
| PUT | `/a-records` |

### ANALYSIS `/edge/analysis`

`POST /tls` (protected).

## Console routes (`console/src/navigations/routes.ts`)

Guest: `/auth/login`, `/auth/signup`. After login the profile tree is still `/user/profile/overview|edit|identities` and `/user/settings` (**not** Identity’s `/forger/*` tree yet). Product pages:

- `/check`
- `/cert/add`, `/cert/edit/:certificateId`, `/cert/:certificateId`
- `/analysis/tls`
- `/filefolder`
- `/dns`, `/dns/:domain`

Login uses nfx-ui hooks against Identity; cert APIs use this repo’s axios client. Pin **nfx-ui 0.33.0**.

## Database (current schemas)

- `sites.tls_certificates`: unique `domain`; `certificate` / `private_key` text; `folder_name` maps to an Edge site folder; `sans` JSONB; `not_before` / `not_after`
- `dns.namecheap_credentials`, `dns.namecheap_ddns_hosts`

## Kafka

tls `inputs/sites/configuration/dev.toml`:

```toml
[kafka.producer_topics]
    cert = "nfxedge.cert"
    cert_poison = "nfxedge.cert_poison"
```

Brokers in-compose: `kafka:9092`. kafkax package usage is in Chapter 6.

## Handshake with Edge

1. sites-base writes `websites/<folder>/cert.crt` + `key.key`
2. Update Edge `dynamic/tls.yaml` (do not list a path until the files exist)
3. Both sit on `nfx-edge`; sites-base ACME labels serve HTTP-01. Traefik has **no** `certResolver`
4. Never commit private keys

Next: Identity, the login hub.
