# Chapter 3: NFX-Stack

[NFX-Stack](https://github.com/NebulaForgeX/NFX-Stack) is the data plane. Products reach Stack at `NAS_IP:host port` (Postgres `10004`, Redis `10006`, Kafka EXTERNAL `10008`, MinIO `10012`, OTLP gRPC `10016`). Services inside one Stack compose file still use the service name. Do not run a second Postgres / Redis / Kafka / MinIO / OTEL inside Identity, Edge, News, or Storages.

HTTP/HTTPS does **not** live here. Ingress is Edge (Chapter 4). This repo does **not** run Traefik.

## Why it comes first

Identity / Edge / News / Storages assume Stack is already up for Postgres, Redis, Kafka, OTEL, and MinIO. Without it there is no Atlas migration, no database the token clock depends on, no Kafka topics, and no MinIO for Identity avatars.

## Layout

```
NFX-Stack/
├── .example.env                 # copy to .env; never commit .env
├── start.sh                     # chown data dirs, up in order
├── version.sh
├── Infrastructure/
│   ├── docker-compose.<name>.yml
│   ├── docker-compose.example.<name>.yml   # skipped by start.sh
│   └── config/
└── Databases/                   # default bind mounts; override in .env
```

`./start.sh` reads the root `.env` and starts stacks in this order (skips `docker-compose.example.*`):

1. mysql → 2. mongodb → 3. postgresql → 4. redis → 5. kafka → 6. rabbitmq → 7. minio → 8. centrifugo → 9. otel → 10. opensearch

## Prerequisites

- Docker 20.10+, Compose v2
- ≥ 10GB disk; ≥ 4GB RAM (OpenSearch / OTEL need more)
- On CPUs **without AVX**, do not raise MongoDB past 4.4 (this stack pins `mongo:4.4`)

## Deploy

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Stack
cp .example.env .env
# passwords, bind IPs, ports, data paths. Replace /home/kali/repo placeholders
./start.sh
./start.sh ps
./start.sh logs     # last 50 lines of each compose
./start.sh down     # containers stop; bind data stays
```

One stack only:

```bash
docker compose --project-directory Infrastructure --env-file .env \
  -f Infrastructure/docker-compose.mysql.yml up -d
```

After changing ports or passwords in `.env`: `./start.sh down && ./start.sh`.

## Host ports (from 10000, sequential, no gaps)

Values come from `.env`. NAS convention (bind a LAN IP such as `192.168.1.64`; do not expose `0.0.0.0` to the internet):

| Service | Data/API | UI |
|---------|----------|-----|
| MySQL | **10000** | 10001 phpMyAdmin |
| MongoDB | 10002 | 10003 mongo-express |
| PostgreSQL | **10004** | 10005 pgAdmin |
| Redis | **10006** | 10007 RedisInsight |
| Kafka EXTERNAL | **10008** | 10009 Kafka UI |
| RabbitMQ AMQP | 10010 | 10011 Management |
| MinIO S3 | **10012** | 10013 Console (path-style) |
| Centrifugo | 10014 | admin on the same port |
| Jaeger | — | 10015 |
| OTLP gRPC / HTTP | **10016** / 10017 | Collector health 10018 |
| Collector Prometheus / Prometheus / Loki | 10019 / 10020 / 10021 | Grafana 10022 |
| OpenSearch | 10023 HTTPS | 10024 Dashboards HTTP |

Product clients default to **Postgres 10004, Redis 10006, Kafka 10008, MinIO 10012, OTLP gRPC 10016**.

Env keys: `MYSQL_DATABASE_PORT` / `MYSQL_UI_PORT`, `MONGO_*`, `POSTGRESQL_DATABASE_PORT` / `POSTGRESQL_UI_PORT`, `REDIS_DATABASE_PORT` / `REDIS_UI_PORT`, `KAFKA_EXTERNAL_PORT` / `KAFKA_UI_PORT`, `RABBITMQ_AMQP_PORT` / `RABBITMQ_UI_PORT`, `MINIO_API_PORT` / `MINIO_UI_PORT`, `CENTRIFUGO_PORT`, `OTEL_JAEGER_UI_PORT`, `OTEL_COLLECTOR_OTLP_GRPC_PORT` / `OTEL_COLLECTOR_OTLP_HTTP_PORT` / `OTEL_COLLECTOR_HEALTH_PORT` / `OTEL_COLLECTOR_PROMETHEUS_PORT`, `OTEL_PROMETHEUS_PORT` / `OTEL_LOKI_PORT` / `OTEL_GRAFANA_PORT`, `OPENSEARCH_EXTERNAL_PORT` / `OPENSEARCH_DASHBOARDS_PORT`.

`KAFKA_ADVERTISED_LISTENERS` uses `KAFKA_INTERNAL_HOST_IP` + `KAFKA_EXTERNAL_PORT`. Host Kafka clients must resolve that IP.

## Bind IPs (`*_HOST`)

- `127.0.0.1` — loopback only
- `192.168.1.64` — specific LAN (recommended on a NAS)
- `0.0.0.0` — all interfaces; only if the router already blocks these ports

## How products connect (LAN host ports, no shared network)

| Service | Address |
|---------|---------|
| MySQL | `NAS_IP:10000` |
| PostgreSQL | `NAS_IP:10004` |
| MongoDB | `NAS_IP:10002` (`authSource=admin`) |
| Redis | `NAS_IP:10006` |
| Kafka | `NAS_IP:10008` (EXTERNAL listener; Kafka UI in the same file still uses `kafka:9092`) |
| RabbitMQ | `NAS_IP:10010` |
| MinIO | `NAS_IP:10012` (AWS SDK **must** use path-style) |
| Centrifugo | `NAS_IP:10014` |
| OTLP gRPC | `NAS_IP:10016` |
| OpenSearch | `NAS_IP:10023` |

Processes in one compose file (Kafka UI → `kafka:9092`) use that file's default network. Product repos do not declare `nfx-stack`.

## Compose files and images

| File | Services | Images (versions track the repo) |
|------|----------|----------------------------------|
| `docker-compose.mysql.yml` | mysql, mysql-ui | `mysql:9.7.2`, `phpmyadmin:5.2.3` |
| `docker-compose.mongodb.yml` | mongodb, mongodb-ui | `mongo:4.4`, `mongo-express` |
| `docker-compose.postgresql.yml` | postgresql, postgresql-ui | `postgres:18.6`, `dpage/pgadmin4` |
| `docker-compose.redis.yml` | redis, redis-ui | `redis:8.8.2`, `redis/redisinsight` |
| `docker-compose.kafka.yml` | kafka, kafka-ui | `apache/kafka`, `provectuslabs/kafka-ui` |
| `docker-compose.rabbitmq.yml` | rabbitmq | `rabbitmq:*-management` |
| `docker-compose.minio.yml` | minio | `quay.io/minio/minio` |
| `docker-compose.centrifugo.yml` | centrifugo | `centrifugo/centrifugo` |
| `docker-compose.otel.yml` | otel-collector, jaeger, prometheus, loki, grafana | Collector / Jaeger / Prometheus / Loki / Grafana |
| `docker-compose.opensearch.yml` | opensearch, opensearch-dashboards | OpenSearch 3.x |

## Data paths

`.env` data paths: `MYSQL_DATA_PATH`, `MONGO_DATA_PATH`, `POSTGRESQL_DATA_PATH`, `REDIS_DATA_PATH`, `KAFKA_DATA_PATH`, `RABBITMQ_DATA_PATH`, `MINIO_DATA_PATH`, `PROMETHEUS_DATA_PATH`, `LOKI_DATA_PATH`, `GRAFANA_DATA_PATH`, `OPENSEARCH_DATA_PATH`. Log and init directories exist only for some of them: MySQL, Mongo, and PostgreSQL have both `*_LOG_PATH` and `*_INIT_PATH` (Mongo uses `MONGO_INIT_PATH` / `MONGO_LOG_PATH`); Redis, Kafka, MinIO, and RabbitMQ have `*_LOG_PATH` and no INIT; Prometheus, Loki, Grafana, and OpenSearch are DATA only. On Windows use a drive-letter path, for example `D:/Code/NFX-Stack/Databases/mysql`.

Before `up`, `./start.sh` `chown`s:

- Grafana → uid/gid **472**
- Prometheus → **65534**
- Loki → **10001**
- OpenSearch → **1000**

Otherwise `sudo docker` creates `root:root` dirs and non-root image users Restart.

## Admin UIs (replace `<lan-ip>` with the bind IP; credentials live in `.env`)

| UI | URL | Login |
|----|-----|--------|
| phpMyAdmin | `http://<lan-ip>:${MYSQL_UI_PORT}` | MySQL `root` / `MYSQL_ROOT_PASSWORD`; server host `mysql` |
| pgAdmin | `http://<lan-ip>:${POSTGRESQL_UI_PORT}` | `POSTGRESQL_UI_USERNAME` / `POSTGRESQL_UI_PASSWORD` |
| mongo-express | `http://<lan-ip>:${MONGO_UI_PORT}` | Basic Auth `MONGO_UI_*`, then Mongo root |
| RedisInsight | `http://<lan-ip>:${REDIS_UI_PORT}` | `redis:6379` or host Redis port, password `REDIS_PASSWORD` |
| Kafka UI | `http://<lan-ip>:${KAFKA_UI_PORT}` | cluster often `nfx_stack_public`, broker `kafka:9092` |
| RabbitMQ | `http://<lan-ip>:${RABBITMQ_UI_PORT}` | `RABBITMQ_DEFAULT_USER` / `RABBITMQ_DEFAULT_PASS` |
| MinIO Console | `http://<lan-ip>:${MINIO_UI_PORT}` | `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD` |
| Centrifugo Admin | `http://<lan-ip>:${CENTRIFUGO_PORT}` | `admin` block in `Infrastructure/config/centrifugo.json` |
| Jaeger | `http://<lan-ip>:${OTEL_JAEGER_UI_PORT}` | none |
| Prometheus | `http://<lan-ip>:${OTEL_PROMETHEUS_PORT}` | none |
| Grafana | `http://<lan-ip>:${OTEL_GRAFANA_PORT}` | `GRAFANA_ADMIN_USER` / `GRAFANA_ADMIN_PASSWORD` |
| OpenSearch Dashboards | `http://<lan-ip>:${OPENSEARCH_DASHBOARDS_PORT}` | `admin` / `OPENSEARCH_PASSWORD` |

Collector health: `http://<lan-ip>:${OTEL_COLLECTOR_HEALTH_PORT}`.

`CENTRIFUGO_API_KEY` / `CENTRIFUGO_CLIENT_SECRET` must match `Infrastructure/config/centrifugo.json`.

## Troubleshooting

- Port in use: check `.env` `10000–10024`
- Port in use: change the matching `*_PORT`; do not put Stack ports in the product `GRPC_EXT` band
- Mongo will not start: keep `mongo:4.4`
- OpenSearch: password must pass zxcvbn; data dir writable by uid 1000; heap via `OPENSEARCH_JAVA_OPTS` (NAS sample `-Xms512m -Xmx512m`). **`OPENSEARCH_PASSWORD` applies only on first data-dir init**; rotate by wiping `OPENSEARCH_DATA_PATH`
- Grafana / Prometheus / Loki Restarting: see chown above
- MinIO data-dir errors after leaving AIStor: wipe `MINIO_DATA_PATH` if the on-disk format is incompatible
- Logs: `./start.sh logs` or `docker logs -f NFX-Stack-PostgreSQL`. Most stacks cap json-file at `10m × 10`; Kafka's cap is larger

Keep these ports on a trusted LAN. The public internet should only see Edge 80/443.

Next: NFX-Edge.
