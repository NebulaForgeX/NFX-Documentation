# Slider

Controlled slider with min/max/step, label, error, helper text, and overflow animation.

---

## Import

```tsx
import { Slider } from "nfx-ui/components";
import type { SliderProps } from "nfx-ui/components";
```

---

## Parameters

Extends div HTML attributes (except `onChange`).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| value | number | Yes | — | Current value. |
| onChange | (value: number) => void | Yes | — | Change callback. |
| min | number | No | 0 | Minimum. |
| max | number | No | 10 | Maximum. |
| step | number | No | 1 | Step. |
| showValue | boolean | No | true | Show numeric value (when no label). |
| fullWidth | boolean | No | false | Full width. |
| label | ReactNode | No | — | Label text. |
| error | ReactNode | No | — | Error message. |
| helperText | ReactNode | No | — | Helper text (when no error). |
| required | boolean | No | false | Required (shows * next to label). |

---

## Input / Output

- **Input:** value, onChange, min, max, step, label, error, helperText, etc.
- **Output:** Renders draggable slider track; on pointer drag calls `onChange(newValue)`; shows value indicator when `showValue` and no label.

---

## Example

```tsx
<Slider value={volume} onChange={setVolume} min={0} max={100} />

<Slider
  label="Volume"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  showValue
  helperText="0–100"
  required
/>
```

---

---

# Slider — 滑块

受控滑块，支持 min/max/step、label、error、helperText 与溢出动效。

---

## 引入

```tsx
import { Slider } from "nfx-ui/components";
import type { SliderProps } from "nfx-ui/components";
```

---

## 参数

继承 div HTML 属性（除 `onChange` 被覆盖）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| value | number | 是 | — | 当前值。 |
| onChange | (value: number) => void | 是 | — | 值变化回调。 |
| min | number | 否 | 0 | 最小值。 |
| max | number | 否 | 10 | 最大值。 |
| step | number | 否 | 1 | 步长。 |
| showValue | boolean | 否 | true | 是否显示数值（无 label 时）。 |
| fullWidth | boolean | 否 | false | 是否占满宽度。 |
| label | ReactNode | 否 | — | 标签文案。 |
| error | ReactNode | 否 | — | 错误信息。 |
| helperText | ReactNode | 否 | — | 辅助说明（无 error 时显示）。 |
| required | boolean | 否 | false | 是否必填（label 旁显示 *）。 |

---

## 输入 / 输出

- **输入：** value、onChange、min、max、step、label、error、helperText 等。
- **输出：** 渲染可拖动的滑块轨道；拖动时调用 `onChange(newValue)`；`showValue` 且无 label 时显示数值。

---

## 示例

```tsx
<Slider value={volume} onChange={setVolume} min={0} max={100} />

<Slider
  label="音量"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  showValue
  helperText="0–100"
  required
/>
```
