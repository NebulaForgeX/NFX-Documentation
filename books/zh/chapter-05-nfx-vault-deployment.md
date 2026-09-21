# 第五章：NFX-Vault 证书

[NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 是 **Go** 服务（模块 **tls / file / analysis / system / dns**）+ React console，不是 Python。它给 Edge 申请、续签、落盘 TLS；DNS 模块管 Namecheap 一类凭证与 DDNS。

登录走 **NFX-Identity**（第六章）。`GRPC_PORT_AUTH=50071` 是连 Identity 的 **客户端** 端口，不是 Vault 自己 listen。

旧仓库里的 Python / Pqttec article 表 **不存在**。

## 依赖顺序

1. Stack：Postgres / Redis / Kafka / OTEL（第三章）
2. Edge：已有 `nfx-edge` 网络（第四章）
3. Identity：console 登录与 JWT（可先把 Vault API 打通，再开 UI）

## 端口

容器内 `GRPC_PORT_*` = 50072–50076。主机只映射 `GRPC_EXT_*`（**禁止** `GRPC_EXT_* == GRPC_PORT_*`）：

| 模块 | `GRPC_PORT` | `GRPC_EXT` | HTTP 前缀（StripPrefix 后） |
|------|-------------|------------|------------------------------|
| AUTH 客户端 | 50071 | （不映射；连 Identity） | — |
| TLS | 50072 | **10219** | `/vault/tls` |
| FILE | 50073 | **10220** | `/vault/file` |
| ANALYSIS | 50074 | **10221** | `/vault/analysis` |
| SYSTEM | 50075 | **10222** | `/system` |
| DNS | 50076 | **10223** | `/vault/dns` |
| Console | — | **10224**（`CONSOLE_EXTERNAL_PORT`） | Host `TRAEFIK_CONSOLE_HOST` |
| Vite | — | `VITE_PORT=5175` | 开发 |

网关：`API_GATEWAY_PREFIX=/nfx-vault`。浏览器 `VITE_API_URL` 指向 Edge 上的 `/nfx-vault`；`VITE_IDENTITY_API_URL` 指向 `/nfx-identity`。

## 部署

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Vault
cp .example.env .env
# TOKEN_SECRET_KEY / TOKEN_ISSUER=nfxidentity 必须与 Identity 完全一致
# 证书写出目录与 Edge CERTS_DIR 对齐
task proto:gen
task atlas:pipeline:run
task console:i
sudo docker compose -f docker-compose.dev.yml up --build
```

Postgres 库名以 `.env` 为准（常见 `nfxvault_dev` / `nfxvault` / shadow `nfxvault_diff`）。容器连 Stack：`POSTGRES_CONTAINER_NAME=NFX-Stack-PostgreSQL`，宿主机探测用 LAN:`10104`。Kafka：`KAFKA_BROKERS=kafka:9092`。Redis：LAN:`10106`。OTLP：`otel-collector:4317`。

`GRPC_HOST_AUTH` 在 dev 常为 `NFX-Identity-Auth-Base-Dev`（Identity compose 容器名），与 Identity 自己的 `GRPC_HOST_AUTH=auth-base` 不同——Vault 是 **跨栈客户端**。

## HTTP 路由（Fiber，均在对应模块）

公开：i18n `GET …/locales/:lang`、`GET …/messages/:lang`。其余除注明外需要 `TokenAuth`（Identity JWT）。

### TLS `/vault/tls`

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/.well-known/acme-challenge/:token` | HTTP-01 挑战（挂在 app 根上，**无** `/vault/tls` 前缀） |
| GET | `/check` | 证书列表 |
| GET | `/detail-by-id/:certificateId` | 详情 |
| POST | `/apply` `/reapply` `/create` | 申请 / 重申 / 创建 |
| PUT | `/update/manual-add` | 手工导入 |
| DELETE | `/delete` | 删除 |
| POST | `/search` `/parse-preview` `/invalidate-cache` | 搜索 / 预览 / 清缓存 |

### FILE `/vault/file`

`GET /list`、`GET /content`、`GET /download`、`POST /export`、`POST /export-single`、`DELETE /delete`。

### DNS `/vault/dns`

| 方法 | 路径 |
|------|------|
| GET/PUT/DELETE | `/credential` |
| POST | `/credential/verify` |
| GET | `/domains` `/hosts` `/outbound-ip` |
| GET/PUT/DELETE | `/ddns-hosts` |
| PUT | `/a-records` |

### ANALYSIS `/vault/analysis`

`POST /tls`（受保护）。

### SYSTEM `/system`

`GET /system-state/latest`、`POST /system-state/initialize`（公开，供 bootstrap）。

## Console 路由（`console/src/navigations/routes.ts`）

访客：`/auth/login`、`/auth/signup`。登录后仍使用 `/user/profile/overview|edit|identities` 与 `/user/settings`（**尚未**改成 Identity 的 `/forger/*` 树）。业务页：

- `/check` 证书总览
- `/cert/add`、`/cert/edit/:certificateId`、`/cert/:certificateId`
- `/analysis/tls`
- `/filefolder`
- `/dns`、`/dns/:domain`

页面走 nfx-ui hooks 登录 Identity；证书 API 走本仓 axios。`nfx-ui` 钉 **0.31.0**。

## 数据库（当前 schema，不是旧 Python 库）

- `vault.tls_certificates`：`domain` 唯一；`certificate` / `private_key` 文本；`folder_name` 对应 Edge 站点目录；`status`、`sans` JSONB、`not_before` / `not_after`
- `dns.namecheap_credentials`、`dns.namecheap_ddns_hosts`
- `system.system_state`：bootstrap 标记

## Kafka

tls 模块 `inputs/tls/configuration/dev.toml`：

```toml
[kafka.producer_topics]
    cert = "nfxvault.cert"
    cert_poison = "nfxvault.cert_poison"
```

Broker 在容器内是 `kafka:9092`（Stack）。kafkax 包用法见第六章。

## 与 Edge 对接

1. Vault 把证书写到 Edge 能读的 `CERTS_DIR/<folder>/cert.crt` + `key.key`
2. 更新 Edge `dynamic/tls.yaml`
3. 两边都在 `nfx-edge` 上；tls-api 标签承接 ACME
4. 不要把私钥提交进 Git

下一章：Identity，产品登录中心。
