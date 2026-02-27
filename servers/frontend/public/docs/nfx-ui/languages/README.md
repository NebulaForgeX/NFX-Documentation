# Languages 语言与 i18n

多语言 Provider、切换器与工具方法。参数与示例见子文档。  
i18n Provider, switcher and helpers. Parameters and examples in sub-docs.

---

## 组件与文档 / Components and docs

| 名称 Name | 说明 Description | 文档 Doc |
|-----------|------------------|----------|
| LanguageProvider | i18n 上下文与资源 i18n context and resources | [language-provider.md](./language-provider.md) |
| LanguageSwitcher | 语言切换控件 Language switcher | [language-switcher.md](./language-switcher.md) |

## 工具 / Utils

- `getLocalLanguage`：获取本地语言。Get local language. 见 [get-local-language.md](./get-local-language.md)

## 类型 / Types

- `LanguageEnum`、i18n 相关类型从 `nfx-ui` 引入。Import from `nfx-ui`.

---

## 引入示例 / Import example

```tsx
import { LanguageProvider, LanguageSwitcher, getLocalLanguage } from "nfx-ui";
```
