export type PortRow = {
  name: string;
  dev: string;
  secure?: string;
};

export type TopologyGroup = {
  id: string;
  repo: string;
  compose?: string;
  parent?: string;
  range?: string;
};

export type TopologyContainer = {
  id: string;
  group?: string;
  docker: boolean;
  service: string;
  names: string[];
  listen?: string;
  ports: PortRow[];
};

export const LinkProtocol = {
  FORWARD: "forward",
  TLS: "tls",
  HTTP: "http",
  GRPC: "grpc",
  DATA: "data",
} as const;

export type LinkProtocolEnum = (typeof LinkProtocol)[keyof typeof LinkProtocol];

export type Dial = {
  service?: string;
  dev?: string;
  secure?: string;
  address?: string;
};

export type TopologyLink = {
  id: string;
  source: string;
  target: string;
  protocol: LinkProtocolEnum;
  dials: Dial[];
};

export type PortBlock = {
  id: string;
  name?: string;
  nfx: boolean;
  start: number;
  end: number;
  usedStart?: number;
  usedEnd?: number;
  groupIds: string[];
};

export const TOPOLOGY_GROUPS: TopologyGroup[] = [
  { id: "traefik", repo: "NFX-Edge", compose: "docker-compose.traefik.yml", range: "80 / 443" },
  { id: "news", repo: "NFX-News", compose: "docker-compose.yml", range: "10050–10079" },
  { id: "storages", repo: "NFX-Storages", compose: "docker-compose.yml", range: "10080–10109" },
  { id: "edge", repo: "NFX-Edge", compose: "docker-compose.yml", range: "10110–10119" },
  { id: "documentation", repo: "NFX-Documentation", compose: "docker-compose.yml", range: "10120–10129" },
  { id: "static", repo: "AquaWorks · TimetableCraft", range: "10400–10405" },
  { id: "identity", repo: "NFX-Identity", compose: "docker-compose.yml", range: "10030–10049" },
  { id: "stack", repo: "NFX-Stack", range: "10000–10029" },
  { id: "stack-mysql", repo: "NFX-Stack", parent: "stack", compose: "docker-compose.mysql.yml", range: "10000–10001" },
  {
    id: "stack-mongodb",
    repo: "NFX-Stack",
    parent: "stack",
    compose: "docker-compose.mongodb.yml",
    range: "10002–10003",
  },
  {
    id: "stack-postgresql",
    repo: "NFX-Stack",
    parent: "stack",
    compose: "docker-compose.postgresql.yml",
    range: "10004–10005",
  },
  { id: "stack-redis", repo: "NFX-Stack", parent: "stack", compose: "docker-compose.redis.yml", range: "10006–10007" },
  { id: "stack-kafka", repo: "NFX-Stack", parent: "stack", compose: "docker-compose.kafka.yml", range: "10008–10009" },
  {
    id: "stack-rabbitmq",
    repo: "NFX-Stack",
    parent: "stack",
    compose: "docker-compose.rabbitmq.yml",
    range: "10010–10011",
  },
  { id: "stack-minio", repo: "NFX-Stack", parent: "stack", compose: "docker-compose.minio.yml", range: "10012–10013" },
  {
    id: "stack-centrifugo",
    repo: "NFX-Stack",
    parent: "stack",
    compose: "docker-compose.centrifugo.yml",
    range: "10014",
  },
  { id: "stack-otel", repo: "NFX-Stack", parent: "stack", compose: "docker-compose.otel.yml", range: "10015–10022" },
  {
    id: "stack-opensearch",
    repo: "NFX-Stack",
    parent: "stack",
    compose: "docker-compose.opensearch.yml",
    range: "10023–10024",
  },
];

const BACKEND_LISTEN = (grpc: string) => `HTTP 8080 · gRPC ${grpc}`;

const backend = (
  id: string,
  group: string,
  service: string,
  name: string,
  grpc: string,
  http: [string, string],
  rpc: [string, string],
  suffix = "Secure",
): TopologyContainer => ({
  id,
  group,
  docker: true,
  service,
  names: [`${name}-Dev`, `${name}-${suffix}`],
  listen: BACKEND_LISTEN(grpc),
  ports: [
    { name: "HTTP", dev: http[0], secure: http[1] },
    { name: "gRPC", dev: rpc[0], secure: rpc[1] },
  ],
});

