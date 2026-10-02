# 第九章：NFX-Storages 对象存储

[NFX-Storages](https://github.com/NebulaForgeX/NFX-Storages) 是 Go S3。对象字节在 NAS 路径 `STORAGES_VOLUME_0` … `_3`，**不是** Identity 用的 Stack MinIO。元数据与 IAM 在 Postgres schema `storages`。消息走 Kafka。运行时没有 RustFS。

## 登录与 AK/SK

1. Console 用 nfx-ui 调 Identity（邮箱 / 验证码 / 手机）
2. 选 profile 后 `POST /admin/v3/session/credentials`（Bearer Identity JWT）。该路径在 admin 中间件里 **跳过** Storages 自己的 IAM authorize，专门换票
3. Storages 验 JWT、gRPC 问 Identity `EnsureOwnedProfile`，签发临时 AK/SK，写入 `storages.access_keys`（`account_id` / `profile_id` / `expires_at`）
4. 浏览器与 AWS SDK 用 SigV4 打 S3 Host。没有 Storages 本地密码表

`VITE_S3_ENDPOINT` 在 `.example.env` 里曾指向 Stack MinIO `10012`——那是历史占位。对象面应走 Edge 的 `TRAEFIK_S3_HOST`，不要把 Storages 数据写进 Identity MinIO。

## 端口

`GRPC_PORT_AUTH=50071` 仍是 Identity 客户端。

| 模块 | `GRPC_PORT` | `GRPC_EXT` |
|------|-------------|------------|
| S3 | 50072 | **10081** |
| OBJECT | 50073 | **10085** |
| IAM | 50074 | **10087** |
| ADMIN | 50075 | **10083** |
| NOTIFY | 50076 | **10089** |
| Console | — | **10090** |

Vite `5176`。网关 `API_GATEWAY_PREFIX=/nfx-storages`。前缀：`API_PREFIX_PATH_ADMIN=/admin/v3`、`/object`、`/iam`、`/notify`。S3 用独立 Host `TRAEFIK_S3_HOST`。Console 用 PathPrefix `/console/nfx-storages`。

浏览器管理面走 **admin `/admin/v3`**（含 locales/messages）；对象字节走 **s3** catch-all。

## 部署

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Storages
cp .example.env .env
# STORAGES_VOLUME_* = NAS 盘绝对路径；TOKEN_* 与 Identity 相同
task proto:gen
task db:create
task atlas:pipeline:run
task console
sudo docker compose up -d
```

四块盘必须存在且可写。Kafka `NAS_IP:10008`。Postgres 10004，Redis 10006。

## S3 HTTP

`modules/s3/interface/http/router.go`：`GET /health`；其余 `ALL /` 与 `ALL /*` 进 `S3.Handle`（SigV4）。

## Admin HTTP `/admin/v3`

`modules/admin/interface/http/handler/admin.go` `Register`。除 `POST /session/credentials` 外都走 Storages IAM authorize。

会话：`POST /session/credentials`。

用户：`GET /list-users`、`PUT /add-user`、`GET /user-info`、`PUT /user/:name`、`PUT /user/:name/groups`、`GET /user/policy`、`GET /user/:name/policies`、`GET/POST /user/:name/service-accounts`、`POST /user/:name/service-account-credentials`、`DELETE /remove-user`、`PUT /set-user-status`。

组：`GET /groups`、`GET /group`、`POST /groups`、`DELETE /group/:name`、`PUT /group/:name`、`PUT /set-group-status`、`PUT /update-group-members`。

策略：`PUT /set-policy` `/set-policy-multi` `/set-user-or-group-policy`、`GET /list-canned-policies`、`POST /add-canned-policy`、`GET /info-canned-policy`、`DELETE /remove-canned-policy`、`GET /policy/:name/users`。

服务账号：`GET /list-service-accounts`、`PUT /add-service-accounts`、`GET /info-service-account`、`POST /update-service-account`、`DELETE /delete-service-accounts`、`POST /service-account-credentials`。

集群信息：`GET /info` `/storageinfo` `/datausageinfo` `/metrics` `/license`。

事件目标：`GET /target/list` `/target/arns`、`PUT /target/:type/:name`、`DELETE /target/:type/:name/reset`。`/target/list` 的每条除 `account_id` / `service` / `status` 外，带上已存的 `config`。

分层：`GET/PUT /tier`、`POST/DELETE /tier/:name`。

KMS：`/kms/service-status` `/kms/status` `/kms/config`、`POST /kms/configure` `/start` `/stop` `/reconfigure` `/clear-cache`、keys CRUD、`POST /kms/generate-data-key`。

IAM 导入导出：`GET /export-iam`、`PUT /import-iam`。

池：`GET /pools/list` `/pools/status`、`POST /pools/decommission` `/pools/cancel`。

远程：`PUT /set-remote-target`、`GET /list-remote-targets`、`DELETE /remove-remote-target`。

## Console 路由

访客登录同 Identity hooks。资料仍是 `/user/profile/*`。内容列在 `Outlet` 之上有 `UserTopBar`（资料、设置）。侧栏账号按钮进入资料总览。业务：

`/config`、`/browser`、`/browser/:bucket`、`/buckets/:key`、`/access-keys`、`/policies`、`/users`、`/user-groups`、`/import-export`、`/performance`、`/pools`、`/events`、`/replication`、`/lifecycle`、`/tiers`、`/events-target`、`/sse`、`/license`。

表单深度（仍走现有 API，不另开接口）：

- **Tiers** 类型仍是 `s3`。创建和更新提交 endpoint、bucket、prefix、region、access key、secret key。
- **Event Target** 按类型收字段：SQS 队列 URL；AMQP 的 URL、exchange、routing key；Webhook 的 endpoint。列表能看到这段地址。
- **Lifecycle**（桶设置与 `/lifecycle` 同一块）除过期天数外，可写非当前版本过期天数、未完成分片中止天数。配置经 S3 lifecycle 存取；引擎没有执行过期的 worker。
- **Policy** 详情里的 JSON 可改。保存走已有的 `POST /add-canned-policy`（同名覆盖）。

页面走 hooks（buckets / objects / iam），不要在 page 里 `useQuery` + repository。`nfx-ui` **0.33.0**。

## 数据库 `storages`

`access_keys`、`policies`、`groups`、`tiers`、`event_targets`、`remote_targets`、`kms_keys`、`kms_state`。

Kafka：按模块 `nfxstorages.s3` / `nfxstorages.admin` / `nfxstorages.object` / `nfxstorages.iam` / `nfxstorages.notify`（以及对应 `*_poison`）。kafkax 见第六章。

下一章：Documentation 站点本身。
