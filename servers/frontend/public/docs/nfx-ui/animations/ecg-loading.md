# ECGLoading / 心电图加载

心电图风格的加载动画，适用于等待数据或操作完成。  
ECG-style loading animation for waiting on data or operations.

---

## 引入 / Import

```tsx
import { ECGLoading } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | 尺寸。Size of the loader. |
| className | string | No | — | 自定义类名。Custom CSS class. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props（可选）。Optional props above.
- **Output**：渲染一个心电图 SVG 动画元素。Renders an ECG SVG animation element.

---

## 尺寸对应 / Size mapping

| size | 宽×高 Width×Height |
|------|---------------------|
| small | 48×36 px |
| medium | 64×48 px |
| large | 96×72 px |

---

## 示例 / Example

```tsx
// 默认尺寸 / Default size
<ECGLoading />

// 小号，用于行内或紧凑布局 / Small, for inline or compact layout
<ECGLoading size="small" />

// 大号，用于整页加载 / Large, for full-page loading
<ECGLoading size="large" />

// 自定义类名 / Custom class
<ECGLoading className="my-loading" />
```

样式使用主题变量（如 `--color-primary`），需在 `ThemeProvider` 内使用效果更佳。  
Styles use theme variables; use inside `ThemeProvider` for best effect.
