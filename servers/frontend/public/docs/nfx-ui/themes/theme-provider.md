# ThemeProvider / 主题上下文

提供主题上下文，子组件可通过 `useTheme()`、`useThemeVariables()` 读取当前主题与 CSS 变量。  
Provides theme context; children use useTheme(), useThemeVariables() for current theme and CSS variables.

---

## 引入 / Import

```tsx
import { ThemeProvider } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | Yes | — | 子节点。Children. |
| （其他） | 见类型 | No | — | 默认主题等（见 ThemeProvider 类型）。Default theme etc. |

---

## 输入 Input / 输出 Output

- **Input**：children；可选默认主题等 props。children; optional default theme etc.
- **Output**：提供主题上下文；子组件内 `useTheme()` 得 currentTheme，`useThemeVariables()` 得 CSS 变量。  
  Provides theme context; children get currentTheme and CSS variables.

---

## 示例 / Example

```tsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

通常放在最外层或与 LanguageProvider 并列。 Usually at root or next to LanguageProvider.
