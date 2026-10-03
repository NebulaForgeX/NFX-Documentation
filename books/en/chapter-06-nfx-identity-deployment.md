# Chapter 6: NFX-Identity

[NFX-Identity](https://github.com/NebulaForgeX/NFX-Identity) is the login and profile hub. Two Go modules: **auth / asset**. Other products have **no** local account tables; they verify JWTs issued here and call gRPC `EnsureOwnedProfile` / `HasForgerRole`.

Do not resurrect the deleted tenants / access / directory / clients table docs. Canonical schemas are `auth` and `asset` only. The first owner is seeded by `scripts/init.sql` and auth gRPC `BootstrapOwner`.

## Console routes (split by kind)

Do not use `/user/*`. JWT and `POST /auth/me/select-profile` `kind` (the same value as `profile_scope`) is **`community` | `authority`** (lowercase). `forger` is a role on the community profile (`forger_role`), not a kind. The console URL tree is still split by path: `/forger/*` is community and `/authority/*` is authority. The path prefix and the wire value are different words. Sources: `console/src/navigations/routes.ts` + `ScopeRoute` + `databases/src/schemas/auth/enums/profile_scope.sql`.

| Stage | Paths |
|-------|--------|
| Guest | `/auth/login` (email or phone), `/auth/signup` |
| Logged in, no profile | `/auth/select-profile` |
| Forger | `/forger/desk`, `/forger/profile/overview\|edit\|identity\|security`, `/forger/assets`, `/forger/settings` |
| Authority | same under `/authority/*`, plus `/authority/directory` |

The wrong tree is bounced by `ScopeRoute` to `profileHome(kind)` (Forger → `/forger/desk`, Authority → `/authority/desk`). Pages use **nfx-ui hooks** only. Do not call a repository from a page. Pin **nfx-ui 0.36.0**.

Birthday on profile edit is a read-only trigger. It opens the calendar `Dialog` mounted by `ModalProvider` (`showDateTimePickerModal`) and writes `YYYY-MM-DD` on confirm. Do not use the browser date input.

## Ports and gateway

| Use | Variable | Value |
|-----|----------|--------|
| Container HTTP | `HTTP_PORT` | 8080 |
| AUTH / ASSET host HTTP (dev) | `HTTP_EXT_PORT_*` | **10030 / 10032** |
| AUTH / ASSET gRPC | `GRPC_PORT_*` | 50071 / 50072 |
| Host gRPC (dev) | `GRPC_EXT_PORT_*` | **10031 / 10033** |
| Console host map (dev) | `CONSOLE_EXTERNAL_PORT` | **10034** |
| AUTH / ASSET host HTTP (secure) | `HTTP_EXT_PORT_*` | **10035 / 10037** |
| Host gRPC (secure) | `GRPC_EXT_PORT_*` | **10036 / 10038** |
| Console host map (secure) | `CONSOLE_EXTERNAL_PORT` | **10039** |
| Vite | `VITE_PORT` | 5173 |
| Gateway prefix | Edge `identity.project.yml` | secure `/nfx-identity`, dev `/dev/nfx-identity` (Fiber still mounts `/auth` `/asset`) |

Edge: PathPrefix `/nfx-identity/auth|asset` (dev is `/dev/nfx-identity/...`) plus StripPrefix. Console PathPrefix is `/console/nfx-identity`. The domain stays on HTTPS reverse proxy. LAN `Host(NAS1_IP)` returns 302 to the console port (dev `10034`, secure `10039`); see Chapter 4. Browser variables: dev `VITE_API_URL=/dev/nfx-identity`, `VITE_BASE=/dev/console/nfx-identity/`; secure `VITE_API_URL=/nfx-identity`, `VITE_BASE=/console/nfx-identity/`.

Compose service names: `auth-base` / `asset-base` (containers `NFX-Identity-*-Base-Dev`). Published on `NAS_IP`. No Traefik labels and no shared Docker network.

## Tokens (shared across products)

```
TOKEN_SECRET_KEY=<long-random>
TOKEN_ISSUER=nfxidentity
TOKEN_ACCESS_TTL=24h
TOKEN_REFRESH_TTL=168h
TOKEN_ALGORITHM=HS256
```

Edge / News / Storages must copy the same set. **Do not** put real secrets in Git or this handbook. JWT `profile_scope` enum: `community` | `authority`.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Identity
cp .example.env .env
# TOKEN_*, Postgres / Redis / MinIO / SMTP placeholders
task proto:gen
task errors:gen-langs
task atlas:pipeline:run          # ENV=dev by default; secure: ENV=secure
task console:i
sudo docker compose -f docker-compose.dev.yml up --build
```

Tasks (`task start` for the menu; `ENV=dev|secure`):

| Task | What |
|------|------|
| `task proto:gen` | `buf generate` → `protos/gen` (never hand-edit generated files) |
| `task errors:gen-langs` | `errors/src` comment blocks → `errors/langs/*.json` |
| `task messages:gen-langs` | success copy |
| `task atlas:pipeline:run` | schema → DB; shadow `nfxidentity_diff` |
| `task atlas:gen` | models/enums/views from DB |
| `task fmt` / `lint` / `ci` | goimports+golines / golangci-lint |
| `task run` | compose up (dev `--watch`) |
| `task scripts:clear-data` | truncate auth/asset (dev only, `-- --yes`) |
| `task console` | `npm run dev` |

Schema source of truth: `databases/src/**.sql`. Change SQL first, then Atlas.

## HTTP: auth `/auth`

Implemented in `modules/auth/interface/http/router.go`.

### Public

| Method | Path | JSON |
|--------|------|------|
| POST | `/auth/login/with-email` | `email`, `password`, `device_id` |
| POST | `/auth/login/with-phone` | `phone`, `password`, `device_id` |
| POST | `/auth/signup/send-code` | `email`, `lang` |
| POST | `/auth/signup/with-email` | `email`, `password`, `verification_code`, `lang`, `device_id`, `signup_platform` |
| POST | `/auth/refresh` | `refresh_token`, `device_id` |
| POST | `/auth/logout` | `refresh_token` |
| GET | `/auth/health` | `{ "service": "auth" }` |
| GET | `/auth/locales/:lang` `/auth/messages/:lang` | i18n JSON |

SMTP: `EMAIL_SMTP_*` in `.env`.

### `/auth/me` (Bearer)

| Method | Path | JSON |
|--------|------|------|
| POST | `/select-profile` | `profile_id`, `kind`, `device_id` |
| GET | `/full-account-information-with-forger-profile` | forger bundle for the JWT |
| GET | `/full-account-information-with-authority-profile` | authority bundle |
| PATCH | `/forger-profile` `/authority-profile` | field map |
| PATCH | `/forger-profile-settings` `/authority-profile-settings` | `login_notification` |
| PUT/DELETE | `/forger-profile/avatars` `/authority-profile/avatars` | PUT `image_id` |
| PUT | `/forger-profile/backgrounds` `/authority-profile/backgrounds` | `images[]` of `image_id`, `sort_order` |
| PUT | `/forger-profile/preference` `/authority-profile/preference` | `preference` |
| GET/POST | `/emails` | POST `email` |
| POST | `/emails/:emailId/send-verification-code` | `lang` |
| POST | `/emails/:emailId/verify` | `verification_code` |
| PATCH | `/emails/:emailId` | `email` |
| PUT | `/emails/:emailId/primary` | — |
| DELETE | `/emails/:emailId` | — |
| GET/POST | `/phones` | POST `phone` |
| POST | `/phones/:phoneId/send-verification-code` | — |
| POST | `/phones/:phoneId/verify` | `verification_code` |
| PATCH | `/phones/:phoneId` | `phone` |
| PUT | `/phones/:phoneId/primary` | — |
| DELETE | `/phones/:phoneId` | — |
| GET/POST | `/profiles` | POST `display_name`, `profile_language` (Forger) |
| POST | `/profiles/search` | `query`, `limit`, `offset` |
| DELETE | `/profiles/:profileId` | — |
| GET | `/profiles/:profileId/public-card` | public card |
| GET/POST | `/authority-profiles` | same create fields |
| POST | `/authority-profiles/search` | same |
| DELETE | `/authority-profiles/:profileId` | — |
| POST | `/password/send-verification-code` | `lang` |
| PUT | `/password` | `current_password`, `new_password`, `verification_code` |

### `/auth/owner` (Bearer)

| Method | Path |
|--------|------|
| GET | `/forger-profiles` `?query&limit&offset` |
| GET | `/authority-profiles` |
| PATCH | `/authority-profiles/:profileId/roles` body `authority_roles[]` |

## HTTP: asset `/asset`

Routes: `modules/asset/interface/http/router.go` (mounted from `server.go`). `kind` ∈ `images` | `files` | `videos` | `audios`. List/upload need a token; `GET /asset/{kind}/{id}/file` is unauthenticated at the router (handler still applies ownership where required).

| Method | Path |
|--------|------|
| GET | `/asset/locales/:lang` `/asset/messages/:lang` |
| GET | `/health` (app root) |
| GET | `/asset/{kind}/` |
| POST | `/asset/{kind}/upload-url` `/upload-urls` |
| POST | `/asset/{kind}/confirm` `/confirm-{kind}` |
| DELETE | `/asset/{kind}/:id` |
| GET | `/asset/{kind}/:id/file` |

Bytes live in Stack **MinIO** (`MINIO_ENDPOINT=minio:9000`, path-style; keys match Stack `MINIO_ROOT_*`). That is not NFX-Storages.

## Database (`databases/src/schemas`)

### auth

| Table | Role |
|-------|------|
| `Accounts` | Core account: `account_status`, `signup_platform` (default `nfxidentity`); no email, no password |
| `Identities` | Credentials: `identity_provider` + `provider_subject`; password hash only for password provider |
| `Emails` | Many emails; at most one non-deleted primary; partial unique on `LOWER(email)`; soft-delete then re-register inserts a new row |
| `Phones` | Same pattern; store E.164 |
| `ForgerProfiles` | 1 account : N profiles; `forger_roles forger_role[]` default `{forger}` |
| `AuthorityProfiles` | Same; `authority_roles` default `{auditor}`; enum `auditor\|administrator\|owner` |
| `RefreshTokens` | `token_hash` only; `device_id` for same-device revoke; `profile_scope` |
| Link tables | avatars, backgrounds, settings per profile kind |

Enums: `forger_role` (currently `forger` only), `authority_role` (`auditor` / `administrator` / `owner`), `profile_scope` (`community` / `authority`), `account_status` (`active` / `suspended` / `deleted`), `signup_platform` (default `nfxidentity`, also `nfxnews` / `nfxstorages` / `nfxedge`), `profile_language` (`en` / `zh` / `fr`), `identity_provider` (currently `password` only).

Roles are **array membership**, not a hierarchy: SQL `@>` / `= ANY`, Go `HasRole`.

### asset

`Images` / `Files` / `Audios` / `Videos`: path, MIME, `uploader_id` (application-level `Accounts.id`, no FK).

Databases: `nfxidentity_dev` / `nfxidentity` / shadow `nfxidentity_diff`. Postgres **10004**, Redis **10006**.

## How other products verify

1. Same `TOKEN_SECRET_KEY` / `TOKEN_ISSUER`
2. gRPC Identity AUTH: `EnsureOwnedProfile(account_id, profile_id, profile_scope)`
3. `HasForgerRole` when a Forger capability is required

Edge / News / Storages dial Identity with `GRPC_HOST_AUTH` set to the NAS IP and `GRPC_EXT_PORT_AUTH` (dev `10031`, secure `10036`). Identity still listens on `50071` inside its container. Those other repos have no `GRPC_PORT_AUTH`.

## kafkax (same package in every Go product)

Configured under `[kafka]` in `inputs/*/configuration/dev.toml`. Inside the container `brokers = ["${KAFKA_BROKERS}"]`, and the value is `NAS_IP:10008`. Identity auth today:

```toml
[kafka]
    brokers = ["${KAFKA_BROKERS}"]
    client_id = "nfxidentity-auth-service"
    [kafka.producer]
        acks = "all"
        compression = "snappy"
        idempotent = true
    [kafka.consumer]
        group_id = "nfxidentity-auth"
    [kafka.producer_topics]
        auth = "nfxidentity.auth"
        auth_poison = "nfxidentity.auth_poison"
    [kafka.consumer_topics]
        auth = "nfxidentity.auth"
        auth_poison = "nfxidentity.auth_poison"
    [kafka.security]
        enabled = false
```

`producer_topics` / `consumer_topics` map a **logical key** (such as `auth`) to the real topic name. Call `cfg.Validate()` before creating a Publisher or Subscriber. Leave `security.enabled=false` when Stack Kafka has no SASL. Other prefixes: Edge `nfxedge.cert`, News `nfxnews.*`, Storages `nfxstorages.s3`. Ignore leftover `nfx-identity-access` / `directory` samples in the package — those modules were removed; **toml in each repo wins**.

Error codes: `var ErrXxx = errx.XXX("CODE")` in `errors/src`, plus a footer block:

```
!ACCOUNT_NOT_FOUND
*en<account not found>
*zh<账号不存在>
```

`!CODE` must match the string. `task errors:gen-langs`.

Next: nfx-ui, shared by every console.
