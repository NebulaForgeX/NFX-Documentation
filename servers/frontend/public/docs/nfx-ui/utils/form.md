# toTextInputValue / toNumberInputValue / 表单值转换

将值转为受控 input/textarea 的 value 字符串（文本或数字）。  
Convert value to controlled input/textarea value string (text or number).

---

## 引入 / Import

```ts
import { toTextInputValue, toNumberInputValue } from "nfx-ui/utils";
```

---

## 参数 / Parameters

| 函数 Function | 参数 Parameter | 类型 Type | 说明 Description |
|---------------|----------------|-----------|------------------|
| toTextInputValue | value | unknown | 任意值转文本 input 的 value。Any value to text input value. |
| toNumberInputValue | value | unknown | 任意值转数字 input 的 value 字符串。Any value to number input value string. |

---

## 输入 Input / 输出 Output

- **Input**：value（number、string、null、undefined 等）。value (number, string, null, undefined, etc.).
- **Output**：string — 可直接用于 `<input value={...} />` 或 `<input type="number" value={...} />`。String for input value.

---

## 示例 / Example

```ts
toTextInputValue(123);     // => "123"
toTextInputValue(null);    // => "" (或项目约定 / or project default)
toNumberInputValue(99.5);  // => "99.5"
toNumberInputValue(null);  // => ""
```
