# 第三章：NFX-Stack 资源栈

[NFX-Stack](https://github.com/NebulaForgeX/NFX-Stack) 是数据面。产品容器加入 Docker 网络 `nfx-stack`，用 **容器名** 连库。不要在 Identity / Vault / News / Storages 里再起一套 Postgres / Redis / Kafka / MinIO / OTEL。

HTTP/HTTPS **不**走本仓。入口在第四章的 Edge。本仓 **不**跑 Traefik。

## 为什么必须先于一切产品

Identity / Vault / News / Storages 的 Postgres、Redis、Kafka、OTEL、MinIO 都假定 Stack 已在跑。没有 Stack 就没有 Atlas 迁移、没有 token 时钟依赖的库、没有 Kafka topic、没有 Identity 头像用的 MinIO。

## 仓库结构

```
NFX-Stack/
├── .example.env                 # 模板；复制为 .env，勿提交 .env
├── start.sh                     # 建网络、chown 数据目录、按序 up
├── version.sh                   # 镜像版本检查
├── Infrastructure/
│   ├── docker-compose.<name>.yml
│   ├── docker-compose.example.<name>.yml   # 模板，start.sh 会跳过 *.example.*
│   └── config/                  # Centrifugo / OTEL / Grafana / OpenSearch
└── Databases/                   # 默认数据卷（路径以 .env 为准）
```

`./start.sh` 读取根目录 `.env`，按固定顺序启动（跳过 `docker-compose.example.*`）：

1. mysql → 2. mongodb → 3. postgresql → 4. redis → 5. kafka → 6. rabbitmq → 7. minio → 8. centrifugo → 9. otel → 10. opensearch

## 前置

- Docker 20.10+、Compose v2
- 磁盘建议 ≥ 10GB；内存建议 ≥ 4GB（OpenSearch / OTEL 再占一截）
- 本机 CPU **无 AVX** 时不要把 MongoDB 升到 5.0+（Stack 固定 `mongo:4.4`）

## 部署

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Stack   # 改成你的路径
cp .example.env .env
# 填密码、绑定 IP、端口、数据目录。模板里的 /home/kali/repo 必须改掉
./start.sh          # 创建 nfx-stack 并 up -d
./start.sh ps
./start.sh logs     # 每个 compose 最近 50 行
./start.sh down     # 停容器；bind 数据目录保留
```

单独拉某一栈：

```bash
docker compose --project-directory Infrastructure --env-file .env \
  -f Infrastructure/docker-compose.mysql.yml up -d
```

改 `.env` 里的端口或密码后：`./start.sh down && ./start.sh`。

## 宿主机端口（从 10100 起，连续无洞）

以 `.env` 为准。当前 NAS 约定（绑定 IP 常用局域网地址，例如 `192.168.1.64`，不要用 `0.0.0.0` 对着公网）：

| 服务 | 数据/API | UI |
|------|----------|-----|
| MySQL | **10100** | 10101 phpMyAdmin |
| MongoDB | 10102 | 10103 mongo-express |
| PostgreSQL | **10104** | 10105 pgAdmin |
| Redis | **10106** | 10107 RedisInsight |
| Kafka EXTERNAL | **10108** | 10109 Kafka UI |
| RabbitMQ AMQP | 10110 | 10111 Management |
| MinIO S3 | **10112** | 10113 Console（path-style） |
| Centrifugo | 10114 | 同端口 Admin |
| Jaeger | — | 10115 |
| OTLP gRPC / HTTP | **10116** / 10117 | Collector health 10118 |
| Collector Prometheus / Prometheus / Loki | 10119 / 10120 / 10121 | Grafana 10122 |
| OpenSearch | 10123 HTTPS | 10124 Dashboards HTTP |

产品仓客户端默认连：**Postgres 10104、Redis 10106、Kafka 10108、MinIO 10112、OTLP gRPC 10116**。

对应 `.env` 变量：`MYSQL_DATABASE_PORT` / `MYSQL_UI_PORT`、`MONGO_*`、`POSTGRESQL_DATABASE_PORT` / `POSTGRESQL_UI_PORT`、`REDIS_DATABASE_PORT` / `REDIS_UI_PORT`、`KAFKA_EXTERNAL_PORT` / `KAFKA_UI_PORT`、`RABBITMQ_AMQP_PORT` / `RABBITMQ_UI_PORT`、`MINIO_API_PORT` / `MINIO_UI_PORT`、`CENTRIFUGO_PORT`、`OTEL_JAEGER_UI_PORT`、`OTEL_COLLECTOR_OTLP_GRPC_PORT` / `OTEL_COLLECTOR_OTLP_HTTP_PORT` / `OTEL_COLLECTOR_HEALTH_PORT` / `OTEL_COLLECTOR_PROMETHEUS_PORT`、`OTEL_PROMETHEUS_PORT` / `OTEL_LOKI_PORT` / `OTEL_GRAFANA_PORT`、`OPENSEARCH_EXTERNAL_PORT` / `OPENSEARCH_DASHBOARDS_PORT`。

`KAFKA_ADVERTISED_LISTENERS` 使用 `KAFKA_INTERNAL_HOST_IP` + `KAFKA_EXTERNAL_PORT`。宿主机上的 Kafka 客户端必须能解析到该 IP。

## 绑定 IP（`*_HOST`）

- `127.0.0.1`：仅本机
- `192.168.1.64`：指定 LAN（推荐 NAS）
- `0.0.0.0`：所有网卡——只有在路由器已经挡住这些端口时才考虑

## 容器内主机名（产品 compose 必须 `external: true` 加入 `nfx-stack`）

| 服务 | 地址 |
|------|------|
| MySQL | `mysql:3306` |
| PostgreSQL | `postgresql:5432` |
| MongoDB | `mongodb:27017`（`authSource=admin`） |
| Redis | `redis:6379` |
| Kafka | `kafka:9092` |
| RabbitMQ | `rabbitmq:5672` |
| MinIO | `http://minio:9000`（AWS SDK **必须** path-style） |
| Centrifugo API | `http://centrifugo:8000/api` |
| OTLP | `otel-collector:4317`（`OTEL_EXPORTER_OTLP_INSECURE=true`） |
| OpenSearch | `https://opensearch:9200`（自签证书，开发可关 TLS 校验） |

```yaml
networks:
  nfx-stack:
    external: true
    name: nfx-stack
```

网络由 `start.sh` 创建；各 compose `external: true`，单个栈 `down` **不会**删掉网络。

## 编排文件与镜像（以仓库 compose 为准）

| 文件 | 服务 | 镜像（版本随仓库更新） |
|------|------|------------------------|
| `docker-compose.mysql.yml` | mysql、mysql-ui | `mysql:9.7.2`、`phpmyadmin:5.2.3` |
| `docker-compose.mongodb.yml` | mongodb、mongodb-ui | `mongo:4.4`、`mongo-express` |
| `docker-compose.postgresql.yml` | postgresql、postgresql-ui | `postgres:18.6`、`dpage/pgadmin4` |
| `docker-compose.redis.yml` | redis、redis-ui | `redis:8.8.2`、`redis/redisinsight` |
| `docker-compose.kafka.yml` | kafka、kafka-ui | `apache/kafka`、`provectuslabs/kafka-ui` |
| `docker-compose.rabbitmq.yml` | rabbitmq | `rabbitmq:*-management` |
| `docker-compose.minio.yml` | minio | `quay.io/minio/minio` |
| `docker-compose.centrifugo.yml` | centrifugo | `centrifugo/centrifugo` |
| `docker-compose.otel.yml` | otel-collector、jaeger、prometheus、loki、grafana | Collector / Jaeger / Prometheus / Loki / Grafana |
| `docker-compose.opensearch.yml` | opensearch、opensearch-dashboards | OpenSearch 3.x |

## 数据路径

`.env` 里 `MYSQL_DATA_PATH` / `POSTGRESQL_DATA_PATH` / `REDIS_DATA_PATH` / `KAFKA_DATA_PATH` / `MINIO_DATA_PATH` / `PROMETHEUS_DATA_PATH` / `LOKI_DATA_PATH` / `GRAFANA_DATA_PATH` / `OPENSEARCH_DATA_PATH` 以及对应 `*_LOG_PATH` / `*_INIT_PATH`。Windows 用盘符路径，例如 `D:/Code/NFX-Stack/Databases/mysql`。

`./start.sh` 在 `up` 前会 `chown`：

- Grafana 数据目录 → uid/gid **472**
- Prometheus → **65534**
- Loki → **10001**
- OpenSearch → **1000**

否则 `sudo docker` 建成 `root:root` 后，镜像内非 root 进程会 Restarting。

## 管理 UI（把 `<lan-ip>` 换成 `.env` 绑定 IP；账号在 `.env`）

| UI | URL | 登录 |
|----|-----|------|
| phpMyAdmin | `http://<lan-ip>:${MYSQL_UI_PORT}` | MySQL `root` / `MYSQL_ROOT_PASSWORD`；服务器填 `mysql` |
| pgAdmin | `http://<lan-ip>:${POSTGRESQL_UI_PORT}` | `POSTGRESQL_UI_USERNAME` / `POSTGRESQL_UI_PASSWORD` |
| mongo-express | `http://<lan-ip>:${MONGO_UI_PORT}` | Basic Auth `MONGO_UI_*`，再连 Mongo root |
| RedisInsight | `http://<lan-ip>:${REDIS_UI_PORT}` | `redis:6379` 或宿主机 Redis 端口，密码 `REDIS_PASSWORD` |
| Kafka UI | `http://<lan-ip>:${KAFKA_UI_PORT}` | 集群名常见 `nfx_stack_public`，broker `kafka:9092` |
| RabbitMQ | `http://<lan-ip>:${RABBITMQ_UI_PORT}` | `RABBITMQ_DEFAULT_USER` / `RABBITMQ_DEFAULT_PASS` |
| MinIO Console | `http://<lan-ip>:${MINIO_UI_PORT}` | `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` |
| Centrifugo Admin | `http://<lan-ip>:${CENTRIFUGO_PORT}` | 见 `Infrastructure/config/centrifugo.json` 的 `admin` |
| Jaeger | `http://<lan-ip>:${OTEL_JAEGER_UI_PORT}` | 无 |
| Prometheus | `http://<lan-ip>:${OTEL_PROMETHEUS_PORT}` | 无 |
| Grafana | `http://<lan-ip>:${OTEL_GRAFANA_PORT}` | `GRAFANA_ADMIN_USER` / `GRAFANA_ADMIN_PASSWORD` |
| OpenSearch Dashboards | `http://<lan-ip>:${OPENSEARCH_DASHBOARDS_PORT}` | `admin` / `OPENSEARCH_PASSWORD` |

Collector 健康：`http://<lan-ip>:${OTEL_COLLECTOR_HEALTH_PORT}`。

`CENTRIFUGO_API_KEY` / `CENTRIFUGO_CLIENT_SECRET` 必须与 `Infrastructure/config/centrifugo.json` 一致。

## 故障

- 网络不存在：`./start.sh` 会 `docker network create nfx-stack`
- 端口占用：改 `.env` 对应 `*_PORT`，不要把 Stack 端口塞进产品 `GRPC_EXT` 段
- Mongo 起不来：镜像必须仍是 `mongo:4.4`
- OpenSearch 起不来：`OPENSEARCH_PASSWORD` 须过 zxcvbn（过短或过于常见会被拒）；数据目录须对 uid 1000 可写；堆内存见 `OPENSEARCH_JAVA_OPTS`（NAS 示例 `-Xms512m -Xmx512m`）。**该密码仅首次初始化数据目录时生效**；改密需清空 `OPENSEARCH_DATA_PATH` 再启动
- Grafana / Prometheus / Loki Restarting：见上面 chown
- MinIO 数据目录报错：从 AIStor 换成社区版后若 `/data` 格式不兼容，清空 `MINIO_DATA_PATH` 再 `./start.sh`
- 日志：`./start.sh logs` 或 `docker logs -f NFX-Stack-PostgreSQL`。多数栈 json-file `10m × 10`；Kafka 更大

这些端口只给受信 LAN。公网只应看到 Edge 的 80/443。

下一章：NFX-Edge。
