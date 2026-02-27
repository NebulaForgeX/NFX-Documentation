# Themes 主题

主题 Provider、切换器、主题枚举与 CSS 变量。参数与示例见子文档。  
Theme Provider, switcher, theme enums and CSS variables. Parameters and examples in sub-docs.

---

## 组件与文档 / Components and docs

| 名称 Name | 说明 Description | 文档 Doc |
|-----------|------------------|----------|
| ThemeProvider | 主题上下文 Theme context | [theme-provider.md](./theme-provider.md) |
| ThemeSwitcher | 主题切换控件 Theme switcher | [theme-switcher.md](./theme-switcher.md) |

## 主题数据 / Theme data

- `themes`、`defaultTheme`、`darkTheme`、`cosmicTheme` 等（见 themes 模块导出）。Exported from themes module.
- `bases`：基础主题（iOS/Android/Windows/Linux 等圆角与平台风格）。Base themes (corner radius, platform style).
- 类型 Types：`ThemeEnum`、`BaseEnum` 等.

---

## 引入示例 / Import example

```tsx
import { ThemeProvider, ThemeSwitcher } from "nfx-ui";
```
