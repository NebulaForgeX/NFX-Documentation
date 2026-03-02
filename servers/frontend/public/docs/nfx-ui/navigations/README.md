# Navigations module

Router definition and matching. Exported from **`nfx-ui/navigations`**.

---

## Entry

**From nfx-ui/navigations (consuming app):**

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";
```

**In this repo:**

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "@/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "@/navigations";
```

## Import example

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";

const routeMap = defineRouter({ HOME: "/", USER: "/user/:id" });
const router = createRouter(routeMap);
router.ROUTES.HOME;                    // "/"
isActiveRoute("/", router.ROUTES.HOME);       // true
matchRoute("/user/123", router.ROUTES.USER);  // true
```

## Docs

| File | Description |
|------|-------------|
| [navigation.md](./navigation.md) | defineRouter, createRouter, isActiveRoute, matchRoute and types |

---

---

# Navigations 模块

路由定义与匹配工具：defineRouter、createRouter、isActiveRoute、matchRoute。从 **`nfx-ui/navigations`** 子路径导出。

---

## 入口

**从 nfx-ui/navigations 引用（业务项目）：**

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";
```

**本仓库内：**

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "@/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "@/navigations";
```

## 引入示例

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";

const routeMap = defineRouter({ HOME: "/", USER: "/user/:id" });
const router = createRouter(routeMap);
router.ROUTES.HOME;                    // "/"
isActiveRoute("/", router.ROUTES.HOME);       // true
matchRoute("/user/123", router.ROUTES.USER);  // true
```

## 文档

| 文件 | 说明 |
|------|------|
| [navigation.md](./navigation.md) | defineRouter、createRouter、isActiveRoute、matchRoute 与类型 |
