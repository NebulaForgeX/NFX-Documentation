# 第五章：NFX-Edge 证书

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 里的 **sites-base**（Go：tls / dns / file / analysis）+ React console 给 Edge 申请、续签、落盘 TLS；DNS 包管 Namecheap 一类凭证。证书进程已并入 Edge，不再单独起第二套 Traefik。

登录走 **NFX-Identity**（第六章）。sites-base 作为客户端拨号 `${GRPC_HOST_AUTH}:${GRPC_EXT_PORT_AUTH}`（dev 主机口 `10031`，secure `10036`）。本仓 `.env` **没有** `GRPC_PORT_AUTH`。`50071` 是 Identity 容器内的 listen，不是 sites-base 自己 listen。

旧仓库里的 Python / Pqttec article 表 **不存在**。

## 依赖顺序

1. Stack：Postgres / Redis / Kafka / OTEL（第三章）
2. Edge：Traefik 已在 80/443（第四章）
3. Identity：console 登录与 JWT（可先把 sites-base API 打通，再开 UI）

## 端口

容器内 sites gRPC：`GRPC_PORT_SITES=50072`，HTTP：`HTTP_PORT=8080`。主机只映射 `HTTP_EXT_*` / `GRPC_EXT_*` / `CONSOLE_EXTERNAL_PORT`（**禁止** `GRPC_EXT_* == GRPC_PORT_*`）：

| 用途 | 容器端口 | 主机（dev） | 主机（secure） |
|------|----------|-------------|----------------|
| sites HTTP | `HTTP_PORT=8080` | `HTTP_EXT_PORT_SITES=10110` | `10113` |
| sites gRPC | `GRPC_PORT_SITES=50072` | `GRPC_EXT_PORT_SITES=10111` | `10114` |
| Console | `CONSOLE_PORT=80` | `CONSOLE_EXTERNAL_PORT=10112` | `10115` |
| Identity auth（客户端拨号，本仓不 listen） | Identity 容器内 `50071` | `GRPC_EXT_PORT_AUTH=10031` | `10036` |
| Vite | — | `VITE_PORT=5175` | 同左 |

Fiber 路径仍是 `/edge/tls` `/edge/dns` `/edge/file` `/edge/analysis`（经 Traefik StripPrefix 后到达）。本仓 **没有** `API_GATEWAY_PREFIX`。

浏览器变量：

- dev：`VITE_API_URL=/dev/nfx-edge`，`VITE_BASE=/dev/console/nfx-edge/`，`VITE_IDENTITY_API_URL=/dev/nfx-identity`
- secure：`VITE_API_URL=/nfx-edge`，`VITE_BASE=/console/nfx-edge/`，`VITE_IDENTITY_API_URL=/nfx-identity`

`GRPC_HOST_AUTH` 填 Identity 所在 NAS 的 **IP**（`.example.env` 示例为 `192.168.1.64`），不是 Identity compose 的容器名。sites-base 拨号：`${GRPC_HOST_AUTH}:${GRPC_EXT_PORT_AUTH}`。

## 部署

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Edge
cp .example.env .env
# TOKEN_SECRET_KEY / TOKEN_ISSUER=nfxidentity 必须与 Identity 完全一致
# 证书写出目录是本仓 ./websites（Traefik 只读挂载 /certs/websites）
task traefik
task proto:gen
task atlas:pipeline:run
task console:i
task run
```

Postgres 库名以 `.env` 为准（常见 `nfxedge_dev` / `nfxedge` / shadow `nfxedge_diff`）。容器连 Stack：`POSTGRES_CONTAINER_NAME=NFX-Stack-PostgreSQL`，宿主机探测用 LAN:`10004`。Kafka：`KAFKA_BROKERS=NAS_IP:10008`。Redis：LAN:`10006`。OTLP：`NAS_IP:10016`。

## HTTP 路由（Fiber，均在对应模块）

公开：i18n `GET …/locales/:lang`、`GET …/messages/:lang`。其余除注明外需要 `TokenAuth`（Identity JWT）。

### TLS `/edge/tls`

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/.well-known/acme-challenge/:token` | HTTP-01 挑战（挂在 app 根上，**无** `/edge/tls` 前缀） |
| GET | `/check` | 证书列表 |
| GET | `/detail-by-id/:certificateId` | 详情 |
| POST | `/apply` | 申请 |
| POST | `/reapply` | 重申 |
| POST | `/create` | 创建 |
| PUT | `/update/manual-add` | 手工导入 |
| DELETE | `/delete` | 删除 |
| POST | `/search` | 搜索 |
| POST | `/parse-preview` | 预览 |
| POST | `/invalidate-cache` | 清缓存 |

### FILE `/edge/file`

`GET /list`、`GET /content`、`GET /download`、`POST /export`、`POST /export-single`、`DELETE /delete`。

### DNS `/edge/dns`

| 方法 | 路径 |
|------|------|
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

`POST /tls`（受保护）。

## Console 路由（`console/src/navigations/routes.ts`）

访客：`/auth/login`、`/auth/signup`。登录后仍使用 `/user/profile/overview|edit|identities` 与 `/user/settings`（**尚未**改成 Identity 的 `/forger/*` 树）。业务页：

- `/certs`、`/certs/overview`、`/certs/add`、`/certs/:certificateId`、`/certs/:certificateId/edit`
- `/analysis/tls`
- `/filefolder`
- `/namecheap`、`/namecheap/overview`、`/namecheap/new`
- `/namecheap/:credentialId`、`/namecheap/:credentialId/edit`
- `/namecheap/:credentialId/domains`、`/namecheap/:credentialId/domains/bulk`
- `/namecheap/:credentialId/domains/:domain`、`/namecheap/:credentialId/ssl`

页面走 nfx-ui hooks 登录 Identity；证书 API 走本仓 axios。`nfx-ui` 钉 **0.36.0**。

## 数据库（当前 schema，不是旧 Python 库）

只有 schema `sites`。没有 `dns` schema，也没有 DDNS 表。

- `sites.tls_certificates`：`domain` 唯一；`certificate` / `private_key` 文本；`folder_name` 对应 Edge 站点目录；`status`、`sans` JSONB、`not_before` / `not_after`
- `sites.namecheap_credentials`：Namecheap XML API 凭证（`label` / `api_user` / `api_key` / `client_ip` / `sandbox`）

## Kafka

sites 进程 `inputs/sites/configuration/dev.toml`（secure 同一组键）：

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

Broker 是 `NAS_IP:10008`（Stack EXTERNAL）。kafkax 包用法见第六章。

## 与 Edge 对接

1. sites-base 把证书写到 `websites/<folder>/cert.crt` + `key.key`
2. 更新 Edge `dynamic/tls.yaml`（文件不存在时不要挂路径）
3. ACME HTTP-01 在 `dynamic/edge.project.yml`，打到 sites 的宿主机 HTTP 口（secure 是 `10113`）。Traefik **没有** `certResolver`
4. 不要把私钥提交进 Git

下一章：Identity，产品登录中心。
