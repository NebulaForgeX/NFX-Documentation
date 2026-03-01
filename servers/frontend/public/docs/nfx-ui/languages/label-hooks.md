# Label Hooks / 展示名 Hooks

语言模块提供的四组「展示名」Hook 与纯函数：用于根据枚举值获取 i18n 文案，可传给 SlideDownSwitcher 的 `getDisplayName` 等。  
Four label hooks and pure functions from the languages module: get i18n display names for enum values; can be passed to SlideDownSwitcher `getDisplayName`.

---

## 引入 / Import

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
Returns display name for language enum (e.g. "简体中文", "English"). Uses built-in `language` namespace.

| 名称 Name | 类型 Type | 说明 Description |
|-----------|-----------|------------------|
| useLanguageLabel | () => { getLanguageDisplayName: (lang: LanguageEnum) => string } | Hook，返回 getLanguageDisplayName。 |
| getLanguageDisplayName | (lang: LanguageEnum) => string | 纯函数，不依赖 React。Pure function. |

---

## 2. useLayoutLabel / getLayoutDisplayName

返回布局模式枚举的展示名。依赖内置 `layout` 命名空间。  
Returns display name for layout mode enum. Uses built-in `layout` namespace.

| 名称 Name | 类型 Type | 说明 Description |
|-----------|-----------|------------------|
| useLayoutLabel | () => { getLayoutDisplayName: (mode: LayoutModeEnum) => string } | Hook，返回 getLayoutDisplayName。 |
| getLayoutDisplayName | (mode: LayoutModeEnum) => string | 纯函数。Pure function. |

---

## 3. usePreferenceLabel / getPreferenceDisplayName

返回偏好/Base 枚举的展示名（如 iOS、Android、Windows）。依赖内置 `preference` 命名空间。  
Returns display name for preference/Base enum (e.g. iOS, Android, Windows). Uses built-in `preference` namespace.

| 名称 Name | 类型 Type | 说明 Description |
|-----------|-----------|------------------|
| usePreferenceLabel | () => { getPreferenceDisplayName: (base: BaseEnum) => string } | Hook，返回 getPreferenceDisplayName。 |
| getPreferenceDisplayName | (base: BaseEnum) => string | 纯函数。Pure function. |

---

## 4. useThemeLabel / getThemeDisplayName

返回主题枚举的展示名（如 "浅色"、"深色"）。依赖内置 `theme` 命名空间。  
Returns display name for theme enum (e.g. "浅色", "深色"). Uses built-in `theme` namespace.

| 名称 Name | 类型 Type | 说明 Description |
|-----------|-----------|------------------|
| useThemeLabel | () => { getThemeDisplayName: (theme: ThemeEnum) => string } | Hook，返回 getThemeDisplayName。 |
| getThemeDisplayName | (theme: ThemeEnum) => string | 纯函数。Pure function. |

---

## 输入 Input / 输出 Output

- **Input**：各 Hook 无参数；各 getXxxDisplayName 接收对应枚举值（LanguageEnum / LayoutModeEnum / BaseEnum / ThemeEnum）。
- **Output**：当前语言下的展示字符串；若无翻译则返回枚举原始值作为 defaultValue。

---

## 示例 / Example

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import { useThemeLabel, useLanguageLabel } from "nfx-ui/languages";

// 在组件内使用 Hook，传给 SlideDownSwitcher
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
// 非组件内可直接用纯函数（需已初始化 i18n / LanguageProvider 已挂载）
import { getThemeDisplayName } from "nfx-ui/languages";
const label = getThemeDisplayName("dark");
```

需在 **LanguageProvider** 内使用，否则使用内置默认文案。  
Use inside **LanguageProvider** for correct i18n; otherwise built-in default labels apply.
