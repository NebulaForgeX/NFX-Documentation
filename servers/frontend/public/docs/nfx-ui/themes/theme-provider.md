# ThemeProvider

Provides theme context; children use useTheme(), useThemeVariables() for current theme and CSS variables.

---

## Import

```tsx
import { ThemeProvider } from "nfx-ui/themes";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Children. |
| (others) | see type | No | — | Default theme etc. |

---

## Input / Output

- **Input:** children; optional default theme etc.
- **Output:** Provides theme context; children get currentTheme and CSS variables.

---

## Example

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

Usually at root or next to LanguageProvider.

---

---

# ThemeProvider — 主题上下文

提供主题上下文，子组件可通过 `useTheme()`、`useThemeVariables()` 读取当前主题与 CSS 变量。

---

## 引入

```tsx
import { ThemeProvider } from "nfx-ui/themes";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 子节点。 |
| （其他） | 见类型 | 否 | — | 默认主题等（见 ThemeProvider 类型）。 |

---

## 输入 / 输出

- **输入：** children；可选默认主题等 props。
- **输出：** 提供主题上下文；子组件内 `useTheme()` 得 currentTheme，`useThemeVariables()` 得 CSS 变量。

---

## 示例

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

通常放在最外层或与 LanguageProvider 并列。
