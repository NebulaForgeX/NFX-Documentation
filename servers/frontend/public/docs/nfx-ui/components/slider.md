# Slider / 滑块

滑块，用于选择数值范围。  
Slider for selecting a numeric value or range.

---

## 引入 / Import

```tsx
import { Slider } from "nfx-ui";
import type { SliderProps } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| value | number \| [number, number] | No | — | 当前值或范围。Current value or range. |
| onChange | (value) => void | No | — | 值变化回调。Change callback. |
| min | number | No | — | 最小值。Minimum. |
| max | number | No | — | 最大值。Maximum. |
| step | number | No | — | 步长。Step. |
| label | string | No | — | 标签。Label. |
| disabled | boolean | No | false | 是否禁用。Disabled. |

---

## 输入 Input / 输出 Output

- **Input**：value、onChange、min、max、step、label。value, onChange, min, max, step, label.
- **Output**：用户拖动后 `onChange(newValue)` 被调用。On drag, `onChange(newValue)` is called.

---

## 示例 / Example

```tsx
<Slider
  label="音量 / Volume"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
/>
```
