# Path tree (path / PathNode)

Generic API path tree: `path(base, children)` and type `PathNode<T>`. Consuming apps use them to build URL_PATHS and API_ENDPOINTS.

---

## Import

```ts
import { path } from "nfx-ui/apis";
import type { PathNode } from "nfx-ui/apis";
```

---

## Exports

| Name | Type | Description |
|------|------|-------------|
| path | (base, children) => PathNode&lt;T&gt; | Build nested path tree; supports string leaves and dynamic segments. |
| PathNode&lt;T&gt; | type | Path tree node type; child keys are string or (args) => string. |

---

## path parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| base | string | Yes | Path prefix for this node. |
| children | Record&lt;string, string \| PathNode \| ((...args) => string)&gt; | Yes | Children: key = path name, value = string, nested path(), or dynamic fn. |

---

## Usage example

In your app's `apis/ip.ts`, define base URLs and the path tree:

```ts
import { path } from "nfx-ui/apis";

const HTTP_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10021";

export const URL_PATHS = {
  USER: path("/user", {
    auth: path("/auth", {
      users: path("/users", { byId: (id: string) => `/${id}` }),
    }),
  }),
  CATALOG: path("/catalog", {
    products: path("/products", { byId: (id: string) => `/${id}` }),
  }),
} as const;

export const API_ENDPOINTS = { PURE: HTTP_BASE_URL } as const;
```

When requesting: `${API_ENDPOINTS.PURE}${URL_PATHS.CATALOG.products.byId("123")}` → full URL with path `/catalog/products/123`.

---

## Input / Output

- **path(base, children)**  
  - **Input:** base — path string; children — object (key → string or nested path() or (arg) => string).  
  - **Output:** PathNode&lt;T&gt;, chainable or call dynamic segments.  
See `src/apis/ip.ts` for implementation.

---

---

# 路径树（path / PathNode）

通用 API 路径树：`path(base, children)` 与类型 `PathNode<T>`。业务项目用其构建自己的 URL_PATHS、API_ENDPOINTS。

---

## 引入

```ts
import { path } from "nfx-ui/apis";
import type { PathNode } from "nfx-ui/apis";
```

---

## 导出

| 名称 | 类型 | 说明 |
|------|------|------|
| path | (base, children) => PathNode&lt;T&gt; | 构建嵌套路径树，支持字符串叶节点与 (id) => path 动态段。 |
| PathNode&lt;T&gt; | type | 路径树节点类型；子键为 string 或 (args) => string。 |

---

## path 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| base | string | 是 | 当前节点路径前缀。 |
| children | Record&lt;string, string \| PathNode \| ((...args) => string)&gt; | 是 | 子节点：键为路径名，值为字符串、嵌套 path() 返回值、或 (id) => `/${id}` 等动态函数。 |

---

## 用法示例

业务项目在自有 `apis/ip.ts` 中定义 base URL 与 path 树，例如：

```ts
import { path } from "nfx-ui/apis";

const HTTP_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10021";

export const URL_PATHS = {
  USER: path("/user", {
    auth: path("/auth", {
      users: path("/users", { byId: (id: string) => `/${id}` }),
    }),
  }),
  CATALOG: path("/catalog", {
    products: path("/products", { byId: (id: string) => `/${id}` }),
  }),
} as const;

export const API_ENDPOINTS = { PURE: HTTP_BASE_URL } as const;
```

请求时拼接：`${API_ENDPOINTS.PURE}${URL_PATHS.CATALOG.products.byId("123")}` → `/catalog/products/123`。

---

## 输入 / 输出

- **path(base, children)**  
  - **输入：** base — 基础路径字符串；children — 子节点对象（键 → 字符串或嵌套 path() 或 (arg) => string）。  
  - **输出：** PathNode&lt;T&gt;，可继续链式访问或调用动态段。  
详见 `src/apis/ip.ts`。
