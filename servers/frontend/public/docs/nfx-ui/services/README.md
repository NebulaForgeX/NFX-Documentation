# Services 模块 / Services Module

通用服务（如图片压缩）。**未从 nfx-ui 主包导出**，仅在本仓库内从 `@/services` 引用。参数与 Input/Output 见子文档。  
Shared services (e.g. image compress). **Not exported from nfx-ui**; use `@/services` in repo only. Parameters and Input/Output in sub-docs.

---

## 入口 / Entry

```ts
import { compressImage } from "@/services";
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [image-service.md](./image-service.md) | compressImage 图片压缩 |
