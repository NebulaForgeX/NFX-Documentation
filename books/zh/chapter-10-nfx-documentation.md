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
| `NAS_IP` | 发布绑定地址（与 Edge 上游同一台机器） |
| `HTTP_EXT_PORT_FRONTEND` | 宿主机端口，默认 `10120`，映射容器 `80` |
| `VITE_BASE` | 浏览器路径，默认 `/console/nfx-documentation/` |
| `BACKEND_HOST` / `BACKEND_PORT` | 前端镜像构建 ARGS 占位（阅读器本身不调业务 API） |

## 路径

浏览器、Vite `base`、React `basename`、nginx `location` 都是 `/console/nfx-documentation/`。公网域名路由和其它 console 一样：Traefik **不**改写路径，经 `websecure` 反代到 `http://NAS1_IP:10120`。局域网路由不同：`documentation-lan` 挂中间件 `documentation-lan-to-port`，`Host(NAS1_IP)` 访问 `/console/nfx-documentation` 会 **302** 到 `http://NAS1_IP:10120/console/nfx-documentation/...`。浏览器随后直连宿主机端口（HTTP），不再走 Traefik TLS。

| 谁看见 | 路径 |
|--------|------|
| `http://<NAS1_IP>:10120/console/nfx-documentation/` | 局域网最终地址（经 Traefik 302） |
| `https://identity.nebulaforgex.com/console/nfx-documentation/` | 公网域名（HTTPS，路径原样反代） |
| 磁盘 | `/usr/share/nginx/html/console/nfx-documentation/` |

一次请求（局域网）：

1. `GET https://<NAS1_IP>/console/nfx-documentation`（或带章节子路径）命中 Edge `documentation-lan`。中间件 `documentation-lan-to-port` **302** 到 `http://<NAS1_IP>:10120/console/nfx-documentation/`（或对应子路径）。
2. 浏览器直连 `:10120`。缺尾斜杠时，nginx `location = /console/nfx-documentation` **301** 到带斜杠的地址。`absolute_redirect off`，Location 保持相对路径。
3. nginx `try_files` 找不到这个文件，回 `/console/nfx-documentation/index.html`。
4. 脚本是 `/console/nfx-documentation/assets/...`。
5. 章节正文是 `/console/nfx-documentation/books/zh/<slug>.md`，读卷 `./books:/usr/share/nginx/html/console/nfx-documentation/books:ro`。

一次请求（公网域名）：

1. `GET https://identity.nebulaforgex.com/console/nfx-documentation/...` 命中 `documentation-host`，没有端口跳转中间件，路径原样转到 `NAS1_IP:10120`。
2. 其后同局域网步骤 2–5。

不要再配 `DOCS_HOST`。不要给本仓映射主机 80/443。

## 运行（Docker）

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`start.sh` 执行 `sudo docker compose -f docker-compose.yml up -d --build`。`VITE_BASE` 在 **镜像构建** 时写进前端；改了 base 必须重建，只重启容器不够。

`docker-compose.yml` 只有服务 `frontend`（容器 `NFX-Documentation-Frontend`）。宿主机端口 `HTTP_EXT_PORT_FRONTEND`（默认 `10120`）映射容器 `80`。路由在 Edge `dynamic/documentation.project.yml`，入口 `websecure`，上游 `http://NAS1_IP:10120`。

| 路由 | 规则 | 中间件 | priority |
|------|------|--------|----------|
| `documentation-lan` | `Host(NAS1_IP)` 且 `PathPrefix(/console/nfx-documentation)` | `documentation-lan-to-port`（302 → `http://NAS1_IP:10120/...`） | 25 |
| `documentation-host` | `Host(identity.nebulaforgex.com)` 且同一路径 | 无 | 200 |

nginx 的 `location /console/nfx-documentation/` 用 `try_files` 回到 `index.html`。正文卷挂在这个目录下的 `books/`。`absolute_redirect off`，缺斜杠时的 301 Location 不带主机名。文档站不调业务 API，nginx **没有**接口反代。Dockerfile 仍是 `COPY nginx.conf /etc/nginx/conf.d/default.conf`，不是 envsubst 模板。

## 本地开发

```bash
cd servers/frontend
npm install
npm run dev
```

本地 Vite 的 base 是 `/console/nfx-documentation/`，插件把 `/console/nfx-documentation/books/*` 映射到仓库 `books/`。改 markdown 刷新即可，不必重建镜像。Docker 从只读卷 `/console/nfx-documentation/books/` 读同一批文件。

`nfx-ui` 钉 **0.36.0**。站点壳是本地 `layouts/Sidebar`（内含 `Header` / `PageFrame`）+ `@radix-ui/themes`。图标以 `nfx-ui/icons` 为主，并少量使用 `lucide-react`。不要 import 不存在的 `nfx-ui/layouts`，代码里也没有 `DocsLayout`。

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
- 内容要能单独看懂这个仓：是什么、依赖谁、dev/secure 端口、流量怎么进来、模块和主要路径、库表名字、最短启动、常见会写错的地方。末尾写「详细信息见第 N 章」。JSON 字段级的请求体和每一列的约束留在手册里
- 禁止再放 `docs/`、`Docs/`、嵌套 README、`pkgs/kafkax/docs`

copies / Example / LSR 不在本契约内。

读完本站后，按第一到九章的顺序在 NAS 上落地。
