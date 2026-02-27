# imageService / 图片服务

图片压缩等处理。参数与 Input/Output 见下表。  
Image compression and related helpers. Parameters and Input/Output below.

---

## 引入 / Import

```ts
import { compressImage } from "@/services";
```

---

## compressImage

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| file | File | Yes | — | 原始图片文件。Original image file. |

---

## 输入 Input / 输出 Output

- **Input**：file — 浏览器 File 对象。Browser File object.
- **Output**：Promise&lt;File&gt; — 压缩后的新 File（如用于上传前减小体积）。Compressed File (e.g. for upload).

---

## 示例 / Example

```ts
const compressed = await compressImage(originalFile);
// 使用 compressed 上传 / Use compressed for upload
```

具体压缩参数见 `src/services/imageService.ts`. See `src/services/imageService.ts` for options.