const frontendConsole = (
  id: string,
  group: string,
  name: string,
  ports: [string, string],
  suffix = "Secure",
): TopologyContainer => ({
  id,
  group,
  docker: true,
  service: "console",
  names: [`${name}-Dev`, `${name}-${suffix}`],
  listen: "HTTP 80",
  ports: [{ name: "HTTP", dev: ports[0], secure: ports[1] }],
});

const stack = (id: string, group: string, name: string, listen: string, ports: PortRow[]): TopologyContainer => ({
  id,
  group,
  docker: true,
  service: id.replace("stack-", ""),
  names: [`NFX-Stack-${name}`],
  listen,
  ports,
});

export const TOPOLOGY_CONTAINERS: TopologyContainer[] = [
  { id: "internet", docker: false, service: "internet", names: [], ports: [] },
  { id: "router", docker: false, service: "router", names: [], ports: [{ name: "TCP", dev: "80 / 443" }] },
  { id: "nas2", docker: false, service: "nas2", names: [], ports: [{ name: "LAN", dev: "192.168.1.65" }] },
  {
    id: "traefik",
    group: "traefik",
    docker: true,
    service: "traefik",
    names: ["NFX-Edge-Reverse-Proxy"],
    listen: "80 / 443",
    ports: [
      { name: "HTTP", dev: "80" },
      { name: "HTTPS", dev: "443" },
    ],
  },

  backend(
    "identity-auth",
    "identity",
    "auth-base",
    "NFX-Identity-Auth-Base",
    "50071",
    ["10030", "10035"],
    ["10031", "10036"],
  ),
  backend(
    "identity-asset",
    "identity",
    "asset-base",
    "NFX-Identity-Asset-Base",
    "50072",
    ["10032", "10037"],
    ["10033", "10038"],
  ),
  frontendConsole("identity-console", "identity", "NFX-Identity-Console", ["10034", "10039"]),

  backend(
    "news-source",
    "news",
    "source-base",
    "NFX-News-Source-Base",
    "50072",
    ["10050", "10063"],
    ["10051", "10064"],
  ),
  backend("news-news", "news", "news-base", "NFX-News-News-Base", "50073", ["10052", "10065"], ["10053", "10066"]),
  backend("news-crawl", "news", "crawl-base", "NFX-News-Crawl-Base", "50074", ["10054", "10067"], ["10055", "10068"]),
  backend(
    "news-report",
    "news",
    "report-base",
    "NFX-News-Report-Base",
    "50075",
    ["10056", "10069"],
    ["10057", "10070"],
  ),
  backend(
    "news-notify",
    "news",
    "notify-base",
    "NFX-News-Notify-Base",
    "50076",
    ["10058", "10071"],
    ["10059", "10072"],
  ),
  backend("news-mcp", "news", "mcp-base", "NFX-News-Mcp-Base", "50077", ["10060", "10073"], ["10061", "10074"]),
  frontendConsole("news-console", "news", "NFX-News-Console", ["10062", "10075"]),

  backend(
    "storages-s3",
    "storages",
    "s3-base",
    "NFX-Storages-S3-Base",
    "50072",
    ["10080", "10091"],
    ["10081", "10092"],
    "Prod",
  ),
  backend(
    "storages-admin",
    "storages",
    "admin-base",
    "NFX-Storages-Admin-Base",
    "50075",
    ["10082", "10093"],
    ["10083", "10094"],
    "Prod",
  ),
  backend(
    "storages-object",
    "storages",
    "object-base",
    "NFX-Storages-Object-Base",
    "50073",
    ["10084", "10095"],
    ["10085", "10096"],
    "Prod",
  ),
  backend(
    "storages-iam",
    "storages",
    "iam-base",
    "NFX-Storages-Iam-Base",
    "50074",
    ["10086", "10097"],
    ["10087", "10098"],
    "Prod",
  ),
  backend(
    "storages-notify",
    "storages",
    "notify-base",
    "NFX-Storages-Notify-Base",
    "50076",
    ["10088", "10099"],
    ["10089", "10100"],
    "Prod",
  ),
  frontendConsole("storages-console", "storages", "NFX-Storages-Console", ["10090", "10101"], "Prod"),

  backend("edge-sites", "edge", "sites-base", "NFX-Edge-Sites-Base", "50072", ["10110", "10113"], ["10111", "10114"]),
  frontendConsole("edge-console", "edge", "NFX-Edge-Console", ["10112", "10115"]),

  {
    id: "documentation-frontend",
    group: "documentation",
    docker: true,
    service: "frontend",
    names: ["NFX-Documentation-Frontend"],
    listen: "HTTP 80",
    ports: [{ name: "HTTP", dev: "10120" }],
  },
  {
    id: "aquaworks",
    group: "static",
    docker: true,
    service: "aquaworks-web",
    names: ["AquaWorks-WEB-Prod-Local"],
    listen: "HTTP 80",
    ports: [{ name: "HTTP", dev: "10400" }],
  },
  {
    id: "timetable",
    group: "static",
    docker: true,
    service: "timetablecraft-web",
    names: ["TimetableCraft-WEB-Prod-Local"],
    listen: "HTTP 80",
    ports: [{ name: "HTTP", dev: "10401" }],
  },

  stack("stack-mysql", "stack-mysql", "MySQL", "3306", [{ name: "MySQL", dev: "10000" }]),
  stack("stack-mysql-ui", "stack-mysql", "MySQL-UI", "80", [{ name: "phpMyAdmin", dev: "10001" }]),
  stack("stack-mongodb", "stack-mongodb", "MongoDB", "27017", [{ name: "MongoDB", dev: "10002" }]),
  stack("stack-mongodb-ui", "stack-mongodb", "MongoDB-UI", "8081", [{ name: "mongo-express", dev: "10003" }]),
  stack("stack-postgresql", "stack-postgresql", "PostgreSQL", "5432", [{ name: "PostgreSQL", dev: "10004" }]),
  stack("stack-postgresql-ui", "stack-postgresql", "PostgreSQL-UI", "80", [{ name: "pgAdmin", dev: "10005" }]),
  stack("stack-redis", "stack-redis", "Redis", "6379", [{ name: "Redis", dev: "10006" }]),
  stack("stack-redis-ui", "stack-redis", "Redis-UI", "5540", [{ name: "RedisInsight", dev: "10007" }]),
  stack("stack-kafka", "stack-kafka", "Kafka", "9092 · EXTERNAL 9094", [{ name: "EXTERNAL", dev: "10008" }]),
  stack("stack-kafka-ui", "stack-kafka", "Kafka-UI", "8080", [{ name: "Kafka UI", dev: "10009" }]),
  stack("stack-rabbitmq", "stack-rabbitmq", "RabbitMQ", "5672 · 15672", [
    { name: "AMQP", dev: "10010" },
    { name: "UI", dev: "10011" },
  ]),
  stack("stack-minio", "stack-minio", "MinIO", "9000 · 9001", [
    { name: "API", dev: "10012" },
    { name: "UI", dev: "10013" },
  ]),
  stack("stack-centrifugo", "stack-centrifugo", "Centrifugo", "8000", [{ name: "Centrifugo", dev: "10014" }]),
  stack("stack-otel-collector", "stack-otel", "Otel-Collector", "4317 · 4318 · 13133 · 8889", [
    { name: "OTLP gRPC", dev: "10016" },
    { name: "OTLP HTTP", dev: "10017" },
    { name: "health", dev: "10018" },
    { name: "Prometheus", dev: "10019" },
  ]),
  stack("stack-jaeger", "stack-otel", "Jaeger", "16686 · 4317", [{ name: "Jaeger UI", dev: "10015" }]),
  stack("stack-prometheus", "stack-otel", "Prometheus", "9090", [{ name: "Prometheus", dev: "10020" }]),
  stack("stack-loki", "stack-otel", "Loki", "3100", [{ name: "Loki", dev: "10021" }]),
  stack("stack-grafana", "stack-otel", "Grafana", "3000", [{ name: "Grafana", dev: "10022" }]),
  stack("stack-opensearch", "stack-opensearch", "OpenSearch", "9200", [{ name: "OpenSearch", dev: "10023" }]),
  stack("stack-opensearch-dashboards", "stack-opensearch", "OpenSearch-Dashboards", "5601", [
    { name: "Dashboards", dev: "10024" },
  ]),
];

