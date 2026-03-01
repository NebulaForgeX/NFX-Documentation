# Themes 主题

主题 Provider、切换器、主题枚举与 CSS 变量。参数与示例见子文档。  
Theme Provider, switcher, theme enums and CSS variables. Parameters and examples in sub-docs.

---

## 组件与文档 / Components and docs

| 名称 Name | 说明 Description | 文档 Doc |
|-----------|------------------|----------|
| ThemeProvider | 主题上下文 Theme context | [theme-provider.md](./theme-provider.md) |
| ThemeSwitcher | 主题切换控件 Theme switcher | [theme-switcher.md](./theme-switcher.md) |

## 主题数据与 Hooks / Theme data and hooks

- **数据**：`themes`、`defaultTheme`、`darkTheme`、`cosmicTheme`、`corporateTheme`、`forestTheme`、`coffeeTheme`、`wineTheme`、`bases`（iOS/Android/Windows/Linux 等基础主题）。Data: themes, defaultTheme, darkTheme, cosmicTheme, corporateTheme, forestTheme, coffeeTheme, wineTheme, bases.
- **Hooks**：`useTheme`、`useThemeVariables`（从 `nfx-ui/themes` 引入）。Hooks: useTheme, useThemeVariables.
- **类型**：`ThemeEnum`、`BaseEnum`、`Theme`、`BaseTheme` 等。Types: ThemeEnum, BaseEnum, Theme, BaseTheme, etc.

---

## 引入示例 / Import example

```tsx
import { ThemeProvider, ThemeSwitcher } from "nfx-ui/themes";
```
