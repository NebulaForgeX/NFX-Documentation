# getLocalLanguage

Resolve the user's language: **localStorage** (`getLanguageStorage`) → **navigator** → **DEFAULT_LANGUAGE** (`LanguageEnum.ZH`).

---

## Import

```tsx
import { getLocalLanguage } from "nfx-ui/languages";
import { LanguageEnum } from "nfx-ui/languages";
```

---

## Parameters

No parameters.

---

## Return value

| Type | Description |
|------|-------------|
| LanguageEnum | One of `en`, `zh`, `fr`. |

### Resolution order

1. `getLanguageStorage()` — validated against `LANGUAGE_VALUES`.
2. `navigator.language` / `navigator.languages[0]` — prefix match: `zh*` → ZH, `en*` → EN, `fr*` → FR.
3. `DEFAULT_LANGUAGE` (`LanguageEnum.ZH`).

---

## Example

```tsx
import { getLocalLanguage, changeLanguage } from "nfx-ui/languages";

const lang = getLocalLanguage(); // LanguageEnum.ZH | EN | FR
changeLanguage(lang);
```

Used internally by `LanguageProvider` on mount. For manual init without Provider:

```tsx
import i18n, { initI18n } from "nfx-ui/languages";
import { getLocalLanguage } from "nfx-ui/languages";

initI18n({ bundles });
void i18n.changeLanguage(getLocalLanguage());
```

---

## Related storage utils

| Function | Description |
|----------|-------------|
| `getLanguageStorage` | Read `language-storage` key directly. |
| `setLanguageStorage` | Write `language-storage`. |
| `removeLanguageStorage` | Clear persisted language. |
| `changeLanguage` | Set storage + `i18n.changeLanguage` in one call. |

---

---

# getLocalLanguage — 获取本地语言

解析用户语言：**localStorage**（`getLanguageStorage`）→ **浏览器** → **DEFAULT_LANGUAGE**（`LanguageEnum.ZH`）。

---

## 引入

```tsx
import { getLocalLanguage } from "nfx-ui/languages";
import { LanguageEnum } from "nfx-ui/languages";
```

---

## 参数

无参数。

---

## 返回值

| 类型 | 说明 |
|------|------|
| LanguageEnum | `en`、`zh`、`fr` 之一。 |

### 解析顺序

1. `getLanguageStorage()` — 校验 `LANGUAGE_VALUES`。
2. `navigator.language` / `navigator.languages[0]` — 前缀匹配：`zh*` → ZH，`en*` → EN，`fr*` → FR。
3. `DEFAULT_LANGUAGE`（`LanguageEnum.ZH`）。

---

## 示例

```tsx
import { getLocalLanguage, changeLanguage } from "nfx-ui/languages";

const lang = getLocalLanguage();
changeLanguage(lang);
```

`LanguageProvider` 挂载时内部使用。无 Provider 时手动初始化：

```tsx
import i18n, { initI18n } from "nfx-ui/languages";
import { getLocalLanguage } from "nfx-ui/languages";

initI18n({ bundles });
void i18n.changeLanguage(getLocalLanguage());
```

---

## 相关存储工具

| 函数 | 说明 |
|------|------|
| `getLanguageStorage` | 直接读取 `language-storage`。 |
| `setLanguageStorage` | 写入 `language-storage`。 |
| `removeLanguageStorage` | 清除已保存语言。 |
| `changeLanguage` | 一步完成存储 + `i18n.changeLanguage`。 |
