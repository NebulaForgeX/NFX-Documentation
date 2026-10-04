import type { Node } from "@xyflow/react";
import type { OverviewLink, TopologyLink } from "@/constants";
import type { BlockNode, FlowNode, FrameNode, LinkEdge, TierNode } from "./layout";

import { Graph, layout } from "@dagrejs/dagre";

import { OVERVIEW_LINKS, TOPOLOGY_LINKS } from "@/constants";

import { CONTAINER_BY_ID, containersIn, directContainersOf, GROUP_BY_ID, isFrame, subFramesOf } from "./layout";

export const BLOCK_WIDTH = 216;
export const BLOCK_HEIGHT = 88;
export const FRAME_HEADER = 72;
export const FRAME_PAD = 32;
const RANK_GAP = 120;
const NODE_GAP = 56;
const SUB_FRAME_GAP = 64;
const FRAME_GAP = 72;
const COLUMN_GAP = 200;
const TIER_GAP = 96;
const STACK_ROW = 2200;
export const FRAME_DRAG_HANDLE = "nfx-frame-drag";

const COLUMNS = [
  { tier: "ingress", units: ["internet", "router"] },
  { tier: "proxy", units: ["frame-traefik", "nas2"] },
  {
    tier: "product",
    units: ["frame-news", "frame-storages", "frame-edge", "frame-documentation", "frame-static"],
  },
  { tier: "identity", units: ["frame-identity"] },
  { tier: "shared", units: ["frame-stack"] },
] as const;

export const UNIT_ORDER: string[] = COLUMNS.flatMap((column) => column.units);

type Size = { width: number; height: number };
type Placement = Size & { id: string; x: number; y: number };
type Packed = Size & { children: Placement[] };

const BLOCK_SIZE: Size = { width: BLOCK_WIDTH, height: BLOCK_HEIGHT };

const frameSize = (inner: Size): Size => ({
  width: inner.width + FRAME_PAD * 2,
  height: FRAME_HEADER + inner.height + FRAME_PAD * 2,
});

function shelf(frameId: string, limit: number, sizeOf: (id: string) => Size): Packed {
  const children: Placement[] = [];
  let x = 0;
  let y = 0;
  let row = 0;
  let width = 0;
  subFramesOf(frameId).forEach(({ id }) => {
    const size = sizeOf(id);
    if (x > 0 && x + size.width > limit) {
      y += row + SUB_FRAME_GAP;
      x = 0;
      row = 0;
    }
    children.push({ id, ...size, x: FRAME_PAD + x, y: FRAME_HEADER + FRAME_PAD + y });
    width = Math.max(width, x + size.width);
    row = Math.max(row, size.height);
    x += size.width + SUB_FRAME_GAP;
  });
  return { ...frameSize({ width, height: y + row }), children };
}

type Layered = Size & { lefts: Map<string, { x: number; y: number }> };

const LAYERED = new Map<string, Layered>();

function layeredOf(frameId: string): Layered {
  const cached = LAYERED.get(frameId);
  if (cached) return cached;
  const ids = directContainersOf(frameId).map((container) => container.id);
  const members = new Set(ids);
  const graph = new Graph();
  graph.setGraph({ rankdir: "LR", nodesep: NODE_GAP, ranksep: RANK_GAP, marginx: 0, marginy: 0 });
  graph.setDefaultEdgeLabel(() => ({}));
  ids.forEach((id) => graph.setNode(id, { width: BLOCK_WIDTH, height: BLOCK_HEIGHT }));
  TOPOLOGY_LINKS.forEach((link) => {
    if (members.has(link.source) && members.has(link.target)) graph.setEdge(link.source, link.target);
  });
  layout(graph);
  const corners = ids.map((id) => {
    const { x, y } = graph.node(id);
    return { id, x: x - BLOCK_WIDTH / 2, y: y - BLOCK_HEIGHT / 2 };
  });
  const minX = Math.min(...corners.map((corner) => corner.x));
  const minY = Math.min(...corners.map((corner) => corner.y));
  const lefts = new Map(corners.map((corner) => [corner.id, { x: corner.x - minX, y: corner.y - minY }]));
  const result = {
    lefts,
    width: Math.max(...corners.map((corner) => corner.x - minX)) + BLOCK_WIDTH,
    height: Math.max(...corners.map((corner) => corner.y - minY)) + BLOCK_HEIGHT,
  };
  LAYERED.set(frameId, result);
  return result;
}

