# PixelBlastBackground / 像素爆炸背景

像素爆炸风格背景，基于 WebGL（Three.js + postprocessing），支持鼠标/触摸交互。  
Pixel blast-style background using WebGL (Three.js + postprocessing); supports mouse/touch interaction.

---

## 引入 / Import

```tsx
import { PixelBlastBackground } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| variant | `"square"` \| `"circle"` \| `"triangle"` \| `"diamond"` | No | — | 像素形状。Pixel shape. |
| pixelSize | number | No | — | 像素块大小。Pixel block size. |
| color | string | No | — | 主色（会结合主题）。Primary color (merged with theme). |
| className | string | No | — | 容器类名。Container class. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props（可选）。Optional props above.
- **Output**：渲染 WebGL Canvas 像素爆炸动画。Renders a WebGL pixel blast animation.

---

## 示例 / Example

```tsx
// 默认 / Default
<PixelBlastBackground />

// 指定形状与类名 / Shape and class
<PixelBlastBackground variant="circle" className="hero-bg" />

// 全屏背景 / Full-screen background
<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <PixelBlastBackground className="absolute inset-0" />
  <div className="relative z-10">...</div>
</div>
```

**注意 / Note**：依赖 `three`、`postprocessing`，使用方需安装。体积与性能开销较大。  
Requires `three` and `postprocessing`. Higher bundle size and GPU cost.
