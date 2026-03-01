# Background / 仪表盘背景

仪表盘背景组件，由用户偏好（或 profile.preference）决定背景类型。  
Dashboard background; type from user preference or profile.preference.

---

## 引入 / Import

```tsx
import { Background } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | Yes | — | 子内容。Children. |
| background | DashboardBackgroundEnum \| null | No | — | 外部传入偏好；不传则从 profile 解析。Override preference; else from profile. |

---

## 输入 Input / 输出 Output

- **Input**：children；可选 background。children; optional background.
- **Output**：渲染应用偏好背景的容器。Renders container with preferred background.

---

## 示例 / Example

```tsx
<Background>
  <div className="content">...</div>
</Background>
```
