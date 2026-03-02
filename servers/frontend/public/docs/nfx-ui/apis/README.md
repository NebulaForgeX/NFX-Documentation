# Apis module

API path tree: `path`, `PathNode`. Exported from **`nfx-ui/apis`**; consuming apps use `path` to build their own URL_PATHS and API_ENDPOINTS.

---

## Entry

**From nfx-ui/apis (consuming app):**

```ts
import { path } from "nfx-ui/apis";
import type { PathNode } from "nfx-ui/apis";
```

**In this repo:** `import { path } from "@/apis";`、`import type { PathNode } from "@/apis";`

## Import example

```ts
import { path } from "nfx-ui/apis";

const URL_PATHS = {
  USER: path("/user", {
    auth: path("/auth", { users: "/users", byId: (id: string) => `/${id}` }),
  }),
};
// Usage: URL_PATHS.USER.auth.byId("123") => "/user/auth/123"
```

## Docs

| File | Description |
|------|-------------|
| [ip.md](./ip.md) | path(), PathNode and how to build URL_PATHS in your app |

---

---

# Apis 模块

API 路径树工具：`path`、`PathNode`。从 **`nfx-ui/apis`** 子路径导出，业务项目用 `path` 构建自己的 URL_PATHS、API_ENDPOINTS。

---

## 入口

**从 nfx-ui/apis 引用（业务项目）：**

```ts
import { path } from "nfx-ui/apis";
import type { PathNode } from "nfx-ui/apis";
```

**本仓库内：** `import { path } from "@/apis";`、`import type { PathNode } from "@/apis";`

## 引入示例

```ts
import { path } from "nfx-ui/apis";

const URL_PATHS = {
  USER: path("/user", {
    auth: path("/auth", { users: "/users", byId: (id: string) => `/${id}` }),
  }),
};
// 使用：URL_PATHS.USER.auth.byId("123") => "/user/auth/123"
```

## 文档

| 文件 | 说明 |
|------|------|
| [ip.md](./ip.md) | path()、PathNode 与业务项目如何构建 URL_PATHS |
