# Navigations 模块 / Navigations Module

路由定义与匹配工具：defineRouter、createRouter、isActiveRoute、matchRoute。**从 nfx-ui 主包导出**。  
Router definition and matching. **Exported from nfx-ui.**

---

## 入口 / Entry

**从 nfx-ui 引用（业务项目）/ From nfx-ui (consuming app):**

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui";
```

**本仓库内 / In this repo:**

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "@/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "@/navigations";
```

## 引入示例 / Import example

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui";

const routeMap = defineRouter({ HOME: "/", USER: "/user/:id" });
const router = createRouter(routeMap);
router.ROUTES.HOME;              // "/"
isActiveRoute("/", router.ROUTES.HOME);   // true
matchRoute("/user/123", router.ROUTES.USER); // true
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [navigation.md](./navigation.md) | defineRouter、createRouter、isActiveRoute、matchRoute 与类型 |
