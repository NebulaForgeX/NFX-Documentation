import type { Edge, Node } from "@xyflow/react";
import type { TopologyLink, TopologyNode } from "@/constants";

import { LinkSide, TOPOLOGY_LINKS, TOPOLOGY_NODES } from "@/constants";

export const BLOCK_WIDTH = 248;
export const BLOCK_HEIGHT = 112;

const COLUMN_X = [0, 380, 820, 1320] as const;

const POSITIONS: Record<string, { x: number; y: number }> = {
  internet: { x: COLUMN_X[0], y: 120 },
  router: { x: COLUMN_X[0], y: 320 },
  traefik: { x: COLUMN_X[1], y: 320 },
  nas2: { x: COLUMN_X[1], y: 560 },
  news: { x: COLUMN_X[2], y: 0 },
  storages: { x: COLUMN_X[2], y: 160 },
  edge: { x: COLUMN_X[2], y: 320 },
  documentation: { x: COLUMN_X[2], y: 480 },
  aquaworks: { x: COLUMN_X[2], y: 640 },
  timetable: { x: COLUMN_X[2], y: 800 },
  identity: { x: COLUMN_X[3], y: 80 },
  stack: { x: COLUMN_X[3], y: 480 },
};

const TIERS = [
  { id: "ingress", x: COLUMN_X[0] },
  { id: "proxy", x: COLUMN_X[1] },
  { id: "product", x: COLUMN_X[2] },
  { id: "shared", x: COLUMN_X[3] },
] as const;

const TIER_Y = -150;

export type BlockNode = Node<TopologyNode, "block">;
export type TierNode = Node<{ tier: string }, "tier">;
export type LinkEdge = Edge<TopologyLink, "link">;

const HANDLES: Record<TopologyLink["side"], { sourceHandle: string; targetHandle: string }> = {
  [LinkSide.RIGHT_LEFT]: { sourceHandle: "r", targetHandle: "l" },
  [LinkSide.BOTTOM_TOP]: { sourceHandle: "b", targetHandle: "t" },
  [LinkSide.OVERPASS]: { sourceHandle: "ts", targetHandle: "t" },
};

export const FLOW_NODES: (BlockNode | TierNode)[] = [
  ...TIERS.map<TierNode>((tier) => ({
    id: `tier-${tier.id}`,
    type: "tier",
    position: { x: tier.x, y: TIER_Y },
    data: { tier: tier.id },
    selectable: false,
    draggable: false,
    focusable: false,
  })),
  ...TOPOLOGY_NODES.map<BlockNode>((node) => ({
    id: node.id,
    type: "block",
    position: POSITIONS[node.id],
    data: node,
    draggable: false,
  })),
];

export const FLOW_EDGES: LinkEdge[] = TOPOLOGY_LINKS.map((link) => ({
  id: link.id,
  source: link.source,
  target: link.target,
  type: "link",
  data: link,
  focusable: false,
  ...HANDLES[link.side],
}));

export function neighbours(nodeIds: string[]): { nodes: Set<string>; links: Set<string> } {
  const nodes = new Set(nodeIds);
  const links = new Set<string>();
  TOPOLOGY_LINKS.forEach((link) => {
    if (nodeIds.includes(link.source) || nodeIds.includes(link.target)) {
      links.add(link.id);
      nodes.add(link.source);
      nodes.add(link.target);
    }
  });
  return { nodes, links };
}

export function linkFocus(linkId: string): { nodes: Set<string>; links: Set<string> } {
  const link = TOPOLOGY_LINKS.find((item) => item.id === linkId);
  return { nodes: new Set(link ? [link.source, link.target] : []), links: new Set([linkId]) };
}
