# 第十章：NFX-Documentation 文档站

本仓库是手册阅读器。权威正文只存在仓库根目录 [`books/`](https://github.com/NebulaForgeX/NFX-Documentation/tree/main/books)：`zh/`、`en/`、`manifest.json`。前端 **不再** 把章节手抄成 TSX。产品仓 **不再** 保留 `docs/` / `Docs/`；各仓只有根目录 `README.md` + `README.en.md` 做概览并链回本章。

## 依赖

必须先有 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge)（网络 `nfx-edge`）。本仓 **不** 跑 Traefik。`start.sh` 若发现没有 `nfx-edge` 会直接退出。

Stack / Identity **不是**本站运行时依赖（静态站）。

## `.env`

```bash
cp .example.env .env
```

| 变量 | 作用 |
|------|------|
| `DOCS_HOST` | Edge Host 规则，例如 `docs.example.com` |
| `BACKEND_HOST` / `BACKEND_PORT` | 前端镜像构建 ARGS 占位（阅读器本身不调业务 API） |

## 运行（Docker）

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`docker-compose.yml`：

- 服务名 `frontend`，容器 `NFX-Documentation-Frontend`
- `traefik.project=nfx-documentation`
- `Host(\`${DOCS_HOST}\`)` 同时挂 `web` 与 `websecure`（TLS）
- loadBalancer 端口 `80`
- 卷：`./books:/usr/share/nginx/html/books:ro`
- 网络：`nfx-documentation` + 外部 `nfx-edge`

## 本地开发

```bash
cd servers/frontend
npm install
npm run dev
```

Vite 插件把 `/books/*` 映射到仓库 `books/`。改 markdown 刷新即可，不必重建镜像（Docker 部署则靠只读挂载，改文件后 nginx 直接读到新内容）。

`nfx-ui` 钉 **0.28.0**。站点壳是本地 `DocsLayout` + `@radix-ui/themes` + lucide（不要再 import 不存在的 `nfx-ui/layouts`）。

## 改文档

1. 同时改 `books/zh/<slug>.md` 与 `books/en/<slug>.md`（中英分开文件，不要在一个文件里混双语）
2. 新章节：在 `books/manifest.json` 增加 `slug` + `title.zh` / `title.en`
3. 不要新增 `pages/ChapterXXPage`
4. slug 必须与文件名（无 `.md`）一致，阅读器按 manifest 拉 `/books/{lang}/{slug}.md`
5. 密码/密钥只用占位符
6. 写操作步骤时以 `.example.env`、`RegisterRoutes`、`databases/src`、`Taskfile.yml` 为准，不要把已删除的 TrendRadar / tenants 文档写回来

## 产品仓 README 契约

每个 NFX 产品仓（Stack、Edge、Vault、Identity、UI、News、Storages、本仓）：

- 根目录 **仅** `README.md`（中文）+ `README.en.md`（英文）
- 内容：一句话是什么、手册链接、最短启动命令、一行端口提示
- 禁止再放 `docs/`、`Docs/`、嵌套 README、`pkgs/kafkax/docs`

copies / Example / LSR 不在本契约内。

读完本站后，按第一到九章的顺序在 NAS 上落地。