const CONTAINER_BY_ID = new Map(TOPOLOGY_CONTAINERS.map((container) => [container.id, container]));

function portDial(id: string, name: string): Dial {
  const port = CONTAINER_BY_ID.get(id)?.ports.find((row) => row.name === name);
  if (!port) throw new Error(`topology: ${id} has no ${name} port`);
  return { service: name, dev: port.dev, secure: port.secure };
}

const link = (source: string, target: string, protocol: LinkProtocolEnum, dials: Dial[]): TopologyLink => ({
  id: `${source}--${target}`,
  source,
  target,
  protocol,
  dials,
});

const IDENTITY_BACKENDS = ["identity-auth", "identity-asset"];
const NEWS_BACKENDS = ["news-source", "news-news", "news-crawl", "news-report", "news-notify", "news-mcp"];
const STORAGES_BACKENDS = ["storages-s3", "storages-admin", "storages-object", "storages-iam", "storages-notify"];
const EDGE_BACKENDS = ["edge-sites"];
const BACKENDS = [...IDENTITY_BACKENDS, ...NEWS_BACKENDS, ...STORAGES_BACKENDS, ...EDGE_BACKENDS];
const CONSOLES = ["identity-console", "news-console", "storages-console", "edge-console"];

const DATA_PLANE = [
  { target: "stack-postgresql", dial: portDial("stack-postgresql", "PostgreSQL") },
  { target: "stack-redis", dial: portDial("stack-redis", "Redis") },
  { target: "stack-kafka", dial: portDial("stack-kafka", "EXTERNAL") },
  { target: "stack-otel-collector", dial: portDial("stack-otel-collector", "OTLP gRPC") },
];

