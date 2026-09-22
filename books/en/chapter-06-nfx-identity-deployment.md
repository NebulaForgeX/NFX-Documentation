# Chapter 6: NFX-Identity

[NFX-Identity](https://github.com/NebulaForgeX/NFX-Identity) is the login and profile hub. Two Go modules: **auth / asset**. Other products have **no** local account tables; they verify JWTs issued here and call gRPC `EnsureOwnedProfile` / `HasForgerRole`.

Do not resurrect the deleted tenants / access / directory / clients table docs. Canonical schemas are `auth` and `asset` only. The first owner is seeded by `scripts/init.sql` and auth gRPC `BootstrapOwner`.

## Console routes (split by kind)

Do not use `/user/*`. Kind is `FORGER` or `AUTHORITY` (not HL COMMUNITY). Source: `console/src/navigations/routes.ts` + `ScopeRoute`.

| Stage | Paths |
|-------|--------|
| Guest | `/auth/login` (email or phone), `/auth/signup` |
| Logged in, no profile | `/auth/select-profile` |
| Forger | `/forger/desk`, `/forger/profile/overview\|edit\|identity\|security`, `/forger/assets`, `/forger/settings` |
| Authority | same under `/authority/*`, plus `/authority/directory` |

The wrong tree is bounced by `ScopeRoute` to `profileHome(kind)` (Forger → `/forger/desk`, Authority → `/authority/desk`). Pages use **nfx-ui hooks** only. Pin **nfx-ui 0.33.0**.

## Ports and gateway

| Use | Variable | Value |
|-----|----------|--------|
| Container HTTP | `HTTP_PORT` | 8080 (expose only; not host 80) |
| AUTH / ASSET gRPC | `GRPC_PORT_*` | 50071 / 50072 |
| Host gRPC | `GRPC_EXT_PORT_*` | **10200 / 10201** |
| Console host map | `CONSOLE_EXTERNAL_PORT` | **10203** |
| Vite | `VITE_PORT` | 5173 |
| Gateway prefix | `API_GATEWAY_PREFIX` | `/nfx-identity` |
| Fiber mounts | `API_PREFIX_PATH_*` | `/auth` `/asset` |

Edge: PathPrefix `/nfx-identity/auth|asset` + StripPrefix `/nfx-identity`; console Host `TRAEFIK_CONSOLE_HOST`. Dev browser `VITE_API_URL=http://<lan>/nfx-identity` (through Edge).

Compose service names: `auth-base` / `asset-base` (containers `NFX-Identity-*-Base-Dev`). Networks: `nfx-identity`, `nfx-edge`, `nfx-stack`.

## Tokens (shared across products)

```
TOKEN_SECRET_KEY=<long-random>
TOKEN_ISSUER=nfxidentity
TOKEN_ACCESS_TTL=24h
TOKEN_REFRESH_TTL=168h
TOKEN_ALGORITHM=HS256
```

Edge / News / Storages must copy the same set. **Do not** put real secrets in Git or this handbook. JWT `profile_scope` enum: `forger` | `authority`.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Identity
cp .example.env .env
task proto:gen
task errors:gen-langs
task atlas:pipeline:run
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

Implemented in `modules/auth/interface/http/platform_router.go`.

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

`modules/asset/interface/http/server.go`. `kind` ∈ `images` | `files` | `videos` | `audios`. List/upload need a token; `GET /asset/{kind}/{id}/file` is unauthenticated at the router (handler still applies ownership where required).

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

Enums: `forger_role` (currently `forger` only), `authority_role`, `profile_scope` (`forger`/`authority`), `account_status`, `signup_platform`, `profile_language`, `identity_provider`.

Roles are **array membership**, not a hierarchy: SQL `@>` / `= ANY`, Go `HasRole`.

### asset

`Images` / `Files` / `Audios` / `Videos`: path, MIME, `uploader_id` (application-level `Accounts.id`, no FK).

Databases: `nfxidentity_dev` / `nfxidentity` / shadow `nfxidentity_diff`. Postgres **10104**, Redis **10106**.

## How other products verify

1. Same `TOKEN_SECRET_KEY` / `TOKEN_ISSUER`
2. gRPC Identity AUTH: `EnsureOwnedProfile(account_id, profile_id, profile_scope)`
3. `HasForgerRole` when a Forger capability is required

Edge/News/Storages `GRPC_HOST_AUTH` points at the Identity auth container, `GRPC_PORT_AUTH=50071`.

## kafkax (same package in every Go product)

Configured under `[kafka]` in `inputs/*/configuration/dev.toml`. In-compose brokers: `kafka:9092`. Identity auth today:

```toml
[kafka.producer_topics]
    auth = "nfxidentity.auth"
    auth_poison = "nfxidentity.auth_poison"
```

Map **logical keys** to real topic names. Call `cfg.Validate()` before Publisher/Subscriber. Leave `security.enabled=false` when Stack Kafka has no SASL. Other prefixes: Edge `nfxedge.cert`, News `nfxnews.*`, Storages `nfxstorages.s3`. Ignore leftover `nfx-identity-access` / `directory` samples in the package — those modules were removed; **toml in each repo wins**.

Error codes: `var ErrXxx = errx.XXX("CODE")` in `errors/src`, plus a footer block:

```
!ACCOUNT_NOT_FOUND
*en<account not found>
*zh<账号不存在>
```

`!CODE` must match the string. `task errors:gen-langs`.

Next: nfx-ui, shared by every console.