const spread = (offset: number, content: number, room: number, block: number) =>
  content > block ? (offset * (room - block)) / (content - block) : (room - block) / 2;

function placeContainers(frameId: string, target: Size | null): Packed {
  const base = layeredOf(frameId);
  const width = Math.max(base.width, (target?.width ?? 0) - FRAME_PAD * 2);
  const height = Math.max(base.height, (target?.height ?? 0) - FRAME_HEADER - FRAME_PAD * 2);
  const children = [...base.lefts.entries()].map<Placement>(([id, left]) => ({
    id,
    ...BLOCK_SIZE,
    x: FRAME_PAD + spread(left.x, base.width, width, BLOCK_WIDTH),
    y: FRAME_HEADER + FRAME_PAD + spread(left.y, base.height, height, BLOCK_HEIGHT),
  }));
  return { ...frameSize({ width, height }), children };
}

function packFrame(frameId: string, target: Size | null, sizeOf: (id: string) => Size): Packed {
  if (!subFramesOf(frameId).length) return placeContainers(frameId, target);
  const packed = shelf(frameId, target ? target.width - FRAME_PAD * 2 : STACK_ROW, sizeOf);
  return {
    ...packed,
    width: Math.max(packed.width, target?.width ?? 0),
    height: Math.max(packed.height, target?.height ?? 0),
  };
}

const initial = new Map<string, Packed>();

function packed(frameId: string): Packed {
  const cached = initial.get(frameId);
  if (cached) return cached;
  const result = packFrame(frameId, null, (id) => (isFrame(id) ? packed(id) : BLOCK_SIZE));
  initial.set(frameId, result);
  return result;
}

export function minSizeOf(frameId: string): Size {
  const subFrames = subFramesOf(frameId);
  if (!subFrames.length) return packed(frameId);
  return frameSize({ width: Math.max(...subFrames.map(({ id }) => packed(id).width)), height: 0 });
}

const unitSize = (id: string): Size => (isFrame(id) ? packed(id) : BLOCK_SIZE);

function frameNode(id: string, x: number, y: number, parentId?: string): FrameNode {
  const group = GROUP_BY_ID.get(id);
  if (!group) throw new Error(`grid: unknown frame ${id}`);
  const { width, height } = packed(id);
  return {
    id,
    type: "frame",
    position: { x, y },
    width,
    height,
    dragHandle: `.${FRAME_DRAG_HANDLE}`,
    data: { ...group, members: containersIn(id).length },
    ...(parentId ? { parentId, expandParent: true } : {}),
  };
}

function blockNode(id: string, x: number, y: number, parentId?: string): BlockNode {
  const container = CONTAINER_BY_ID.get(id);
  if (!container) throw new Error(`grid: unknown container ${id}`);
  return {
    id,
    type: "block",
    position: { x, y },
    width: BLOCK_WIDTH,
    height: BLOCK_HEIGHT,
    data: container,
    ...(parentId ? { parentId, expandParent: true } : {}),
  };
}

function emit(id: string, x: number, y: number, parentId?: string): FlowNode[] {
  if (!isFrame(id)) return [blockNode(id, x, y, parentId)];
  return [
    frameNode(id, x, y, parentId),
    ...packed(id).children.flatMap((child) => emit(child.id, child.x, child.y, id)),
  ];
}

