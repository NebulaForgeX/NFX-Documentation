# Label Hooks

Four label hooks and pure functions from the languages module: get i18n display names for enum values; pass to `SlideDownSwitcher` `getDisplayName`.

---

## Import

```ts
import {
  useLanguageLabel,
  getLanguageDisplayName,
  useLayoutLabel,
  getLayoutDisplayName,
  usePreferenceLabel,
  getPreferenceDisplayName,
  useThemeLabel,
  getThemeDisplayName,
} from "nfx-ui/languages";
```

---

## 1. useLanguageLabel / getLanguageDisplayName

Returns display name for `LanguageEnum` (e.g. "简体中文", "English").

| Name | Type | i18n key | Namespace |
|------|------|----------|-----------|
| useLanguageLabel | `() => { getLanguageDisplayName }` | `languageSwitcher.{lang}` | `language` |
| getLanguageDisplayName | `(lang: LanguageEnum) => string` | same | `language` |

Falls back to raw enum value when no translation.

---

## 2. useLayoutLabel / getLayoutDisplayName

Returns display name for `LayoutModeEnum` (`show` / `hide`).

| Name | Type | i18n key | Namespace |
|------|------|----------|-----------|
| useLayoutLabel | `() => { getLayoutDisplayName }` | `layoutSwitcher.{mode}` | `layout` |
| getLayoutDisplayName | `(mode: LayoutModeEnum) => string` | same | `layout` |

---

## 3. usePreferenceLabel / getPreferenceDisplayName

Returns display name for `BaseEnum` (iOS, Android, Windows, etc.).

| Name | Type | i18n key | Namespace |
|------|------|----------|-----------|
| usePreferenceLabel | `() => { getPreferenceDisplayName }` | `baseSwitcher.{base}` | `preference` |
| getPreferenceDisplayName | `(base: BaseEnum) => string` | same | `preference` |

---

## 4. useThemeLabel / getThemeDisplayName

Returns display name for `ThemeEnum` (e.g. "浅色", "Dark").

| Name | Type | i18n key | Namespace |
|------|------|----------|-----------|
| useThemeLabel | `() => { getThemeDisplayName }` | `themeSwitcher.{theme}` | `theme` |
| getThemeDisplayName | `(theme: ThemeEnum) => string` | same | `theme` |

---

## Input / Output

- **Input:** Hooks take no args; each `getXxxDisplayName` takes the enum value.
- **Output:** Localized string in current `i18n.language`; `defaultValue` is the enum raw value.

Requires **LanguageProvider** (or prior `initI18n`) for built-in NFX bundles.

---

## Example

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import { useTheme, ThemeEnum } from "nfx-ui/themes";
import i18n, {
  useThemeLabel,
  useLanguageLabel,
  changeLanguage,
  LANGUAGE_VALUES,
  LanguageEnum,
} from "nfx-ui/languages";

function HeaderSwitchers() {
  const { themeName, setTheme, availableThemes } = useTheme();
  const { getThemeDisplayName } = useThemeLabel();
  const { getLanguageDisplayName } = useLanguageLabel();

  return (
    <>
      <SlideDownSwitcher
        options={availableThemes}
        value={themeName}
        onChange={(t) => setTheme(t as ThemeEnum)}
        getDisplayName={getThemeDisplayName}
      />
      <SlideDownSwitcher
        options={LANGUAGE_VALUES}
        value={i18n.language as LanguageEnum}
        onChange={(lng) => changeLanguage(lng as LanguageEnum)}
        getDisplayName={getLanguageDisplayName}
      />
    </>
  );
}
```

```ts
import { getThemeDisplayName } from "nfx-ui/languages";
const label = getThemeDisplayName(ThemeEnum.DARK);
```

---

---

# 展示名 Hooks

语言模块四组展示名 Hook 与纯函数：根据枚举值获取 i18n 文案，可传给 `SlideDownSwitcher` 的 `getDisplayName`。

---

## 引入

```ts
import {
  useLanguageLabel,
  getLanguageDisplayName,
  useLayoutLabel,
  getLayoutDisplayName,
  usePreferenceLabel,
  getPreferenceDisplayName,
  useThemeLabel,
  getThemeDisplayName,
} from "nfx-ui/languages";
```

---

## 1. useLanguageLabel / getLanguageDisplayName

返回 `LanguageEnum` 展示名（如 "简体中文"、"English"）。

| 名称 | 类型 | i18n 键 | 命名空间 |
|------|------|---------|----------|
| useLanguageLabel | `() => { getLanguageDisplayName }` | `languageSwitcher.{lang}` | `language` |
| getLanguageDisplayName | `(lang: LanguageEnum) => string` | 同上 | `language` |

无翻译时回退为枚举原始值。

---

## 2. useLayoutLabel / getLayoutDisplayName

返回 `LayoutModeEnum`（`show` / `hide`）展示名。

| 名称 | 类型 | i18n 键 | 命名空间 |
|------|------|---------|----------|
| useLayoutLabel | `() => { getLayoutDisplayName }` | `layoutSwitcher.{mode}` | `layout` |
| getLayoutDisplayName | `(mode: LayoutModeEnum) => string` | 同上 | `layout` |

---

## 3. usePreferenceLabel / getPreferenceDisplayName

返回 `BaseEnum`（iOS、Android、Windows 等）展示名。

| 名称 | 类型 | i18n 键 | 命名空间 |
|------|------|---------|----------|
| usePreferenceLabel | `() => { getPreferenceDisplayName }` | `baseSwitcher.{base}` | `preference` |
| getPreferenceDisplayName | `(base: BaseEnum) => string` | 同上 | `preference` |

---

## 4. useThemeLabel / getThemeDisplayName

返回 `ThemeEnum` 展示名（如 "浅色"、"Dark"）。

| 名称 | 类型 | i18n 键 | 命名空间 |
|------|------|---------|----------|
| useThemeLabel | `() => { getThemeDisplayName }` | `themeSwitcher.{theme}` | `theme` |
| getThemeDisplayName | `(theme: ThemeEnum) => string` | 同上 | `theme` |

---

## 输入 / 输出

- **输入：** 各 Hook 无参数；各 `getXxxDisplayName` 接收对应枚举值。
- **输出：** 当前 `i18n.language` 下的文案；`defaultValue` 为枚举原始值。

需在 **LanguageProvider**（或事先 `initI18n`）内使用，才能加载内置 NFX 文案包。

---

## 示例

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import { useTheme, ThemeEnum } from "nfx-ui/themes";
import i18n, {
  useThemeLabel,
  useLanguageLabel,
  changeLanguage,
  LANGUAGE_VALUES,
  LanguageEnum,
} from "nfx-ui/languages";

function HeaderSwitchers() {
  const { themeName, setTheme, availableThemes } = useTheme();
  const { getThemeDisplayName } = useThemeLabel();
  const { getLanguageDisplayName } = useLanguageLabel();

  return (
    <>
      <SlideDownSwitcher
        options={availableThemes}
        value={themeName}
        onChange={(t) => setTheme(t as ThemeEnum)}
        getDisplayName={getThemeDisplayName}
      />
      <SlideDownSwitcher
        options={LANGUAGE_VALUES}
        value={i18n.language as LanguageEnum}
        onChange={(lng) => changeLanguage(lng as LanguageEnum)}
        getDisplayName={getLanguageDisplayName}
      />
    </>
  );
}
```

```ts
import { getThemeDisplayName } from "nfx-ui/languages";
const label = getThemeDisplayName(ThemeEnum.DARK);
```
