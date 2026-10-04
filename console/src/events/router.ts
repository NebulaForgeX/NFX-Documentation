import type { EventNamesOf } from "nfx-ui/events";
import { defineEvents, EventEmitter } from "nfx-ui/events";
import { singleton } from "nfx-ui/utils";

export const routerEvents = defineEvents({
  NAVIGATE: "ROUTER:NAVIGATE",
  NAVIGATE_REPLACE: "ROUTER:NAVIGATE_REPLACE",
  NAVIGATE_BACK: "ROUTER:NAVIGATE_BACK",
  NAVIGATE_TO_HOME: "ROUTER:NAVIGATE_TO_HOME",
});

type RouterEvent = EventNamesOf<typeof routerEvents>;

interface NavigatePayload {
  to: string;
  replace?: boolean;
  state?: unknown;
}

class RouterEventEmitter extends EventEmitter<RouterEvent> {
  constructor() {
    super(routerEvents);
  }

  navigate(payload: NavigatePayload) {
    this.emit(routerEvents.NAVIGATE, payload);
  }

  navigateReplace(to: string, state?: unknown) {
    this.emit(routerEvents.NAVIGATE_REPLACE, { to, state });
  }

  navigateBack() {
    this.emit(routerEvents.NAVIGATE_BACK);
  }

  navigateToHome() {
    this.emit(routerEvents.NAVIGATE_TO_HOME);
  }
}

export const routerEventEmitter = new (singleton(RouterEventEmitter))();
