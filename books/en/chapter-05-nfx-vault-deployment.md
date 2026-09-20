# Chapter 5: NFX-Vault certificates

[NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) is a **Go** service (modules **tls / file / analysis / system / dns**) plus a React console — not Python. It issues, renews, and writes TLS material for Edge. The DNS module stores Namecheap-style credentials and DDNS hosts.

Login is **NFX-Identity** (Chapter 6). `GRPC_PORT_AUTH=50071` is a **client** port toward Identity, not a Vault listen port.

The old Python / Pqttec article tables **do not exist**.

## Order

1. Stack: Postgres / Redis / Kafka / OTEL (Chapter 3)
2. Edge: `nfx-edge` exists (Chapter 4)
3. Identity: console login and JWT (API can come up before the UI)

## Ports

In-container `GRPC_PORT_*` = 50072–50076. The host only maps `GRPC_EXT_*` (**never** set `GRPC_EXT_* == GRPC_PORT_*`):

| Module | `GRPC_PORT` | `GRPC_EXT` | HTTP prefix after StripPrefix |
|--------|-------------|------------|-------------------------------|
| AUTH client | 50071 | (not mapped; talks to Identity) | — |
| TLS | 50072 | **10219** | `/vault/tls` |
| FILE | 50073 | **10220** | `/vault/file` |
| ANALYSIS | 50074 | **10221** | `/vault/analysis` |
| SYSTEM | 50075 | **10222** | `/system` |
| DNS | 50076 | **10223** | `/vault/dns` |
| Console | — | **10224** (`CONSOLE_EXTERNAL_PORT`) | Host `TRAEFIK_CONSOLE_HOST` |
| Vite | — | `VITE_PORT=5175` | local dev |

Gateway: `API_GATEWAY_PREFIX=/nfx-vault`. Browser `VITE_API_URL` is Edge `/nfx-vault`; `VITE_IDENTITY_API_URL` is `/nfx-identity`.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Vault
cp .example.env .env
# TOKEN_SECRET_KEY / TOKEN_ISSUER=nfxidentity must match Identity exactly
# certificate output dir must match Edge CERTS_DIR
task proto:gen
task atlas:pipeline:run
task console:i
sudo docker compose -f docker-compose.dev.yml up --build
```

Postgres names come from `.env` (often `nfxvault_dev` / `nfxvault` / shadow `nfxvault_diff`). Compose uses `POSTGRES_CONTAINER_NAME=NFX-Stack-PostgreSQL`; host tools use LAN:`10104`. Kafka: `KAFKA_BROKERS=kafka:9092`. Redis: LAN:`10106`. OTLP: `otel-collector:4317`.

`GRPC_HOST_AUTH` in Vault dev is often `NFX-Identity-Auth-Base-Dev` (Identity container name), not Identity’s own `GRPC_HOST_AUTH=auth-base` — Vault is a **cross-stack client**.

## HTTP routes (Fiber)

Public i18n: `GET …/locales/:lang`, `GET …/messages/:lang`. Everything else is `TokenAuth` unless noted.

### TLS `/vault/tls`

| Method | Path | Notes |
|--------|------|--------|
| GET | `/.well-known/acme-challenge/:token` | HTTP-01 on the **app root**, not under `/vault/tls` |
| GET | `/check` | list |
| GET | `/detail-by-id/:certificateId` | detail |
| POST | `/apply` `/reapply` `/create` | issue / retry / create |
| PUT | `/update/manual-add` | manual import |
| DELETE | `/delete` | delete |
| POST | `/search` `/parse-preview` `/invalidate-cache` | search / preview / cache |

### FILE `/vault/file`

`GET /list`, `GET /content`, `GET /download`, `POST /export`, `POST /export-single`, `DELETE /delete`.

### DNS `/vault/dns`

| Method | Path |
|--------|------|
| GET/PUT/DELETE | `/credential` |
| POST | `/credential/verify` |
| GET | `/domains` `/hosts` `/outbound-ip` |
| GET/PUT/DELETE | `/ddns-hosts` |
| PUT | `/a-records` |

### ANALYSIS `/vault/analysis`

`POST /tls` (protected).

### SYSTEM `/system`

`GET /system-state/latest`, `POST /system-state/initialize` (public bootstrap).

## Console routes (`console/src/navigations/routes.ts`)

Guest: `/auth/login`, `/auth/signup`. After login the profile tree is still `/user/profile/overview|edit|identities` and `/user/settings` (**not** Identity’s `/forger/*` tree yet). Product pages:

- `/check`
- `/cert/add`, `/cert/edit/:certificateId`, `/cert/:certificateId`
- `/analysis/tls`
- `/filefolder`
- `/dns`, `/dns/:domain`

Login uses nfx-ui hooks against Identity; cert APIs use this repo’s axios client. Pin **nfx-ui 0.29.0**.

## Database (current schemas)

- `vault.tls_certificates`: unique `domain`; `certificate` / `private_key` text; `folder_name` maps to an Edge site folder; `sans` JSONB; `not_before` / `not_after`
- `dns.namecheap_credentials`, `dns.namecheap_ddns_hosts`
- `system.system_state` bootstrap flag

## Kafka

tls `inputs/tls/configuration/dev.toml`:

```toml
[kafka.producer_topics]
    cert = "nfxvault.cert"
    cert_poison = "nfxvault.cert_poison"
```

Brokers in-compose: `kafka:9092`. kafkax package usage is in Chapter 6.

## Handshake with Edge

1. Vault writes `CERTS_DIR/<folder>/cert.crt` + `key.key`
2. Update Edge `dynamic/tls.yaml`
3. Both sit on `nfx-edge`; tls-api labels serve ACME
4. Never commit private keys

Next: Identity, the login hub.
