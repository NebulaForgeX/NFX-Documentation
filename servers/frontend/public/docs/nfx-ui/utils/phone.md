# getCountryCode / isValidPhoneNumber / 电话与国家码

从电话号码解析国家码；校验电话号码是否有效。  
Get country code from phone number; validate phone number.

---

## 引入 / Import

```ts
import { getCountryCode, isValidPhoneNumber } from "nfx-ui";
```

---

## 参数 / Parameters

| 函数 Function | 参数 Parameter | 类型 Type | 说明 Description |
|---------------|----------------|-----------|------------------|
| getCountryCode | phoneNumber | string | 电话号码字符串。Phone number string. |
| isValidPhoneNumber | phoneNumber | string | 待校验的电话号码。Phone number to validate. |

---

## 输入 Input / 输出 Output

- **getCountryCode**  
  - Input：phoneNumber — 如 `"+86 13800138000"`。  
  - Output：解析出的国家码（如 `"86"`）或项目约定。Parsed country code or default.

- **isValidPhoneNumber**  
  - Input：phoneNumber。  
  - Output：boolean — 格式有效为 true。True if valid format.

---

## 示例 / Example

```ts
getCountryCode("+86 13800138000");  // => "86" (或项目实现 / or impl-specific)
isValidPhoneNumber("+8613800138000"); // => true
isValidPhoneNumber("123");           // => false
```
