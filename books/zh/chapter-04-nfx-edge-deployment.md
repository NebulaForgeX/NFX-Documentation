# 第四章：NFX-Edge 反向代理

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 是 NebulaForgeX **唯一** 的 HTTP/HTTPS 反向代理（Traefik v3.7）。对齐 CityPulso：一个 Traefik，产品只挂网络、打标签。证书由本仓 **sites-base** 申请并落盘，Traefik **不**内置 ACME。

- 创建并占用 Docker 网络 `nfx-edge`
- 独占主机 **80 / 443**（容器 `NFX-Edge-Reverse-Proxy`）
- 证书在 `websites/<site>/cert.crt` + `key.key`，由 `dynamic/tls.yaml` 挂给 Traefik
- Identity / News / Storages / Documentation **禁止** 再起 Traefik

## 先决

- 第二章已释放 NAS 的 80/443
- 第三章 Stack 已运行（产品与 sites-base 还要连 `nfx-stack`；Traefik 本身可以先起）
- `nfx-edge` 由 `task traefik` 创建；产品 compose 与 Traefik compose 都用 `external: true`

## 仓库结构

```
NFX-Edge/
├── .example.env / .example.secure.env
├── docker-compose.traefik.yml   # Reverse-Proxy：task traefik
├── docker-compose.dev.yml       # sites-base + console（dev）
├── docker-compose.yml           # sites-base + console（secure）
├── dynamic/
│   ├── sites.example.yml        # 复制为 sites.yml
│   ├── sites.yml                # 本机 Host 规则（gitignore）
│   ├── tls.example.yaml         # 复制为 tls.yaml
│   └── tls.yaml                 # 文件证书列表（gitignore）
└── websites/<site>/             # sites-base 写出的证书
```

## `.env`

```bash
cp .example.env .env
```

`TRAEFIK_API_HOST` / `TRAEFIK_CONSOLE_HOST` 给 sites-base 与 console 的 Docker 标签用。证书根目录就是仓库内 `./websites`，没有单独的 `CERTS_DIR`。

## 启动

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Edge
task traefik
task proto:gen
task atlas:pipeline:run
task run
sudo docker compose -f docker-compose.traefik.yml ps
sudo docker compose -f docker-compose.traefik.yml logs --tail 200
```

- `task traefik`：起 `NFX-Edge-Reverse-Proxy`，创建 `nfx-edge`
- `task traefik:down` / `task traefik:logs` / `task traefik:restart`
- `task run`：sites-base + console（**不**动 Traefik；网络不存在会提示先 `task traefik`）
- `task run:down`：只停应用栈

验证：

- `:80` 是否 **301/308** 到 `:443`（entrypoint `redirections`；`/.well-known/acme-challenge/` 由 `allowACMEByPass` 留给 sites-base）
- Dashboard Host 是否要求 BasicAuth
- `sudo docker compose -f docker-compose.traefik.yml config` 无插值错误

## Traefik 关键命令行（`docker-compose.traefik.yml`）

- `--entrypoints.web.address=:80`
- `--entrypoints.web.allowACMEByPass=true`
- `--entrypoints.web.http.redirections.entryPoint.to=websecure`
- `--entrypoints.web.http.redirections.entryPoint.scheme=https`
- `--entrypoints.web.http.redirections.entryPoint.permanent=true`
- `--entrypoints.websecure.address=:443`
- `--entrypoints.websecure.http.tls=true`（文件证书，**没有** `certificatesresolvers`）
- `--providers.file.directory=/dynamic` + `--providers.file.watch=true`
- `--providers.docker=true`
- `--providers.docker.exposedbydefault=false`
- `--providers.docker.constraints=LabelRegex(\`traefik.project\`, \`^(nfx-edge|nfx-identity|nfx-news|nfx-storages|nfx-documentation)$\`)`
- `--providers.docker.network=nfx-edge`
- `--api.dashboard=true`、`--api.insecure=false`

约束里 **没有** 的 `traefik.project` 标签，Traefik 看不见该容器。新产品必须同时：改这条正则、给 compose 打标签、加入 `nfx-edge`。

`extra_hosts: host.docker.internal:host-gateway` 方便容器回打宿主机。

## 产品如何接入

HTTP 服务同时加入 `nfx-edge`（以及需要时的 `nfx-stack`）。Identity 示例（`docker-compose.dev.yml`）：

```yaml
labels:
  traefik.enable: "true"
  traefik.project: "nfx-identity"
  traefik.http.services.identity-auth-base.loadbalancer.server.port: "${HTTP_PORT}"
  traefik.http.middlewares.nfx-identity-auth-gw.stripprefix.prefixes: ${API_GATEWAY_PREFIX}
  traefik.http.routers.identity-auth-base.entrypoints: web
  traefik.http.routers.identity-auth-base.rule: PathPrefix(`${API_GATEWAY_PREFIX}${API_PREFIX_PATH_AUTH}`)
  traefik.http.routers.identity-auth-base.middlewares: nfx-identity-auth-gw
  traefik.http.routers.identity-auth-base-secure.entrypoints: websecure
  traefik.http.routers.identity-auth-base-secure.rule: PathPrefix(`${API_GATEWAY_PREFIX}${API_PREFIX_PATH_AUTH}`)
  traefik.http.routers.identity-auth-base-secure.tls: "true"
```

浏览器打 `http://<lan>/nfx-identity/auth/...`；StripPrefix 掉 `/nfx-identity` 后，Fiber 仍挂在 `/auth`。

Console 用 **Host** 规则（`TRAEFIK_CONSOLE_HOST`），不要给每个产品再映射 80/443。

Documentation 用 `Host(\`${DOCS_HOST}\`)`，`traefik.project=nfx-documentation`。

## 证书

1. 复制 `dynamic/tls.example.yaml` → `dynamic/tls.yaml`
2. 路径相对于容器内 `/certs/websites`（宿主机 `./websites`）
3. 目录名与 sites-base 写出的站点文件夹一致：

```yaml
tls:
  certificates:
    - certFile: /certs/websites/<site1>/cert.crt
      keyFile: /certs/websites/<site1>/key.key
```

4. ACME HTTP-01：sites-base 的 Docker 标签承接 `PathPrefix(\`/.well-known/acme-challenge\`)`（见第五章）。**不要**给 Traefik 开 `httpchallenge` / `tlschallenge` / `certResolver`。
5. 文件不存在时不要写进 `tls.yaml`，否则 Traefik 会整份 file provider 加载失败。

私钥不要提交 Git；文件权限 `600`。

## 静态站点

`dynamic/sites.example.yml` 复制为 `dynamic/sites.yml`（gitignore）。一份文件里放 www / admin / 静态站 Host 规则。业务 API 走产品容器 + 标签，不要为每个产品再起一层代理。

## 故障

- 外网不通但内网可通：检查端口转发、NAT loopback、双重 NAT（第一章）
- challenge 失败：sites-base 是否已加入 `nfx-edge`、ACME 标签是否被 LabelRegex 收进去
- 路由错乱：Host / PathPrefix 是否重叠；`priority`（Identity API 常用 `20`，console `1`）
- Dashboard 进不去：BasicAuth 用户在 `docker-compose.traefik.yml` labels 里，不是 Stack Grafana 账号
- `task run` 报网络不存在：先 `task traefik`

下一章：sites-base 给 Edge 发证书。
