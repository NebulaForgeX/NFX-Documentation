# Languages 语言与 i18n

多语言 Provider、切换器与工具方法。参数与示例见子文档。  
i18n Provider, switcher and helpers. Parameters and examples in sub-docs.

---

## 组件与文档 / Components and docs

| 名称 Name | 说明 Description | 文档 Doc |
|-----------|------------------|----------|
| LanguageProvider | i18n 上下文与资源；首次渲染同步初始化，内层任意深度可安全 useTranslation；自动合并内置 theme/language/layout/preference。 | [language-provider.md](./language-provider.md) |
| LanguageSwitcher | 语言切换控件 Language switcher | [language-switcher.md](./language-switcher.md) |

## 内置命名空间 / Built-in namespaces

LanguageProvider 初始化时会自动合并 NFX-UI 自带的四类 JSON：**theme**、**language**、**layout**、**preference**。使用方只需传入自己的 `bundles`（如 components、各页面等），ThemeSwitcher / LanguageSwitcher / LayoutSwitcher 的文案无需额外配置。  
On init, LanguageProvider merges built-in **theme**, **language**, **layout**, **preference** bundles. You only pass your own bundles; ThemeSwitcher / LanguageSwitcher / LayoutSwitcher labels work out of the box.

## 工具 / Utils

- `getLocalLanguage`：获取本地语言。Get local language. 见 [get-local-language.md](./get-local-language.md)

## 类型 / Types

- `LanguageEnum`、`CreateI18nResourcesResult`、`ExtraBundleItem`、i18n 相关类型从 `nfx-ui` 引入。Import from `nfx-ui`.

---

## 引入示例 / Import example

```tsx
import { LanguageProvider, LanguageSwitcher, getLocalLanguage, LanguageEnum } from "nfx-ui";
```
