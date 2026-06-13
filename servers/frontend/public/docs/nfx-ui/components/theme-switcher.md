# ThemeSwitcher

Theme switcher built on `SlideDownSwitcher`; reads and updates theme via `useTheme`. Use inside `ThemeProvider`.

---

## Import

```tsx
import { ThemeSwitcher } from "nfx-ui/components";
import type { ThemeSwitcherProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| status | `"primary"` \| `"default"` | No | `"primary"` | Visual status passed to `SlideDownSwitcher`. |
| getThemeDisplayName | `(theme: ThemeEnum) => string` | No | theme value | Display label for each theme option. |
| handleChangeTheme | `(theme: ThemeEnum) => void` | No | — | Called after theme changes. |

---

## Input / Output

- **Input:** `ThemeSwitcherProps` (all optional).
- **Output:** Renders `SlideDownSwitcher` with `availableThemes` from context; selection calls `setTheme`.

---

## Example

```tsx
import { ThemeProvider } from "nfx-ui/themes";
import { ThemeSwitcher } from "nfx-ui/components";
import { useThemeLabel } from "nfx-ui/languages";

function Header() {
  const getThemeDisplayName = useThemeLabel();
  return <ThemeSwitcher getThemeDisplayName={getThemeDisplayName} />;
}

export function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}
```

---

---

# ThemeSwitcher — 主题切换

基于 `SlideDownSwitcher` 的主题切换器，通过 `useTheme` 读取并更新主题。需在 `ThemeProvider` 内使用。

---

## 引入

```tsx
import { ThemeSwitcher } from "nfx-ui/components";
import type { ThemeSwitcherProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| status | `"primary"` \| `"default"` | 否 | `"primary"` | 传给 `SlideDownSwitcher` 的视觉状态。 |
| getThemeDisplayName | `(theme: ThemeEnum) => string` | 否 | theme 原值 | 各主题选项的展示名。 |
| handleChangeTheme | `(theme: ThemeEnum) => void` | 否 | — | 主题变更后的回调。 |

---

## 输入 / 输出

- **输入：** `ThemeSwitcherProps`（均可选）。
- **输出：** 渲染 `SlideDownSwitcher`，选项来自上下文的 `availableThemes`；选择后调用 `setTheme`。

---

## 示例

```tsx
import { ThemeProvider } from "nfx-ui/themes";
import { ThemeSwitcher } from "nfx-ui/components";
import { useThemeLabel } from "nfx-ui/languages";

function Header() {
  const getThemeDisplayName = useThemeLabel();
  return <ThemeSwitcher getThemeDisplayName={getThemeDisplayName} />;
}

export function App() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}
```
