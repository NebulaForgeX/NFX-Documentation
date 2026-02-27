# Apis 模块 / Apis Module

API 路径、端点与 URL 工具。**未从 nfx-ui 主包导出**，仅在本仓库内从 `@/apis` 引用。参数与 Input/Output 见子文档。  
API paths, endpoints and URL helpers. **Not exported from nfx-ui**; use `@/apis` in repo only. Parameters and Input/Output in sub-docs.

---

## 入口 / Entry

```ts
import { URL_PATHS, API_ENDPOINTS, getAnalyticsLocaleJsonUrl } from "@/apis";
import type { URL_PATHS_TYPE, API_ENDPOINTS_TYPE } from "@/apis";
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [ip.md](./ip.md) | URL_PATHS、API_ENDPOINTS、getAnalyticsLocaleJsonUrl |
