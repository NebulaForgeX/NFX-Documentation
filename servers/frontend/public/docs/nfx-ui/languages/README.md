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

## Hooks（展示名）/ Label Hooks

| Hook / 函数 | 说明 Description | 文档 Doc |
|-------------|------------------|----------|
| useLanguageLabel / getLanguageDisplayName | 语言枚举展示名 Language label | [label-hooks.md](./label-hooks.md) |
| useLayoutLabel / getLayoutDisplayName | 布局模式展示名 Layout label | [label-hooks.md](./label-hooks.md) |
| usePreferenceLabel / getPreferenceDisplayName | 偏好/Base 展示名 Preference label | [label-hooks.md](./label-hooks.md) |
| useThemeLabel / getThemeDisplayName | 主题枚举展示名 Theme label | [label-hooks.md](./label-hooks.md) |

## 工具 / Utils

- `getLocalLanguage`：获取本地语言。Get local language. 见 [get-local-language.md](./get-local-language.md)

## 类型 / Types

- `LanguageEnum`、`CreateI18nResourcesResult`、`ExtraBundleItem`、i18n 相关类型从 `nfx-ui/languages` 引入。Import from `nfx-ui/languages`.

---

## 引入示例 / Import example

```tsx
import {
  LanguageProvider,
  getLocalLanguage,
  LanguageEnum,
  useLanguageLabel,
  useLayoutLabel,
  usePreferenceLabel,
  useThemeLabel,
  getLanguageDisplayName,
  getLayoutDisplayName,
  getPreferenceDisplayName,
  getThemeDisplayName,
} from "nfx-ui/languages";
```
