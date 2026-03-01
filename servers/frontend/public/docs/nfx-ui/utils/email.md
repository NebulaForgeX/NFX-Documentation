# isValidEmail / 邮箱校验

校验邮箱格式是否有效。  
Validate email format.

---

## 引入 / Import

```ts
import { isValidEmail } from "nfx-ui/utils";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| email | string | Yes | — | 待校验的邮箱字符串。Email string to validate. |

---

## 输入 Input / 输出 Output

- **Input**：email — 例如 `"user@example.com"`。
- **Output**：boolean — 格式有效为 true，否则 false。True if valid format.

---

## 示例 / Example

```ts
isValidEmail("user@example.com");  // => true
isValidEmail("invalid");           // => false
```
