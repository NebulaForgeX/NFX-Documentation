import type { Node } from "@xyflow/react";
import type { OverviewLink, TopologyLink } from "@/constants";
import type { BlockNode, FlowNode, FrameNode, LineLevelEnum, LinkEdge, TierNode } from "./layout";

import { OVERVIEW_LINKS, TOPOLOGY_LINKS } from "@/constants";

import {
  CONTAINER_BY_ID,
  containersIn,
  directContainersOf,
  GROUP_BY_ID,
  isFrame,
  LineLevel,
  subFramesOf,
} from "./layout";

export const BLOCK_WIDTH = 216;
export const BLOCK_HEIGHT = 88;
export const FRAME_HEADER = 72;
export const FRAME_PAD = 20;
const CELL_GAP = 20;
const SUB_FRAME_GAP = 24;
const FRAME_GAP = 48;
const COLUMN_GAP = 160;
const TIER_GAP = 96;
const STACK_ROW = 1600;
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

export const childIdsOf = (frameId: string) => [
  ...subFramesOf(frameId).map((group) => group.id),
  ...directContainersOf(frameId).map((container) => container.id),
];

function defaultLimit(frameId: string): number {
  if (subFramesOf(frameId).length) return STACK_ROW;
  const count = directContainersOf(frameId).length;
  const columns = Math.min(count, Math.ceil(Math.sqrt(count * 1.5)));
  return columns * (BLOCK_WIDTH + CELL_GAP) - CELL_GAP;
}

function shelf(frameId: string, limit: number, sizeOf: (id: string) => Size): Packed {
  const gap = subFramesOf(frameId).length ? SUB_FRAME_GAP : CELL_GAP;
  const children: Placement[] = [];
  let x = 0;
  let y = 0;
  let row = 0;
  let width = 0;
  childIdsOf(frameId).forEach((id) => {
    const size = sizeOf(id);
    if (x > 0 && x + size.width > limit) {
      y += row + gap;
      x = 0;
      row = 0;
    }
    children.push({ id, ...size, x: FRAME_PAD + x, y: FRAME_HEADER + y });
    width = Math.max(width, x + size.width);
    row = Math.max(row, size.height);
    x += size.width + gap;
  });
  return { width: width + FRAME_PAD * 2, height: FRAME_HEADER + y + row + FRAME_PAD, children };
}

const initial = new Map<string, Packed>();

function packed(frameId: string): Packed {
  const cached = initial.get(frameId);
  if (cached) return cached;
  const result = shelf(frameId, defaultLimit(frameId), (id) => (isFrame(id) ? packed(id) : BLOCK_SIZE));
  initial.set(frameId, result);
  return result;
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
export const LINE_EDGES: Record<LineLevelEnum, LinkEdge[]> = {
  [LineLevel.COMPOSE]: [
    ...TOPOLOGY_LINKS.filter((link) => TOP_UNITS.has(link.source) && TOP_UNITS.has(link.target)),
    ...OVERVIEW_LINKS,
  ].map(toEdge),
  [LineLevel.DETAIL]: TOPOLOGY_LINKS.map(toEdge),
};

const FOCUS_EDGES = new Map<string, LinkEdge[]>();

export function focusEdges(frameId: string): LinkEdge[] {
  const cached = FOCUS_EDGES.get(frameId);
  if (cached) return cached;
  const members = new Set(containersIn(frameId));
  const edges = TOPOLOGY_LINKS.filter((link) => members.has(link.source) || members.has(link.target)).map(toEdge);
  FOCUS_EDGES.set(frameId, edges);
  return edges;
}

const sizeOfNode = (node: Node): Size => ({
  width: node.width ?? node.measured?.width ?? 0,
  height: node.height ?? node.measured?.height ?? 0,
});

export function reflow(nodes: Node[], frameId: string, width: number): Node[] {
  const sizes = new Map(nodes.map((node) => [node.id, sizeOfNode(node)]));
  const positions = new Map<string, { x: number; y: number }>();
  let current: string | undefined = frameId;
  let frameWidth = width;
  while (current) {
    const layout = shelf(current, frameWidth - FRAME_PAD * 2, (id) => sizes.get(id) ?? BLOCK_SIZE);
    layout.children.forEach((child) => positions.set(child.id, { x: child.x, y: child.y }));
    sizes.set(current, { width: layout.width, height: layout.height });
    const parent: string | undefined = GROUP_BY_ID.get(current)?.parent;
    if (parent) frameWidth = sizes.get(parent)?.width ?? frameWidth;
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
