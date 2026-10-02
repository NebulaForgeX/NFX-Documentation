import type { Edge, Node } from "@xyflow/react";

export type PortKind = "ingress" | "http" | "grpc" | "console" | "data";

export type PortRow = {
  name: string;
  dev: string;
  secure?: string;
  kind: PortKind;
};

export type ArchData = {
  ports: PortRow[];
};

export type ArchNode = Node<ArchData, "arch">;

const node = (id: string, x: number, y: number, ports: PortRow[]): ArchNode => ({
  id,
  type: "arch",
  position: { x, y },
  data: { ports },
  dragHandle: ".arch-drag",
});

export const ARCH_NODES: ArchNode[] = [
  node("internet", 0, 420, []),
  node("router", 340, 420, [{ name: "TCP", dev: "80 / 443", kind: "ingress" }]),
  node("traefik", 700, 380, [
    { name: "HTTP", dev: "80", kind: "ingress" },
    { name: "HTTPS", dev: "443", kind: "ingress" },
  ]),
  node("identity", 1140, 0, [
    { name: "auth HTTP", dev: "10030", secure: "10035", kind: "http" },
    { name: "auth gRPC", dev: "10031", secure: "10036", kind: "grpc" },
    { name: "asset HTTP", dev: "10032", secure: "10037", kind: "http" },
    { name: "asset gRPC", dev: "10033", secure: "10038", kind: "grpc" },
    { name: "console", dev: "10034", secure: "10039", kind: "console" },
  ]),
  node("news", 1140, 280, [
    { name: "source…mcp HTTP/gRPC", dev: "10050–10061", secure: "10063–10074", kind: "http" },
    { name: "console", dev: "10062", secure: "10075", kind: "console" },
    { name: "→ Identity auth", dev: "10031", secure: "10036", kind: "grpc" },
  ]),
  node("storages", 1140, 540, [
    { name: "s3…notify HTTP/gRPC", dev: "10080–10089", secure: "10091–10100", kind: "http" },
    { name: "console", dev: "10090", secure: "10101", kind: "console" },
    { name: "→ Identity auth", dev: "10031", secure: "10036", kind: "grpc" },
  ]),
  node("edge", 1140, 800, [
    { name: "sites HTTP", dev: "10110", secure: "10113", kind: "http" },
    { name: "sites gRPC", dev: "10111", secure: "10114", kind: "grpc" },
    { name: "console", dev: "10112", secure: "10115", kind: "console" },
    { name: "→ Identity auth", dev: "10031", secure: "10036", kind: "grpc" },
  ]),
  node("documentation", 1140, 1080, [{ name: "frontend HTTP", dev: "10120", kind: "http" }]),
  node("sites", 1620, 0, [
    { name: "AquaWorks", dev: "10400", kind: "http" },
    { name: "TimetableCraft", dev: "10401", kind: "http" },
    { name: "Vite", dev: "10402–10405", kind: "http" },
  ]),
  node("stack", 1620, 360, [
    { name: "MySQL", dev: "10000", kind: "data" },
    { name: "MongoDB", dev: "10002", kind: "data" },
    { name: "PostgreSQL", dev: "10004", kind: "data" },
    { name: "Redis", dev: "10006", kind: "data" },
    { name: "Kafka", dev: "10008", kind: "data" },
    { name: "RabbitMQ", dev: "10010", kind: "data" },
    { name: "MinIO", dev: "10012", kind: "data" },
    { name: "Centrifugo", dev: "10014", kind: "data" },
    { name: "OTLP gRPC", dev: "10016", kind: "data" },
    { name: "OpenSearch", dev: "10023", kind: "data" },
    { name: "reserved", dev: "10025–10029", kind: "data" },
  ]),
  node("nas2", 1620, 980, [{ name: "same ports", dev: "192.168.1.65", kind: "ingress" }]),
];

type EdgeDef = {
  id: string;
  source: string;
  target: string;
  labelKey: string;
};

const link = (id: string, source: string, target: string, labelKey: string): EdgeDef => ({ id, source, target, labelKey });

export const ARCH_EDGE_DEFS: EdgeDef[] = [
  link("net-router", "internet", "router", "forward"),
  link("router-traefik", "router", "traefik", "tls"),
  link("traefik-identity", "traefik", "identity", "http"),
  link("traefik-news", "traefik", "news", "http"),
  link("traefik-storages", "traefik", "storages", "http"),
  link("traefik-edge", "traefik", "edge", "http"),
  link("traefik-docs", "traefik", "documentation", "http"),
  link("traefik-sites", "traefik", "sites", "http"),
  link("traefik-minio", "traefik", "stack", "minio"),
  link("identity-stack", "identity", "stack", "lan"),
  link("news-identity", "news", "identity", "grpc"),
  link("news-stack", "news", "stack", "lan"),
  link("storages-identity", "storages", "identity", "grpc"),
  link("storages-stack", "storages", "stack", "lan"),
  link("edge-identity", "edge", "identity", "grpc"),
  link("edge-stack", "edge", "stack", "lan"),
  link("traefik-nas2", "traefik", "nas2", "nas2"),
];

export function toFlowEdges(label: (key: string) => string): Edge[] {
  return ARCH_EDGE_DEFS.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: label(edge.labelKey),
    animated: true,
    type: "smoothstep",
  }));
}
