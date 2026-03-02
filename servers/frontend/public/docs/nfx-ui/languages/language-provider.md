# LanguageProvider

Provides i18n context and resources; children use `useTranslation` (react-i18next).

**Behavior**

- **Sync init:** i18n is initialized synchronously on first render before children mount, so any nested component (e.g. modals inside ModalProvider) can safely call `useTranslation`.
- **Built-in namespaces:** Merges with NFX-UI's built-in theme, language, layout, preference bundles; you only pass your own bundles; ThemeSwitcher, LanguageSwitcher, LayoutSwitcher labels work out of the box.

---

## Import

```tsx
import { LanguageProvider, LanguageEnum } from "nfx-ui/languages";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Children. |
| bundles | CreateI18nResourcesResult | Yes | — | Your bundles from createI18nResources or manual RESOURCES, NAME_SPACES_MAP, NAME_SPACES. |
| fallbackLng | LanguageEnum | No | LanguageEnum.ZH | Fallback language. |
| onLoadExtraBundles | (lng: string) => Promise<ExtraBundleItem \| ExtraBundleItem[] \| null \| undefined> | No | — | Fetch extra bundles (e.g. errors) per language; Provider injects them. |

---

## Input / Output

- **Input:** children, bundles (required), fallbackLng, onLoadExtraBundles (optional).
- **Output:** Initializes i18next (including merge with built-in theme/language/layout/preference); children can use `useTranslation()`; useEffect applies local language (getLocalLanguage + changeLanguage).

---

## Example

```tsx
import { ThemeProvider, ThemeEnum } from "nfx-ui/themes";
import { LanguageEnum, LanguageProvider } from "nfx-ui/languages";
import { LayoutProvider } from "nfx-ui/layouts";
import { RESOURCES, NAME_SPACES_MAP, NAME_SPACES } from "@/assets/languages/i18nResources";

async function onLoadExtraBundles(lng: string) {
  const json = await fetch(`/api/locales/${lng}/errors`).then((r) => r.json());
  return json ? { namespace: "errors", bundle: json } : null;
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme={ThemeEnum.DEFAULT}>
    <LanguageProvider
      bundles={{ RESOURCES, NAME_SPACES_MAP, NAME_SPACES }}
      fallbackLng={LanguageEnum.ZH}
      onLoadExtraBundles={onLoadExtraBundles}
    >
      <LayoutProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </LayoutProvider>
    </LanguageProvider>
  </ThemeProvider>
);
```

Nested ModalProvider and its children (e.g. AvatarUploadModal in a modal) can use `useTranslation("components")` etc. without NO_I18NEXT_INSTANCE.

---

## Order with ThemeProvider

Usually ThemeProvider outside, LanguageProvider inside.

---

---

# LanguageProvider — 语言上下文

提供 i18n 上下文与翻译资源；子组件通过 `useTranslation`（react-i18next）使用。

**行为要点**

- **同步初始化**：在首次渲染时同步执行 `initI18n`，再渲染子节点，因此内层任意深度（如 ModalProvider 内的弹窗）使用 `useTranslation` 时 i18n 已就绪，不会出现 `NO_I18NEXT_INSTANCE`。
- **内置命名空间**：会与 NFX-UI 自带的四类 JSON（theme / language / layout / preference）自动合并，使用方只需传入自己的 `bundles`；ThemeSwitcher、LanguageSwitcher、LayoutSwitcher 的文案无需额外配置。

---

## 引入

```tsx
import { LanguageProvider, LanguageEnum } from "nfx-ui/languages";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 子节点。 |
| bundles | CreateI18nResourcesResult | 是 | — | 自建 JSON 通过 createI18nResources 得到，或手写 RESOURCES / NAME_SPACES_MAP / NAME_SPACES。 |
| fallbackLng | LanguageEnum | 否 | LanguageEnum.ZH | 回退语言。 |
| onLoadExtraBundles | (lng: string) => Promise<...> | 否 | — | 语言切换后拉取额外文案（如错误码）；返回 `{ namespace, bundle }` 或数组，由 Provider 内部 `addResourceBundle`。 |

---

## 输入 / 输出

- **输入：** children、bundles（必填），fallbackLng、onLoadExtraBundles（可选）。
- **输出：** 初始化 i18next（含与内置 theme/language/layout/preference 的合并），子组件可直接 `useTranslation()` 做翻译；useEffect 内会应用本地语言（getLocalLanguage + changeLanguage）。

---

## 示例

```tsx
import { ThemeProvider, ThemeEnum } from "nfx-ui/themes";
import { LanguageEnum, LanguageProvider } from "nfx-ui/languages";
import { LayoutProvider } from "nfx-ui/layouts";
import { RESOURCES, NAME_SPACES_MAP, NAME_SPACES } from "@/assets/languages/i18nResources";

async function onLoadExtraBundles(lng: string) {
  const json = await fetch(`/api/locales/${lng}/errors`).then((r) => r.json());
  return json ? { namespace: "errors", bundle: json } : null;
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme={ThemeEnum.DEFAULT}>
    <LanguageProvider
      bundles={{ RESOURCES, NAME_SPACES_MAP, NAME_SPACES }}
      fallbackLng={LanguageEnum.ZH}
      onLoadExtraBundles={onLoadExtraBundles}
    >
      <LayoutProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </LayoutProvider>
    </LanguageProvider>
  </ThemeProvider>
);
```

内层 ModalProvider 及其子组件（如弹窗里的 AvatarUploadModal）可直接 `useTranslation("components")` 等，无需担心 i18n 未初始化。

---

## 与 ThemeProvider 顺序

通常外层 ThemeProvider，内层 LanguageProvider。
