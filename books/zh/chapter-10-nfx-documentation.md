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
| `TRAEFIK_CONSOLE_HOST` | 与 Identity / Edge 同一个控制台域名 |
| `VITE_BASE` | 浏览器路径，默认 `/documentation/` |
| `BACKEND_HOST` / `BACKEND_PORT` | 前端镜像构建 ARGS 占位（阅读器本身不调业务 API） |

## 路径（浏览器 ≠ 容器）

| 谁看见 | 路径 | 说明 |
|--------|------|------|
| 浏览器、Vite `base`、React `basename` | `/documentation/` | 人输入的地址。`VITE_BASE` 构建进镜像 |
| Traefik 改写之后、nginx `location` | `/nfx-documentation/` | 只在容器内。浏览器不要直接打开 |
| nginx `rewrite` 之后的磁盘 | `/usr/share/nginx/html` | `index.html`、`assets/`；`books/` 是只读卷 |

一次请求：

1. `GET http://<lan-ip>/documentation` 命中精确路径，`nfx-documentation-slash` 301 到 `/documentation/`。
2. `GET http://<lan-ip>/documentation/zh/chapter-01-router-configuration` 命中 `PathPrefix(/documentation/)`。`nfx-documentation-gw` 把路径改成 `/nfx-documentation/zh/chapter-01-router-configuration`。
3. nginx 的 `location ^~ /nfx-documentation/` 再写成 `/zh/chapter-01-router-configuration`。磁盘上没有这个文件，`try_files` 回 `/index.html`。
4. 页面里的脚本是 `/documentation/assets/...`（Vite base）。Traefik 同样改写成 `/nfx-documentation/assets/...`，nginx 再落到 `html/assets/...`。
5. 章节正文是 `/documentation/books/zh/<slug>.md`。改写后读卷 `./books:/usr/share/nginx/html/books:ro`。

域名同一套：把主机换成 `TRAEFIK_CONSOLE_HOST`（与 Identity / Edge 控制台同一个名字，示例 `identity.nebulaforgex.com`）。HTTPS 走 `websecure` + `tls: "true"`。

不要再配 `DOCS_HOST`。不要给本仓映射主机 80/443。

## 运行（Docker）

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`start.sh` 执行 `docker compose up -d --build`。`VITE_BASE` 在 **镜像构建** 时写进前端；改了 base 必须重建，只重启容器不够。

`docker-compose.yml` 只有服务 `frontend`（容器 `NFX-Documentation-Frontend`）。宿主机端口 `10120` 映射容器 `80`。路由在 Edge `dynamic/documentation.project.yml`。

四条路由，中间件都是 `nfx-documentation-slash,nfx-documentation-gw`，服务都是 `docs-frontend`（上游端口 80）：

| 路由 | 入口 | 规则 | priority |
|------|------|------|----------|
| `docs-frontend` | `web` | 局域网 IP 且（`Path(/documentation)` 或 `PathPrefix(/documentation/)`） | 30 |
| `docs-frontend-tls` | `websecure` | 同上，并 `tls: "true"` | 30 |
| `docs-frontend-host` | `web` | `Host(TRAEFIK_CONSOLE_HOST)` 且同上路径 | 200 |
| `docs-frontend-host-tls` | `websecure` | 同上，并 `tls: "true"` | 200 |

中间件（compose 里 `$$` 会变成 Traefik 的 `$`）：

```yaml
traefik.http.middlewares.nfx-documentation-slash.redirectregex.regex: ^(https?)://([^/]+)/documentation$$
traefik.http.middlewares.nfx-documentation-slash.redirectregex.replacement: $${1}://$${2}/documentation/
traefik.http.middlewares.nfx-documentation-gw.replacepathregex.regex: ^/documentation(/.*)$$
traefik.http.middlewares.nfx-documentation-gw.replacepathregex.replacement: /nfx-documentation$$1
```

nginx（`servers/frontend/nginx.conf`）不监听 `/documentation`。它只处理 `/nfx-documentation/`，`rewrite` 去掉这个前缀后再 `try_files`。正文卷挂在站点根的 `books/`，所以浏览器的 `/documentation/books/...` 最终读到该卷。

## 本地开发

```bash
cd servers/frontend
npm install
npm run dev
```

本地 Vite 的 base 是 `/documentation/`，插件把 `/documentation/books/*` 映射到仓库 `books/`。改 markdown 刷新即可，不必重建镜像（Docker 部署则靠只读挂载，改文件后 nginx 在 `/nfx-documentation/books/` 读到新内容）。

`nfx-ui` 钉 **0.33.0**。站点壳是本地 `DocsLayout` + `@radix-ui/themes` + lucide（不要再 import 不存在的 `nfx-ui/layouts`）。

## 改文档

1. 同时改 `books/zh/<slug>.md` 与 `books/en/<slug>.md`（中英分开文件，不要在一个文件里混双语）
2. 新章节：在 `books/manifest.json` 增加 `slug` + `title.zh` / `title.en`
3. 不要新增 `pages/ChapterXXPage`
4. slug 必须与文件名（无 `.md`）一致，阅读器按 manifest 拉 `{VITE_BASE}books/{lang}/{slug}.md`（默认 `/documentation/books/...`）
5. 密码/密钥只用占位符
6. 写操作步骤时以 `.example.env`、`RegisterRoutes`、`databases/src`、`Taskfile.yml` 为准，不要把已删除的 TrendRadar / tenants 文档写回来

## 产品仓 README 契约

每个 NFX 产品仓（Stack、Edge、Identity、UI、News、Storages、本仓）：

- 根目录 **仅** `README.md`（中文）+ `README.en.md`（英文）
- 内容：一句话是什么、手册链接、最短启动命令、一行端口提示
- 禁止再放 `docs/`、`Docs/`、嵌套 README、`pkgs/kafkax/docs`

copies / Example / LSR 不在本契约内。

读完本站后，按第一到九章的顺序在 NAS 上落地。
