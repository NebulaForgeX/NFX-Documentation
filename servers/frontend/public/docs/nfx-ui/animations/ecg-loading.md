# ECGLoading

ECG-style loading animation for waiting on data or operations.

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
| className | string | No | — | Custom CSS class. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders an ECG SVG animation element.

---

## Size mapping

| size | Width×Height |
|------|----------------|
| small | 48×36 px |
| medium | 64×48 px |
| large | 96×72 px |

---

## Example

```tsx
<ECGLoading />

<ECGLoading size="small" />

<ECGLoading size="large" />

<ECGLoading className="my-loading" />
```

Styles use theme variables; use inside `ThemeProvider` for best effect.

---

---

# ECGLoading — 心电图加载

心电图风格的加载动画，适用于等待数据或操作完成。

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
| className | string | 否 | — | 自定义类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染一个心电图 SVG 动画元素。

---

## 尺寸对应

| size | 宽×高 |
|------|--------|
| small | 48×36 px |
| medium | 64×48 px |
| large | 96×72 px |

---

## 示例

```tsx
<ECGLoading />

<ECGLoading size="small" />

<ECGLoading size="large" />

<ECGLoading className="my-loading" />
```

样式使用主题变量，需在 `ThemeProvider` 内使用效果更佳。
