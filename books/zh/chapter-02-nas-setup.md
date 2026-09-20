# 第二章：NAS 初始化与开发环境

路由器配好后，在 NAS 上腾出 Edge 要用的端口，并装上 Docker。下文以 Asustor ADM 为例，其它 NAS（Synology / QNAP / TrueNAS）同类设置即可：停掉占 80/443 的厂商 Web、开 SSH、装 Docker Engine。

## 1. 停掉占用 80/443 的 Web Center

Asustor Web Center 默认占 **80 / 443**，与 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 冲突。必须 **停止服务并禁止开机自启**。NAS 管理界面改走厂商端口（ADM 常见 **8000 / 8001**）。停完后在 NAS 本机执行：

```bash
ss -lntup | grep -E ':80|:443' || true
```

不应再看到厂商 httpd 听在 80/443。Docker 尚未启动时这两端口应空闲。

![Asustor NAS Web Center](/images/AsustorNas_WebCenter.png)

## 2. 打开 SSH

后续克隆仓库、跑 `task` / `docker compose` 都走 SSH。建议：

- 密钥登录，关掉密码直连 root
- **不要**把 SSH 端口转发到公网（第一章已经禁止）
- 普通用户能 `sudo docker`（或把用户加入 docker 组后仍用脚本里的 `sudo docker`）

![Asustor NAS Service](/images/AsustorNas_Service.png)

```bash
ssh your-user@nas-lan-ip
```

## 3. App Center：Entware、Git、Docker Engine

![Asustor NAS App Center](/images/AsustorNas_AppCenter.png)

顺序：Entware → Git → Docker Engine。验证：

```bash
/opt/bin/opkg --version
git --version
docker --version
docker compose version
```

Compose 必须是 **v2** 插件（`docker compose`），不是老的 `docker-compose` Python 包。NFX-Stack 的 `./start.sh` 调用 `sudo docker compose`。

## 4. 补上 /bin/bash

精简 NAS 往往只有 `/bin/sh`。Cursor Remote-SSH 与多数 Taskfile 脚本需要 `/bin/bash`：

```bash
/opt/bin/opkg update
/opt/bin/opkg install bash
sudo ln -sf /opt/bin/bash /bin/bash
ls -l /bin/bash
bash --version
```

## 5. 目录约定

所有 NFX 仓放在同一父目录，例如 `/volume1/Projects/NebulaForgeX`。**不要**用模板里的 `/home/kali/repo`：那是 `.example.env` 的历史占位，必须改成 NAS 数据盘。

建议拆开：

| 内容 | 放哪 |
|------|------|
| Git 仓库 | SSD / 应用卷（本手册示例 `/volume1/Projects/NebulaForgeX`） |
| Stack 数据（Postgres、Kafka、MinIO、OpenSearch …） | 大容量数据盘，写入各仓 `.env` 的 `*_DATA_PATH` / `STORAGES_VOLUME_*` |
| Vault 写出的证书 | Edge 的 `CERTS_DIR`（绝对路径，权限收紧） |

不要把数据库目录提交进 Git。`.env` / `.secure.env` 也不要提交。

## 6. 工具链（产品仓）

Go 产品（Identity / Vault / News / Storages）需要：

- Go **1.26.x**（各仓 `Taskfile.yml` 的 `GO_VERSION`）
- `task`（Taskfile）
- Node.js + npm（console；nfx-ui 钉 **0.28.0**）
- `buf`（`task proto:gen`）
- Atlas CLI（`task atlas:pipeline:run`，经 Docker 连 Stack 的 Postgres）

Identity 的 `task install` 会装 `golangci-lint`、`air`、`goimports`、`golines`、`protoc-gen-go`、`protoc-gen-go-grpc`。可先装 Stack + Edge，再装这些。

检查清单：Web Center 已停、SSH 可用、Docker / Git / Bash 可用、80/443 空闲。下一章部署 NFX-Stack。
