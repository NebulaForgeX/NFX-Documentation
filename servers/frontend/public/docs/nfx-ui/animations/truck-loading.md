# TruckLoading / 卡车加载

卡车行驶风格的加载动画，适合物流、运输类场景或趣味等待提示。  
Truck-driving style loading animation for logistics or playful waiting states.

---

## 引入 / Import

```tsx
import { TruckLoading } from "nfx-ui/animations";
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
- **Output**：渲染一个卡车动画元素。Renders a truck animation element.

---

## 尺寸对应 / Size mapping

| size | 宽×高 Width×Height |
|------|---------------------|
| small | 150×75 px |
| medium | 200×100 px |
| large | 300×150 px |

---

## 示例 / Example

```tsx
// 默认 / Default
<TruckLoading />

// 小号 / Small
<TruckLoading size="small" />

// 大号 + 类名 / Large with class
<TruckLoading size="large" className="my-truck" />
```

建议放在 `ThemeProvider` 内使用。 Use inside `ThemeProvider` for theme colors.
