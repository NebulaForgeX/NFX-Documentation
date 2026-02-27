# navigation / 路由定义与匹配

类型安全的路由定义与匹配。参数与 Input/Output 见下表。  
Type-safe router definition and matching. Parameters and Input/Output below.

---

## 引入 / Import

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "@/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "@/navigations";
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

详见 `src/navigations/navigation.ts`. See `src/navigations/navigation.ts` for full API.
