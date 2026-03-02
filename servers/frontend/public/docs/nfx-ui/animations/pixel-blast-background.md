# PixelBlastBackground

Pixel blast-style background using WebGL (Three.js + postprocessing); supports mouse/touch interaction.

---

## Import

```tsx
import { PixelBlastBackground } from "nfx-ui/animations";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| variant | `"square"` \| `"circle"` \| `"triangle"` \| `"diamond"` | No | — | Pixel shape. |
| pixelSize | number | No | — | Pixel block size. |
| color | string | No | — | Primary color (merged with theme). |
| className | string | No | — | Container class. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a WebGL pixel blast animation.

---

## Example

```tsx
<PixelBlastBackground />

<PixelBlastBackground variant="circle" className="hero-bg" />

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <PixelBlastBackground className="absolute inset-0" />
  <div className="relative z-10">...</div>
</div>
```

Requires `three` and `postprocessing`. Higher bundle size and GPU cost.

---

---

# PixelBlastBackground — 像素爆炸背景

像素爆炸风格背景，基于 WebGL（Three.js + postprocessing），支持鼠标/触摸交互。

---

## 引入

```tsx
import { PixelBlastBackground } from "nfx-ui/animations";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| variant | `"square"` \| `"circle"` \| `"triangle"` \| `"diamond"` | 否 | — | 像素形状。 |
| pixelSize | number | 否 | — | 像素块大小。 |
| color | string | 否 | — | 主色（会结合主题）。 |
| className | string | 否 | — | 容器类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染 WebGL Canvas 像素爆炸动画。

---

## 示例

```tsx
<PixelBlastBackground />

<PixelBlastBackground variant="circle" className="hero-bg" />

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <PixelBlastBackground className="absolute inset-0" />
  <div className="relative z-10">...</div>
</div>
```

**注意：** 依赖 `three`、`postprocessing`，使用方需安装。体积与性能开销较大。
