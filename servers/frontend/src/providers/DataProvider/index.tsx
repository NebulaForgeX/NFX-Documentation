import type { ReactNode } from "react";

export interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  return children;
}
