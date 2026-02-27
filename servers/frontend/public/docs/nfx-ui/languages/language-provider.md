# LanguageProvider / 语言上下文

提供 i18n 上下文与翻译资源，子组件通过 `useTranslation`（react-i18next）使用。  
Provides i18n context and resources; children use useTranslation (react-i18next).

---

## 引入 / Import

```tsx
import { LanguageProvider } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| children | ReactNode | Yes | — | 子节点。Children. |

---

## 输入 Input / 输出 Output

- **Input**：children。Children.
- **Output**：初始化 i18next 并注入资源；子组件 `useTranslation()` 即可翻译。  
  Initializes i18next and injects resources; children use useTranslation() for t().

---

## 示例 / Example

```tsx
<LanguageProvider>
  <App />
</LanguageProvider>
```

通常与 ThemeProvider 并列。 Usually next to ThemeProvider.
