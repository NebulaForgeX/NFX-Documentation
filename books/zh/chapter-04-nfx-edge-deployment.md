# 第四章：NFX-Edge 反向代理

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 是 NebulaForgeX **唯一** 的 HTTP/HTTPS 反向代理（Traefik v3.7）。对齐 CityPulso：一个 Traefik，产品只挂网络、打标签。

- 创建并占用 Docker 网络 `nfx-edge`
- 独占主机 **80 / 443**（容器 `NFX-Edge-Reverse-Proxy`）
- 证书来自文件（推荐第五章 Vault 写出的目录），**不用** Traefik 内置 ACME 去打产品栈
- Identity / Vault / News / Storages / Documentation **禁止** 再起 `reverse-proxy` / Traefik

## 先决

- 第二章已释放 NAS 的 80/443
- 第三章 Stack 已运行（产品稍后还要连 `nfx-stack`；Edge 本身可以先起）
- `nfx-edge` 网络由本仓 compose 创建；产品 compose 用 `external: true`

## 仓库结构

```
NFX-Edge/
├── .env.example
├── docker-compose.yml           # 实际运行
├── docker-compose.example.yml   # 可复制的模板
├── start.sh                     # sudo docker compose -f docker-compose.yml up --build -d
├── dynamic/
│   ├── acme-challenge.yml       # 现为 http: {}；ACME 由 Vault 标签承接
│   ├── tls.example.yaml         # 复制为 tls.yaml
│   └── *.yml                    # 静态站点 Host 规则（example / 本机站点）
└── public/nginx.conf            # 可选 Nginx 静态站
```

## `.env`

```bash
cp .env.example .env
```

至少改：

| 变量 | 含义 |
|------|------|
| `CERTS_DIR` | 证书根目录绝对路径，挂进 Traefik 为 `/certs/websites:ro` |
| `DASHBOARD_HOST` | Traefik dashboard 的 Host（compose 里也可能写死，以仓库为准） |
| `SITE*_WWW_DIR` / `SITE*_ADMIN_DIR` | 可选静态站目录 |
| `NGINX_CONFIG_FILE` | 静态站 nginx 配置 |

路径必须在宿主机上真实存在。

## 启动

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Edge
./start.sh
sudo docker compose ps
sudo docker compose logs --tail 200 NFX-Edge-Reverse-Proxy
```

验证：

- `http://<your-host>` 是否 **301/308** 到 `https://`
- Dashboard Host 是否要求 BasicAuth
- `sudo docker compose config` 无插值错误

运维：

```bash
sudo docker compose up --build -d
sudo docker compose logs -f NFX-Edge-Reverse-Proxy
sudo docker compose restart NFX-Edge-Reverse-Proxy
```

## Traefik 关键命令行（`docker-compose.yml`）

- `--entrypoints.web.address=:80`
- `--entrypoints.web.http.redirections.entrypoint.to=websecure`
- `--entrypoints.web.http.redirections.entrypoint.scheme=https`
- `--entrypoints.web.http.redirections.entrypoint.permanent=true`
- `--entrypoints.web.http.redirections.entrypoint.priority=1`
- `--entrypoints.websecure.address=:443`
- `--entrypoints.websecure.http.tls=true`
- `--providers.file.directory=/dynamic` + `--providers.file.watch=true`
- `--providers.docker=true`
- `--providers.docker.exposedbydefault=false`
- `--providers.docker.constraints=LabelRegex(\`traefik.project\`, \`^(nfx-edge|nfx-identity|nfx-vault|nfx-news|nfx-storages|nfx-documentation)$\`)`
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
2. 路径相对于容器内 `/certs/websites`（即宿主机 `CERTS_DIR`）
3. 目录名通常与 Vault 写出的站点文件夹一致：

```yaml
tls:
  certificates:
    - certFile: /certs/websites/<site1>/cert.crt
      keyFile: /certs/websites/<site1>/key.key
```

4. ACME HTTP-01：**不要**再转发到已删除的产品 Traefik 端口。`dynamic/acme-challenge.yml` 当前是空的 `http: {}`。挑战由 NFX-Vault **tls-api** 的 Docker 标签承接（`GET /.well-known/acme-challenge/:token`，见第五章）

私钥不要提交 Git；文件权限 `600`。

## 静态站点

Edge 仓库可挂 Nginx 站点目录 + `dynamic/www-*.yml` 的 Host 规则。业务 API 走产品容器 + 标签，不要为每个产品再起一层代理。

## 故障

- 外网不通但内网可通：检查端口转发、NAT loopback、双重 NAT（第一章）
- challenge 失败：Vault tls-api 是否已加入 `nfx-edge`、标签是否被 LabelRegex 收进去
- 路由错乱：Host / PathPrefix 是否重叠；`priority`（Identity API 常用 `20`，console `1`）
- Dashboard 进不去：BasicAuth 用户在 compose labels 里，不是 Stack Grafana 账号

下一章：Vault，给 Edge 发证书。
