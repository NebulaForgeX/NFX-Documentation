# Background

Dashboard background wrapper; renders animated background based on `DashboardBackgroundEnum`. Background is rendered **after** children (overlay layer).

---

## Import

```tsx
import { Background } from "nfx-ui/layouts";
import type { BackgroundProps } from "nfx-ui/layouts";
import { DashboardBackgroundEnum } from "nfx-ui/preference";
```

---

## Parameters (`BackgroundProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Page content. |
| background | DashboardBackgroundEnum \| null | No | — | Background type; when omitted, parent should resolve from user preference. |

### `DashboardBackgroundEnum` values

| Value | Effect |
|-------|--------|
| `WAVES` | Wave animation |
| `SQUARES` | Square grid animation |
| `LETTER_GLITCH` | Letter glitch animation |
| `PIXEL_BLAST` | Pixel blast (lazy-loaded) |
| `NONE` / default | No background |

---

## Input / Output

- **Input:** children; optional `background` enum.
- **Output:** Renders `children` first, then the selected background layer (or nothing for `NONE`).

---

## Example

```tsx
import { Background } from "nfx-ui/layouts";
import { DashboardBackgroundEnum } from "nfx-ui/preference";

<Background background={DashboardBackgroundEnum.WAVES}>
  <DashboardContent />
</Background>
```

---

---

# Background — 仪表盘背景

仪表盘背景包裹层；根据 `DashboardBackgroundEnum` 渲染动画背景。背景层渲染在 **children 之后**（叠加层）。

---

## 引入

```tsx
import { Background } from "nfx-ui/layouts";
import type { BackgroundProps } from "nfx-ui/layouts";
import { DashboardBackgroundEnum } from "nfx-ui/preference";
```

---

## 参数（`BackgroundProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 页面内容。 |
| background | DashboardBackgroundEnum \| null | 否 | — | 背景类型；未传时由使用方从用户偏好解析。 |

### `DashboardBackgroundEnum` 取值

| 值 | 效果 |
|----|------|
| `WAVES` | 波浪动画 |
| `SQUARES` | 方格动画 |
| `LETTER_GLITCH` | 字母故障动画 |
| `PIXEL_BLAST` | 像素爆炸（懒加载） |
| `NONE` / 默认 | 无背景 |

---

## 输入 / 输出

- **输入：** children；可选 `background` 枚举。
- **输出：** 先渲染 `children`，再渲染所选背景层（`NONE` 时不渲染背景）。

---

## 示例

```tsx
import { Background } from "nfx-ui/layouts";
import { DashboardBackgroundEnum } from "nfx-ui/preference";

<Background background={DashboardBackgroundEnum.WAVES}>
  <DashboardContent />
</Background>
```
