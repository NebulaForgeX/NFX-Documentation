# Chapter 2: NAS setup and developer tools

After the router is correct, free the ports Edge needs and install Docker. This chapter uses Asustor ADM as the example; Synology / QNAP / TrueNAS are the same idea: stop the vendor web UI on 80/443, enable SSH, install Docker Engine.

## 1. Stop Web Center on 80/443

Asustor Web Center binds **80 / 443** by default and collides with [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge). **Stop it and disable start-on-boot**. Use the vendor admin ports instead (ADM commonly **8000 / 8001**). Then on the NAS:

```bash
ss -lntup | grep -E ':80|:443' || true
```

Vendor httpd must not listen on 80/443. Those ports should be free before Docker starts.

![Asustor NAS Web Center](/images/AsustorNas_WebCenter.png)

## 2. Enable SSH

Clone repos and run `task` / `docker compose` over SSH. Prefer:

- Key login; no password root login
- **Do not** port-forward SSH to the internet (Chapter 1 already forbids it)
- A normal user that can `sudo docker` (scripts in this fleet use `sudo docker`)

![Asustor NAS Service](/images/AsustorNas_Service.png)

```bash
ssh your-user@nas-lan-ip
```

## 3. App Center: Entware, Git, Docker Engine

![Asustor NAS App Center](/images/AsustorNas_AppCenter.png)

Order: Entware → Git → Docker Engine. Verify:

```bash
/opt/bin/opkg --version
git --version
docker --version
docker compose version
```

Compose must be the **v2** plugin (`docker compose`), not the old Python `docker-compose`. NFX-Stack `./start.sh` calls `sudo docker compose`.

## 4. Provide /bin/bash

Slim NAS images often only have `/bin/sh`. Cursor Remote-SSH and most Taskfile scripts need `/bin/bash`:

```bash
/opt/bin/opkg update
/opt/bin/opkg install bash
sudo ln -sf /opt/bin/bash /bin/bash
ls -l /bin/bash
bash --version
```

## 5. Directory layout

Keep every NFX repo under one parent, e.g. `/volume1/Projects/NebulaForgeX`. **Do not** use `/home/kali/repo` from the env templates — that is a leftover placeholder; point data paths at a NAS volume.

Suggested split:

| What | Where |
|------|--------|
| Git checkouts | SSD / app volume (this handbook uses `/volume1/Projects/NebulaForgeX`) |
| Stack data (Postgres, Kafka, MinIO, OpenSearch …) | Large data volume via `*_DATA_PATH` / `STORAGES_VOLUME_*` in `.env` |
| Certs written by sites-base | Edge repo `websites/<site>/` (tight permissions; do not commit) |

Do not commit database directories. Do not commit `.env` / `.secure.env`.

## 6. Toolchain (product repos)

Go products (Identity / Edge / News / Storages) need:

- Go **1.26.x** (`GO_VERSION` in each `Taskfile.yml`)
- `task` (Taskfile)
- Node.js + npm (consoles; nfx-ui pinned to **0.33.0**)
- `buf` (`task proto:gen`)
- Atlas CLI (`task atlas:pipeline:run`, talks to Stack Postgres through Docker)

Identity `task install` installs `golangci-lint`, `air`, `goimports`, `golines`, `protoc-gen-go`, `protoc-gen-go-grpc`. Stack + Edge can come first.

Checklist: Web Center stopped, SSH works, Docker / Git / Bash work, 80/443 free. Next: NFX-Stack.
