# BounceLoading / 弹跳加载

弹跳方块或圆点加载动画，简洁通用。  
Bouncing square or circle loading animation, simple and generic.

---

## 引入 / Import

```tsx
import { BounceLoading } from "nfx-ui/animations";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | 尺寸（宽高一致）。Size (square). |
| shape | `"square"` \| `"circle"` | No | `"square"` | 形状。Shape of the loader. |
| className | string | No | — | 自定义类名。Custom CSS class. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props（可选）。Optional props above.
- **Output**：渲染一个弹跳动画元素。Renders a bouncing animation element.

---

## 尺寸对应 / Size mapping

| size | 边长 Side (px) |
|------|----------------|
| small | 32 |
| medium | 48 |
| large | 64 |

---

## 示例 / Example

```tsx
// 默认：中等尺寸方块 / Default: medium square
<BounceLoading />

// 圆形 / Circle
<BounceLoading shape="circle" />

// 小号圆形 / Small circle
<BounceLoading size="small" shape="circle" />

// 大号方块 / Large square
<BounceLoading size="large" />
```

建议在 `ThemeProvider` 内使用。 Use inside `ThemeProvider` for theme variables.
