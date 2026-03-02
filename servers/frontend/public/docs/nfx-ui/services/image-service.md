# imageService

Image compression and related helpers. Parameters and Input/Output below.

---

## Import

```ts
import { compressImage } from "nfx-ui/services";
```

---

## compressImage

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| file | File | Yes | — | Original image file. |

---

## Input / Output

- **Input:** file — browser File object.
- **Output:** Promise&lt;File&gt; — compressed File (e.g. for upload).

---

## Example

```ts
const compressed = await compressImage(originalFile);
```

See `src/services/imageService.ts` for options.

---

---

# imageService — 图片服务

图片压缩等处理。参数与 Input/Output 见下表。

---

## 引入

```ts
import { compressImage } from "nfx-ui/services";
```

---

## compressImage

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| file | File | 是 | — | 原始图片文件。 |

---

## 输入 / 输出

- **输入：** file — 浏览器 File 对象。
- **输出：** Promise&lt;File&gt; — 压缩后的新 File（如用于上传前减小体积）。

---

## 示例

```ts
const compressed = await compressImage(originalFile);
```

具体压缩参数见 `src/services/imageService.ts`。
