# navigation / 路由定义与匹配

类型安全的路由定义与匹配。参数与 Input/Output 见下表。  
Type-safe router definition and matching. Parameters and Input/Output below.

---

## 引入 / Import

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";
```

---

## 函数与类型 / Functions and types

| 名称 Name | 类型/签名 Type/Signature | 说明 Description |
|-----------|--------------------------|------------------|
| defineRouter | (routes: R) => DefinedRouter&lt;R&gt; | 定义路由对象。Define route object. |
| createRouter | (routes: DefinedRouter) => … | 根据已定义路由创建 router。Create router from defined routes. |
| isActiveRoute | (currentPath, targetPath) => boolean | 判断当前路径是否与目标匹配（高亮用）。Whether current path matches target. |
| matchRoute | (pathname, route) => boolean | 路径与路由模式匹配。Match pathname to route pattern. |
| DefinedRouter&lt;R&gt; | type | 定义好的路由对象类型。Defined route object type. |
| RouteKey&lt;R&gt; | type | 路由键联合类型。Route key union. |
| RoutePath&lt;R&gt; | type | 路由路径值类型。Route path value type. |

---

## 输入 Input / 输出 Output

- **defineRouter(routes)** — Input: 键为路由名、值为路径的对象。Output: 类型化路由对象。  
  Input: object of route name → path. Output: typed route object.
- **isActiveRoute(currentPath, targetPath)** — Input: 两个路径字符串。Output: boolean.  
  Input: two path strings. Output: boolean.
- **matchRoute(pathname, route)** — Input: pathname、route 模式。Output: boolean.  
  Input: pathname, route pattern. Output: boolean.

---

## 示例 / Example

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "nfx-ui/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "nfx-ui/navigations";

// 1. 定义路由表（仅 defineRouter 返回值可传入 createRouter）
const routeMap = defineRouter({
  HOME: "/",
  LOGIN: "/login",
  USER: "/user/:id",
  SETTINGS: "/user/:id/settings",
});

// 2. 创建 router，得到 ROUTES 与 typed 方法
const router = createRouter(routeMap);

router.ROUTES.HOME;        // "/"
router.ROUTES.USER;        // "/user/:id"
router.getRouteByKey("LOGIN"); // "/login"

// 3. 精确匹配：当前路径是否等于目标（用于高亮）
const pathname = "/login";
isActiveRoute(pathname, router.ROUTES.LOGIN);   // true
isActiveRoute(pathname, router.ROUTES.HOME);    // false

// 4. 模式匹配：pathname 是否匹配带 :param 的路由
matchRoute("/user/123", router.ROUTES.USER);           // true
matchRoute("/user/123/settings", router.ROUTES.SETTINGS); // true
matchRoute("/user/123/other", router.ROUTES.USER);      // false

// 类型：RouteKey<typeof routeMap> => "HOME" | "LOGIN" | "USER" | "SETTINGS"
// 类型：RoutePath<typeof routeMap> => "/" | "/login" | "/user/:id" | "/user/:id/settings"
type Keys = RouteKey<typeof routeMap>;
type Paths = RoutePath<typeof routeMap>;
```

详见 `src/navigations/navigation.ts`. See `src/navigations/navigation.ts` for full API.
