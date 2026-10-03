# Chapter 9: NFX-Storages

[NFX-Storages](https://github.com/NebulaForgeX/NFX-Storages) is Go S3. Object bytes live on NAS paths `STORAGES_VOLUME_0` … `_3`, **not** the Stack MinIO Identity uses. Metadata and IAM sit in Postgres schema `storages`. Messages go through Kafka. There is no RustFS at runtime.

## Login and access keys

1. The console uses nfx-ui against Identity (email / code / phone)
2. After a profile is selected, `POST /admin/v3/session/credentials` with the Identity Bearer token. Admin middleware **skips** Storages IAM authorize on that path so it can mint keys
3. Storages verifies the JWT, calls Identity `EnsureOwnedProfile` over gRPC, writes a temporary AK/SK into `storages.access_keys` (`account_id` / `profile_id` / `expires_at`)
4. Browsers and the AWS SDK speak SigV4 to the S3 Host. There is no local Storages password table

`VITE_S3_ENDPOINT` in `.example.env` and `.secure.env` still points at Stack MinIO `10012`. That value is a placeholder. The object plane uses the Host rule hardcoded in Edge, `Host(s3.nebulaforgex.com)`, and the secure backend is `NAS1_IP:10091`. This repo has no `TRAEFIK_S3_HOST` environment variable. Do not store Storages object bytes in the MinIO Identity uses.

## Ports

This repo has no `GRPC_PORT_AUTH`. It dials Identity at `GRPC_HOST_AUTH:GRPC_EXT_PORT_AUTH` (dev `10031`, secure `10036`). Identity still listens on `50071` inside its container.

| Module | In-container gRPC | dev HTTP | dev gRPC | secure HTTP | secure gRPC |
|--------|-------------------|----------|----------|-------------|-------------|
| S3 | 50072 | **10080** | **10081** | **10091** | **10092** |
| ADMIN | 50075 | **10082** | **10083** | **10093** | **10094** |
| OBJECT | 50073 | **10084** | **10085** | **10095** | **10096** |
| IAM | 50074 | **10086** | **10087** | **10097** | **10098** |
| NOTIFY | 50076 | **10088** | **10089** | **10099** | **10100** |
| Console (`CONSOLE_EXTERNAL_PORT`, not gRPC) | — | **10090** | — | **10101** | — |

Vite `VITE_PORT=5176`. This repo has no `API_GATEWAY_PREFIX` and no `API_PREFIX_PATH_*`. Edge PathPrefix values are `/nfx-storages/admin`, `/nfx-storages/object`, `/nfx-storages/iam`, and `/nfx-storages/notify` (dev adds a `/dev` prefix). Admin code hardcodes `Group("/admin/v3")`. `RegisterRoutes()` on object, iam, and notify is empty today, so the browser admin UI goes through admin. S3 uses Host `s3.nebulaforgex.com` with no strip. Console uses PathPrefix `/console/nfx-storages`.

The browser admin UI uses **admin `/admin/v3`** (including locales/messages); object bytes use the **s3** catch-all.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Storages
cp .example.env .env
# STORAGES_VOLUME_* = absolute NAS paths; TOKEN_* matches Identity
task proto:gen
task atlas:pipeline:run
task console
sudo docker compose -f docker-compose.dev.yml up -d
```

There is no `task db:create`. `task atlas:pipeline:run` creates the databases inside its pipeline. To create them on their own, run `bash scripts/create_databases.sh` after exporting the Postgres variables. The default `docker-compose.yml` is secure. Dev uses the `-f docker-compose.dev.yml` line above, or `task run`.

All four volumes must exist and be writable. Kafka `NAS_IP:10008`. Postgres 10004, Redis 10006.

## S3 HTTP

`modules/s3/interface/http/router.go`: `GET /health`; everything else `ALL /` and `ALL /*` → `S3.Handle` (SigV4).

## Admin HTTP `/admin/v3`

Registered in `modules/admin/interface/http/handler/admin.go`. Everything except `POST /session/credentials` runs Storages IAM authorize.

Session: `POST /session/credentials`.

Users: `GET /list-users`, `PUT /add-user`, `GET /user-info`, `PUT /user/:name`, `PUT /user/:name/groups`, `GET /user/policy`, `GET /user/:name/policies`, `GET/POST /user/:name/service-accounts`, `POST /user/:name/service-account-credentials`, `DELETE /remove-user`, `PUT /set-user-status`.

Groups: `GET /groups`, `GET /group`, `POST /groups`, `DELETE /group/:name`, `PUT /group/:name`, `PUT /set-group-status`, `PUT /update-group-members`.

Policies: `PUT /set-policy`, `PUT /set-policy-multi`, `PUT /set-user-or-group-policy`, `GET /list-canned-policies`, `POST /add-canned-policy`, `GET /info-canned-policy`, `DELETE /remove-canned-policy`, `GET /policy/:name/users`.

Service accounts: `GET /list-service-accounts`, `PUT /add-service-accounts`, `GET /info-service-account`, `POST /update-service-account`, `DELETE /delete-service-accounts`, `POST /service-account-credentials`.

Cluster: `GET /info` `/storageinfo` `/datausageinfo` `/metrics` `/license`.

Event targets: `GET /target/list` `/target/arns`, `PUT /target/:type/:name`, `DELETE /target/:type/:name/reset`. Each `/target/list` row includes the stored `config` alongside `account_id` / `service` / `status`.

Tiers: `GET/PUT /tier`, `POST/DELETE /tier/:name`.

KMS: `GET /kms/service-status`, `GET /kms/status`, `GET /kms/config`, `POST /kms/configure`, `POST /kms/start`, `POST /kms/stop`, `POST /kms/reconfigure`, `POST /kms/clear-cache`, `GET/POST /kms/keys`, `GET /kms/keys/:id`, `DELETE /kms/keys/delete`, `POST /kms/keys/cancel-deletion`, `POST /kms/generate-data-key`.

IAM import/export: `GET /export-iam`, `PUT /import-iam`.

Pools: `GET /pools/list` `/pools/status`, `POST /pools/decommission` `/pools/cancel`.

Remote: `PUT /set-remote-target`, `GET /list-remote-targets`, `DELETE /remove-remote-target`.

## Console routes

Guest login uses Identity hooks. Profile pages are still `/user/profile/*`. `UserTopBar` sits above `Outlet` (profile and settings). The sidebar account button opens the profile overview. Product:

`/config`, `/browser`, `/browser/:bucket`, `/buckets/:key`, `/access-keys`, `/policies`, `/users`, `/user-groups`, `/import-export`, `/performance`, `/pools`, `/events`, `/replication`, `/lifecycle`, `/tiers`, `/events-target`, `/sse`, `/license`.

Form depth (same APIs, no new routes):

- **Tiers** stay type `s3`. Create and update send endpoint, bucket, prefix, region, access key, and secret key.
- **Event targets** take SQS queue URL, AMQP URL / exchange / routing key, or a webhook endpoint. The list shows that address.
- **Lifecycle** (bucket settings and `/lifecycle` share one panel) adds noncurrent-version expiration days and abort-incomplete-multipart days. The blob is stored through the S3 lifecycle API. There is no worker that applies the rules.
- **Policies:** the detail JSON is editable. Save uses the existing `POST /add-canned-policy` (same name overwrites).

Pages use hooks (buckets / objects / iam), not `useQuery` + repository in the page file. Pin **nfx-ui 0.36.0**.

## Database `storages`

`access_keys`, `policies`, `groups`, `tiers`, `event_targets`, `remote_targets`, `kms_keys`, `kms_state`.

Kafka: per-module `nfxstorages.s3` / `nfxstorages.admin` / `nfxstorages.object` / `nfxstorages.iam` / `nfxstorages.notify` (and matching `*_poison`). kafkax: Chapter 6.

Next: the Documentation site itself.
