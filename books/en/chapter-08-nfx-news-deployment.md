# Chapter 8: NFX-News

[NFX-News](https://github.com/NebulaForgeX/NFX-News) is a Go microservice laid out like Identity. Browsers hit Fiber HTTP; modules talk native gRPC; Kafka topics use the `nfxnews.*` prefix.

**There is no auth module and no local account table.** The console uses nfx-ui against Identity HTTP; this API verifies the same JWT (`TOKEN_ISSUER=nfxidentity`).

Older Fastify / TrendRadar / Node `news_server`, `crawl_server`, `mcp_server`, and `web_server` docs are **void**. Trust `modules/` in this repo.

## Modules

| Module | Role |
|--------|------|
| **source** | Source catalog and fetch |
| **news** | Items, search, column preferences |
| **crawl** | Crawl sessions |
| **report** | Keyword DSL (`+must` / `!exclude`) and snapshots |
| **notify** | Feishu / DingTalk / WeCom / Telegram webhooks (secrets only in `.env`) |
| **mcp** | MCP tool list and invocation |
| **system** | Health and bootstrap |

## Ports

`GRPC_PORT_AUTH=50071` is an Identity **client**. This repo listens on:

| Module | `GRPC_PORT` | `GRPC_EXT` |
|--------|-------------|------------|
| SOURCE | 50072 | **10204** |
| NEWS | 50073 | **10205** |
| CRAWL | 50074 | **10206** |
| REPORT | 50075 | **10207** |
| NOTIFY | 50076 | **10208** |
| MCP | 50077 | **10209** |
| SYSTEM | 50078 | **10210** |
| Console | — | **10211** |

Vite `VITE_PORT=5174`. Gateway `API_GATEWAY_PREFIX=/nfx-news`. Fiber prefixes: `/source` `/news` `/crawl` `/report` `/notify` `/mcp` `/system`. Browser `VITE_API_URL` → Edge `/nfx-news`, `VITE_IDENTITY_API_URL` → `/nfx-identity`. `GRPC_HOST_AUTH` points at the Identity auth container.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-News
cp .example.env .env
task proto:gen
task errors:gen-langs
task atlas:pipeline:run:sh
task console:i
sudo docker compose -f docker-compose.dev.yml up --build
```

Databases: `nfxnews_dev` / `nfxnews` / `nfxnews_diff`. Stack: Postgres 10104, Redis 10106, Kafka `kafka:9092`, OTLP 4317.

## HTTP routes

### source `/source`

`GET /sources`, `GET /sources/:id`, `POST /sources/:id/fetch`, i18n locales/messages.

### news `/news`

Public: `GET /items`, `GET /search`, i18n. Protected: `GET/PUT /preferences`.

### crawl `/crawl` (token)

`GET /sessions`, `GET /sessions/:id`, `POST /sessions`.

### report `/report` (token)

`GET /keywords`, `POST /keywords`, `GET /snapshots`, `GET /snapshots/:id`, `GET /snapshots/:id/html`, `POST /snapshots`.

### notify `/notify` (token)

`GET /kinds`, `GET/POST /channels`, `GET /deliveries`, `POST /dispatch`.

### mcp `/mcp` (token)

`GET /tools`, `POST /tools/:name`, `POST /run`.

### system `/system` (token)

`GET /system-state/latest`, `POST /system-state/initialize`.

## Console (`console/src/navigations/routes.ts`)

Guest: `/`, `/auth/login`, `/auth/signup`. After login there are still `/user`, `/user/profile/overview|edit|identities`, `/user/settings` (not Identity `/forger/*`). Product pages:

- `/reader`
- `/sources`
- `/reports`, `/reports/:id`
- `/crawl` `/mcp` `/notify` `/system`

`App.tsx` redirects legacy `/user` and `/user/overview` to `/reader`.

## Database

- `source.sources`
- `news.items` (`source_id`, GIN tsvector on `title`, `extra` JSONB)
- `news.profile_preferences` PK `(account_id, profile_id)`, `column_order` JSONB
- `crawl.sessions`
- `report.keywords` / `report.snapshots`
- `notify.channels` / `notify.deliveries`
- `mcp.tool_calls`
- `system.system_state`

## Kafka

News module example: `nfxnews.news` / `nfxnews.news_poison`, and it consumes `nfxnews.source`. kafkax usage is in Chapter 6.

Next: Storages.
