# toTextInputValue / toNumberInputValue

Convert value to controlled input/textarea value string (text or number).

---

## Import

```ts
import { toTextInputValue, toNumberInputValue } from "nfx-ui/utils";
```

---

## Parameters

| Function | Parameter | Type | Description |
|----------|------------|------|-------------|
| toTextInputValue | value | unknown | Any value to text input value. |
| toNumberInputValue | value | unknown | Any value to number input value string. |

---

## Input / Output

- **Input:** value (number, string, null, undefined, etc.).
- **Output:** string — for `<input value={...} />` or `<input type="number" value={...} />`.

---

## Example

```ts
toTextInputValue(123);
toTextInputValue(null);
toNumberInputValue(99.5);
toNumberInputValue(null);
```

---

---

# toTextInputValue / toNumberInputValue — 表单值转换

将值转为受控 input/textarea 的 value 字符串（文本或数字）。

---

## 引入

```ts
import { toTextInputValue, toNumberInputValue } from "nfx-ui/utils";
```

---

## 参数

| 函数 | 参数 | 类型 | 说明 |
|------|------|------|------|
| toTextInputValue | value | unknown | 任意值转文本 input 的 value。 |
| toNumberInputValue | value | unknown | 任意值转数字 input 的 value 字符串。 |

---

## 输入 / 输出

- **输入：** value（number、string、null、undefined 等）。
- **输出：** string — 可直接用于 `<input value={...} />` 或 `<input type="number" value={...} />`。

---

## 示例

```ts
toTextInputValue(123);
toTextInputValue(null);
toNumberInputValue(99.5);
toNumberInputValue(null);
```