const httpLink = (source: string, target: string) =>
  link(source, target, LinkProtocol.HTTP, [portDial(target, "HTTP")]);
const grpcLink = (source: string, target: string) =>
  link(source, target, LinkProtocol.GRPC, [portDial(target, "gRPC")]);
const nginxLink = (source: string, target: string) => {
  const { secure } = portDial(target, "HTTP");
  return link(source, target, LinkProtocol.HTTP, [{ service: "nginx proxy_pass", secure }]);
};
const dockerLink = (source: string, target: string, protocol: LinkProtocolEnum, address: string) =>
  link(source, target, protocol, [{ service: "Docker network", address }]);

export const TOPOLOGY_LINKS: TopologyLink[] = [
  link("internet", "router", LinkProtocol.FORWARD, [{ dev: "WAN" }]),
  link("router", "traefik", LinkProtocol.TLS, [{ dev: "80 / 443" }]),
  link("traefik", "nas2", LinkProtocol.FORWARD, [{ dev: "192.168.1.65" }]),

  ...[...BACKENDS, ...CONSOLES, "documentation-frontend", "aquaworks", "timetable"].map((target) =>
    httpLink("traefik", target),
  ),
  link("traefik", "stack-minio", LinkProtocol.HTTP, [portDial("stack-minio", "API")]),

  ...CONSOLES.flatMap((source) => IDENTITY_BACKENDS.map((target) => nginxLink(source, target))),
  ...NEWS_BACKENDS.map((target) => nginxLink("news-console", target)),
  ...["storages-admin", "storages-object", "storages-iam", "storages-notify"].map((target) =>
    nginxLink("storages-console", target),
  ),
  nginxLink("edge-console", "edge-sites"),

  ...BACKENDS.filter((source) => source !== "identity-auth").map((source) => grpcLink(source, "identity-auth")),
  grpcLink("news-mcp", "news-news"),
  grpcLink("news-mcp", "news-report"),
  grpcLink("news-mcp", "news-source"),
  grpcLink("news-mcp", "news-crawl"),
  grpcLink("news-report", "news-news"),
  grpcLink("news-crawl", "news-source"),
  grpcLink("news-crawl", "news-report"),

  ...BACKENDS.flatMap((source) =>
    DATA_PLANE.map(({ target, dial }) => link(source, target, LinkProtocol.DATA, [dial])),
  ),
  link("identity-asset", "stack-minio", LinkProtocol.DATA, [portDial("stack-minio", "API")]),

  dockerLink("stack-mysql-ui", "stack-mysql", LinkProtocol.DATA, "mysql:3306"),
  dockerLink("stack-mongodb-ui", "stack-mongodb", LinkProtocol.DATA, "mongodb:27017"),
  dockerLink("stack-kafka-ui", "stack-kafka", LinkProtocol.DATA, "kafka:9092"),
  dockerLink("stack-opensearch-dashboards", "stack-opensearch", LinkProtocol.HTTP, "opensearch:9200"),
  dockerLink("stack-otel-collector", "stack-jaeger", LinkProtocol.GRPC, "jaeger:4317"),
  dockerLink("stack-otel-collector", "stack-loki", LinkProtocol.HTTP, "loki:3100/otlp"),
  dockerLink("stack-prometheus", "stack-otel-collector", LinkProtocol.HTTP, "otel-collector:8889"),
  dockerLink("stack-grafana", "stack-prometheus", LinkProtocol.HTTP, "prometheus:9090"),
  dockerLink("stack-grafana", "stack-loki", LinkProtocol.HTTP, "loki:3100"),
  dockerLink("stack-grafana", "stack-jaeger", LinkProtocol.HTTP, "jaeger:16686"),
];

