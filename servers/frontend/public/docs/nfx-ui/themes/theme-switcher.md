# ThemeSwitcher

Theme switcher (e.g. dropdown or button group); use inside ThemeProvider to change theme.

---

## Import

```tsx
import { ThemeSwitcher } from "nfx-ui/themes";
import type { ThemeSwitcherProps } from "nfx-ui/themes";
```

---

## Parameters

See `ThemeSwitcherProps`; may include style, display mode, etc.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| (see type) | ThemeSwitcherProps | No | — | Style, display mode, etc. |

---

## Input / Output

- **Input:** ThemeSwitcherProps (optional).
- **Output:** Renders switcher; selection updates theme in ThemeProvider.

---

## Example

```tsx
<ThemeProvider>
  <Header>
    <ThemeSwitcher />
  </Header>
</ThemeProvider>
```

---

---

# ThemeSwitcher — 主题切换

主题切换控件（如下拉或按钮组），在 `ThemeProvider` 下使用，切换当前主题。

---

## 引入

```tsx
import { ThemeSwitcher } from "nfx-ui/themes";
import type { ThemeSwitcherProps } from "nfx-ui/themes";
```

---

## 参数

见 `ThemeSwitcherProps`，可包含样式、展示模式等。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| （见类型） | ThemeSwitcherProps | 否 | — | 样式、展示模式等。 |

---

## 输入 / 输出

- **输入：** ThemeSwitcherProps（可选）。
- **输出：** 渲染切换控件；用户选择后更新 ThemeProvider 内主题。

---

## 示例

```tsx
<ThemeProvider>
  <Header>
    <ThemeSwitcher />
  </Header>
</ThemeProvider>
```
