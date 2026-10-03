import type { Edge, Node } from "@xyflow/react";
import type { LinkProtocolEnum, OverviewLink, TopologyContainer, TopologyGroup, TopologyLink } from "@/constants";
import type { Focus } from "./focus";

import { LinkProtocol, OVERVIEW_LINKS, TOPOLOGY_CONTAINERS, TOPOLOGY_GROUPS, TOPOLOGY_LINKS } from "@/constants";

export type FrameNode = Node<TopologyGroup & { members: number }, "frame">;
export type BlockNode = Node<TopologyContainer, "block">;
export type TierNode = Node<{ tier: string; width: number }, "tier">;
export type FlowNode = FrameNode | BlockNode | TierNode;
export type LinkEdge = Edge<TopologyLink | OverviewLink, "link">;

export const LayerKey = {
  ALL: "all",
  DATA: "data",
  GRPC: "grpc",
  HTTP: "http",
  INGRESS: "ingress",
} as const;

export type LayerKeyEnum = (typeof LayerKey)[keyof typeof LayerKey];

export const LineLevel = {
  COMPOSE: "compose",
  DETAIL: "detail",
} as const;

export type LineLevelEnum = (typeof LineLevel)[keyof typeof LineLevel];

const LAYER_PROTOCOLS: Record<Exclude<LayerKeyEnum, "all">, LinkProtocolEnum[]> = {
  [LayerKey.DATA]: [LinkProtocol.DATA],
  [LayerKey.GRPC]: [LinkProtocol.GRPC],
  [LayerKey.HTTP]: [LinkProtocol.HTTP],
  [LayerKey.INGRESS]: [LinkProtocol.FORWARD, LinkProtocol.TLS],
};

export const GROUP_BY_ID = new Map(TOPOLOGY_GROUPS.map((group) => [group.id, group]));
export const CONTAINER_BY_ID = new Map(TOPOLOGY_CONTAINERS.map((container) => [container.id, container]));
const OVERVIEW_BY_ID = new Map(OVERVIEW_LINKS.map((link) => [link.id, link]));

export const isFrame = (id: string) => GROUP_BY_ID.has(id);
export const isOverview = (link: TopologyLink | OverviewLink): link is OverviewLink => "members" in link;

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

export const subFramesOf = (groupId: string) => TOPOLOGY_GROUPS.filter((group) => group.parent === groupId);
export const directContainersOf = (groupId: string) =>
  TOPOLOGY_CONTAINERS.filter((container) => container.group === groupId);

function withAncestors(ids: Iterable<string>): Set<string> {
  const nodes = new Set<string>();
  for (const id of ids) {
    nodes.add(id);
    ancestors(id).forEach((parent) => nodes.add(parent));
  }
  return nodes;
}

function focusOf(links: TopologyLink[], seeds: string[] = [], areas: string[] = []): Focus {
  const ends = links.flatMap((link) => [link.source, link.target]);
  const ids = new Set(links.map((link) => link.id));
  OVERVIEW_LINKS.forEach((overview) => {
    if (overview.members.some((member) => ids.has(member))) ids.add(overview.id);
  });
  return { nodes: withAncestors([...seeds, ...ends]), links: ids, areas: new Set(areas), seeds: new Set() };
}

export function neighbours(ids: string[]): Focus {
  const seeds = ids.flatMap((id) => (isFrame(id) ? containersIn(id) : [id]));
  const touched = new Set(seeds);
  const areas = ids.flatMap((id) => (isFrame(id) ? [id] : ancestors(id).slice(0, 1)));
  const focus = focusOf(
    TOPOLOGY_LINKS.filter((link) => touched.has(link.source) || touched.has(link.target)),
    [...ids, ...seeds],
    areas,
  );
  return { ...focus, seeds: touched };
}

export const unitsOf = (id: string) => (isFrame(id) ? containersIn(id) : [id]);

export type CheckState = boolean | "indeterminate";

export function checkState(id: string, selected: Set<string>): CheckState {
  const units = unitsOf(id);
  const count = units.filter((unit) => selected.has(unit)).length;
  if (count === 0) return false;
  return count === units.length ? true : "indeterminate";
}

export function selectionFocus(selected: Set<string>): Focus {
  const focus = neighbours([...selected]);
  const areas = TOPOLOGY_GROUPS.filter((group) => checkState(group.id, selected) === true).map((group) => group.id);
  return { ...focus, areas: new Set(areas) };
}

export function frameFocus(frameId: string): Focus {
  const members = new Set(containersIn(frameId));
  const inside = TOPOLOGY_LINKS.filter((link) => members.has(link.source) && members.has(link.target));
  return focusOf(inside, [frameId, ...members], [frameId]);
}

export function linkFocus(linkId: string): Focus {
  const overview = OVERVIEW_BY_ID.get(linkId);
  const members = new Set(overview ? overview.members : [linkId]);
  const focus = focusOf(TOPOLOGY_LINKS.filter((link) => members.has(link.id)));
  focus.links.add(linkId);
  return focus;
}

export function layerFocus(layer: Exclude<LayerKeyEnum, "all">): Focus {
  const protocols = LAYER_PROTOCOLS[layer];
  return focusOf(TOPOLOGY_LINKS.filter((link) => protocols.includes(link.protocol)));
}
