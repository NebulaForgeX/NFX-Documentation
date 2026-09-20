# Chapter 3: NFX-Stack

[NFX-Stack](https://github.com/NebulaForgeX/NFX-Stack) is the data plane. Product containers join the Docker network `nfx-stack` and connect by **container name**. Do not run a second Postgres / Redis / Kafka / MinIO / OTEL inside Identity, Vault, News, or Storages.

HTTP/HTTPS does **not** live here. Ingress is Edge (Chapter 4). This repo does **not** run Traefik.

## Why it comes first

Identity / Vault / News / Storages assume Stack is already up for Postgres, Redis, Kafka, OTEL, and MinIO. Without it there is no Atlas migration, no Kafka topics, no MinIO for Identity avatars.

## Layout

```
NFX-Stack/
├── .example.env                 # copy to .env; never commit .env
├── start.sh                     # create network, chown data dirs, up in order
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
./start.sh logs
./start.sh down     # containers stop; bind data stays
```

One stack only:

```bash
docker compose --project-directory Infrastructure --env-file .env \
  -f Infrastructure/docker-compose.mysql.yml up -d
```

After changing ports or passwords in `.env`: `./start.sh down && ./start.sh`.

## Host ports (from 10100, sequential, no gaps)

Values come from `.env`. NAS convention (bind a LAN IP such as `192.168.1.64`; do not expose `0.0.0.0` to the internet):

| Service | Data/API | UI |
|---------|----------|-----|
| MySQL | **10100** | 10101 phpMyAdmin |
| MongoDB | 10102 | 10103 mongo-express |
| PostgreSQL | **10104** | 10105 pgAdmin |
| Redis | **10106** | 10107 RedisInsight |
| Kafka EXTERNAL | **10108** | 10109 Kafka UI |
| RabbitMQ AMQP | 10110 | 10111 Management |
| MinIO S3 | **10112** | 10113 Console (path-style) |
| Centrifugo | 10114 | admin on the same port |
| Jaeger | — | 10115 |
| OTLP gRPC / HTTP | **10116** / 10117 | Collector health 10118 |
| Collector Prometheus / Prometheus / Loki | 10119 / 10120 / 10121 | Grafana 10122 |
| OpenSearch | 10123 HTTPS | 10124 Dashboards HTTP |

Product clients default to **Postgres 10104, Redis 10106, Kafka 10108, MinIO 10112, OTLP gRPC 10116**.

Env keys: `MYSQL_DATABASE_PORT` / `MYSQL_UI_PORT`, `MONGO_*`, `POSTGRESQL_DATABASE_PORT` / `POSTGRESQL_UI_PORT`, `REDIS_DATABASE_PORT` / `REDIS_UI_PORT`, `KAFKA_EXTERNAL_PORT` / `KAFKA_UI_PORT`, `RABBITMQ_AMQP_PORT` / `RABBITMQ_UI_PORT`, `MINIO_API_PORT` / `MINIO_UI_PORT`, `CENTRIFUGO_PORT`, `OTEL_JAEGER_UI_PORT`, `OTEL_COLLECTOR_OTLP_GRPC_PORT` / `OTEL_COLLECTOR_OTLP_HTTP_PORT` / `OTEL_COLLECTOR_HEALTH_PORT` / `OTEL_COLLECTOR_PROMETHEUS_PORT`, `OTEL_PROMETHEUS_PORT` / `OTEL_LOKI_PORT` / `OTEL_GRAFANA_PORT`, `OPENSEARCH_EXTERNAL_PORT` / `OPENSEARCH_DASHBOARDS_PORT`.

`KAFKA_ADVERTISED_LISTENERS` uses `KAFKA_INTERNAL_HOST_IP` + `KAFKA_EXTERNAL_PORT`. Host Kafka clients must resolve that IP.

## Bind IPs (`*_HOST`)

- `127.0.0.1` — loopback only
- `192.168.1.64` — specific LAN (recommended on a NAS)
- `0.0.0.0` — all interfaces; only if the router already blocks these ports

## In-network hostnames (products must join `nfx-stack` as `external: true`)

| Service | Address |
|---------|---------|
| MySQL | `mysql:3306` |
| PostgreSQL | `postgresql:5432` |
| MongoDB | `mongodb:27017` (`authSource=admin`) |
| Redis | `redis:6379` |
| Kafka | `kafka:9092` |
| RabbitMQ | `rabbitmq:5672` |
| MinIO | `http://minio:9000` (AWS SDK **must** use path-style) |
| Centrifugo API | `http://centrifugo:8000/api` |
| OTLP | `otel-collector:4317` (`OTEL_EXPORTER_OTLP_INSECURE=true`) |
| OpenSearch | `https://opensearch:9200` (self-signed; dev may skip TLS verify) |

```yaml
networks:
  nfx-stack:
    external: true
    name: nfx-stack
```

`start.sh` creates the network. Compose files mark it external, so `down` on one stack does **not** delete it.

## Compose files and images

| File | Services | Images (versions track the repo) |
|------|----------|----------------------------------|
| `docker-compose.mysql.yml` | mysql, mysql-ui | `mysql:9.7.2`, `phpmyadmin` |
| `docker-compose.mongodb.yml` | mongodb, mongodb-ui | `mongo:4.4`, `mongo-express` |
| `docker-compose.postgresql.yml` | postgresql, postgresql-ui | `postgres:18.6`, `pgadmin4` |
| `docker-compose.redis.yml` | redis, redis-ui | `redis:8.8.2`, RedisInsight |
| `docker-compose.kafka.yml` | kafka, kafka-ui | Apache Kafka, kafka-ui |
| `docker-compose.rabbitmq.yml` | rabbitmq | `rabbitmq:*-management` |
| `docker-compose.minio.yml` | minio | `quay.io/minio/minio` |
| `docker-compose.centrifugo.yml` | centrifugo | `centrifugo/centrifugo` |
| `docker-compose.otel.yml` | collector, jaeger, prometheus, loki, grafana | OTEL stack |
| `docker-compose.opensearch.yml` | opensearch, dashboards | OpenSearch 3.x |

## Data paths

`.env` holds `MYSQL_DATA_PATH` / `POSTGRESQL_DATA_PATH` / `REDIS_DATA_PATH` / `KAFKA_DATA_PATH` / `MINIO_DATA_PATH` / `PROMETHEUS_DATA_PATH` / `LOKI_DATA_PATH` / `GRAFANA_DATA_PATH` / `OPENSEARCH_DATA_PATH` plus matching `*_LOG_PATH` / `*_INIT_PATH`. On Windows use drive-letter paths.

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
| Grafana | `http://<lan-ip>:${OTEL_GRAFANA_PORT}` | `GRAFANA_ADMIN_*` |
| OpenSearch Dashboards | `http://<lan-ip>:${OPENSEARCH_DASHBOARDS_PORT}` | `admin` / `OPENSEARCH_PASSWORD` |

Collector health: `http://<lan-ip>:${OTEL_COLLECTOR_HEALTH_PORT}`.

`CENTRIFUGO_API_KEY` / `CENTRIFUGO_CLIENT_SECRET` must match `Infrastructure/config/centrifugo.json`.

## Troubleshooting

- Missing network: `./start.sh` runs `docker network create nfx-stack`
- Port in use: change the matching `*_PORT`; do not put Stack ports in the product `GRPC_EXT` band
- Mongo will not start: keep `mongo:4.4`
- OpenSearch: password must pass zxcvbn; data dir writable by uid 1000; heap via `OPENSEARCH_JAVA_OPTS` (NAS sample `-Xms512m -Xmx512m`). **`OPENSEARCH_PASSWORD` applies only on first data-dir init**; rotate by wiping `OPENSEARCH_DATA_PATH`
- Grafana / Prometheus / Loki Restarting: see chown above
- MinIO data-dir errors after leaving AIStor: wipe `MINIO_DATA_PATH` if the on-disk format is incompatible
- Logs: `./start.sh logs` or `docker logs -f NFX-Stack-PostgreSQL`. Most stacks cap json-file at `10m × 10`

Keep these ports on a trusted LAN. The public internet should only see Edge 80/443.

Next: NFX-Edge.
