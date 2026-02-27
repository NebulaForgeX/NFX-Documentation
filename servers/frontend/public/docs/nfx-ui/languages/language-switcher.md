# LanguageSwitcher / 语言切换

语言切换控件（如下拉选择当前语言），在 `LanguageProvider` 下使用。  
Language switcher (e.g. dropdown for current language); use inside LanguageProvider.

---

## 引入 / Import

```tsx
import { LanguageSwitcher } from "nfx-ui";
```

---

## 参数 / Parameters

无必填 props；可选 props 见组件实现。No required props; optional per implementation.

---

## 输入 Input / 输出 Output

- **Input**：无或可选样式等。None or optional style etc.
- **Output**：渲染切换控件；用户选择后更新 LanguageProvider 内语言。Renders switcher; selection updates language in LanguageProvider.

---

## 示例 / Example

```tsx
<LanguageProvider>
  <Header>
    <LanguageSwitcher />
  </Header>
</LanguageProvider>
```
