# PixelBlast — WebGL pixel background

WebGL pixel-blast background using Three.js and postprocessing. Exported as **default** from `nfx-ui/pixel-blast` (not from `nfx-ui/animations`).

**Peer dependencies (optional):** `three`, `postprocessing`.

---

## Import

```tsx
import PixelBlastBackground from "nfx-ui/pixel-blast";
```

---

## Parameters

`PixelBlastBackground` accepts all props below **except `color`** (color comes from the current theme primary). Props passed by the user override wrapper defaults.

| Parameter | Type | Required | Default (wrapper) | Description |
|-----------|------|----------|-------------------|-------------|
| variant | `"square"` \| `"circle"` \| `"triangle"` \| `"diamond"` | No | `"square"` | Pixel shape. |
| pixelSize | `number` | No | `6` | Pixel block size. |
| className | `string` | No | — | Container class. |
| style | `React.CSSProperties` | No | — | Inline styles. |
| antialias | `boolean` | No | `false` | WebGL antialiasing. |
| patternScale | `number` | No | `2` | Pattern scale. |
| patternDensity | `number` | No | `1` | Pattern density. |
| liquid | `boolean` | No | `false` | Liquid distortion effect. |
| liquidStrength | `number` | No | `0.12` | Liquid strength. |
| liquidRadius | `number` | No | `1.2` | Liquid radius. |
| pixelSizeJitter | `number` | No | `0` | Random pixel size variation. |
| enableRipples | `boolean` | No | `true` | Mouse/touch ripples. |
| rippleIntensityScale | `number` | No | `1.2` | Ripple intensity. |
| rippleThickness | `number` | No | `0.12` | Ripple thickness. |
| rippleSpeed | `number` | No | `0.3` | Ripple animation speed. |
| liquidWobbleSpeed | `number` | No | `5` | Liquid wobble speed. |
| autoPauseOffscreen | `boolean` | No | `true` | Pause when off-screen. |
| speed | `number` | No | `0.3` | Animation speed. |
| transparent | `boolean` | No | `true` | Transparent background. |
| edgeFade | `number` | No | `0.25` | Edge fade amount. |
| noiseAmount | `number` | No | `0` | Noise overlay. |

---

## Input / Output

- **Input:** Props above (all optional); must be used inside `ThemeProvider` for theme-derived color.
- **Output:** Renders a full-size WebGL canvas with pixel blast animation.

---

## Example

```tsx
import { ThemeProvider } from "nfx-ui/themes";
import PixelBlastBackground from "nfx-ui/pixel-blast";

export function DashboardBackground() {
  return (
    <ThemeProvider>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <PixelBlastBackground className="absolute inset-0" enableRipples />
        <main>Content</main>
      </div>
    </ThemeProvider>
  );
}
```

---

---

# PixelBlast — WebGL 像素背景

基于 Three.js 与 postprocessing 的 WebGL 像素爆炸背景。**默认导出**自 `nfx-ui/pixel-blast`（**不在** `nfx-ui/animations`）。

**Peer 依赖（可选）：** `three`、`postprocessing`。

---

## 引入

```tsx
import PixelBlastBackground from "nfx-ui/pixel-blast";
```

---

## 参数

`PixelBlastBackground` 接受下表全部 props（**不含 `color`**，颜色来自当前主题 primary）。传入的 props 会覆盖包装器默认值。

| 参数 | 类型 | 必填 | 默认（包装器） | 说明 |
|------|------|------|----------------|------|
| variant | `"square"` \| `"circle"` \| `"triangle"` \| `"diamond"` | 否 | `"square"` | 像素形状。 |
| pixelSize | `number` | 否 | `6` | 像素块大小。 |
| className | `string` | 否 | — | 容器 class。 |
| style | `React.CSSProperties` | 否 | — | 内联样式。 |
| antialias | `boolean` | 否 | `false` | WebGL 抗锯齿。 |
| patternScale | `number` | 否 | `2` | 图案缩放。 |
| patternDensity | `number` | 否 | `1` | 图案密度。 |
| liquid | `boolean` | 否 | `false` | 液体扭曲效果。 |
| liquidStrength | `number` | 否 | `0.12` | 液体强度。 |
| liquidRadius | `number` | 否 | `1.2` | 液体半径。 |
| pixelSizeJitter | `number` | 否 | `0` | 像素大小随机抖动。 |
| enableRipples | `boolean` | 否 | `true` | 鼠标/触摸涟漪。 |
| rippleIntensityScale | `number` | 否 | `1.2` | 涟漪强度。 |
| rippleThickness | `number` | 否 | `0.12` | 涟漪厚度。 |
| rippleSpeed | `number` | 否 | `0.3` | 涟漪动画速度。 |
| liquidWobbleSpeed | `number` | 否 | `5` | 液体摆动速度。 |
| autoPauseOffscreen | `boolean` | 否 | `true` | 离屏时暂停。 |
| speed | `number` | 否 | `0.3` | 动画速度。 |
| transparent | `boolean` | 否 | `true` | 透明背景。 |
| edgeFade | `number` | 否 | `0.25` | 边缘淡出。 |
| noiseAmount | `number` | 否 | `0` | 噪点叠加。 |

---

## 输入 / 输出

- **输入：** 上表 props（均可选）；需在 `ThemeProvider` 内使用以获取主题色。
- **输出：** 渲染全尺寸 WebGL 画布像素爆炸动画。

---

## 示例

```tsx
import { ThemeProvider } from "nfx-ui/themes";
import PixelBlastBackground from "nfx-ui/pixel-blast";

export function DashboardBackground() {
  return (
    <ThemeProvider>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <PixelBlastBackground className="absolute inset-0" enableRipples />
        <main>内容</main>
      </div>
    </ThemeProvider>
  );
}
```
