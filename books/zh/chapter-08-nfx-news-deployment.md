# 第八章：NFX-News 资讯

[NFX-News](https://github.com/NebulaForgeX/NFX-News) 是 Go 微服务，目录对齐 Identity。浏览器走 Fiber HTTP；模块间原生 gRPC；Kafka topic 前缀 `nfxnews.*`。

**没有 auth 模块、没有本地账号表。** Console 用 nfx-ui 调 Identity HTTP；本仓 API 校验同一套 JWT（`TOKEN_ISSUER=nfxidentity`）。

仓库里曾经有过 Fastify / TrendRadar / Node `news_server`、`crawl_server`、`mcp_server`、`web_server` 文档，**已全部作废**。以 `modules/` 现码为准。

## 模块

| 模块 | 职责 |
|------|------|
| **source** | 源目录与拉取 |
| **news** | 条目、搜索、栏目偏好 |
| **crawl** | 抓取会话 |
| **report** | 关键词 DSL（`+必须` / `!排除`）与快照 |
| **notify** | 飞书/钉钉/企微/Telegram 等 webhook（密钥只在 `.env`） |
| **mcp** | MCP 工具列表与调用 |


## 端口

本仓没有 `GRPC_PORT_AUTH`。拨 Identity 用 `GRPC_HOST_AUTH:GRPC_EXT_PORT_AUTH`（dev `10031`，secure `10036`）。Identity 容器内 listen 仍是 `50071`。

| 模块 | 容器 gRPC | dev HTTP | dev gRPC | secure HTTP | secure gRPC |
|------|-----------|----------|----------|-------------|-------------|
| SOURCE | 50072 | **10050** | **10051** | **10063** | **10064** |
| NEWS | 50073 | **10052** | **10053** | **10065** | **10066** |
| CRAWL | 50074 | **10054** | **10055** | **10067** | **10068** |
| REPORT | 50075 | **10056** | **10057** | **10069** | **10070** |
| NOTIFY | 50076 | **10058** | **10059** | **10071** | **10072** |
| MCP | 50077 | **10060** | **10061** | **10073** | **10074** |
| Console（`CONSOLE_EXTERNAL_PORT`，不是 gRPC） | — | **10062** | — | **10075** | — |

Vite `VITE_PORT=5174`。本仓没有 `API_GATEWAY_PREFIX`。Edge PathPrefix：secure `/nfx-news`，dev `/dev/nfx-news`。Fiber 前缀：`/source` `/news` `/crawl` `/report` `/notify` `/mcp`。浏览器变量：dev `VITE_API_URL=/dev/nfx-news`、`VITE_BASE=/dev/console/nfx-news/`、`VITE_IDENTITY_API_URL=/dev/nfx-identity`；secure 去掉 `/dev`。

## 部署

```bash
cd /volume1/Projects/NebulaForgeX/NFX-News
cp .example.env .env
# TOKEN_* 与 Identity 相同；Stack Postgres 10004 / Redis 10006 / Kafka `NAS_IP:10008` / OTLP `NAS_IP:10016`
task proto:gen
task errors:gen-langs
task atlas:pipeline:run
task console:i
sudo docker compose -f docker-compose.dev.yml up --build
```

库：`nfxnews_dev` / `nfxnews` / `nfxnews_diff`。

## HTTP 路由

### source `/source`（公开列表/拉取；i18n 公开）

`GET /sources`、`GET /sources/:id`、`POST /sources/:id/fetch`、`GET /locales/:lang`、`GET /messages/:lang`。

### news `/news`

公开：`GET /items`、`GET /search`、i18n。受保护：`GET/PUT /preferences`。

### crawl `/crawl`（Token）

`GET /sessions`、`GET /sessions/:id`、`POST /sessions`。

### report `/report`（Token）

`GET /keywords`、`POST /keywords`、`GET /snapshots`、`GET /snapshots/:id`、`GET /snapshots/:id/html`、`POST /snapshots`。

### notify `/notify`（Token）

`GET /kinds`、`GET/POST /channels`、`GET /deliveries`、`POST /dispatch`。

### mcp `/mcp`（Token）

`GET /tools`、`POST /tools/:name`、`POST /run`。

## Console（`console/src/navigations/routes.ts`）

访客：`/`、`/auth/login`、`/auth/signup`。登录后 **仍有** `/user`、`/user/profile/overview|edit|identities`、`/user/settings`（未改成 Identity `/forger/*`）。业务：

- `/reader` 阅读
- `/sources` 源
- `/reports`、`/reports/:id`
- `/crawl` `/mcp` `/notify`

`/crawl` 选中单个源时，用已经加载的源列表显示该源的 `home` 和 `intervalMs`。选「全部来源」时不显示。

`App.tsx` 把旧 `/user`、`/user/overview` **重定向到** `/reader`。

## 数据库

- `source.sources`
- `news.items`（`source_id`、`title` GIN tsvector、`extra` JSONB）
- `news.profile_preferences` 主键 `(account_id, profile_id)`，`column_order` JSONB
- `crawl.sessions`
- `report.keywords` / `report.snapshots`
- `notify.channels` / `notify.deliveries`
- `mcp.tool_calls`

## Kafka

news 模块示例：`nfxnews.news` / `nfxnews.news_poison`，并消费 `nfxnews.source`。kafkax 用法见第六章。

下一章：Storages。
