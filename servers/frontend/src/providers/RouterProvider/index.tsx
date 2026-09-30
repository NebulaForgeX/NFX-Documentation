import type { ReactNode } from "react";

import { BrowserRouter } from "react-router";

import { useRouterEvents } from "./hooks/useRouterEvents";

export interface RouterProviderProps {
  children: ReactNode;
}

function RouterEventsHandler({ children }: { children: ReactNode }) {
  useRouterEvents();
  return <>{children}</>;
}

function routerBasename(): string | undefined {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") return undefined;
  return base.replace(/\/$/, "");
}

export function RouterProvider({ children }: RouterProviderProps) {
  return (
    <BrowserRouter basename={routerBasename()}>
      <RouterEventsHandler>{children}</RouterEventsHandler>
    </BrowserRouter>
  );
}

export default RouterProvider;
