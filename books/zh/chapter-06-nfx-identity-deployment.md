# 第六章：NFX-Identity 身份

[NFX-Identity](https://github.com/NebulaForgeX/NFX-Identity) 是登录与资料中心。两个 Go 模块：**auth / asset**。其它产品 **没有** 本地账号表；它们校验 Identity 签发的 JWT，并用 gRPC 调用 `EnsureOwnedProfile` / `HasForgerRole`。

不要再用已删除的 tenants / access / directory / clients 表文档。当前权威 schema 只有 `auth`、`asset`。首个 owner 由 `scripts/init.sql` 与 auth gRPC `BootstrapOwner` 写入。

## Console 路由（按 kind 分树）

不要再用 `/user/*`。kind 是 `FORGER` 或 `AUTHORITY`（不是 HL 的 COMMUNITY）。来源：`console/src/navigations/routes.ts` + `ScopeRoute`。

| 阶段 | 路径 |
|------|------|
| 访客 | `/auth/login`（邮箱或手机）、`/auth/signup` |
| 已登录未选资料 | `/auth/select-profile` |
| Forger | `/forger/desk`、`/forger/profile/overview\|edit\|identity\|security`、`/forger/assets`、`/forger/settings` |
| Authority | 同上前缀 `/authority/*`，另加 `/authority/directory` |

错树会被 `ScopeRoute` 打回 `profileHome(kind)`（Forger → `/forger/desk`，Authority → `/authority/desk`）。页面只走 **nfx-ui hooks**，禁止直调 repository。`nfx-ui` 钉 **0.33.0**。

## 端口与网关

| 用途 | 变量 | 值 |
|------|------|-----|
| 容器 HTTP | `HTTP_PORT` | 8080（仅 expose，不占主机 80） |
| AUTH / ASSET gRPC 容器 | `GRPC_PORT_*` | 50071 / 50072 |
| 主机 gRPC | `GRPC_EXT_PORT_*` | **10200 / 10201** |
| Console 主机映射 | `CONSOLE_EXTERNAL_PORT` | **10203** |
| Vite | `VITE_PORT` | 5173 |
| 网关前缀 | `API_GATEWAY_PREFIX` | `/nfx-identity` |
| Fiber 挂载 | `API_PREFIX_PATH_*` | `/auth` `/asset` |

Edge：PathPrefix `/nfx-identity/auth|asset` + StripPrefix `/nfx-identity`；console 用 PathPrefix `/console/nfx-identity`（域名或局域网 IP 都行）。`VITE_API_URL=/nfx-identity`（同源，构建进 console）。

compose 服务名：`auth-base` / `asset-base`（容器名 `NFX-Identity-*-Base-Dev`）。同时加入 `nfx-identity`、`nfx-edge`、`nfx-stack`。

## Token（全产品共用）

```
TOKEN_SECRET_KEY=<long-random>
TOKEN_ISSUER=nfxidentity
TOKEN_ACCESS_TTL=24h
TOKEN_REFRESH_TTL=168h
TOKEN_ALGORITHM=HS256
```

Edge / News / Storages 必须复制同一组。**不要**把真实密钥写进 Git 或本手册。JWT `profile_scope` 枚举：`forger` | `authority`。

## 部署

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Identity
cp .example.env .env
# TOKEN_*、Postgres/Redis/MinIO/SMTP 占位符
task proto:gen
task errors:gen-langs
task atlas:pipeline:run          # ENV=dev 默认；secure：ENV=secure
task console:i
sudo docker compose -f docker-compose.dev.yml up --build
```

常用 Task（`task start` 进菜单；`ENV=dev|secure`）：

| 任务 | 作用 |
|------|------|
| `task proto:gen` | `buf generate` → `protos/gen`（禁止手改生成物） |
| `task errors:gen-langs` | `errors/src` 注释块 → `errors/langs/*.json` |
| `task messages:gen-langs` | 成功文案 |
| `task atlas:pipeline:run` | Schema → DB；shadow 库 `nfxidentity_diff` |
| `task atlas:gen` | 从库生成 models/enums/views（仍不要手改 `*_dbgen.go` 来「对齐」） |
| `task fmt` / `task lint` / `task ci` | goimports+golines / golangci-lint |
| `task run` | compose up（dev `--watch`） |
| `task scripts:clear-data` | 清空 auth/asset（仅 dev，需 `-- --yes`） |
| `task console` | `npm run dev` |

Schema 源头：`databases/src/**.sql`。改表先改 SQL，再跑 Atlas。

## HTTP：auth `/auth`

实现：`modules/auth/interface/http/platform_router.go`。

### 公开

| 方法 | 路径 | JSON 要点 |
|------|------|-----------|
| POST | `/auth/login/with-email` | `email`, `password`, `device_id` |
| POST | `/auth/login/with-phone` | `phone`, `password`, `device_id` |
| POST | `/auth/signup/send-code` | `email`, `lang` |
| POST | `/auth/signup/with-email` | `email`, `password`, `verification_code`, `lang`, `device_id`, `signup_platform` |
| POST | `/auth/refresh` | `refresh_token`, `device_id` |
| POST | `/auth/logout` | `refresh_token` |
| GET | `/auth/health` | `{ "service": "auth" }` |
| GET | `/auth/locales/:lang` `/auth/messages/:lang` | i18n JSON |

SMTP：`.env` 的 `EMAIL_SMTP_*`（注册验证码）。

### `/auth/me`（Bearer）

| 方法 | 路径 | JSON 要点 |
|------|------|-----------|
| POST | `/select-profile` | `profile_id`, `kind`, `device_id` |
| GET | `/full-account-information-with-forger-profile` | 当前 JWT 的 forger 资料 |
| GET | `/full-account-information-with-authority-profile` | authority 资料 |
| PATCH | `/forger-profile` `/authority-profile` | 资料字段 map |
| PATCH | `/forger-profile-settings` `/authority-profile-settings` | `login_notification` |
| PUT/DELETE | `/forger-profile/avatars` `/authority-profile/avatars` | PUT body `image_id` |
| PUT | `/forger-profile/backgrounds` `/authority-profile/backgrounds` | `images[]`：`image_id`, `sort_order` |
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
| GET/POST | `/profiles` | POST `display_name`, `profile_language`（Forger） |
| POST | `/profiles/search` | `query`, `limit`, `offset` |
| DELETE | `/profiles/:profileId` | — |
| GET | `/profiles/:profileId/public-card` | 公开卡片 |
| GET/POST | `/authority-profiles` | 同 Forger 创建字段 |
| POST | `/authority-profiles/search` | 同上 |
| DELETE | `/authority-profiles/:profileId` | — |
| POST | `/password/send-verification-code` | `lang` |
| PUT | `/password` | `current_password`, `new_password`, `verification_code` |

### `/auth/owner`（Bearer）

| 方法 | 路径 |
|------|------|
| GET | `/forger-profiles` `?query&limit&offset` |
| GET | `/authority-profiles` |
| PATCH | `/authority-profiles/:profileId/roles` body `authority_roles[]` |

## HTTP：asset `/asset`

`modules/asset/interface/http/server.go`。`kind` ∈ `images` | `files` | `videos` | `audios`。列表/上传需 Token；读文件 `GET /asset/{kind}/{id}/file` 公开（仍校验所属逻辑在 handler）。

| 方法 | 路径 |
|------|------|
| GET | `/asset/locales/:lang` `/asset/messages/:lang` |
| GET | `/health`（app 根） |
| GET | `/asset/{kind}/` |
| POST | `/asset/{kind}/upload-url` `/upload-urls` |
| POST | `/asset/{kind}/confirm` `/confirm-{kind}` |
| DELETE | `/asset/{kind}/:id` |
| GET | `/asset/{kind}/:id/file` |

对象字节在 Stack **MinIO**（`MINIO_ENDPOINT=minio:9000`，path-style；密钥与 Stack `MINIO_ROOT_*` 一致）。这不是 Storages。

## 数据库（`databases/src/schemas`）

### auth

| 表 | 作用 |
|----|------|
| `Accounts` | 账号核心：`account_status`、`signup_platform`（默认 `nfxidentity`），无邮箱无密码 |
| `Identities` | 凭证：`identity_provider` + `provider_subject`；密码哈希仅 password 提供者；部分唯一（未删除） |
| `Emails` | 多邮箱；`is_primary` 每账号至多一条未删除；`LOWER(email)` 部分唯一；软删再注册插新行 |
| `Phones` | 同 Emails；建议存 E.164 |
| `ForgerProfiles` | 1 账号 N 资料；`forger_roles forger_role[]` 默认 `{forger}`；展示字段 + `preference` JSONB |
| `AuthorityProfiles` | 同上；`authority_roles` 默认 `{auditor}`，枚举 `auditor\|administrator\|owner` |
| `RefreshTokens` | 只存 `token_hash`；`device_id` 用于同设备 revoke；`profile_scope` |
| 链接表 | forger/authority 的 avatars、backgrounds、settings |

枚举：`forger_role`（目前仅 `forger`）、`authority_role`、`profile_scope`（`forger`/`authority`）、`account_status`、`signup_platform`、`profile_language`、`identity_provider`。

角色是 **数组成员**，不是层级：SQL `@>` / `= ANY`，Go `HasRole`。

### asset

`Images` / `Files` / `Audios` / `Videos`：路径、MIME、`uploader_id`（应用层对应 `Accounts.id`，无 FK）。

库名：`nfxidentity_dev` / `nfxidentity` / shadow `nfxidentity_diff`。Postgres 端口 **10104**，Redis **10106**。

## 其它产品如何验票

1. 用同一 `TOKEN_SECRET_KEY` / `TOKEN_ISSUER` 验 JWT
2. gRPC 打 Identity AUTH：`EnsureOwnedProfile(account_id, profile_id, profile_scope)`
3. 需要 Forger 能力时 `HasForgerRole`

Edge/News/Storages 的 `GRPC_HOST_AUTH` 指向 Identity auth 容器，`GRPC_PORT_AUTH=50071`。

## kafkax（各 Go 仓同一套包）

配置在各模块 `inputs/*/configuration/dev.toml` 的 `[kafka]`。容器内 `brokers = ["kafka:9092"]`。Identity auth 现码：

```toml
[kafka]
    brokers = ["kafka:9092"]
    client_id = "nfxidentity-auth"
    [kafka.producer]
        acks = "all"
        compression = "snappy"
        idempotent = true
    [kafka.producer_topics]
        auth = "nfxidentity.auth"
        auth_poison = "nfxidentity.auth_poison"
    [kafka.consumer_topics]
        auth = "nfxidentity.auth"
        auth_poison = "nfxidentity.auth_poison"
    [kafka.security]
        enabled = false
```

要点：`producer_topics` / `consumer_topics` 把 **逻辑键**（如 `auth`）映射到真实 topic 名。创建 Publisher / Subscriber 前 `cfg.Validate()`。Stack Kafka 未开 SASL 时 `security.enabled=false`。其它产品 topic 前缀：Edge `nfxedge.cert`、News `nfxnews.*`、Storages `nfxstorages.s3`。包内示例若仍写 `nfx-identity-access` / `directory`，以 **各仓 toml 为准**（那些键属于已删除的 directory 模块）。

错误码：`errors/src` 里 `var ErrXxx = errx.XXX("CODE")`，同文件底部：

```
!ACCOUNT_NOT_FOUND
*en<account not found>
*zh<账号不存在>
```

`!CODE` 必须与字符串一致。`task errors:gen-langs`。

下一章：nfx-ui，所有 console 共用。
