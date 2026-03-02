# Background

Dashboard background; type from user preference or profile.preference.

---

## Import

```tsx
import { Background } from "nfx-ui/layouts";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Children. |
| background | DashboardBackgroundEnum \| null | No | — | Override preference; else from profile. |

---

## Input / Output

- **Input:** children; optional background.
- **Output:** Renders container with preferred background.

---

## Example

```tsx
<Background>
  <div className="content">...</div>
</Background>
```

---

---

# Background — 仪表盘背景

仪表盘背景组件，由用户偏好（或 profile.preference）决定背景类型。

---

## 引入

```tsx
import { Background } from "nfx-ui/layouts";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 子内容。 |
| background | DashboardBackgroundEnum \| null | 否 | — | 外部传入偏好；不传则从 profile 解析。 |

---

## 输入 / 输出

- **输入：** children；可选 background。
- **输出：** 渲染应用偏好背景的容器。

---

## 示例

```tsx
<Background>
  <div className="content">...</div>
</Background>
```