function buildNodes(): FlowNode[] {
  const columns = COLUMNS.map((column) => {
    const sizes = column.units.map(unitSize);
    return {
      ...column,
      sizes,
      width: Math.max(...sizes.map((size) => size.width)),
      height: sizes.reduce((sum, size) => sum + size.height, 0) + FRAME_GAP * (sizes.length - 1),
    };
  });
  const tallest = Math.max(...columns.map((column) => column.height));
  const tiers: TierNode[] = [];
  const units: FlowNode[] = [];
  let x = 0;
  columns.forEach((column) => {
    tiers.push({
      id: `tier-${column.tier}`,
      type: "tier",
      position: { x, y: -TIER_GAP },
      data: { tier: column.tier, width: column.width },
      selectable: false,
      draggable: false,
      focusable: false,
    });
    let y = (tallest - column.height) / 2;
    column.units.forEach((id, index) => {
      const size = column.sizes[index];
      units.push(...emit(id, x + (column.width - size.width) / 2, y));
      y += size.height + FRAME_GAP;
    });
    x += column.width + COLUMN_GAP;
  });
  return [...tiers, ...units];
}

const toEdge = (link: TopologyLink | OverviewLink): LinkEdge => ({
  id: link.id,
  source: link.source,
  target: link.target,
  type: "link",
  focusable: false,
  data: link,
});

const TOP_UNITS = new Set(UNIT_ORDER);

export const FLOW_NODES = buildNodes();

const PARENT_OF = new Map(FLOW_NODES.map((node) => [node.id, node.parentId]));

function rootOf(id: string): string {
  let current = id;
  let parent = PARENT_OF.get(current);
  while (parent) {
    current = parent;
    parent = PARENT_OF.get(current);
  }
  return current;
}

export const REVEAL_UNITS: string[][] = UNIT_ORDER.map((unit) =>
  FLOW_NODES.filter((node) => rootOf(node.id) === unit).map((node) => node.id),
);
export const COMPOSE_EDGES: LinkEdge[] = [
  ...TOPOLOGY_LINKS.filter((link) => TOP_UNITS.has(link.source) && TOP_UNITS.has(link.target)),
  ...OVERVIEW_LINKS,
].map(toEdge);

const DETAIL_EDGES = TOPOLOGY_LINKS.map(toEdge);

export const traceEdges = (selected: Set<string>): LinkEdge[] =>
  DETAIL_EDGES.filter((edge) => selected.has(edge.source) || selected.has(edge.target));

const FOCUS_EDGES = new Map<string, LinkEdge[]>();

export function focusEdges(frameId: string): LinkEdge[] {
  const cached = FOCUS_EDGES.get(frameId);
  if (cached) return cached;
  const members = new Set(containersIn(frameId));
  const edges = TOPOLOGY_LINKS.filter((link) => members.has(link.source) && members.has(link.target)).map(toEdge);
  FOCUS_EDGES.set(frameId, edges);
  return edges;
}

const sizeOfNode = (node: Node): Size => ({
  width: node.width ?? node.measured?.width ?? 0,
  height: node.height ?? node.measured?.height ?? 0,
});

export function reflow(nodes: Node[], frameId: string, target: Size): Node[] {
  const sizes = new Map(nodes.map((node) => [node.id, sizeOfNode(node)]));
  const positions = new Map<string, { x: number; y: number }>();
  let current: string | undefined = frameId;
  let room = target;
  while (current) {
    const packed = packFrame(current, room, (id) => sizes.get(id) ?? BLOCK_SIZE);
    packed.children.forEach((child) => positions.set(child.id, { x: child.x, y: child.y }));
    sizes.set(current, { width: packed.width, height: packed.height });
    const parent: string | undefined = GROUP_BY_ID.get(current)?.parent;
    if (parent) room = { width: sizes.get(parent)?.width ?? 0, height: 0 };
    current = parent;
  }
  const touched = new Set([...positions.keys(), frameId, ...ancestorsOf(frameId)]);
  return nodes.map((node) => {
    if (!touched.has(node.id)) return node;
    const position = positions.get(node.id) ?? node.position;
    if (node.type !== "frame") return { ...node, position };
    const size = sizes.get(node.id) ?? sizeOfNode(node);
    return { ...node, position, width: size.width, height: size.height };
  });
}

function ancestorsOf(frameId: string): string[] {
  const chain: string[] = [];
  let parent = GROUP_BY_ID.get(frameId)?.parent;
  while (parent) {
    chain.push(parent);
    parent = GROUP_BY_ID.get(parent)?.parent;
  }
  return chain;
}
