import type { Edge, Node } from "@xyflow/react";
import type { ElkExtendedEdge, ElkNode, ElkPoint } from "elkjs/lib/elk-api";
import type { LinkProtocolEnum, TopologyContainer, TopologyGroup, TopologyLink } from "@/constants";

import ELK from "elkjs/lib/elk-api";
import workerUrl from "elkjs/lib/elk-worker.min.js?url";

import { LinkProtocol, TOPOLOGY_CONTAINERS, TOPOLOGY_GROUPS, TOPOLOGY_LINKS } from "@/constants";

export const BLOCK_WIDTH = 216;
export const BLOCK_HEIGHT = 88;
const FRAME_HEADER = 72;
const FRAME_PAD = 18;
const TIER_GAP = 96;
const CORNER = 10;

export type FrameNode = Node<TopologyGroup & { members: number }, "frame">;
export type BlockNode = Node<TopologyContainer, "block">;
export type TierNode = Node<{ tier: string; width: number }, "tier">;
export type LinkEdge = Edge<TopologyLink & { path: string; labelX: number; labelY: number }, "link">;
export type FlowLayout = { nodes: (FrameNode | BlockNode | TierNode)[]; edges: LinkEdge[] };

export const LayerKey = {
  ALL: "all",
  DATA: "data",
  GRPC: "grpc",
  HTTP: "http",
  INGRESS: "ingress",
} as const;

export type LayerKeyEnum = (typeof LayerKey)[keyof typeof LayerKey];

const LAYER_PROTOCOLS: Record<Exclude<LayerKeyEnum, "all">, LinkProtocolEnum[]> = {
  [LayerKey.DATA]: [LinkProtocol.DATA],
  [LayerKey.GRPC]: [LinkProtocol.GRPC],
  [LayerKey.HTTP]: [LinkProtocol.HTTP],
  [LayerKey.INGRESS]: [LinkProtocol.FORWARD, LinkProtocol.TLS],
};

const TIER_OF: Record<string, string> = {
  internet: "ingress",
  router: "ingress",
  traefik: "proxy",
  nas2: "proxy",
  news: "product",
  storages: "product",
  edge: "product",
  documentation: "product",
  static: "product",
  identity: "identity",
  stack: "shared",
};

const TIER_ORDER = ["ingress", "proxy", "product", "identity", "shared"] as const;

const GROUP_BY_ID = new Map(TOPOLOGY_GROUPS.map((group) => [group.id, group]));
const CONTAINER_BY_ID = new Map(TOPOLOGY_CONTAINERS.map((container) => [container.id, container]));

function ancestors(id: string): string[] {
  const chain: string[] = [];
  let parent = CONTAINER_BY_ID.get(id)?.group ?? GROUP_BY_ID.get(id)?.parent;
  while (parent) {
    chain.push(parent);
    parent = GROUP_BY_ID.get(parent)?.parent;
  }
  return chain;
}

function membersOf(groupId: string): string[] {
  return TOPOLOGY_CONTAINERS.filter((container) => container.group && ancestors(container.id).includes(groupId)).map(
    (container) => container.id,
  );
}

const MEMBERS = new Map(TOPOLOGY_GROUPS.map((group) => [group.id, membersOf(group.id)]));

export const linksFrom = (id: string) => TOPOLOGY_LINKS.filter((link) => link.source === id);
export const linksTo = (id: string) => TOPOLOGY_LINKS.filter((link) => link.target === id);

export function containersIn(groupId: string): string[] {
  return MEMBERS.get(groupId) ?? [];
}

function withAncestors(ids: Iterable<string>): Set<string> {
  const nodes = new Set<string>();
  for (const id of ids) {
    nodes.add(id);
    ancestors(id).forEach((parent) => nodes.add(parent));
  }
  return nodes;
}

function focusOf(links: TopologyLink[], seeds: string[] = []): { nodes: Set<string>; links: Set<string> } {
  const ends = links.flatMap((link) => [link.source, link.target]);
  return { nodes: withAncestors([...seeds, ...ends]), links: new Set(links.map((link) => link.id)) };
}

export function neighbours(ids: string[]): { nodes: Set<string>; links: Set<string> } {
  const seeds = ids.flatMap((id) => (GROUP_BY_ID.has(id) ? containersIn(id) : [id]));
  const touched = new Set(seeds);
  return focusOf(
    TOPOLOGY_LINKS.filter((link) => touched.has(link.source) || touched.has(link.target)),
    [...ids, ...seeds],
  );
}

export function linkFocus(linkId: string): { nodes: Set<string>; links: Set<string> } {
  return focusOf(TOPOLOGY_LINKS.filter((link) => link.id === linkId));
}

export function layerFocus(layer: Exclude<LayerKeyEnum, "all">): { nodes: Set<string>; links: Set<string> } {
  const protocols = LAYER_PROTOCOLS[layer];
  return focusOf(TOPOLOGY_LINKS.filter((link) => protocols.includes(link.protocol)));
}

const leaf = (container: TopologyContainer): ElkNode => ({
  id: container.id,
  width: BLOCK_WIDTH,
  height: BLOCK_HEIGHT,
});

function frame(group: TopologyGroup): ElkNode {
  return {
    id: group.id,
    layoutOptions: { "elk.padding": `[top=${FRAME_HEADER},left=${FRAME_PAD},bottom=${FRAME_PAD},right=${FRAME_PAD}]` },
    children: [
      ...TOPOLOGY_GROUPS.filter((child) => child.parent === group.id).map(frame),
      ...TOPOLOGY_CONTAINERS.filter((container) => container.group === group.id).map(leaf),
    ],
  };
}

