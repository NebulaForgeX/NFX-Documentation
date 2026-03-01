# getLocalLanguage / 获取本地语言

获取本地/浏览器偏好的语言，用于初始化 i18n 或默认语言选择。  
Get local/browser preferred language for i18n init or default language.

---

## 引入 / Import

```tsx
import { getLocalLanguage } from "nfx-ui/languages";
```

---

## 参数 / Parameters

无参数。No parameters.

---

## 输入 Input / 输出 Output

- **Input**：无。None.
- **Output**：string — 语言代码，如 `"zh"`、`"en"`，与 `LanguageEnum` 或项目约定一致。  
  Language code (e.g. "zh", "en"), matching LanguageEnum or project contract.

---

## 示例 / Example

```tsx
const lang = getLocalLanguage(); // => "zh" | "en" | ...
i18n.changeLanguage(lang);
```
