# TruckLoading

Truck-driving style loading animation for logistics or playful waiting states.

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
| className | string | No | — | Custom CSS class. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a truck animation element.

---

## Size mapping

| size | Width×Height |
|------|----------------|
| small | 150×75 px |
| medium | 200×100 px |
| large | 300×150 px |

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

卡车行驶风格的加载动画，适合物流、运输类场景或趣味等待提示。

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
| className | string | 否 | — | 自定义类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染一个卡车动画元素。

---

## 尺寸对应

| size | 宽×高 |
|------|--------|
| small | 150×75 px |
| medium | 200×100 px |
| large | 300×150 px |

---

## 示例

```tsx
<TruckLoading />

<TruckLoading size="small" />

<TruckLoading size="large" className="my-truck" />
```

建议放在 `ThemeProvider` 内使用。
