# Themes

Theme Provider, useTheme, theme enums, CSS variables, and color tokens. Parameters and examples in sub-docs.

---

## Components and docs

| Name | Description | Doc |
|------|-------------|-----|
| ThemeProvider | Theme context | [theme-provider.md](./theme-provider.md) |
| ThemeSwitcher | Theme switcher (wraps SlideDownSwitcher) | [theme-switcher.md](./theme-switcher.md) |

## Theme data and hooks

- **Data:** themes, defaultTheme, lightTheme, darkTheme, cosmicTheme, corporateTheme, forestTheme, coffeeTheme, wineTheme, wheatTheme, bases (iOS/Android/Windows/Linux, etc.).
- **Hooks:** useTheme, useThemeVariables (from `nfx-ui/themes`).
- **Types:** ThemeEnum, BaseEnum, Theme, BaseTheme, ColorVariables, etc.

---

## Available themes (9)

| Theme | Type | Primary | Description |
|-------|------|---------|-------------|
| **Default** | Light | `#DC2626` Crimson | IoT branded red + Tailwind gray |
| **Light** | Light | `#334155` Slate | Neutral professional, no color bias |
| **Dark** | Dark | `#D97706` Amber | Warm dark mode + zinc gray |
| **Cosmic** | Dark | `#8B5CF6` Violet | Deep-space indigo + lavender |
| **Corporate** | Light | `#2563EB` Blue | Trustworthy corporate blue |
| **Forest** | Light | `#15803D` Green | Organic nature green + emerald |
| **Coffee** | Dark | `#C49A6C` Caramel | Warm earth brown + cream |
| **Wine** | Dark | `#9F1239` Rose | Burgundy/rose + deep red |
| **Wheat** | Light | `#B45309` Amber | Golden harvest + warm cream |

---

## CSS Variables Reference

All variables are injected into `:root` by `useThemeVariables` and can be used in any CSS file.

### Primary

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--color-primary` | `primary` | Buttons, links, active states |
| `--color-primary-hover` | `primaryHover` | Button hover, ShowFilter active |
| `--color-primary-light` | `primaryLight` | Tag background, light buttons |
| `--color-primary-bg` | `primaryBg` | Input focus glow, selected row background |
| `--color-primary-rgb` | `primaryRgb` | For `rgba(var(--color-primary-rgb), α)` |
| `--color-primary-transparent` | `primaryTransparent` | Focus ring outer, Dropdown focus shadow |
| `--color-primary-alpha` | (alias) | Same as `--color-primary-transparent` |
| `--color-primary-fg` | `primaryFg` | Text on primary-colored background |

### Semantic Colors

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--color-success` | `success` | Success toast, status badge |
| `--color-success-light` | `successLight` | Success alert background |
| `--color-success-rgb` | `successRgb` | `rgba()` calculations |
| `--color-info` | `info` | Info alert, badge |
| `--color-info-light` | `infoLight` | Info alert background |
| `--color-info-rgb` | `infoRgb` | `rgba()` calculations |
| `--color-warning` | `warning` | Warning toast, icon |
| `--color-warning-light` | `warningLight` | Warning alert background |
| `--color-warning-rgb` | `warningRgb` | `rgba()` calculations |
| `--color-danger` | `danger` | Delete button, form error border |
| `--color-danger-light` | `dangerLight` | Danger button hover, error alert |
| `--color-danger-rgb` | `dangerRgb` | Input/Textarea error focus ring |
| `--color-error` | (alias) | Same as `--color-danger` |
| `--color-error-rgb` | (alias) | Same as `--color-danger-rgb` |

### Background

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--color-bg` | `bg` | Page body, outermost container |
| `--color-bg-1` | (alias) | Same as `--color-bg` |
| `--color-bg-2` | `bg2` | Sidebar, Footer, cards |
| `--color-bg-3` | `bg3` | Menu hover, striped rows |
| `--color-bg-4` | `bg4` | Deep nested panels |
| `--color-bg-secondary` | `bgSecondary` | Suspense fallback panel |

### Border

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--color-border` | `border` | Container default border |
| `--color-border-2` | `border2` | Separator lines |
| `--color-border-3` | `border3` | Input inactive border, list separator |
| `--color-border-4` | `border4` | Input/Button default border |
| `--color-border-5` | `border5` | Disabled input border |
| `--color-border-hover` | `borderHover` | Hover state border |

