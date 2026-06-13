# toTextInputValue / toNumberInputValue

Convert any value to controlled input value strings for form display.

---

## Import

```ts
import { toTextInputValue, toNumberInputValue } from "nfx-ui/utils";
```

---

## Parameters and Output

| Function | Parameter | Output |
|----------|-----------|--------|
| toTextInputValue | value: unknown | string — string as-is; null/undefined → `""`; number/boolean → String; array → comma-joined; object → JSON.stringify. |
| toNumberInputValue | value: unknown | string — null/undefined → `""`; finite number → String; non-finite number → `""`; string as-is; boolean → `"1"`/`"0"`; array → first element String. |

---

## Example

```ts
toTextInputValue(123);        // "123"
toTextInputValue(null);       // ""
toTextInputValue(["a", "b"]); // "a, b"
toNumberInputValue(99.5);     // "99.5"
toNumberInputValue(null);     // ""
toNumberInputValue(true);     // "1"
```

---

---

# toTextInputValue / toNumberInputValue — 表单值转换

将任意值转为受控 input/textarea 的 value 字符串（文本或数字）。

---

## 引入

```ts
import { toTextInputValue, toNumberInputValue } from "nfx-ui/utils";
```

---

## 参数与输出

| 函数 | 参数 | 输出 |
|------|------|------|
| toTextInputValue | value: unknown | string — 字符串原样；null/undefined → `""`；数字/布尔 → String；数组 → 逗号拼接；对象 → JSON.stringify。 |
| toNumberInputValue | value: unknown | string — null/undefined → `""`；有限数字 → String；非有限数字 → `""`；字符串原样；布尔 → `"1"`/`"0"`；数组 → 首项 String。 |

---

## 示例

```ts
toTextInputValue(123);        // "123"
toTextInputValue(null);       // ""
toTextInputValue(["a", "b"]); // "a, b"
toNumberInputValue(99.5);     // "99.5"
toNumberInputValue(null);     // ""
toNumberInputValue(true);     // "1"
```
