# BounceLoading

Bouncing square or circle loading animation, simple and generic.

---

## Import

```tsx
import { BounceLoading } from "nfx-ui/animations";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | Size (square). |
| shape | `"square"` \| `"circle"` | No | `"square"` | Shape of the loader. |
| className | string | No | — | Custom CSS class. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a bouncing animation element.

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

Use inside `ThemeProvider` for theme variables.

---

---

# BounceLoading — 弹跳加载

弹跳方块或圆点加载动画，简洁通用。

---

## 引入

```tsx
import { BounceLoading } from "nfx-ui/animations";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| size | `"small"` \| `"medium"` \| `"large"` | 否 | `"medium"` | 尺寸（宽高一致）。 |
| shape | `"square"` \| `"circle"` | 否 | `"square"` | 形状。 |
| className | string | 否 | — | 自定义类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染一个弹跳动画元素。

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

建议在 `ThemeProvider` 内使用。