### Foreground / Text

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--color-fg` | `fg` | Auxiliary icon, placeholder |
| `--color-fg-text` | `fgText` | Body text, table content |
| `--color-fg-heading` | `fgHeading` | h1-h6, Input label |
| `--color-fg-highlight` | `fgHighlight` | Link text, Dropdown selected item |
| `--color-fg-muted` | `fgMuted` | Placeholder, hint, secondary text |
| `--color-fg-on-primary` | `fgOnPrimary` | Text on primary button/badge |
| `--color-separator` | `separator` | Sidebar bottom separator, Dropdown divider |

### Effects

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--color-overlay` | `overlay` | Modal/Drawer backdrop scrim |
| `--color-shadow` | `shadow` | Card/popover box-shadow base |
| `--color-ring` | `ring` | Keyboard Tab focus outline |

### Chart Series

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--color-chart-1` | `chart1` | Multi-series chart line/bar #1 (usually = primary) |
| `--color-chart-2` | `chart2` | Series #2 |
| `--color-chart-3` | `chart3` | Series #3 |
| `--color-chart-4` | `chart4` | Series #4 |
| `--color-chart-5` | `chart5` | Series #5 |

### Base Variables (non-color)

| CSS Variable | TS Field | Usage |
|---|---|---|
| `--radius-button` | `buttonRadius` | Button border-radius |
| `--radius-card` | `cardRadius` | Card border-radius |
| `--radius-input` | `inputRadius` | Input border-radius |

---

## Import example

```tsx
import { ThemeProvider, useTheme } from "nfx-ui/themes";
import type { ThemeEnum, ColorVariables, Theme } from "nfx-ui/themes";
```

### Access theme in JS

```tsx
const { currentTheme } = useTheme();
const primary = currentTheme.colors.variables.primary;
```

### Use in CSS

```css
.card {
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-3);
  box-shadow: 0 2px 8px var(--color-shadow);
  color: var(--color-fg-text);
}

.card:focus-visible {
  outline: 2px solid var(--color-ring);
}
```

---

---

# 主题

主题 Provider、useTheme、主题枚举、CSS 变量与颜色令牌。参数与示例见子文档。

---

## 组件与文档

| 名称 | 说明 | 文档 |
|------|------|------|
| ThemeProvider | 主题上下文 | [theme-provider.md](./theme-provider.md) |
| ThemeSwitcher | 主题切换控件（封装 SlideDownSwitcher） | [theme-switcher.md](./theme-switcher.md) |

## 主题数据与 Hooks

- **数据**：themes、defaultTheme、lightTheme、darkTheme、cosmicTheme、corporateTheme、forestTheme、coffeeTheme、wineTheme、wheatTheme、bases（iOS/Android/Windows/Linux 等基础主题）。
- **Hooks**：useTheme、useThemeVariables（从 `nfx-ui/themes` 引入）。
- **类型**：ThemeEnum、BaseEnum、Theme、BaseTheme、ColorVariables 等。

---

## 可用主题（9 个）

| 主题 | 类型 | 主色 | 说明 |
|------|------|------|------|
| **Default** | 浅色 | `#DC2626` 鲜红 | IoT 品牌红 + Tailwind Gray |
| **Light** | 浅色 | `#334155` 石板 | 中性专业，零色彩偏向 |
| **Dark** | 深色 | `#D97706` 琥珀 | 暖调暗色 + Zinc 灰 |
| **Cosmic** | 深色 | `#8B5CF6` 电紫 | 深空靛蓝 + 薰衣草层次 |
| **Corporate** | 浅色 | `#2563EB` 企业蓝 | 冷静可信的企业蓝 |
| **Forest** | 浅色 | `#15803D` 翠绿 | 自然有机绿 + 翡翠渐变 |
| **Coffee** | 深色 | `#C49A6C` 拿铁 | 暖棕大地色 + 奶油文字 |
| **Wine** | 深色 | `#9F1239` 酒红 | 勃艮第/玫瑰 + 深红背景 |
| **Wheat** | 浅色 | `#B45309` 琥珀 | 丰收金黄 + 暖奶油底 |

---

## CSS 变量参考

所有变量由 `useThemeVariables` 注入到 `:root`，可在任意 CSS 文件中使用。

