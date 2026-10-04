import type { Edge, InternalNode, ReactFlowState } from "@xyflow/react";

import { createContext, useContext } from "react";
import { Position } from "@xyflow/react";

export type Rect = { x: number; y: number; width: number; height: number };
export type Anchor = { x: number; y: number; position: Position };
export type Lane = { sourceT: number; targetT: number; bend: number };

const ZERO: Lane = { sourceT: 0, targetT: 0, bend: 0 };
const PAIR_BEND = 42;
const SIDE_BEND = 16;

export const LaneContext = createContext<Map<string, Lane>>(new Map());

const outward: Record<Position, { x: number; y: number }> = {
  [Position.Left]: { x: -1, y: 0 },
  [Position.Right]: { x: 1, y: 0 },
  [Position.Top]: { x: 0, y: -1 },
  [Position.Bottom]: { x: 0, y: 1 },
};

export function sideBetween(from: Rect, to: Rect): Position {
  const gapX = Math.max(to.x - (from.x + from.width), from.x - (to.x + to.width));
  const gapY = Math.max(to.y - (from.y + from.height), from.y - (to.y + to.height));
  if (gapX >= gapY) return to.x + to.width / 2 >= from.x + from.width / 2 ? Position.Right : Position.Left;
  return to.y + to.height / 2 >= from.y + from.height / 2 ? Position.Bottom : Position.Top;
}

export function anchorOn(rect: Rect, position: Position, t: number): Anchor {
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  if (position === Position.Left || position === Position.Right) {
    const pad = Math.min(22, rect.height * 0.18);
    return {
      x: position === Position.Left ? rect.x : rect.x + rect.width,
      y: cy + t * Math.max(0, rect.height / 2 - pad),
      position,
    };
  }
  const pad = Math.min(22, rect.width * 0.12);
  return {
    x: cx + t * Math.max(0, rect.width / 2 - pad),
    y: position === Position.Top ? rect.y : rect.y + rect.height,
    position,
  };
}

function cubicAt(p0: Anchor, p1: { x: number; y: number }, p2: { x: number; y: number }, p3: Anchor, t: number) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}

export function curvePath(from: Anchor, to: Anchor, bend: number): [string, number, number] {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const pull = Math.min(220, Math.max(64, len * 0.35, Math.abs(bend) * 0.85));
  const cap = Math.min(150, len * 0.45);
  const bow = Math.max(-cap, Math.min(cap, bend));
  const n1 = outward[from.position];
  const n2 = outward[to.position];
  const c1 = { x: from.x + n1.x * pull + px * bow, y: from.y + n1.y * pull + py * bow };
  const c2 = { x: to.x + n2.x * pull + px * bow, y: to.y + n2.y * pull + py * bow };
  const mid = cubicAt(from, c1, c2, to, 0.5);
  return [`M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`, mid.x, mid.y];
}

function rectOf(node: InternalNode | undefined): Rect | null {
  if (!node) return null;
  const { x, y } = node.internals.positionAbsolute;
  return { x, y, width: node.measured.width ?? node.width ?? 0, height: node.measured.height ?? node.height ?? 0 };
}

