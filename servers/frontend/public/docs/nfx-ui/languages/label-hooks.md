# Label Hooks

Four label hooks and pure functions from the languages module: get i18n display names for enum values; can be passed to SlideDownSwitcher `getDisplayName`.

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

Returns display name for language enum (e.g. "简体中文", "English"). Uses built-in `language` namespace.

| Name | Type | Description |
|------|------|-------------|
| useLanguageLabel | () => { getLanguageDisplayName: (lang: LanguageEnum) => string } | Hook, returns getLanguageDisplayName. |
| getLanguageDisplayName | (lang: LanguageEnum) => string | Pure function, no React. |

---

## 2. useLayoutLabel / getLayoutDisplayName

Returns display name for layout mode enum. Uses built-in `layout` namespace.

| Name | Type | Description |
|------|------|-------------|
| useLayoutLabel | () => { getLayoutDisplayName: (mode: LayoutModeEnum) => string } | Hook, returns getLayoutDisplayName. |
| getLayoutDisplayName | (mode: LayoutModeEnum) => string | Pure function. |

---

## 3. usePreferenceLabel / getPreferenceDisplayName

Returns display name for preference/Base enum (e.g. iOS, Android, Windows). Uses built-in `preference` namespace.

| Name | Type | Description |
|------|------|-------------|
| usePreferenceLabel | () => { getPreferenceDisplayName: (base: BaseEnum) => string } | Hook, returns getPreferenceDisplayName. |
| getPreferenceDisplayName | (base: BaseEnum) => string | Pure function. |

---

## 4. useThemeLabel / getThemeDisplayName

Returns display name for theme enum (e.g. "浅色", "深色"). Uses built-in `theme` namespace.

| Name | Type | Description |
|------|------|-------------|
| useThemeLabel | () => { getThemeDisplayName: (theme: ThemeEnum) => string } | Hook, returns getThemeDisplayName. |
| getThemeDisplayName | (theme: ThemeEnum) => string | Pure function. |

---

## Input / Output

- **Input:** Hooks take no args; each getXxxDisplayName takes the enum value (LanguageEnum / LayoutModeEnum / BaseEnum / ThemeEnum).
- **Output:** Display string in current language; if no translation, returns enum value as default.

---

## Example

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import { useThemeLabel, useLanguageLabel } from "nfx-ui/languages";

function MySwitcher() {
  const { getThemeDisplayName } = useThemeLabel();
  const { getLanguageDisplayName } = useLanguageLabel();

  return (
    <>
      <SlideDownSwitcher
        options={["light", "dark"]}
        value={theme}
        onChange={setTheme}
        getDisplayName={getThemeDisplayName}
      />
      <SlideDownSwitcher
        options={["zh", "en", "fr"]}
        value={lang}
        onChange={setLang}
        getDisplayName={getLanguageDisplayName}
      />
    </>
  );
}
```

```ts
import { getThemeDisplayName } from "nfx-ui/languages";
const label = getThemeDisplayName("dark");
```

Use inside **LanguageProvider** for correct i18n; otherwise built-in default labels apply.

---

---

# 展示名 Hooks

语言模块提供的四组「展示名」Hook 与纯函数：用于根据枚举值获取 i18n 文案，可传给 SlideDownSwitcher 的 `getDisplayName` 等。

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

返回语言枚举的展示名（如 "简体中文"、"English"）。依赖内置 `language` 命名空间。

| 名称 | 类型 | 说明 |
|------|------|------|
| useLanguageLabel | () => { getLanguageDisplayName: (lang: LanguageEnum) => string } | Hook，返回 getLanguageDisplayName。 |
| getLanguageDisplayName | (lang: LanguageEnum) => string | 纯函数，不依赖 React。 |

---

## 2. useLayoutLabel / getLayoutDisplayName

返回布局模式枚举的展示名。依赖内置 `layout` 命名空间。

| 名称 | 类型 | 说明 |
|------|------|------|
| useLayoutLabel | () => { getLayoutDisplayName: (mode: LayoutModeEnum) => string } | Hook，返回 getLayoutDisplayName。 |
| getLayoutDisplayName | (mode: LayoutModeEnum) => string | 纯函数。 |

---

## 3. usePreferenceLabel / getPreferenceDisplayName

返回偏好/Base 枚举的展示名（如 iOS、Android、Windows）。依赖内置 `preference` 命名空间。

| 名称 | 类型 | 说明 |
|------|------|------|
| usePreferenceLabel | () => { getPreferenceDisplayName: (base: BaseEnum) => string } | Hook，返回 getPreferenceDisplayName。 |
| getPreferenceDisplayName | (base: BaseEnum) => string | 纯函数。 |

---

## 4. useThemeLabel / getThemeDisplayName

返回主题枚举的展示名（如 "浅色"、"深色"）。依赖内置 `theme` 命名空间。

| 名称 | 类型 | 说明 |
|------|------|------|
| useThemeLabel | () => { getThemeDisplayName: (theme: ThemeEnum) => string } | Hook，返回 getThemeDisplayName。 |
| getThemeDisplayName | (theme: ThemeEnum) => string | 纯函数。 |

---

## 输入 / 输出

- **输入：** 各 Hook 无参数；各 getXxxDisplayName 接收对应枚举值（LanguageEnum / LayoutModeEnum / BaseEnum / ThemeEnum）。
- **输出：** 当前语言下的展示字符串；若无翻译则返回枚举原始值作为 defaultValue。

---

## 示例

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import { useThemeLabel, useLanguageLabel } from "nfx-ui/languages";

function MySwitcher() {
  const { getThemeDisplayName } = useThemeLabel();
  const { getLanguageDisplayName } = useLanguageLabel();

  return (
    <>
      <SlideDownSwitcher
        options={["light", "dark"]}
        value={theme}
        onChange={setTheme}
        getDisplayName={getThemeDisplayName}
      />
      <SlideDownSwitcher
        options={["zh", "en", "fr"]}
        value={lang}
        onChange={setLang}
        getDisplayName={getLanguageDisplayName}
      />
    </>
  );
}
```

```ts
import { getThemeDisplayName } from "nfx-ui/languages";
const label = getThemeDisplayName("dark");
```

需在 **LanguageProvider** 内使用，否则使用内置默认文案。
