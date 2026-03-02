# navigation — Router definition and matching

Type-safe router definition and matching. Parameters and Input/Output below.

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
| defineRouter | (routes: R) => DefinedRouter&lt;R&gt; | Define route object. |
| createRouter | (routes: DefinedRouter) => … | Create router from defined routes. |
| isActiveRoute | (currentPath, targetPath) => boolean | Whether current path matches target (for highlight). |
| matchRoute | (pathname, route) => boolean | Match pathname to route pattern. |
| DefinedRouter&lt;R&gt; | type | Defined route object type. |
| RouteKey&lt;R&gt; | type | Route key union. |
| RoutePath&lt;R&gt; | type | Route path value type. |

---

## Input / Output

- **defineRouter(routes)** — Input: object of route name → path. Output: typed route object.
- **isActiveRoute(currentPath, targetPath)** — Input: two path strings. Output: boolean.
- **matchRoute(pathname, route)** — Input: pathname, route pattern. Output: boolean.

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

router.ROUTES.HOME;
router.ROUTES.USER;
router.getRouteByKey("LOGIN");

const pathname = "/login";
isActiveRoute(pathname, router.ROUTES.LOGIN);
isActiveRoute(pathname, router.ROUTES.HOME);

matchRoute("/user/123", router.ROUTES.USER);
matchRoute("/user/123/settings", router.ROUTES.SETTINGS);
matchRoute("/user/123/other", router.ROUTES.USER);

type Keys = RouteKey<typeof routeMap>;
type Paths = RoutePath<typeof routeMap>;
```

See `src/navigations/navigation.ts` for full API.

---

---

# navigation — 路由定义与匹配

类型安全的路由定义与匹配。参数与 Input/Output 见下表。

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
| defineRouter | (routes: R) => DefinedRouter&lt;R&gt; | 定义路由对象。 |
| createRouter | (routes: DefinedRouter) => … | 根据已定义路由创建 router。 |
| isActiveRoute | (currentPath, targetPath) => boolean | 判断当前路径是否与目标匹配（高亮用）。 |
| matchRoute | (pathname, route) => boolean | 路径与路由模式匹配。 |
| DefinedRouter&lt;R&gt; | type | 定义好的路由对象类型。 |
| RouteKey&lt;R&gt; | type | 路由键联合类型。 |
| RoutePath&lt;R&gt; | type | 路由路径值类型。 |

---

## 输入 / 输出

- **defineRouter(routes)** — 输入：键为路由名、值为路径的对象。输出：类型化路由对象。
- **isActiveRoute(currentPath, targetPath)** — 输入：两个路径字符串。输出：boolean。
- **matchRoute(pathname, route)** — 输入：pathname、route 模式。输出：boolean。

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

router.ROUTES.HOME;
router.ROUTES.USER;
router.getRouteByKey("LOGIN");

const pathname = "/login";
isActiveRoute(pathname, router.ROUTES.LOGIN);
isActiveRoute(pathname, router.ROUTES.HOME);

matchRoute("/user/123", router.ROUTES.USER);
matchRoute("/user/123/settings", router.ROUTES.SETTINGS);
matchRoute("/user/123/other", router.ROUTES.USER);

type Keys = RouteKey<typeof routeMap>;
type Paths = RoutePath<typeof routeMap>;
```

详见 `src/navigations/navigation.ts`。
