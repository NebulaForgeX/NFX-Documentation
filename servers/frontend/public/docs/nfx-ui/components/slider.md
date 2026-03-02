# Slider

Slider for selecting a numeric value or range.

---

## Import

```tsx
import { Slider } from "nfx-ui/components";
import type { SliderProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | number \| [number, number] | No | — | Current value or range. |
| onChange | (value) => void | No | — | Change callback. |
| min | number | No | — | Minimum. |
| max | number | No | — | Maximum. |
| step | number | No | — | Step. |
| label | string | No | — | Label. |
| disabled | boolean | No | false | Disabled. |

---

## Input / Output

- **Input:** value, onChange, min, max, step, label.
- **Output:** On drag, `onChange(newValue)` is called.

---

## Example

```tsx
<Slider
  label="Volume"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
/>
```

---

---

# Slider — 滑块

滑块，用于选择数值范围。

---

## 引入

```tsx
import { Slider } from "nfx-ui/components";
import type { SliderProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | number \| [number, number] | 否 | — | 当前值或范围。 |
| onChange | (value) => void | 否 | — | 值变化回调。 |
| min | number | 否 | — | 最小值。 |
| max | number | 否 | — | 最大值。 |
| step | number | 否 | — | 步长。 |
| label | string | 否 | — | 标签。 |
| disabled | boolean | 否 | false | 是否禁用。 |

---

## 输入 / 输出

- **输入：** value、onChange、min、max、step、label。
- **输出：** 用户拖动后 `onChange(newValue)` 被调用。

---

## 示例

```tsx
<Slider
  label="音量"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
/>
```
