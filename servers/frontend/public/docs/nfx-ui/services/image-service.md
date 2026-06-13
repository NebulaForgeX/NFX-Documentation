# imageService

Image compression for upload (Web/canvas). Exports `compressImage` only.

---

## Import

```ts
import { compressImage } from "nfx-ui/services";
```

---

## compressImage

Compresses an image file for upload (e.g. avatar). Uses canvas resize + `toBlob`.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| file | File | Yes | — | Original image file from user input. |

**Internal behavior (not configurable via API):**

| Setting | Value |
|---------|-------|
| maxSize | 800 px (longest side) |
| output MIME | `image/png` |
| quality | 0.9 |
| output filename | `avatar_${Date.now()}.png` |

---

## Input / Output

- **Input:** file — browser File object.
- **Output:** Promise&lt;File&gt; — new compressed File; throws on load/compress failure.

---

## Example

```ts
const input = document.querySelector("input[type=file]");
const file = input.files?.[0];
if (file) {
  const compressed = await compressImage(file);
  // upload compressed via FormData
}
```

See `src/services/imageService.ts`.

---

---

# imageService — 图片服务

图片压缩（Web/canvas），用于上传前减小体积。仅导出 `compressImage`。

---

## 引入

```ts
import { compressImage } from "nfx-ui/services";
```

---

## compressImage

压缩用户选择的图片（如头像上传）。内部用 canvas 缩放 + `toBlob`。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| file | File | 是 | — | 用户选择的原始图片文件。 |

**内部固定参数（API 不可配置）：**

| 项 | 值 |
|----|-----|
| maxSize | 800 px（长边） |
| 输出 MIME | `image/png` |
| quality | 0.9 |
| 输出文件名 | `avatar_${Date.now()}.png` |

---

## 输入 / 输出

- **输入：** file — 浏览器 File 对象。
- **输出：** Promise&lt;File&gt; — 压缩后的新 File；加载/压缩失败时 throw。

---

## 示例

```ts
const input = document.querySelector("input[type=file]");
const file = input.files?.[0];
if (file) {
  const compressed = await compressImage(file);
  // 通过 FormData 上传 compressed
}
```

详见 `src/services/imageService.ts`。
