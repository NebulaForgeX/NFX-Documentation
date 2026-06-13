# navigation — Router definition and matching

Type-safe router definition and matching. Only values from `defineRouter(...)` may be passed to `createRouter(...)`. Parameters and Input/Output below.

---

## Import

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";
```

---

## Functions and types

| Name | Type/Signature | Description |
|------|----------------|-------------|
| defineRouter | (routes: R) => DefinedRouter&lt;R&gt; | Define route map; only return value accepted by createRouter. |
| createRouter | (routes: DefinedRouter&lt;R&gt;) => { ROUTES, matchRoute, isActiveRoute, getRouteByKey } | Create router from defined routes. |
| isActiveRoute | (currentPath: string, targetPath: string) => boolean | Exact match: current path equals target (for highlight). |
| matchRoute | (pathname: string, route: string) => boolean | Pattern match: pathname matches route pattern (supports `:param`). |
| DefinedRouter&lt;R&gt; | type | Defined route object type (branded). |
| RouteKey&lt;R&gt; | type | Route key union. |
| RoutePath&lt;R&gt; | type | Route path value union. |

---

## createRouter return value

| Property | Description |
|----------|-------------|
| ROUTES | Readonly route map (same keys as defineRouter input). |
| matchRoute | Bound `(pathname, route) => boolean` with typed route paths. |
| isActiveRoute | Bound `(currentPath, targetPath) => boolean` with typed paths. |
| getRouteByKey | `(key: keyof R) => R[keyof R]` — lookup path by key. |

---

## Input / Output

- **defineRouter(routes)** — Input: object of route name → path (may include `:param`). Output: DefinedRouter&lt;R&gt;.
- **createRouter(routes)** — Input: DefinedRouter only. Output: router object with ROUTES and helpers.
- **isActiveRoute(currentPath, targetPath)** — Input: two path strings. Output: boolean (exact equality).
- **matchRoute(pathname, route)** — Input: pathname, route pattern with optional `:param` segments. Output: boolean.

---

## Example

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";

const routeMap = defineRouter({
  HOME: "/",
  LOGIN: "/login",
  USER: "/user/:id",
  SETTINGS: "/user/:id/settings",
});

const router = createRouter(routeMap);

router.ROUTES.HOME; // "/"
router.ROUTES.USER; // "/user/:id"
router.getRouteByKey("LOGIN"); // "/login"

isActiveRoute("/login", router.ROUTES.LOGIN); // true
isActiveRoute("/login", router.ROUTES.HOME); // false

matchRoute("/user/123", router.ROUTES.USER); // true
matchRoute("/user/123/settings", router.ROUTES.SETTINGS); // true
matchRoute("/user/123/other", router.ROUTES.USER); // false

type Keys = RouteKey<typeof routeMap>;
type Paths = RoutePath<typeof routeMap>;
```

See `src/navigations/navigation.ts` for full API.

---

---

# navigation — 路由定义与匹配

类型安全的路由定义与匹配。仅 `defineRouter(...)` 的返回值可传入 `createRouter(...)`。参数与 Input/Output 见下表。

---

## 引入

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";
```

---

## 函数与类型

| 名称 | 类型/签名 | 说明 |
|------|-----------|------|
| defineRouter | (routes: R) => DefinedRouter&lt;R&gt; | 定义路由表；仅返回值可传入 createRouter。 |
| createRouter | (routes: DefinedRouter&lt;R&gt;) => { ROUTES, matchRoute, isActiveRoute, getRouteByKey } | 根据已定义路由创建 router。 |
| isActiveRoute | (currentPath: string, targetPath: string) => boolean | 精确匹配：当前路径等于目标（高亮用）。 |
| matchRoute | (pathname: string, route: string) => boolean | 模式匹配：pathname 匹配带 `:param` 的路由。 |
| DefinedRouter&lt;R&gt; | type | 定义好的路由对象类型（品牌类型）。 |
| RouteKey&lt;R&gt; | type | 路由键联合类型。 |
| RoutePath&lt;R&gt; | type | 路由路径值联合类型。 |

---

## createRouter 返回值

| 属性 | 说明 |
|------|------|
| ROUTES | 只读路由表（与 defineRouter 输入键一致）。 |
| matchRoute | 绑定后的 `(pathname, route) => boolean`，route 为类型化路径。 |
| isActiveRoute | 绑定后的 `(currentPath, targetPath) => boolean`。 |
| getRouteByKey | `(key: keyof R) => R[keyof R]` — 按 key 取 path。 |

---

## 输入 / 输出

- **defineRouter(routes)** — 输入：路由名 → path（可含 `:param`）。输出：DefinedRouter&lt;R&gt;。
- **createRouter(routes)** — 输入：仅 DefinedRouter。输出：含 ROUTES 与辅助方法的 router 对象。
- **isActiveRoute(currentPath, targetPath)** — 输入：两个路径字符串。输出：boolean（严格相等）。
- **matchRoute(pathname, route)** — 输入：pathname、含可选 `:param` 段的路由模式。输出：boolean。

---

## 示例

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";

const routeMap = defineRouter({
  HOME: "/",
  LOGIN: "/login",
  USER: "/user/:id",
  SETTINGS: "/user/:id/settings",
});

const router = createRouter(routeMap);

router.ROUTES.HOME; // "/"
router.ROUTES.USER; // "/user/:id"
router.getRouteByKey("LOGIN"); // "/login"

isActiveRoute("/login", router.ROUTES.LOGIN); // true
isActiveRoute("/login", router.ROUTES.HOME); // false

matchRoute("/user/123", router.ROUTES.USER); // true
matchRoute("/user/123/settings", router.ROUTES.SETTINGS); // true
matchRoute("/user/123/other", router.ROUTES.USER); // false

type Keys = RouteKey<typeof routeMap>;
type Paths = RoutePath<typeof routeMap>;
```

详见 `src/navigations/navigation.ts`。
