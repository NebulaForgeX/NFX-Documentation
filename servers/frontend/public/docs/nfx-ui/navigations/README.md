# Navigations 模块 / Navigations Module

路由定义与匹配工具。**未从 nfx-ui 主包导出**，仅在本仓库内从 `@/navigations` 引用。参数与 Input/Output 见子文档。  
Router definition and matching. **Not exported from nfx-ui**; use `@/navigations` in repo only. Parameters and Input/Output in sub-docs.

---

## 入口 / Entry

```ts
import { defineRouter, createRouter, isActiveRoute, matchRoute } from "@/navigations";
import type { DefinedRouter, RouteKey, RoutePath } from "@/navigations";
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [navigation.md](./navigation.md) | defineRouter、createRouter、isActiveRoute、matchRoute 与类型 |
