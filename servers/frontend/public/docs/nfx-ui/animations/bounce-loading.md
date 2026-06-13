# BounceLoading

Bouncing square or circle loading animation. Fill and shadow use theme CSS variable `--color-primary`.

---

## Import

```tsx
import { BounceLoading } from "nfx-ui/animations";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | Width and height of the loader (square bounding box). |
| shape | `"square"` \| `"circle"` | No | `"square"` | Shape of the bouncing element. |
| className | string | No | — | Custom CSS class appended to the root element. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a bouncing `div` with pseudo-element shadow animation.

---

## Size mapping

| size | Side (px) |
|------|-----------|
| small | 32 |
| medium | 48 |
| large | 64 |

---

## Example

```tsx
<BounceLoading />

<BounceLoading shape="circle" />

<BounceLoading size="small" shape="circle" />

<BounceLoading size="large" />
```

Use inside `ThemeProvider` for theme primary color.

---

---

# BounceLoading — 弹跳加载

弹跳方块或圆点加载动画。填充与阴影使用主题 CSS 变量 `--color-primary`。

---

## 引入

```tsx
import { BounceLoading } from "nfx-ui/animations";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| size | `"small"` \| `"medium"` \| `"large"` | 否 | `"medium"` | 加载器宽高（正方形边界框）。 |
| shape | `"square"` \| `"circle"` | 否 | `"square"` | 弹跳元素形状。 |
| className | string | 否 | — | 追加到根元素的自定义类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染带伪元素阴影动画的弹跳 `div`。

---

## 尺寸对应

| size | 边长 (px) |
|------|-----------|
| small | 32 |
| medium | 48 |
| large | 64 |

---

## 示例

```tsx
<BounceLoading />

<BounceLoading shape="circle" />

<BounceLoading size="small" shape="circle" />

<BounceLoading size="large" />
```

建议在 `ThemeProvider` 内使用以应用主题主色。
