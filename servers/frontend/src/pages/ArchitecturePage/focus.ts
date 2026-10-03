import { createContext, useContext } from "react";

export type Focus = {
  nodes: Set<string>;
  links: Set<string>;
};

export type FocusState = {
  focus: Focus | null;
  pinned: string | null;
  hoverNode: (id: string | null) => void;
  hoverLink: (id: string | null) => void;
};

export const FocusContext = createContext<FocusState>({
  focus: null,
  pinned: null,
  hoverNode: () => undefined,
  hoverLink: () => undefined,
});

export type FocusLevel = "idle" | "hot" | "dim";

export function useNodeFocus(id: string): FocusLevel {
  const { focus } = useContext(FocusContext);
  if (!focus) return "idle";
  return focus.nodes.has(id) ? "hot" : "dim";
}

export function useLinkFocus(id: string): FocusLevel {
  const { focus } = useContext(FocusContext);
  if (!focus) return "idle";
  return focus.links.has(id) ? "hot" : "dim";
}
