# NFX-Documentation

[English](README.en.md)

<div align="center">
  <img src="image.png" alt="NFX-Documentation" width="200">
</div>

NebulaForgeX 的部署手册阅读器。权威正文只在仓库根目录 [`books/`](books/)：`zh/`、`en/`、`manifest.json`。前端不再把章节手抄成 TSX。产品仓不再放 `docs/` 或 `Docs/`，各仓根目录的 `README.md` 与 `README.en.md` 写本仓能独立看懂的事实，末尾链回这里的对应章节。

Stack 和 Identity **不是**本站运行时依赖。必须先有 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 的 Traefik（80/443）。本仓不跑 Traefik，也不映射主机 80/443。不要再配 `DOCS_HOST`。

## 两条入口

浏览器、Vite `base`、React `basename`、nginx `location` 都是 `/console/nfx-documentation/`。

| 谁访问 | 结果 |
|--------|------|
| `https://<NAS_IP>/console/nfx-documentation/...` | Edge `documentation-lan` 302 到 `http://<NAS_IP>:10120/console/nfx-documentation/...`，浏览器随后直连这个端口 |
| `https://docs.nebulaforgex.com/` | `documentation-root`（priority 210）301 到 `/console/nfx-documentation/` |
| `https://docs.nebulaforgex.com/console/nfx-documentation/...` | `documentation-host`（priority 200）不跳端口，HTTPS 原样反代到 `NAS_IP:10120` |
| 磁盘 | `/usr/share/nginx/html/console/nfx-documentation/` |

宿主机端口是 `HTTP_EXT_PORT_FRONTEND`，默认 **10120**，映射容器 80。缺尾斜杠时 nginx 301，`absolute_redirect off` 让 Location 保持相对路径。`try_files` 找不到文件就回 `index.html`。章节正文是 `/console/nfx-documentation/books/<lang>/<slug>.md`，compose 把 `./books` 只读挂到这个目录，所以改 markdown 不用重建镜像。nginx **没有**接口反代。Dockerfile 把 `nginx.conf` 复制到 `/etc/nginx/conf.d/default.conf`，不是 envsubst 模板。

`.env`：`NAS_IP`、`HTTP_EXT_PORT_FRONTEND=10120`、`VITE_BASE=/console/nfx-documentation/`。`BACKEND_HOST` / `BACKEND_PORT` 只是镜像构建参数，阅读器不调业务 API。`VITE_BASE` 在**构建**时写进前端，改了必须重建。`nfx-ui` 钉 **0.36.0**。站点壳是本地 `layouts/Sidebar`（含 `Header`、`PageFrame`）加 `@radix-ui/themes`。图标以 `nfx-ui/icons` 为主。没有 `DocsLayout`，也不要 import `nfx-ui/layouts`。

```bash
cp .example.env .env
./start.sh
```

`start.sh` 实际执行 `sudo docker compose -f docker-compose.yml up -d --build`。容器名 `NFX-Documentation-Frontend`。本地开发：

```bash
cd console
npm install
npm run dev
```

本地 Vite 把 `/console/nfx-documentation/books/*` 映射到仓库 `books/`。

## 改手册

中英各一份文件，不要混在同一个 markdown 里。新章节在 `books/manifest.json` 加 `slug` 和 `title.zh` / `title.en`，文件名（去掉 `.md`）必须和 slug 一致。不要新增 `pages/ChapterXXPage`。密码只用占位符。产品仓 README 写到能单独部署的程度；JSON 字段和每一列的约束留在对应章节。

阅读从 [第一章](books/zh/chapter-01-router-configuration.md) 开始。

详细信息见 [第十章](books/zh/chapter-10-nfx-documentation.md)。
