import { createContext, useContext } from "react";

export type Focus = {
  nodes: Set<string>;
  links: Set<string>;
  areas: Set<string>;
};

export type FocusState = {
  focus: Focus | null;
  pinned: string | null;
  hoverNode: (id: string | null) => void;
  hoverLink: (id: string | null) => void;
  focused: string | null;
  focusFrame: (id: string | null) => void;
};

export const FocusContext = createContext<FocusState>({
  focus: null,
  pinned: null,
  hoverNode: () => undefined,
  hoverLink: () => undefined,
  focused: null,
  focusFrame: () => undefined,
});

export const RelayoutContext = createContext<() => void>(() => undefined);

export type FocusLevel = "idle" | "hot" | "dim";
export type AreaLevel = FocusLevel | "area";

export function useNodeFocus(id: string): FocusLevel {
  const { focus } = useContext(FocusContext);
  if (!focus) return "idle";
  return focus.nodes.has(id) ? "hot" : "dim";
}

export function useAreaFocus(id: string): AreaLevel {
  const { focus, pinned } = useContext(FocusContext);
  if (pinned === id || focus?.areas.has(id)) return "area";
  if (!focus) return "idle";
  return focus.nodes.has(id) ? "hot" : "dim";
}

export function useLinkFocus(id: string): FocusLevel {
  const { focus } = useContext(FocusContext);
  if (!focus) return "idle";
  return focus.links.has(id) ? "hot" : "dim";
}
