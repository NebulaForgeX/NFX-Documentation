# 颜色工具 / Color utils

颜色转 RGBA、插值等。  
Convert color to RGBA, interpolate, etc.

---

## 引入 / Import

```ts
import { toRgbaWithAlpha, rgbToRgba, hexToRGBA, interpolateColor } from "nfx-ui/utils";
```

---

## 参数与 Input/Output

| 函数 Function | 参数 Parameters | 输出 Output |
|---------------|-----------------|-------------|
| toRgbaWithAlpha | (color: string, alpha: number) | string — 带 alpha 的 rgba。rgba string. |
| rgbToRgba | (rgb: string, alpha: number) | string — rgba。rgba string. |
| hexToRGBA | (hex: string, alpha: number) | string — 十六进制转 RGBA。hex to RGBA. |
| interpolateColor | (start: string, end: string, factor: number) | string — 两色插值，factor 0~1。Interpolated color (factor 0–1). |

---

## 示例 / Example

```ts
toRgbaWithAlpha("#ff0000", 0.5);      // => "rgba(255,0,0,0.5)"
rgbToRgba("rgb(255,0,0)", 0.5);       // => "rgba(255,0,0,0.5)"
hexToRGBA("#ff0000", 0.5);            // => "rgba(255,0,0,0.5)"
interpolateColor("#000", "#fff", 0.5); // => 中间灰色 / middle gray
```
