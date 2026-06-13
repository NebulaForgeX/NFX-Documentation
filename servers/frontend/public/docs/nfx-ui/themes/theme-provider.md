# ThemeProvider

Provides theme context (color + base themes); children use `useTheme()` for current theme and setters. Internally calls `useVariables` to inject CSS custom properties.

---

## Import

```tsx
import { ThemeProvider } from "nfx-ui/themes";
import type { ThemeProviderProps } from "nfx-ui/themes";
```

---

## Parameters (`ThemeProviderProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Children. |
| defaultTheme | ThemeEnum | No | `ThemeEnum.DEFAULT` | Default color theme when storage is empty. |
| defaultBase | BaseEnum | No | `BaseEnum.DEFAULT` | Default base theme (radius, spacing, etc.). |

---

## Input / Output

- **Input:** children; optional `defaultTheme` and `defaultBase`.
- **Output:** Provides `ThemeContext`; restores color theme from `getThemeColorStorage()` and base from `getThemeBaseStorage()`; injects CSS variables via `useVariables(currentTheme, themeName)`.

---

## Example

```tsx
import { ThemeProvider, ThemeEnum, BaseEnum } from "nfx-ui/themes";

<ThemeProvider defaultTheme={ThemeEnum.LIGHT} defaultBase={BaseEnum.IOS}>
  <App />
</ThemeProvider>
```

Usually at root or outside `LanguageProvider`.

---

---

# ThemeProvider — 主题上下文

提供主题上下文（颜色主题 + 基础主题）；子组件通过 `useTheme()` 读取当前主题与切换方法。内部调用 `useVariables` 注入 CSS 变量。

---

## 引入

```tsx
import { ThemeProvider } from "nfx-ui/themes";
import type { ThemeProviderProps } from "nfx-ui/themes";
```

---

## 参数（`ThemeProviderProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 子节点。 |
| defaultTheme | ThemeEnum | 否 | `ThemeEnum.DEFAULT` | 存储为空时的默认颜色主题。 |
| defaultBase | BaseEnum | 否 | `BaseEnum.DEFAULT` | 默认基础主题（圆角、间距等）。 |

---

## 输入 / 输出

- **输入：** children；可选 `defaultTheme`、`defaultBase`。
- **输出：** 提供 `ThemeContext`；从 `getThemeColorStorage()` / `getThemeBaseStorage()` 恢复；通过 `useVariables(currentTheme, themeName)` 注入 CSS 变量。

---

## 示例

```tsx
import { ThemeProvider, ThemeEnum, BaseEnum } from "nfx-ui/themes";

<ThemeProvider defaultTheme={ThemeEnum.LIGHT} defaultBase={BaseEnum.IOS}>
  <App />
</ThemeProvider>
```

通常放在最外层或 `LanguageProvider` 外侧。
