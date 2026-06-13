# ECGLoading

ECG-style loading animation for waiting on data or operations. Stroke colors use theme CSS variables (`--color-primary`, `--color-primary-alpha`).

---

## Import

```tsx
import { ECGLoading } from "nfx-ui/animations";
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
- **Output:** Renders an inline SVG ECG polyline animation inside a wrapper `div`.

---

## Size mapping

| size | Width × Height |
|------|----------------|
| small | 48 × 36 px |
| medium | 64 × 48 px |
| large | 96 × 72 px |

---

## Example

```tsx
<ECGLoading />

<ECGLoading size="small" />

<ECGLoading size="large" />

<ECGLoading className="my-loading" />
```

Use inside `ThemeProvider` for theme stroke colors.

---

---

# ECGLoading — 心电图加载

心电图风格的加载动画，适用于等待数据或操作完成。描边颜色使用主题 CSS 变量（`--color-primary`、`--color-primary-alpha`）。

---

## 引入

```tsx
import { ECGLoading } from "nfx-ui/animations";
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
- **输出：** 在包装 `div` 内渲染 SVG 心电图折线动画。

---

## 尺寸对应

| size | 宽 × 高 |
|------|---------|
| small | 48 × 36 px |
| medium | 64 × 48 px |
| large | 96 × 72 px |

---

## 示例

```tsx
<ECGLoading />

<ECGLoading size="small" />

<ECGLoading size="large" />

<ECGLoading className="my-loading" />
```

建议在 `ThemeProvider` 内使用以应用主题描边色。