### 主色

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--color-primary` | `primary` | 按钮、链接、激活态 |
| `--color-primary-hover` | `primaryHover` | 按钮 hover、ShowFilter 激活 |
| `--color-primary-light` | `primaryLight` | 标签底色、浅色按钮 |
| `--color-primary-bg` | `primaryBg` | Input 聚焦发光底、选中行底 |
| `--color-primary-rgb` | `primaryRgb` | `rgba(var(--color-primary-rgb), α)` 计算 |
| `--color-primary-transparent` | `primaryTransparent` | focus ring 外环、Dropdown 聚焦阴影 |
| `--color-primary-alpha` | （别名） | 同 `--color-primary-transparent` |
| `--color-primary-fg` | `primaryFg` | 主色背景上的文字 |

### 语义色

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--color-success` | `success` | 成功 Toast、状态徽标 |
| `--color-success-light` | `successLight` | 成功 Alert 背景 |
| `--color-success-rgb` | `successRgb` | `rgba()` 计算 |
| `--color-info` | `info` | 信息提示 Alert、Badge |
| `--color-info-light` | `infoLight` | 信息 Alert 背景 |
| `--color-info-rgb` | `infoRgb` | `rgba()` 计算 |
| `--color-warning` | `warning` | 警告 Toast、图标 |
| `--color-warning-light` | `warningLight` | 警告 Alert 背景 |
| `--color-warning-rgb` | `warningRgb` | `rgba()` 计算 |
| `--color-danger` | `danger` | 删除按钮、表单错误边框 |
| `--color-danger-light` | `dangerLight` | 危险按钮 hover、错误 Alert 底 |
| `--color-danger-rgb` | `dangerRgb` | Input/Textarea 错误态 focus ring |
| `--color-error` | （别名） | 同 `--color-danger` |
| `--color-error-rgb` | （别名） | 同 `--color-danger-rgb` |

### 背景

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--color-bg` | `bg` | 页面 body、最外层容器 |
| `--color-bg-1` | （别名） | 同 `--color-bg` |
| `--color-bg-2` | `bg2` | Sidebar、Footer、卡片 |
| `--color-bg-3` | `bg3` | 菜单 hover、条纹行 |
| `--color-bg-4` | `bg4` | 深层嵌套面板 |
| `--color-bg-secondary` | `bgSecondary` | Suspense fallback 面板 |

### 边框

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--color-border` | `border` | 容器默认边框 |
| `--color-border-2` | `border2` | 分隔线 |
| `--color-border-3` | `border3` | Input 非激活边、列表分隔 |
| `--color-border-4` | `border4` | Input/Button 默认边框 |
| `--color-border-5` | `border5` | disabled Input 边框 |
| `--color-border-hover` | `borderHover` | 悬停态边框 |

### 前景 / 文字

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--color-fg` | `fg` | 辅助图标色、placeholder |
| `--color-fg-text` | `fgText` | 正文文字、表格内容 |
| `--color-fg-heading` | `fgHeading` | h1-h6 标题、Input label |
| `--color-fg-highlight` | `fgHighlight` | 链接文字、Dropdown 选中项 |
| `--color-fg-muted` | `fgMuted` | placeholder、hint、次要说明 |
| `--color-fg-on-primary` | `fgOnPrimary` | primary 按钮/Badge 内文字 |
| `--color-separator` | `separator` | Sidebar 底部分隔、Dropdown 间隔 |

### 全局效果

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--color-overlay` | `overlay` | Modal/Drawer 背景蒙版 |
| `--color-shadow` | `shadow` | 卡片/弹出层 box-shadow 基色 |
| `--color-ring` | `ring` | 键盘 Tab 导航 focus outline |

### 图表系列

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--color-chart-1` | `chart1` | 多系列图表第 1 组（通常=主色） |
| `--color-chart-2` | `chart2` | 第 2 组数据线 |
| `--color-chart-3` | `chart3` | 第 3 组数据线 |
| `--color-chart-4` | `chart4` | 第 4 组数据线 |
| `--color-chart-5` | `chart5` | 第 5 组数据线 |

### 基础变量（非颜色）

| CSS 变量 | TS 字段 | 用途 |
|----------|---------|------|
| `--radius-button` | `buttonRadius` | 按钮圆角 |
| `--radius-card` | `cardRadius` | 卡片圆角 |
| `--radius-input` | `inputRadius` | 输入框圆角 |

---

## 引入示例

```tsx
import { ThemeProvider, useTheme } from "nfx-ui/themes";
import type { ThemeEnum, ColorVariables, Theme } from "nfx-ui/themes";
```

### JS 中访问主题

```tsx
const { currentTheme } = useTheme();
const primary = currentTheme.colors.variables.primary;
```

### CSS 中使用

```css
.card {
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-3);
  box-shadow: 0 2px 8px var(--color-shadow);
  color: var(--color-fg-text);
}

.card:focus-visible {
  outline: 2px solid var(--color-ring);
}
```
