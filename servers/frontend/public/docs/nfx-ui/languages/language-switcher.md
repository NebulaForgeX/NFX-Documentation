# LanguageSwitcher

Language switcher (e.g. dropdown for current language); use inside LanguageProvider.

---

## Import

```tsx
import { LanguageSwitcher } from "nfx-ui/languages";
```

---

## Parameters

No required props; optional per implementation.

---

## Input / Output

- **Input:** None or optional style etc.
- **Output:** Renders switcher; selection updates language in LanguageProvider.

---

## Example

```tsx
<LanguageProvider>
  <Header>
    <LanguageSwitcher />
  </Header>
</LanguageProvider>
```

---

---

# LanguageSwitcher — 语言切换

语言切换控件（如下拉选择当前语言），在 `LanguageProvider` 下使用。

---

## 引入

```tsx
import { LanguageSwitcher } from "nfx-ui/languages";
```

---

## 参数

无必填 props；可选 props 见组件实现。

---

## 输入 / 输出

- **输入：** 无或可选样式等。
- **输出：** 渲染切换控件；用户选择后更新 LanguageProvider 内语言。

---

## 示例

```tsx
<LanguageProvider>
  <Header>
    <LanguageSwitcher />
  </Header>
</LanguageProvider>
```
