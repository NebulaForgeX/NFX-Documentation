# Services 模块 / Services Module

通用服务（如图片压缩）。从 **`nfx-ui/services`** 子路径导出；本仓库内也可从 `@/services` 引用。参数与 Input/Output 见子文档。  
Shared services (e.g. image compress). Exported from **`nfx-ui/services`**; in repo you can use `@/services`. Parameters and Input/Output in sub-docs.

---

## 入口 / Entry

**从 nfx-ui/services 引用（业务项目）/ From nfx-ui/services (consuming app):**

```ts
import { compressImage } from "nfx-ui/services";
```

**本仓库内 / In this repo:** `import { compressImage } from "@/services";`

## 引入示例 / Import example

```ts
import { compressImage } from "nfx-ui/services";

const file = event.target.files[0];
const compressedFile = await compressImage(file);
// 用于上传或预览；内部固定 maxSize=800、image/png、quality=0.9。Use for upload or preview; internal maxSize=800, image/png, quality=0.9.
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [image-service.md](./image-service.md) | compressImage 图片压缩 |
