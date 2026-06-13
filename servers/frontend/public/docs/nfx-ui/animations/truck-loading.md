# TruckLoading

Truck-driving style loading animation for logistics or playful waiting states. SVG fills and strokes use theme CSS variables (`--color-primary`, `--color-fg-heading`, `--color-bg-*`, etc.).

---

## Import

```tsx
import { TruckLoading } from "nfx-ui/animations";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | Size of the loader. |
| className | string | No | — | Custom CSS class appended to the root element. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a truck SVG animation with rolling tires and road inside a sized wrapper `div`.

---

## Size mapping

| size | Width × Height | SVG scale |
|------|------------------|-----------|
| small | 150 × 75 px | 0.75 |
| medium | 200 × 100 px | 1 |
| large | 300 × 150 px | 1.5 |

---

## Example

```tsx
<TruckLoading />

<TruckLoading size="small" />

<TruckLoading size="large" className="my-truck" />
```

Use inside `ThemeProvider` for theme colors.

---

---

# TruckLoading — 卡车加载

卡车行驶风格的加载动画，适合物流、运输类场景或趣味等待提示。SVG 填充与描边使用主题 CSS 变量（`--color-primary`、`--color-fg-heading`、`--color-bg-*` 等）。

---

## 引入

```tsx
import { TruckLoading } from "nfx-ui/animations";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| size | `"small"` \| `"medium"` \| `"large"` | 否 | `"medium"` | 尺寸。 |
| className | string | 否 | — | 追加到根元素的自定义类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 在定宽容器 `div` 内渲染卡车 SVG、轮胎滚动与道路动画。

---

## 尺寸对应

| size | 宽 × 高 | SVG 缩放 |
|------|---------|----------|
| small | 150 × 75 px | 0.75 |
| medium | 200 × 100 px | 1 |
| large | 300 × 150 px | 1.5 |

---

## 示例

```tsx
<TruckLoading />

<TruckLoading size="small" />

<TruckLoading size="large" className="my-truck" />
```

建议在 `ThemeProvider` 内使用以应用主题色。
