# ip（路径树 path / PathNode）/ Path tree

通用 API 路径树：`path(base, children)` 与类型 `PathNode<T>`。业务项目用其构建自己的 URL_PATHS、API_ENDPOINTS。  
Generic API path tree: `path(base, children)` and type `PathNode<T>`. Consuming apps use them to build URL_PATHS and API_ENDPOINTS.

---

## 引入 / Import

```ts
import { path } from "nfx-ui/apis";
import type { PathNode } from "nfx-ui/apis";
```

---

## 导出 / Exports

| 名称 Name | 类型 Type | 说明 Description |
|-----------|-----------|------------------|
| path | (base, children) => PathNode&lt;T&gt; | 构建嵌套路径树，支持字符串叶节点与 (id) => path 动态段。Build nested path tree; supports string leaves and dynamic segments. |
| PathNode&lt;T&gt; | type | 路径树节点类型；子键为 string 或 (args) => string。Path tree node type. |

---

## path 参数 / path parameters

| 参数 Parameter | 类型 Type | 必填 Required | 说明 Description |
|----------------|-----------|---------------|------------------|
| base | string | Yes | 当前节点路径前缀。Path prefix for this node. |
| children | Record&lt;string, string \| PathNode \| ((...args) => string)&gt; | Yes | 子节点：键为路径名，值为字符串、嵌套 path() 返回值、或 (id) => \`/\${id}\` 等动态函数。Children: key = path name, value = string, nested path(), or dynamic fn. |

---

## 用法示例 / Usage example

业务项目在自有 `apis/ip.ts` 中定义 base URL 与 path 树，例如：  
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

请求时拼接：`${API_ENDPOINTS.PURE}${URL_PATHS.CATALOG.products.byId("123")}` → `/catalog/products/123`。  
When requesting: `${API_ENDPOINTS.PURE}${URL_PATHS.CATALOG.products.byId("123")}` → `/catalog/products/123`.

---

## 输入 Input / 输出 Output

- **path(base, children)**  
  - **Input**：base — 基础路径字符串；children — 子节点对象（键 → 字符串或嵌套 path() 或 (arg) => string）。  
  - **Output**：PathNode&lt;T&gt;，可继续链式访问或调用动态段。  
详见 `src/apis/ip.ts`。See `src/apis/ip.ts` for implementation.
