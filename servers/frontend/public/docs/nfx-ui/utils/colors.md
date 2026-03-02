# Color utils

Convert color to RGBA, interpolate, etc.

---

## Import

```ts
import { toRgbaWithAlpha, rgbToRgba, hexToRGBA, interpolateColor } from "nfx-ui/utils";
```

---

## Parameters and Input/Output

| Function | Parameters | Output |
|----------|------------|--------|
| toRgbaWithAlpha | (color: string, alpha: number) | string — rgba string. |
| rgbToRgba | (rgb: string, alpha: number) | string — rgba string. |
| hexToRGBA | (hex: string, alpha: number) | string — hex to RGBA. |
| interpolateColor | (start: string, end: string, factor: number) | string — interpolated color (factor 0–1). |

---

## Example

```ts
toRgbaWithAlpha("#ff0000", 0.5);
rgbToRgba("rgb(255,0,0)", 0.5);
hexToRGBA("#ff0000", 0.5);
interpolateColor("#000", "#fff", 0.5);
```

---

---

# 颜色工具

颜色转 RGBA、插值等。

---

## 引入

```ts
import { toRgbaWithAlpha, rgbToRgba, hexToRGBA, interpolateColor } from "nfx-ui/utils";
```

---

## 参数与 Input/Output

| 函数 | 参数 | 输出 |
|------|------|------|
| toRgbaWithAlpha | (color: string, alpha: number) | string — 带 alpha 的 rgba。 |
| rgbToRgba | (rgb: string, alpha: number) | string — rgba。 |
| hexToRGBA | (hex: string, alpha: number) | string — 十六进制转 RGBA。 |
| interpolateColor | (start: string, end: string, factor: number) | string — 两色插值，factor 0~1。 |

---

## 示例

```ts
toRgbaWithAlpha("#ff0000", 0.5);
rgbToRgba("rgb(255,0,0)", 0.5);
hexToRGBA("#ff0000", 0.5);
interpolateColor("#000", "#fff", 0.5);
```
