# getCountryCode / isValidPhoneNumber

Get country code from phone number; validate phone number.

---

## Import

```ts
import { getCountryCode, isValidPhoneNumber } from "nfx-ui/utils";
```

---

## Parameters

| Function | Parameter | Type | Description |
|----------|------------|------|-------------|
| getCountryCode | phoneNumber | string | Phone number string. |
| isValidPhoneNumber | phoneNumber | string | Phone number to validate. |

---

## Input / Output

- **getCountryCode** — Input: phoneNumber (e.g. "+86 13800138000"). Output: parsed country code (e.g. "86").
- **isValidPhoneNumber** — Input: phoneNumber. Output: boolean — true if valid format.

---

## Example

```ts
getCountryCode("+86 13800138000");
isValidPhoneNumber("+8613800138000");
isValidPhoneNumber("123");
```

---

---

# getCountryCode / isValidPhoneNumber — 电话与国家码

从电话号码解析国家码；校验电话号码是否有效。

---

## 引入

```ts
import { getCountryCode, isValidPhoneNumber } from "nfx-ui/utils";
```

---

## 参数

| 函数 | 参数 | 类型 | 说明 |
|------|------|------|------|
| getCountryCode | phoneNumber | string | 电话号码字符串。 |
| isValidPhoneNumber | phoneNumber | string | 待校验的电话号码。 |

---

## 输入 / 输出

- **getCountryCode** — 输入：phoneNumber（如 "+86 13800138000"）。输出：解析出的国家码（如 "86"）。
- **isValidPhoneNumber** — 输入：phoneNumber。输出：boolean — 格式有效为 true。

---

## 示例

```ts
getCountryCode("+86 13800138000");
isValidPhoneNumber("+8613800138000");
isValidPhoneNumber("123");
```