const GRAPH: ElkNode = {
  id: "root",
  layoutOptions: {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.hierarchyHandling": "INCLUDE_CHILDREN",
    "elk.edgeRouting": "ORTHOGONAL",
    "elk.json.edgeCoords": "ROOT",
    "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
    "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
    "elk.layered.spacing.nodeNodeBetweenLayers": "72",
    "elk.layered.spacing.edgeNodeBetweenLayers": "24",
    "elk.spacing.nodeNode": "28",
    "elk.spacing.edgeEdge": "6",
  },
  children: [
    ...TOPOLOGY_CONTAINERS.filter((container) => !container.group).map(leaf),
    ...TOPOLOGY_GROUPS.filter((group) => !group.parent).map(frame),
  ],
  edges: TOPOLOGY_LINKS.map<ElkExtendedEdge>((link) => ({
    id: link.id,
    sources: [link.source],
    targets: [link.target],
  })),
};

function roundedPath(points: ElkPoint[]): string {
  const [first, ...rest] = points;
  let d = `M ${first.x},${first.y}`;
  rest.forEach((point, index) => {
    const next = rest[index + 1];
    if (!next) {
      d += ` L ${point.x},${point.y}`;
      return;
    }
    const prev = index === 0 ? first : rest[index - 1];
    const inLength = Math.hypot(point.x - prev.x, point.y - prev.y);
    const outLength = Math.hypot(next.x - point.x, next.y - point.y);
    const radius = Math.min(CORNER, inLength / 2, outLength / 2);
    if (radius === 0) {
      d += ` L ${point.x},${point.y}`;
      return;
    }
    const ax = point.x - ((point.x - prev.x) / inLength) * radius;
    const ay = point.y - ((point.y - prev.y) / inLength) * radius;
    const bx = point.x + ((next.x - point.x) / outLength) * radius;
    const by = point.y + ((next.y - point.y) / outLength) * radius;
    d += ` L ${ax},${ay} Q ${point.x},${point.y} ${bx},${by}`;
  });
  return d;
}

function midpoint(points: ElkPoint[]): ElkPoint {
  const lengths = points
    .slice(1)
    .map((point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y));
  let remaining = lengths.reduce((sum, length) => sum + length, 0) / 2;
  for (let index = 0; index < lengths.length; index += 1) {
    if (remaining <= lengths[index]) {
      const ratio = lengths[index] === 0 ? 0 : remaining / lengths[index];
      const from = points[index];
      const to = points[index + 1];
      return { x: from.x + (to.x - from.x) * ratio, y: from.y + (to.y - from.y) * ratio };
    }
    remaining -= lengths[index];
  }
  return points[points.length - 1];
}

type Box = { x: number; y: number; width: number; height: number };

function toFlow(root: ElkNode): FlowLayout {
  const frames: FrameNode[] = [];
  const blocks: BlockNode[] = [];
  const topLevel: (Box & { id: string })[] = [];

  const visit = (node: ElkNode, parentId?: string) => {
    const box = { x: node.x ?? 0, y: node.y ?? 0, width: node.width ?? 0, height: node.height ?? 0 };
    if (!parentId) topLevel.push({ id: node.id, ...box });
    const group = GROUP_BY_ID.get(node.id);
    const common = {
      id: node.id,
      position: { x: box.x, y: box.y },
      width: box.width,
      height: box.height,
      draggable: false,
      ...(parentId ? { parentId, extent: "parent" as const } : {}),
    };
    if (group) {
      frames.push({ ...common, type: "frame", data: { ...group, members: containersIn(group.id).length } });
      node.children?.forEach((child) => visit(child, group.id));
      return;
    }
    const container = CONTAINER_BY_ID.get(node.id);
    if (container) blocks.push({ ...common, type: "block", data: container });
  };
  root.children?.forEach((child) => visit(child));

  const top = Math.min(...topLevel.map((box) => box.y));
  const tierBoxes = TIER_ORDER.map((tier) => {
    const members = topLevel.filter((box) => TIER_OF[box.id] === tier);
    return { tier, x: Math.min(...members.map((box) => box.x)) };
  }).sort((a, b) => a.x - b.x);
  const right = Math.max(...topLevel.map((box) => box.x + box.width));
  const tiers = tierBoxes.map<TierNode>((tier, index) => ({
    id: `tier-${tier.tier}`,
    type: "tier",
    position: { x: tier.x, y: top - TIER_GAP },
    data: { tier: tier.tier, width: (tierBoxes[index + 1]?.x ?? right) - tier.x - FRAME_PAD * 2 },
    selectable: false,
    draggable: false,
    focusable: false,
  }));

  const sections = new Map((root.edges ?? []).map((edge) => [edge.id, edge.sections?.[0]]));
  const edges = TOPOLOGY_LINKS.map<LinkEdge>((link) => {
    const section = sections.get(link.id);
    const points = section ? [section.startPoint, ...(section.bendPoints ?? []), section.endPoint] : [];
    const label = points.length ? midpoint(points) : { x: 0, y: 0 };
    return {
      id: link.id,
      source: link.source,
      target: link.target,
      type: "link",
      focusable: false,
      data: { ...link, path: points.length ? roundedPath(points) : "", labelX: label.x, labelY: label.y },
    };
  });

  return { nodes: [...tiers, ...frames, ...blocks], edges };
}

let pending: Promise<FlowLayout> | null = null;

export function loadFlowLayout(): Promise<FlowLayout> {
  pending ??= new ELK({ workerUrl }).layout(GRAPH).then(toFlow);
  return pending;
}
