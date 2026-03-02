# isValidEmail

Validate email format.

---

## Import

```ts
import { isValidEmail } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| email | string | Yes | — | Email string to validate. |

---

## Input / Output

- **Input:** email — e.g. `"user@example.com"`.
- **Output:** boolean — true if valid format.

---

## Example

```ts
isValidEmail("user@example.com");
isValidEmail("invalid");
```

---

---

# isValidEmail — 邮箱校验

校验邮箱格式是否有效。

---

## 引入

```ts
import { isValidEmail } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| email | string | 是 | — | 待校验的邮箱字符串。 |

---

## 输入 / 输出

- **输入：** email — 例如 `"user@example.com"`。
- **输出：** boolean — 格式有效为 true，否则 false。

---

## 示例

```ts
isValidEmail("user@example.com");
isValidEmail("invalid");
```
