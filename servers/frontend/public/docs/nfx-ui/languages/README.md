# Languages — i18n

i18n Provider, setup helpers, label hooks and storage utils. Parameters and examples in sub-docs.

---

## Components and docs

| Name | Description | Doc |
|------|-------------|-----|
| LanguageProvider | i18n context; sync init on first render | [language-provider.md](./language-provider.md) |
| Language switcher recipe | SlideDownSwitcher + useLanguageLabel + changeLanguage | [language-switcher.md](./language-switcher.md) |

## Setup

| API | Description | Doc |
|-----|-------------|-----|
| `createI18nResources` | Build `RESOURCES` / `NAME_SPACES` from your JSON | [i18n-setup.md](./i18n-setup.md) |
| `initI18n` | Initialize i18next (called by LanguageProvider) | [i18n-setup.md](./i18n-setup.md) |
| `changeLanguage` | Switch language and persist to storage | [i18n-setup.md](./i18n-setup.md) |
| `getDefaultNfxBundles` | Built-in theme/language/layout/preference bundles | [i18n-setup.md](./i18n-setup.md) |
| `i18n` | i18next singleton instance | [i18n-setup.md](./i18n-setup.md) |

## Built-in namespaces

`NFX_NAMESPACES`: `theme`, `language`, `layout`, `preference` (en / zh / fr). Merged automatically on `initI18n`; switcher labels work out of the box.

## Label hooks

| Hook / function | Description | Doc |
|-----------------|-------------|-----|
| useLanguageLabel / getLanguageDisplayName | Language enum display name | [label-hooks.md](./label-hooks.md) |
| useLayoutLabel / getLayoutDisplayName | Layout mode display name | [label-hooks.md](./label-hooks.md) |
| usePreferenceLabel / getPreferenceDisplayName | Base/preference display name | [label-hooks.md](./label-hooks.md) |
| useThemeLabel / getThemeDisplayName | Theme enum display name | [label-hooks.md](./label-hooks.md) |

## Utils

| Function | Description | Doc |
|----------|-------------|-----|
| `getLocalLanguage` | Resolve language from storage → navigator → default | [get-local-language.md](./get-local-language.md) |
| `getLanguageStorage` | Read `language-storage` | below |
| `setLanguageStorage` | Write `language-storage` | below |
| `removeLanguageStorage` | Clear `language-storage` | below |

```tsx
import {
  getLanguageStorage,
  setLanguageStorage,
  removeLanguageStorage,
} from "nfx-ui/languages";
```

## Types

`LanguageEnum`, `LanguageProviderProps`, `LanguageSwitcherProps`, `CreateI18nResourcesResult`, `InitI18nOptions`, `ExtraBundleItem`, `onLoadExtraBundles`, etc. from `nfx-ui/languages`.

---

## Import example

```tsx
import {
  LanguageProvider,
  LanguageEnum,
  createI18nResources,
  changeLanguage,
  initI18n,
  i18n,
  getDefaultNfxBundles,
  NFX_NAMESPACES,
  getLocalLanguage,
  getLanguageStorage,
  useLanguageLabel,
  useLayoutLabel,
  usePreferenceLabel,
  useThemeLabel,
} from "nfx-ui/languages";
```

---

---

# 语言与 i18n

多语言 Provider、初始化工具、展示名 Hooks 与存储工具。参数与示例见子文档。

---

## 组件与文档

| 名称 | 说明 | 文档 |
|------|------|------|
| LanguageProvider | i18n 上下文；首次渲染同步初始化 | [language-provider.md](./language-provider.md) |
| 语言切换配方 | SlideDownSwitcher + useLanguageLabel + changeLanguage | [language-switcher.md](./language-switcher.md) |

## 初始化

| API | 说明 | 文档 |
|-----|------|------|
| `createI18nResources` | 从自建 JSON 生成 `RESOURCES` / `NAME_SPACES` | [i18n-setup.md](./i18n-setup.md) |
| `initI18n` | 初始化 i18next（由 LanguageProvider 调用） | [i18n-setup.md](./i18n-setup.md) |
| `changeLanguage` | 切换语言并持久化 | [i18n-setup.md](./i18n-setup.md) |
| `getDefaultNfxBundles` | 内置 theme/language/layout/preference 文案包 | [i18n-setup.md](./i18n-setup.md) |
| `i18n` | i18next 单例实例 | [i18n-setup.md](./i18n-setup.md) |

## 内置命名空间

`NFX_NAMESPACES`：`theme`、`language`、`layout`、`preference`（en / zh / fr）。`initI18n` 时自动合并；切换器文案开箱即用。

## 展示名 Hooks

| Hook / 函数 | 说明 | 文档 |
|-------------|------|------|
| useLanguageLabel / getLanguageDisplayName | 语言枚举展示名 | [label-hooks.md](./label-hooks.md) |
| useLayoutLabel / getLayoutDisplayName | 布局模式展示名 | [label-hooks.md](./label-hooks.md) |
| usePreferenceLabel / getPreferenceDisplayName | Base/偏好展示名 | [label-hooks.md](./label-hooks.md) |
| useThemeLabel / getThemeDisplayName | 主题枚举展示名 | [label-hooks.md](./label-hooks.md) |

## 工具

| 函数 | 说明 | 文档 |
|------|------|------|
| `getLocalLanguage` | 存储 → 浏览器 → 默认 解析语言 | [get-local-language.md](./get-local-language.md) |
| `getLanguageStorage` | 读取 `language-storage` | 见下 |
| `setLanguageStorage` | 写入 `language-storage` | 见下 |
| `removeLanguageStorage` | 清除 `language-storage` | 见下 |

```tsx
import {
  getLanguageStorage,
  setLanguageStorage,
  removeLanguageStorage,
} from "nfx-ui/languages";
```

## 类型

`LanguageEnum`、`LanguageProviderProps`、`LanguageSwitcherProps`、`CreateI18nResourcesResult`、`InitI18nOptions`、`ExtraBundleItem`、`onLoadExtraBundles` 等从 `nfx-ui/languages` 引入。

---

## 引入示例

```tsx
import {
  LanguageProvider,
  LanguageEnum,
  createI18nResources,
  changeLanguage,
  initI18n,
  i18n,
  getDefaultNfxBundles,
  NFX_NAMESPACES,
  getLocalLanguage,
  getLanguageStorage,
  useLanguageLabel,
  useLayoutLabel,
  usePreferenceLabel,
  useThemeLabel,
} from "nfx-ui/languages";
```
