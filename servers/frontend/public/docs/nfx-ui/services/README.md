# Services module

Shared services (e.g. image compress). Exported from **`nfx-ui/services`**; in repo you can use `@/services`. Parameters and Input/Output in sub-docs.

---

## Entry

**From nfx-ui/services (consuming app):**

```ts
import { compressImage } from "nfx-ui/services";
```

**In this repo:** `import { compressImage } from "@/services";`

## Import example

```ts
import { compressImage } from "nfx-ui/services";

const file = event.target.files[0];
const compressedFile = await compressImage(file);
// Use for upload or preview; internal maxSize=800, image/png, quality=0.9.
```

## Docs

| File | Description |
|------|-------------|
| [image-service.md](./image-service.md) | compressImage |

---

---

# Services 模块

通用服务（如图片压缩）。从 **`nfx-ui/services`** 子路径导出；本仓库内也可从 `@/services` 引用。参数与 Input/Output 见子文档。

---

## 入口

**从 nfx-ui/services 引用（业务项目）：**

```ts
import { compressImage } from "nfx-ui/services";
```

**本仓库内：** `import { compressImage } from "@/services";`

## 引入示例

```ts
import { compressImage } from "nfx-ui/services";

const file = event.target.files[0];
const compressedFile = await compressImage(file);
// 用于上传或预览；内部固定 maxSize=800、image/png、quality=0.9。
```

## 文档

| 文件 | 说明 |
|------|------|
| [image-service.md](./image-service.md) | compressImage 图片压缩 |
