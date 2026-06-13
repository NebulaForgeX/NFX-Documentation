# Language Switcher Recipe

**There is no `LanguageSwitcher` component exported** from `nfx-ui/languages`. The module only exports the `LanguageSwitcherProps` **type** (for custom switchers). Build a language switcher with `SlideDownSwitcher` + `useLanguageLabel` + `changeLanguage`.

---

## Import

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import {
  changeLanguage,
  LanguageEnum,
  LANGUAGE_VALUES,
  useLanguageLabel,
} from "nfx-ui/languages";
import type { LanguageSwitcherProps } from "nfx-ui/languages";
```

---

## LanguageSwitcherProps (type only)

Use this type when building a custom switcher component.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| status | `"primary"` \| `"default"` | No | — | Visual status for SlideDownSwitcher. |
| getLanguageDisplayName | `(lang: LanguageEnum) => string` | No | lang value | Display label per language. |
| handleChangeLanguage | `(language: LanguageEnum) => void` | No | — | Called after language changes. |

---

## Recipe

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import {
  changeLanguage,
  LanguageEnum,
  LANGUAGE_VALUES,
  useLanguageLabel,
  i18n,
} from "nfx-ui/languages";
import type { LanguageSwitcherProps } from "nfx-ui/languages";

function LanguageSwitcherRecipe({
  status = "primary",
  getLanguageDisplayName: getLanguageDisplayNameProp,
  handleChangeLanguage,
}: LanguageSwitcherProps) {
  const { getLanguageDisplayName: getLanguageDisplayNameHook } = useLanguageLabel();
  const getLanguageDisplayName = getLanguageDisplayNameProp ?? getLanguageDisplayNameHook;

  return (
    <SlideDownSwitcher
      status={status}
      options={LANGUAGE_VALUES}
      value={i18n.language as LanguageEnum}
      getDisplayName={getLanguageDisplayName}
      onChange={(lng) => {
        changeLanguage(lng as LanguageEnum);
        handleChangeLanguage?.(lng as LanguageEnum);
      }}
    />
  );
}
```

---

## Input / Output

- **Input:** Optional `LanguageSwitcherProps` — status, custom display name fn, change callback.
- **Output:** Dropdown showing current language; selection calls `changeLanguage` (persists + updates i18n).

Requires `LanguageProvider` ancestor for i18n labels.

---

## Example in header

```tsx
<LanguageProvider bundles={bundles}>
  <LayoutFrame headerRight={<LanguageSwitcherRecipe status="default" />} />
</LanguageProvider>
```

For a ready-made component, see `nfx-ui/components` if your app ships a wrapper — the languages module itself does not export one.

---

---

# 语言切换配方

**`nfx-ui/languages` 不导出 `LanguageSwitcher` 组件**，仅导出 `LanguageSwitcherProps` **类型**（供自定义切换器使用）。请用 `SlideDownSwitcher` + `useLanguageLabel` + `changeLanguage` 拼装。

---

## 引入

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import {
  changeLanguage,
  LanguageEnum,
  LANGUAGE_VALUES,
  useLanguageLabel,
} from "nfx-ui/languages";
import type { LanguageSwitcherProps } from "nfx-ui/languages";
```

---

## LanguageSwitcherProps（仅类型）

自定义切换器组件可复用此类型。

| 字段 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| status | `"primary"` \| `"default"` | 否 | — | SlideDownSwitcher 视觉状态。 |
| getLanguageDisplayName | `(lang: LanguageEnum) => string` | 否 | lang 原值 | 各语言展示名。 |
| handleChangeLanguage | `(language: LanguageEnum) => void` | 否 | — | 语言变更后回调。 |

---

## 配方

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import {
  changeLanguage,
  LanguageEnum,
  LANGUAGE_VALUES,
  useLanguageLabel,
  i18n,
} from "nfx-ui/languages";
import type { LanguageSwitcherProps } from "nfx-ui/languages";

function LanguageSwitcherRecipe({
  status = "primary",
  getLanguageDisplayName: getLanguageDisplayNameProp,
  handleChangeLanguage,
}: LanguageSwitcherProps) {
  const { getLanguageDisplayName: getLanguageDisplayNameHook } = useLanguageLabel();
  const getLanguageDisplayName = getLanguageDisplayNameProp ?? getLanguageDisplayNameHook;

  return (
    <SlideDownSwitcher
      status={status}
      options={LANGUAGE_VALUES}
      value={i18n.language as LanguageEnum}
      getDisplayName={getLanguageDisplayName}
      onChange={(lng) => {
        changeLanguage(lng as LanguageEnum);
        handleChangeLanguage?.(lng as LanguageEnum);
      }}
    />
  );
}
```

---

## 输入 / 输出

- **输入：** 可选 `LanguageSwitcherProps` — 样式状态、自定义展示名、变更回调。
- **输出：** 下拉显示当前语言；选择后调用 `changeLanguage`（持久化并更新 i18n）。

需在 `LanguageProvider` 祖先节点内使用，展示名才走 i18n。

---

## 顶栏示例

```tsx
<LanguageProvider bundles={bundles}>
  <LayoutFrame headerRight={<LanguageSwitcherRecipe status="default" />} />
</LanguageProvider>
```

若需要开箱即用的封装组件，请在应用侧或 `nfx-ui/components` 中实现 — languages 模块本身不导出组件。
