# 第四章：NFX-Edge 反向代理

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 是 NebulaForgeX **唯一** 的 HTTP/HTTPS 入口（Traefik **v3.7.13**，见 `docker-compose.traefik.yml`）。Docker 跑服务，Traefik 只做反向代理。产品 Compose **没有** Traefik labels，也 **不**加入共享 Docker 网络。

- 独占主机 **80 / 443**（容器 `NFX-Edge-Reverse-Proxy`）
- 静态配置是 `traefik.yml`（file provider，`watch: true`）
- 路由在 `dynamic/*.project.yml`。模板在 `dynamic.example/`，本机生效文件 gitignore
- 后端地址是 `NAS_IP:宿主机端口`。NAS1 与 NAS2 用同一套端口，靠 IP 区分
- 证书由 **sites-base** 写到 `websites/<site>/`，Traefik **不**签发

## 先决

- 第二章已释放 NAS 的 80/443
- 第三章 Stack 已把数据面发布在 `10000–10024`
- 路由器只转发 80/443 到跑 Traefik 的那台 NAS

## 仓库结构

```
NFX-Edge/
├── traefik.yml
├── docker-compose.traefik.yml
├── dynamic.example/          # 提交的模板，含 example.project.yml
│   ├── identity.project.yml
│   ├── news.project.yml
│   ├── storages.project.yml
│   ├── edge.project.yml
│   ├── documentation.project.yml
│   ├── sites.project.yml
│   ├── minio.project.yml
│   ├── dashboard.project.yml
│   └── tls.yaml
├── dynamic/                  # 本机路由，gitignore
└── websites/                 # 证书
```

`.env` 里的 `NAS1_IP` / `NAS2_IP` 注入 Traefik。动态文件写 `http://{{ env "NAS1_IP" }}:10030`。改 `dynamic/` 后 Traefik 自动重载，一般不用重启。

## 启动

```bash
cp .example.env .env
# NAS1_IP / NAS2_IP
cp dynamic.example/*.project.yml dynamic/   # 这条不复制 tls.yaml
task traefik
```

`*.project.yml` 的通配不会带上 `tls.yaml`。证书文件已经在 `websites/<site>/` 里时，再单独复制：

```bash
cp dynamic.example/tls.yaml dynamic/tls.yaml
```

文件还不存在就不要放进 `dynamic/`，否则整份 file provider 加载失败。`task traefik` 只起反向代理，不创建 Docker 网络。

## 产品怎么被转到

业务 Compose 把 HTTP、gRPC、Console 绑到 `${NAS_IP}:宿主机端口`。Traefik 不关心容器名。

Dev 默认（`task run`）：

- Identity auth HTTP `10030`，asset HTTP `10032`，console `10034`
- News 从 `10050` 起，Storages 从 `10080` 起，Edge sites HTTP `10110`，Documentation `10120`
- Secure 在同一产品块的后半段（Identity auth HTTP `10035`）

PathPrefix 与以前一致。例如 `/nfx-identity/auth` 去掉 `/nfx-identity`，Fiber 仍收到 `/auth`。Storages S3 是 Host `s3.nebulaforgex.com`，不 strip。ACME `/.well-known/acme-challenge` 在 `edge.project.yml`，走 web 入口，不跟随 80→443 重定向。

服务迁到另一台 NAS 时，只改对应 URL 里的 `NAS1_IP` / `NAS2_IP`。

## 局域网 Console 跳转

`dynamic/*.project.yml`（模板在 `dynamic.example/`）里，局域网 `Host(NAS1_IP)` 的 `*-console-lan` 和 `documentation-lan` 挂了 `redirectRegex` 中间件，`permanent: false`，所以是 HTTP 302。浏览器打开 `https://<NAS1_IP>/console/nfx-*` 会跳到 `http://<NAS1_IP>:<端口>/console/nfx-*/`。端口不同，登录状态就不会在几个控制台之间串。

| 路由 | 跳到端口 |
|------|----------|
| `/console/nfx-identity` | `10039` |
| `/console/nfx-edge` | `10115` |
| `/console/nfx-news` | `10075` |
| `/console/nfx-storages` | `10101` |
| `/console/nfx-documentation` | `10120` |

域名路由（`*-console-host`、`documentation-host`）不挂这个中间件，仍然经 Traefik 走 HTTPS。文档站的公网 Host 是 `docs.nebulaforgex.com`。

## Console nginx（局域网直连端口用）

跳到宿主机端口之后，接口不再经过 Traefik，由各产品 **secure** console 的 nginx 转发。Identity、Edge、News、Storages 的 `console/nginx.conf` 增加了 `/nfx-*` 反代：去掉产品前缀后转到本机 secure 后端。

| Console | 去掉前缀后的后端 |
|---------|------------------|
| Identity | auth `10035`、asset `10037` |
| Edge | sites `10113`，并转发 `/nfx-identity/auth` `10035`、`/nfx-identity/asset` `10037` |
| News | source `10063`、news `10065`、crawl `10067`、report `10069`、notify `10071`、mcp `10073`，并转发 Identity 的 `10035` / `10037` |
| Storages | admin `10093`、object `10095`、iam `10097`、notify `10099`，并转发 Identity 的 `10035` / `10037` |

四份配置都有 `absolute_redirect off`、`client_max_body_size 0`、WebSocket 升级头、`proxy_read_timeout 600s`。Dockerfile 把该文件放到 `/etc/nginx/templates/default.conf.template`。secure compose 传入 `NAS_IP` 和 `NGINX_ENVSUBST_FILTER=NAS_IP`，由官方 nginx 镜像做 envsubst。Documentation 的 `servers/frontend/nginx.conf` 只加了 `absolute_redirect off`，仍复制到 `/etc/nginx/conf.d/default.conf`，没有接口反代。

## 证书

1. `dynamic/tls.yaml` 列出已经存在的 `cert.crt` / `key.key`
2. 路径是容器内 `/certs/websites`（宿主机 `./websites`）
3. 文件还不存在时不要写进 `tls.yaml`，否则整份 file provider 加载失败
4. **不要**给 Traefik 开 `httpchallenge` / `tlschallenge` / `certResolver`

私钥不要提交 Git。

## 静态站点

`sites.project.yml`：`aquawork.ca` → `NAS1_IP:10400`，`timetablecraft.com` → `NAS1_IP:10401`。这是 NFX 以外的端口，从 `10400` 起。

## Console 弹层

确认、搜索、文件、提示都挂在 Edge `ModalProvider` 上，用 `@radix-ui/themes` 的 `Dialog`。遮罩和边框走 Radix token。

## 故障

- 外网不通但内网可通：检查 80/443 是否转到跑 Traefik 的 NAS
- 502：后端是否已把端口绑在 `NAS_IP`，dynamic 文件里的口是否与 `.env` 一致
- challenge 失败：`edge.project.yml` 的 ACME 路由是否指向 sites HTTP 口
- Dashboard：BasicAuth 在 `dashboard.project.yml`，不是 Grafana

下一章：sites-base 发证书。
