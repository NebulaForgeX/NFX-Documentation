# ThemeSwitcher / 主题切换

主题切换控件（如下拉或按钮组），在 `ThemeProvider` 下使用，切换当前主题。  
Theme switcher (e.g. dropdown or button group); use inside ThemeProvider to change theme.

---

## 引入 / Import

```tsx
import { ThemeSwitcher } from "nfx-ui/themes";
import type { ThemeSwitcherProps } from "nfx-ui/themes";
```

---

## 参数 / Parameters

见 `ThemeSwitcherProps`，可包含样式、展示模式等。See `ThemeSwitcherProps`; may include style, display mode, etc.

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| （见类型） | ThemeSwitcherProps | No | — | 样式、展示模式等。Style, display mode, etc. |

---

## 输入 Input / 输出 Output

- **Input**：ThemeSwitcherProps（可选）。Optional props.
- **Output**：渲染切换控件；用户选择后更新 ThemeProvider 内主题。Renders switcher; selection updates theme in ThemeProvider.

---

## 示例 / Example

```tsx
<ThemeProvider>
  <Header>
    <ThemeSwitcher />
  </Header>
</ThemeProvider>
```
