# 第十章：NFX-Documentation 文档站

本仓库是手册阅读器。权威正文只存在仓库根目录 [`books/`](https://github.com/NebulaForgeX/NFX-Documentation/tree/main/books)：`zh/`、`en/`、`manifest.json`。前端 **不再** 把章节手抄成 TSX。产品仓 **不再** 保留 `docs/` / `Docs/`；各仓只有根目录 `README.md` + `README.en.md` 做概览并链回本章。

## 依赖

必须先有 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 的 Traefik（80/443）。本仓 **不** 跑 Traefik。`start.sh` 把前端发布到 `NAS_IP:10120`。

Stack / Identity **不是**本站运行时依赖（静态站）。

## `.env`

```bash
cp .example.env .env
```

| 变量 | 作用 |
|------|------|
| `VITE_BASE` | 浏览器路径，默认 `/console/nfx-documentation/` |
| `BACKEND_HOST` / `BACKEND_PORT` | 前端镜像构建 ARGS 占位（阅读器本身不调业务 API） |

## 路径

浏览器、Vite `base`、React `basename`、nginx `location` 都是 `/console/nfx-documentation/`。Traefik 不改写路径，和 Identity / Edge / News / Storages 的 console 一样。

| 谁看见 | 路径 |
|--------|------|
| `https://<NAS1_IP>/console/nfx-documentation/` | 局域网 |
| `https://identity.nebulaforgex.com/console/nfx-documentation/` | 公网域名 |
| 磁盘 | `/usr/share/nginx/html/console/nfx-documentation/` |

一次请求：

1. `GET https://<NAS1_IP>/console/nfx-documentation` 由 nginx 301 到带斜杠的地址。
2. `GET https://<NAS1_IP>/console/nfx-documentation/zh/chapter-01-router-configuration` 命中 `PathPrefix(/console/nfx-documentation)`，原样转到 `NAS1_IP:10120`。
3. nginx `try_files` 找不到这个文件，回 `/console/nfx-documentation/index.html`。
4. 脚本是 `/console/nfx-documentation/assets/...`。
5. 章节正文是 `/console/nfx-documentation/books/zh/<slug>.md`，读卷 `./books:/usr/share/nginx/html/console/nfx-documentation/books:ro`。

不要再配 `DOCS_HOST`。不要给本仓映射主机 80/443。

## 运行（Docker）

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`start.sh` 执行 `docker compose up -d --build`。`VITE_BASE` 在 **镜像构建** 时写进前端；改了 base 必须重建，只重启容器不够。

`docker-compose.yml` 只有服务 `frontend`（容器 `NFX-Documentation-Frontend`）。宿主机端口 `10120` 映射容器 `80`。路由在 Edge `dynamic/documentation.project.yml`，入口 `websecure`，上游 `http://NAS1_IP:10120`。

| 路由 | 规则 | priority |
|------|------|----------|
| `documentation-lan` | `Host(NAS1_IP)` 且 `PathPrefix(/console/nfx-documentation)` | 25 |
| `documentation-host` | `Host(identity.nebulaforgex.com)` 且同一路径 | 200 |

nginx 的 `location /console/nfx-documentation/` 用 `try_files` 回到 `index.html`。正文卷挂在这个目录下的 `books/`。

## 本地开发

```bash
cd servers/frontend
npm install
npm run dev
```

本地 Vite 的 base 是 `/console/nfx-documentation/`，插件把 `/console/nfx-documentation/books/*` 映射到仓库 `books/`。改 markdown 刷新即可，不必重建镜像。Docker 从只读卷 `/console/nfx-documentation/books/` 读同一批文件。

`nfx-ui` 钉 **0.33.0**。站点壳是本地 `DocsLayout` + `@radix-ui/themes` + lucide（不要再 import 不存在的 `nfx-ui/layouts`）。

## 改文档

1. 同时改 `books/zh/<slug>.md` 与 `books/en/<slug>.md`（中英分开文件，不要在一个文件里混双语）
2. 新章节：在 `books/manifest.json` 增加 `slug` + `title.zh` / `title.en`
3. 不要新增 `pages/ChapterXXPage`
4. slug 必须与文件名（无 `.md`）一致，阅读器按 manifest 拉 `{VITE_BASE}books/{lang}/{slug}.md`（默认 `/console/nfx-documentation/books/...`）
5. 密码/密钥只用占位符
6. 写操作步骤时以 `.example.env`、`RegisterRoutes`、`databases/src`、`Taskfile.yml` 为准，不要把已删除的 TrendRadar / tenants 文档写回来

## 产品仓 README 契约

每个 NFX 产品仓（Stack、Edge、Identity、UI、News、Storages、本仓）：

- 根目录 **仅** `README.md`（中文）+ `README.en.md`（英文）
- 内容：一句话是什么、手册链接、最短启动命令、一行端口提示
- 禁止再放 `docs/`、`Docs/`、嵌套 README、`pkgs/kafkax/docs`

copies / Example / LSR 不在本契约内。

读完本站后，按第一到九章的顺序在 NAS 上落地。
