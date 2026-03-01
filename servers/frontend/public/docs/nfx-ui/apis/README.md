# Apis 模块 / Apis Module

API 路径树工具：`path`、`PathNode`。**从 nfx-ui 主包导出**，业务项目用 `path` 构建自己的 URL_PATHS、API_ENDPOINTS。  
API path tree: `path`, `PathNode`. **Exported from nfx-ui**; consuming apps use `path` to build their own URL_PATHS and API_ENDPOINTS.

---

## 入口 / Entry

**从 nfx-ui 引用（业务项目）:**

```ts
import { path } from "nfx-ui";
import type { PathNode } from "nfx-ui";
```

**本仓库内:** `import { path } from "@/apis";`、`import type { PathNode } from "@/apis";`

## 引入示例 / Import example

```ts
import { path } from "nfx-ui";

const URL_PATHS = {
  USER: path("/user", {
    auth: path("/auth", { users: "/users", byId: (id: string) => `/${id}` }),
  }),
};
// 使用：URL_PATHS.USER.auth.byId("123") => "/user/auth/123"
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [ip.md](./ip.md) | path()、PathNode 与业务项目如何构建 URL_PATHS |