export const PORT_BLOCKS: PortBlock[] = [
  {
    id: "stack",
    name: "NFX-Stack",
    nfx: true,
    start: 10000,
    end: 10029,
    usedStart: 10000,
    usedEnd: 10024,
    groupIds: ["stack"],
  },
  {
    id: "identity",
    name: "NFX-Identity",
    nfx: true,
    start: 10030,
    end: 10049,
    usedStart: 10030,
    usedEnd: 10039,
    groupIds: ["identity"],
  },
  {
    id: "news",
    name: "NFX-News",
    nfx: true,
    start: 10050,
    end: 10079,
    usedStart: 10050,
    usedEnd: 10075,
    groupIds: ["news"],
  },
  {
    id: "storages",
    name: "NFX-Storages",
    nfx: true,
    start: 10080,
    end: 10109,
    usedStart: 10080,
    usedEnd: 10101,
    groupIds: ["storages"],
  },
  {
    id: "edge",
    name: "NFX-Edge",
    nfx: true,
    start: 10110,
    end: 10119,
    usedStart: 10110,
    usedEnd: 10115,
    groupIds: ["edge"],
  },
  {
    id: "documentation",
    name: "NFX-Documentation",
    nfx: true,
    start: 10120,
    end: 10129,
    usedStart: 10120,
    usedEnd: 10120,
    groupIds: ["documentation"],
  },
  { id: "gap", nfx: false, start: 10130, end: 10399, groupIds: [] },
  { id: "static", nfx: false, start: 10400, end: 10405, usedStart: 10400, usedEnd: 10405, groupIds: ["static"] },
];

export function blockRange(block: PortBlock): string {
  return `${block.start}–${block.end}`;
}

export function blockUsed(block: PortBlock): string {
  if (block.usedStart === undefined || block.usedEnd === undefined) return "—";
  return block.usedStart === block.usedEnd ? String(block.usedStart) : `${block.usedStart}–${block.usedEnd}`;
}

export function blockReserved(block: PortBlock): string {
  if (block.usedEnd === undefined) return blockRange(block);
  if (block.usedEnd >= block.end) return "—";
  return `${block.usedEnd + 1}–${block.end}`;
}

export const COMPOSE_COUNT = TOPOLOGY_GROUPS.filter((group) => group.compose).length;
export const CONTAINER_COUNT = TOPOLOGY_CONTAINERS.filter((container) => container.docker).length;
export const NFX_BLOCK_COUNT = PORT_BLOCKS.filter((block) => block.nfx).length;
