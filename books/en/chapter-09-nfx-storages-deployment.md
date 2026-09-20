# Chapter 9: NFX-Storages

[NFX-Storages](https://github.com/NebulaForgeX/NFX-Storages) is Go S3. Object bytes live on NAS paths `STORAGES_VOLUME_0` … `_3`, **not** the Stack MinIO Identity uses. Metadata and IAM sit in Postgres schema `storages`. Messages go through Kafka. There is no RustFS at runtime.

## Login and access keys

1. The console uses nfx-ui against Identity (email / code / phone)
2. After a profile is selected, `POST /admin/v3/session/credentials` with the Identity Bearer token. Admin middleware **skips** Storages IAM authorize on that path so it can mint keys
3. Storages verifies the JWT, calls Identity `EnsureOwnedProfile` over gRPC, writes a temporary AK/SK into `storages.access_keys` (`account_id` / `profile_id` / `expires_at`)
4. Browsers and the AWS SDK speak SigV4 to the S3 Host. There is no local Storages password table

`VITE_S3_ENDPOINT` in `.example.env` still mentions Stack MinIO `10112` as a leftover. The object plane should use Edge `TRAEFIK_S3_HOST`. Do not store Storages objects in Identity MinIO.

## Ports

`GRPC_PORT_AUTH=50071` is still an Identity client.

| Module | `GRPC_PORT` | `GRPC_EXT` |
|--------|-------------|------------|
| S3 | 50072 | **10212** |
| OBJECT | 50073 | **10213** |
| IAM | 50074 | **10214** |
| ADMIN | 50075 | **10215** |
| NOTIFY | 50076 | **10216** |
| SYSTEM | 50077 | **10217** |
| Console | — | **10218** |

Vite `5176`. Gateway `API_GATEWAY_PREFIX=/nfx-storages`. Prefixes: `API_PREFIX_PATH_ADMIN=/admin/v3`, `/object`, `/iam`, `/notify`, `/system`. S3 uses Host `TRAEFIK_S3_HOST`. Console uses `TRAEFIK_CONSOLE_HOST`.

Note: HTTP routers under `modules/object|iam|notify` currently only mount `/system` locales and system-state (duplicate of the system module). The browser admin UI uses **admin `/admin/v3`**; object bytes use the **s3** catch-all.

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Storages
cp .example.env .env
# STORAGES_VOLUME_* = absolute NAS paths; TOKEN_* matches Identity
task proto:gen
task db:create
task atlas:pipeline:run
task console
sudo docker compose up -d
```

All four volumes must exist and be writable. Kafka `kafka:9092`. Postgres 10104, Redis 10106.

## S3 HTTP

`modules/s3/interface/http/router.go`: `GET /health`; everything else `ALL /` and `ALL /*` → `S3.Handle` (SigV4).

## Admin HTTP `/admin/v3`

Registered in `modules/admin/interface/http/handler/admin.go`. Everything except `POST /session/credentials` runs Storages IAM authorize.

Session: `POST /session/credentials`.

Users: `GET /list-users`, `PUT /add-user`, `GET /user-info`, `PUT /user/:name`, `PUT /user/:name/groups`, `GET /user/policy`, `GET /user/:name/policies`, `GET/POST /user/:name/service-accounts`, `POST /user/:name/service-account-credentials`, `DELETE /remove-user`, `PUT /set-user-status`.

Groups: `GET /groups`, `GET /group`, `POST /groups`, `DELETE /group/:name`, `PUT /group/:name`, `PUT /set-group-status`, `PUT /update-group-members`.

Policies: `PUT /set-policy` `/set-policy-multi` `/set-user-or-group-policy`, canned policy CRUD, `GET /policy/:name/users`.

Service accounts: list/add/info/update/delete plus `POST /service-account-credentials`.

Cluster: `GET /info` `/storageinfo` `/datausageinfo` `/metrics` `/license`.

Event targets: `GET /target/list` `/target/arns`, `PUT /target/:type/:name`, `DELETE /target/:type/:name/reset`.

Tiers: `GET/PUT /tier`, `POST/DELETE /tier/:name`.

KMS: status/config/configure/start/stop/reconfigure/clear-cache, key CRUD, `POST /kms/generate-data-key`.

IAM import/export: `GET /export-iam`, `PUT /import-iam`.

Pools: `GET /pools/list` `/pools/status`, `POST /pools/decommission` `/pools/cancel`.

Remote: `PUT /set-remote-target`, `GET /list-remote-targets`, `DELETE /remove-remote-target`.

## Console routes

Guest login uses Identity hooks. Profile pages are still `/user/profile/*`. Product:

`/config`, `/browser`, `/browser/:bucket`, `/buckets/:key`, `/access-keys`, `/policies`, `/users`, `/user-groups`, `/import-export`, `/performance`, `/pools`, `/events`, `/replication`, `/lifecycle`, `/tiers`, `/events-target`, `/sse`, `/license`.

Pages use hooks (buckets / objects / iam), not `useQuery` + repository in the page file. Pin **nfx-ui 0.28.0**.

## Database `storages`

`access_keys`, `policies`, `groups`, `tiers`, `event_targets`, `remote_targets`, `kms_keys`, `kms_state`, plus `system.system_state`.

Kafka: `nfxstorages.system` / `nfxstorages.system_poison` (s3 module toml). kafkax: Chapter 6.

Next: the Documentation site itself.
