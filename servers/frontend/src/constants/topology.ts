export type PortRow = {
  name: string;
  dev: string;
  secure?: string;
};

export type TopologyNode = {
  id: string;
  docker: boolean;
  compose?: string;
  range?: string;
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

export const LinkSide = {
  RIGHT_LEFT: "right-left",
  BOTTOM_TOP: "bottom-top",
  OVERPASS: "overpass",
} as const;

export type LinkSideEnum = (typeof LinkSide)[keyof typeof LinkSide];

export type Dial = {
  service?: string;
  dev: string;
  secure?: string;
};

export type TopologyLink = {
  id: string;
  source: string;
  target: string;
  protocol: LinkProtocolEnum;
  side: LinkSideEnum;
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
  nodeIds: string[];
};

export const TOPOLOGY_NODES: TopologyNode[] = [
  { id: "internet", docker: false, ports: [] },
  { id: "router", docker: false, range: "80 / 443", ports: [{ name: "TCP", dev: "80 / 443" }] },
  {
    id: "traefik",
    docker: true,
    compose: "docker-compose.traefik.yml",
    range: "80 / 443",
    ports: [
      { name: "HTTP", dev: "80" },
      { name: "HTTPS", dev: "443" },
    ],
  },
  { id: "nas2", docker: false, range: "192.168.1.65", ports: [{ name: "LAN", dev: "192.168.1.65" }] },
  {
    id: "news",
    docker: true,
    compose: "docker-compose.yml",
    range: "10050–10079",
    ports: [
      { name: "source…mcp HTTP/gRPC", dev: "10050–10061", secure: "10063–10074" },
      { name: "console", dev: "10062", secure: "10075" },
    ],
  },
  {
    id: "storages",
    docker: true,
    compose: "docker-compose.yml",
    range: "10080–10109",
    ports: [
      { name: "s3…notify HTTP/gRPC", dev: "10080–10089", secure: "10091–10100" },
      { name: "console", dev: "10090", secure: "10101" },
    ],
  },
  {
    id: "edge",
    docker: true,
    compose: "docker-compose.yml",
    range: "10110–10119",
    ports: [
      { name: "sites HTTP", dev: "10110", secure: "10113" },
      { name: "sites gRPC", dev: "10111", secure: "10114" },
      { name: "console", dev: "10112", secure: "10115" },
    ],
  },
  {
    id: "documentation",
    docker: true,
    compose: "docker-compose.yml",
    range: "10120–10129",
    ports: [{ name: "frontend HTTP", dev: "10120" }],
  },
  {
    id: "aquaworks",
    docker: true,
    compose: "docker-compose.yml",
    range: "10400",
    ports: [{ name: "HTTP", dev: "10400" }],
  },
  {
    id: "timetable",
    docker: true,
    compose: "docker-compose.yml",
    range: "10401",
    ports: [{ name: "HTTP", dev: "10401" }],
  },
  {
    id: "identity",
    docker: true,
    compose: "docker-compose.yml",
    range: "10030–10049",
    ports: [
      { name: "auth HTTP", dev: "10030", secure: "10035" },
      { name: "auth gRPC", dev: "10031", secure: "10036" },
      { name: "asset HTTP", dev: "10032", secure: "10037" },
      { name: "asset gRPC", dev: "10033", secure: "10038" },
      { name: "console", dev: "10034", secure: "10039" },
    ],
  },
  {
    id: "stack",
    docker: true,
    compose: "docker-compose.yml",
    range: "10000–10029",
    ports: [
      { name: "MySQL", dev: "10000" },
      { name: "MySQL UI", dev: "10001" },
      { name: "MongoDB", dev: "10002" },
      { name: "Mongo UI", dev: "10003" },
      { name: "PostgreSQL", dev: "10004" },
      { name: "PostgreSQL UI", dev: "10005" },
      { name: "Redis", dev: "10006" },
      { name: "Redis UI", dev: "10007" },
      { name: "Kafka EXTERNAL", dev: "10008" },
      { name: "Kafka UI", dev: "10009" },
      { name: "RabbitMQ", dev: "10010" },
      { name: "RabbitMQ UI", dev: "10011" },
      { name: "MinIO API", dev: "10012" },
      { name: "MinIO UI", dev: "10013" },
      { name: "Centrifugo", dev: "10014" },
      { name: "Jaeger UI", dev: "10015" },
      { name: "OTLP gRPC", dev: "10016" },
      { name: "OTLP HTTP", dev: "10017" },
      { name: "collector health", dev: "10018" },
      { name: "collector Prometheus", dev: "10019" },
      { name: "Prometheus", dev: "10020" },
      { name: "Loki", dev: "10021" },
      { name: "Grafana", dev: "10022" },
      { name: "OpenSearch", dev: "10023" },
      { name: "OpenSearch Dashboards", dev: "10024" },
    ],
  },
];

const PRODUCT_DATA: Dial[] = [
  { service: "Postgres", dev: "10004" },
  { service: "Redis", dev: "10006" },
  { service: "Kafka", dev: "10008" },
  { service: "OTLP gRPC", dev: "10016" },
];

const IDENTITY_AUTH: Dial[] = [{ service: "auth gRPC", dev: "10031", secure: "10036" }];

const link = (
  id: string,
  source: string,
  target: string,
  protocol: LinkProtocolEnum,
  side: LinkSideEnum,
  dials: Dial[],
): TopologyLink => ({ id, source, target, protocol, side, dials });

export const TOPOLOGY_LINKS: TopologyLink[] = [
  link("net-router", "internet", "router", LinkProtocol.FORWARD, LinkSide.BOTTOM_TOP, [{ dev: "WAN" }]),
  link("router-traefik", "router", "traefik", LinkProtocol.TLS, LinkSide.RIGHT_LEFT, [{ dev: "80 / 443" }]),
  link("traefik-nas2", "traefik", "nas2", LinkProtocol.FORWARD, LinkSide.BOTTOM_TOP, [{ dev: "192.168.1.65" }]),
  link("traefik-identity", "traefik", "identity", LinkProtocol.HTTP, LinkSide.OVERPASS, [
    { service: "console", dev: "10034", secure: "10039" },
  ]),
  link("traefik-news", "traefik", "news", LinkProtocol.HTTP, LinkSide.RIGHT_LEFT, [
    { service: "console", dev: "10062", secure: "10075" },
  ]),
  link("traefik-storages", "traefik", "storages", LinkProtocol.HTTP, LinkSide.RIGHT_LEFT, [
    { service: "console", dev: "10090", secure: "10101" },
  ]),
  link("traefik-edge", "traefik", "edge", LinkProtocol.HTTP, LinkSide.RIGHT_LEFT, [
    { service: "console", dev: "10112", secure: "10115" },
  ]),
  link("traefik-docs", "traefik", "documentation", LinkProtocol.HTTP, LinkSide.RIGHT_LEFT, [
    { service: "frontend", dev: "10120" },
  ]),
  link("traefik-aquaworks", "traefik", "aquaworks", LinkProtocol.HTTP, LinkSide.RIGHT_LEFT, [{ dev: "10400" }]),
  link("traefik-timetable", "traefik", "timetable", LinkProtocol.HTTP, LinkSide.RIGHT_LEFT, [{ dev: "10401" }]),
  link("news-identity", "news", "identity", LinkProtocol.GRPC, LinkSide.RIGHT_LEFT, IDENTITY_AUTH),
  link("storages-identity", "storages", "identity", LinkProtocol.GRPC, LinkSide.RIGHT_LEFT, IDENTITY_AUTH),
  link("edge-identity", "edge", "identity", LinkProtocol.GRPC, LinkSide.RIGHT_LEFT, IDENTITY_AUTH),
  link("news-stack", "news", "stack", LinkProtocol.DATA, LinkSide.RIGHT_LEFT, PRODUCT_DATA),
  link("storages-stack", "storages", "stack", LinkProtocol.DATA, LinkSide.RIGHT_LEFT, PRODUCT_DATA),
  link("edge-stack", "edge", "stack", LinkProtocol.DATA, LinkSide.RIGHT_LEFT, PRODUCT_DATA),
  link("identity-stack", "identity", "stack", LinkProtocol.DATA, LinkSide.BOTTOM_TOP, [
    ...PRODUCT_DATA,
    { service: "MinIO", dev: "10012" },
  ]),
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
    nodeIds: ["stack"],
  },
  {
    id: "identity",
    name: "NFX-Identity",
    nfx: true,
    start: 10030,
    end: 10049,
    usedStart: 10030,
    usedEnd: 10039,
    nodeIds: ["identity"],
  },
  {
    id: "news",
    name: "NFX-News",
    nfx: true,
    start: 10050,
    end: 10079,
    usedStart: 10050,
    usedEnd: 10075,
    nodeIds: ["news"],
  },
  {
    id: "storages",
    name: "NFX-Storages",
    nfx: true,
    start: 10080,
    end: 10109,
    usedStart: 10080,
    usedEnd: 10101,
    nodeIds: ["storages"],
  },
  {
    id: "edge",
    name: "NFX-Edge",
    nfx: true,
    start: 10110,
    end: 10119,
    usedStart: 10110,
    usedEnd: 10115,
    nodeIds: ["edge"],
  },
  {
    id: "documentation",
    name: "NFX-Documentation",
    nfx: true,
    start: 10120,
    end: 10129,
    usedStart: 10120,
    usedEnd: 10120,
    nodeIds: ["documentation"],
  },
  { id: "gap", nfx: false, start: 10130, end: 10399, nodeIds: [] },
  {
    id: "static",
    nfx: false,
    start: 10400,
    end: 10405,
    usedStart: 10400,
    usedEnd: 10405,
    nodeIds: ["aquaworks", "timetable"],
  },
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

export const COMPOSE_COUNT = TOPOLOGY_NODES.filter((node) => node.docker).length;
export const NFX_BLOCK_COUNT = PORT_BLOCKS.filter((block) => block.nfx).length;
