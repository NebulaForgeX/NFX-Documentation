# Languages — i18n

i18n Provider, label hooks and helpers. Parameters and examples in sub-docs.

---

## Components and docs

| Name | Description | Doc |
|------|-------------|-----|
| LanguageProvider | i18n context and resources; sync init on first render; merges built-in theme/language/layout/preference | [language-provider.md](./language-provider.md) |
| LanguageSwitcher | Language switcher (use SlideDownSwitcher with useLanguageLabel) | [language-switcher.md](./language-switcher.md) |

## Built-in namespaces

On init, LanguageProvider merges built-in **theme**, **language**, **layout**, **preference** bundles. You only pass your own bundles; theme/language/layout switcher labels work out of the box.

## Label hooks

| Hook / function | Description | Doc |
|-----------------|-------------|-----|
| useLanguageLabel / getLanguageDisplayName | Language enum display name | [label-hooks.md](./label-hooks.md) |
| useLayoutLabel / getLayoutDisplayName | Layout mode display name | [label-hooks.md](./label-hooks.md) |
| usePreferenceLabel / getPreferenceDisplayName | Preference/Base display name | [label-hooks.md](./label-hooks.md) |
| useThemeLabel / getThemeDisplayName | Theme enum display name | [label-hooks.md](./label-hooks.md) |

## Utils

- `getLocalLanguage`: get local language. See [get-local-language.md](./get-local-language.md).

## Types

- `LanguageEnum`, `CreateI18nResourcesResult`, `ExtraBundleItem`, and other i18n types from `nfx-ui/languages`.

---

## Import example

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

---

---

# 语言与 i18n

多语言 Provider、展示名 Hooks 与工具方法。参数与示例见子文档。

---

## 组件与文档

| 名称 | 说明 | 文档 |
|------|------|------|
| LanguageProvider | i18n 上下文与资源；首次渲染同步初始化；自动合并内置 theme/language/layout/preference | [language-provider.md](./language-provider.md) |
| LanguageSwitcher | 语言切换（使用 SlideDownSwitcher + useLanguageLabel） | [language-switcher.md](./language-switcher.md) |

## 内置命名空间

LanguageProvider 初始化时会自动合并 NFX-UI 自带的四类 JSON：**theme**、**language**、**layout**、**preference**。使用方只需传入自己的 `bundles`；主题/语言/布局切换器文案无需额外配置。

## Hooks（展示名）

| Hook / 函数 | 说明 | 文档 |
|-------------|------|------|
| useLanguageLabel / getLanguageDisplayName | 语言枚举展示名 | [label-hooks.md](./label-hooks.md) |
| useLayoutLabel / getLayoutDisplayName | 布局模式展示名 | [label-hooks.md](./label-hooks.md) |
| usePreferenceLabel / getPreferenceDisplayName | 偏好/Base 展示名 | [label-hooks.md](./label-hooks.md) |
| useThemeLabel / getThemeDisplayName | 主题枚举展示名 | [label-hooks.md](./label-hooks.md) |

## 工具

- `getLocalLanguage`：获取本地语言。见 [get-local-language.md](./get-local-language.md)。

## 类型

- `LanguageEnum`、`CreateI18nResourcesResult`、`ExtraBundleItem` 等 i18n 相关类型从 `nfx-ui/languages` 引入。

---

## 引入示例

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