function centerOf(rect: Rect | undefined): { x: number; y: number } | null {
  if (!rect) return null;
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

function along(side: Position | undefined): boolean {
  return side === Position.Left || side === Position.Right;
}

function spread(
  ids: string[],
  order: (id: string) => { x: number; y: number } | null,
  vertical: boolean,
): Map<string, number> {
  const sorted = [...ids].sort((left, right) => {
    const a = order(left);
    const b = order(right);
    if (!a || !b) return left < right ? -1 : 1;
    const delta = vertical ? a.y - b.y || a.x - b.x : a.x - b.x || a.y - b.y;
    return delta || (left < right ? -1 : 1);
  });
  const count = sorted.length;
  const slots = new Map<string, number>();
  sorted.forEach((id, index) => slots.set(id, count === 1 ? 0 : (index / (count - 1)) * 2 - 1));
  return slots;
}

function fan(ids: string[], scale: number): Map<string, number> {
  const sorted = [...ids].sort();
  const count = sorted.length;
  const slots = new Map<string, number>();
  sorted.forEach((id, index) => slots.set(id, (index - (count - 1) / 2) * scale));
  return slots;
}

function pushGroup(groups: Map<string, string[]>, key: string, id: string) {
  const list = groups.get(key);
  if (list) list.push(id);
  else groups.set(key, [id]);
}

export function lanesOf(edges: Edge[], rects: Map<string, Rect>): Map<string, Lane> {
  const byId = new Map(edges.map((edge) => [edge.id, edge]));
  const sourceSide = new Map<string, Position>();
  const targetSide = new Map<string, Position>();
  const sourceGroups = new Map<string, string[]>();
  const targetGroups = new Map<string, string[]>();
  const pairGroups = new Map<string, string[]>();

  for (const edge of edges) {
    const source = rects.get(edge.source);
    const target = rects.get(edge.target);
    const fromSide = source && target ? sideBetween(source, target) : undefined;
    const toSide = source && target ? sideBetween(target, source) : undefined;
    if (fromSide) sourceSide.set(edge.id, fromSide);
    if (toSide) targetSide.set(edge.id, toSide);
    pushGroup(sourceGroups, `${edge.source}|${fromSide ?? "none"}`, edge.id);
    pushGroup(targetGroups, `${edge.target}|${toSide ?? "none"}`, edge.id);
    pushGroup(pairGroups, [edge.source, edge.target].sort().join("|"), edge.id);
  }

  const sourceT = new Map<string, number>();
  const targetT = new Map<string, number>();
  const bend = new Map<string, number>();
  for (const [key, ids] of sourceGroups) {
    const side = sourceSide.get(ids[0] ?? "");
    const vertical = along(side) || key.endsWith("|none");
    const slots = spread(ids, (id) => centerOf(rects.get(byId.get(id)?.target ?? "")), vertical);
    for (const [id, t] of slots) sourceT.set(id, t);
    for (const [id, amount] of fan(ids, SIDE_BEND)) bend.set(id, (bend.get(id) ?? 0) + amount);
  }
  for (const [key, ids] of targetGroups) {
    const side = targetSide.get(ids[0] ?? "");
    const vertical = along(side) || key.endsWith("|none");
    const slots = spread(ids, (id) => centerOf(rects.get(byId.get(id)?.source ?? "")), vertical);
    for (const [id, t] of slots) targetT.set(id, t);
    for (const [id, amount] of fan(ids, SIDE_BEND)) bend.set(id, (bend.get(id) ?? 0) + amount);
  }
  for (const ids of pairGroups.values()) {
    if (ids.length < 2) continue;
    for (const [id, amount] of fan(ids, PAIR_BEND)) bend.set(id, (bend.get(id) ?? 0) + amount);
  }

  return new Map(
    edges.map((edge) => [
      edge.id,
      { sourceT: sourceT.get(edge.id) ?? 0, targetT: targetT.get(edge.id) ?? 0, bend: bend.get(edge.id) ?? 0 },
    ]),
  );
}

export function selectLanes(state: ReactFlowState): Map<string, Lane> {
  const rects = new Map<string, Rect>();
  for (const edge of state.edges) {
    const source = rectOf(state.nodeLookup.get(edge.source));
    const target = rectOf(state.nodeLookup.get(edge.target));
    if (source) rects.set(edge.source, source);
    if (target) rects.set(edge.target, target);
  }
  return lanesOf(state.edges, rects);
}

export function sameLanes(left: Map<string, Lane>, right: Map<string, Lane>): boolean {
  if (left.size !== right.size) return false;
  for (const [id, lane] of left) {
    const other = right.get(id);
    if (!other || other.sourceT !== lane.sourceT || other.targetT !== lane.targetT || other.bend !== lane.bend)
      return false;
  }
  return true;
}

export function useLane(id: string): Lane {
  return useContext(LaneContext).get(id) ?? ZERO;
}
