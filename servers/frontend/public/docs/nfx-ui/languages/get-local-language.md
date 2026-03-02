# getLocalLanguage

Get local/browser preferred language for i18n init or default language.

---

## Import

```tsx
import { getLocalLanguage } from "nfx-ui/languages";
```

---

## Parameters

No parameters.

---

## Input / Output

- **Input:** None.
- **Output:** string — language code (e.g. "zh", "en"), matching LanguageEnum or project contract.

---

## Example

```tsx
const lang = getLocalLanguage(); // => "zh" | "en" | ...
i18n.changeLanguage(lang);
```

---

---

# getLocalLanguage — 获取本地语言

获取本地/浏览器偏好的语言，用于初始化 i18n 或默认语言选择。

---

## 引入

```tsx
import { getLocalLanguage } from "nfx-ui/languages";
```

---

## 参数

无参数。

---

## 输入 / 输出

- **输入：** 无。
- **输出：** string — 语言代码，如 `"zh"`、`"en"`，与 `LanguageEnum` 或项目约定一致。

---

## 示例

```tsx
const lang = getLocalLanguage(); // => "zh" | "en" | ...
i18n.changeLanguage(lang);
```
