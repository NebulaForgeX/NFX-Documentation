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


## Ports

This repo has no `GRPC_PORT_AUTH`. It dials Identity at `GRPC_HOST_AUTH:GRPC_EXT_PORT_AUTH` (dev `10031`, secure `10036`). Identity still listens on `50071` inside its container.

| Module | In-container gRPC | dev HTTP | dev gRPC | secure HTTP | secure gRPC |
|--------|-------------------|----------|----------|-------------|-------------|
| SOURCE | 50072 | **10050** | **10051** | **10063** | **10064** |
| NEWS | 50073 | **10052** | **10053** | **10065** | **10066** |
| CRAWL | 50074 | **10054** | **10055** | **10067** | **10068** |
| REPORT | 50075 | **10056** | **10057** | **10069** | **10070** |
| NOTIFY | 50076 | **10058** | **10059** | **10071** | **10072** |
| MCP | 50077 | **10060** | **10061** | **10073** | **10074** |
| Console (`CONSOLE_EXTERNAL_PORT`, not gRPC) | — | **10062** | — | **10075** | — |

Vite `VITE_PORT=5174`. This repo has no `API_GATEWAY_PREFIX`. Edge PathPrefix: secure `/nfx-news`, dev `/dev/nfx-news`. Fiber prefixes: `/source` `/news` `/crawl` `/report` `/notify` `/mcp`. Browser variables: dev `VITE_API_URL=/dev/nfx-news`, `VITE_BASE=/dev/console/nfx-news/`, `VITE_IDENTITY_API_URL=/dev/nfx-identity`; secure drops the `/dev` prefix.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-News
cp .example.env .env
# TOKEN_* matches Identity; Stack Postgres 10004 / Redis 10006 / Kafka `NAS_IP:10008` / OTLP `NAS_IP:10016`
task proto:gen
task errors:gen-langs
task atlas:pipeline:run
task console:i
sudo docker compose -f docker-compose.dev.yml up --build
```

Databases: `nfxnews_dev` / `nfxnews` / `nfxnews_diff`. Stack: Postgres 10004, Redis 10006, Kafka `NAS_IP:10008`, OTLP `NAS_IP:10016`.

## HTTP routes

### source `/source` (public list and fetch; i18n is public)

`GET /sources`, `GET /sources/:id`, `POST /sources/:id/fetch`, `GET /locales/:lang`, `GET /messages/:lang`.

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

## Console (`console/src/navigations/routes.ts`)

Guest: `/`, `/auth/login`, `/auth/signup`. After login there are still `/user`, `/user/profile/overview|edit|identities`, `/user/settings` (not Identity `/forger/*`). Product pages:

- `/reader`
- `/sources`
- `/reports`, `/reports/:id`
- `/crawl` `/mcp` `/notify`

On `/crawl`, choosing one source shows that source's `home` and `intervalMs` from the catalog already loaded. "All sources" hides that line.

`App.tsx` redirects legacy `/user` and `/user/overview` to `/reader`.

## Database

- `source.sources`
- `news.items` (`source_id`, GIN tsvector on `title`, `extra` JSONB)
- `news.profile_preferences` PK `(account_id, profile_id)`, `column_order` JSONB
- `crawl.sessions`
- `report.keywords` / `report.snapshots`
- `notify.channels` / `notify.deliveries`
- `mcp.tool_calls`

## Kafka

News module example: `nfxnews.news` / `nfxnews.news_poison`, and it consumes `nfxnews.source`. kafkax usage is in Chapter 6.

Next: Storages.
