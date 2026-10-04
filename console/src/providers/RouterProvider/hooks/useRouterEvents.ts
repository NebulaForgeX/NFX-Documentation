import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

import { routerEventEmitter, routerEvents } from "@/events/router";
import { ROUTES } from "@/navigations";

export function useRouterEvents() {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (payload: { to: string; replace?: boolean; state?: unknown }) => {
      if (payload.replace) {
        navigate(payload.to, { replace: true, state: payload.state });
      } else {
        navigate(payload.to, { state: payload.state });
      }
    },
    [navigate],
  );

  const handleNavigateReplace = useCallback(
    (payload: { to: string; state?: unknown }) => {
      navigate(payload.to, { replace: true, state: payload.state });
    },
    [navigate],
  );

  const handleNavigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleNavigateToHome = useCallback(() => {
    navigate(ROUTES.HOME, { replace: true });
  }, [navigate]);

  useEffect(() => {
    routerEventEmitter.on(routerEvents.NAVIGATE, handleNavigate as (...args: unknown[]) => void);
    routerEventEmitter.on(routerEvents.NAVIGATE_REPLACE, handleNavigateReplace as (...args: unknown[]) => void);
    routerEventEmitter.on(routerEvents.NAVIGATE_BACK, handleNavigateBack);
    routerEventEmitter.on(routerEvents.NAVIGATE_TO_HOME, handleNavigateToHome);

    return () => {
      routerEventEmitter.off(routerEvents.NAVIGATE, handleNavigate as (...args: unknown[]) => void);
      routerEventEmitter.off(routerEvents.NAVIGATE_REPLACE, handleNavigateReplace as (...args: unknown[]) => void);
      routerEventEmitter.off(routerEvents.NAVIGATE_BACK, handleNavigateBack);
      routerEventEmitter.off(routerEvents.NAVIGATE_TO_HOME, handleNavigateToHome);
    };
  }, [handleNavigate, handleNavigateReplace, handleNavigateBack, handleNavigateToHome]);
}
