# 第四章：NFX-Edge 反向代理

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 是 NebulaForgeX **唯一** 的 HTTP/HTTPS 入口（Traefik v3.7）。Docker 跑服务，Traefik 只做反向代理。产品 Compose **没有** Traefik labels，也 **不**加入共享 Docker 网络。

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
cp dynamic.example/*.project.yml dynamic/   # tls.yaml 已在 dynamic.example
task traefik
```

`task traefik` 只起反向代理，不创建 Docker 网络。

## 产品怎么被转到

业务 Compose 把 HTTP、gRPC、Console 绑到 `${NAS_IP}:宿主机端口`。Traefik 不关心容器名。

Dev 默认（`task run`）：

- Identity auth HTTP `10030`，asset HTTP `10032`，console `10034`
- News 从 `10050` 起，Storages 从 `10080` 起，Edge sites HTTP `10110`，Documentation `10120`
- Secure 在同一产品块的后半段（Identity auth HTTP `10035`）

PathPrefix 与以前一致。例如 `/nfx-identity/auth` 去掉 `/nfx-identity`，Fiber 仍收到 `/auth`。Storages S3 是 Host `s3.nebulaforgex.com`，不 strip。ACME `/.well-known/acme-challenge` 在 `edge.project.yml`，走 web 入口，不跟随 80→443 重定向。

服务迁到另一台 NAS 时，只改对应 URL 里的 `NAS1_IP` / `NAS2_IP`。

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
