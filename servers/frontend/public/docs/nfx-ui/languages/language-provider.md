# LanguageProvider

Provides i18n context; children use `useTranslation` (react-i18next). Calls `initI18n` synchronously on first render.

---

## Import

```tsx
import { LanguageProvider, LanguageEnum } from "nfx-ui/languages";
import type { LanguageProviderProps } from "nfx-ui/languages";
```

---

## Parameters (`LanguageProviderProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | Yes | — | Children. |
| bundles | CreateI18nResourcesResult | Yes | — | From `createI18nResources(resources, nameSpacesMap)`. |
| fallbackLng | LanguageEnum | No | `LanguageEnum.ZH` | Fallback language. |
| onLoadExtraBundles | `onLoadExtraBundles` | No | — | Fetch extra bundles per language; Provider injects via `addResourceBundle`. |

### `onLoadExtraBundles` signature

```ts
(lng: LanguageEnum) => Promise<ExtraBundleItem | ExtraBundleItem[] | null | undefined>
```

Where `ExtraBundleItem = { namespace: string; bundle: Record<string, unknown> }`.

---

## Behavior

- **Sync init:** `initI18n({ bundles, fallbackLng, onLoadExtraBundles })` runs on first render before children mount.
- **Built-in merge:** `initI18n` merges NFX bundles (`theme`, `language`, `layout`, `preference`) with your `bundles`.
- **Apply local language:** `useEffect` calls `getLocalLanguage()` → `setLanguageStorage` → `i18n.changeLanguage`.

---

## Input / Output

- **Input:** `LanguageProviderProps`.
- **Output:** i18next ready for `useTranslation`; language persisted on change.

---

## Example

```tsx
import { ThemeProvider, ThemeEnum } from "nfx-ui/themes";
import { LanguageEnum, LanguageProvider, createI18nResources } from "nfx-ui/languages";
import { LayoutProvider } from "nfx-ui/layouts";
import { RESOURCES, NAME_SPACES_MAP } from "@/assets/languages/i18nResources";

const bundles = createI18nResources(RESOURCES, NAME_SPACES_MAP);

async function onLoadExtraBundles(lng: LanguageEnum) {
  const json = await fetch(`/api/locales/${lng}/errors`).then((r) => r.json());
  return json ? { namespace: "errors", bundle: json } : null;
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme={ThemeEnum.DEFAULT}>
    <LanguageProvider
      bundles={bundles}
      fallbackLng={LanguageEnum.ZH}
      onLoadExtraBundles={onLoadExtraBundles}
    >
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </LanguageProvider>
  </ThemeProvider>
);
```

See [i18n-setup.md](./i18n-setup.md) for `createI18nResources` / `initI18n` details.

---

## Order with ThemeProvider

Usually `ThemeProvider` outside, `LanguageProvider` inside.

---

---

# LanguageProvider — 语言上下文

提供 i18n 上下文；子组件通过 `useTranslation`（react-i18next）使用。首次渲染时同步调用 `initI18n`。

---

## 引入

```tsx
import { LanguageProvider, LanguageEnum } from "nfx-ui/languages";
import type { LanguageProviderProps } from "nfx-ui/languages";
```

---

## 参数（`LanguageProviderProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 是 | — | 子节点。 |
| bundles | CreateI18nResourcesResult | 是 | — | 来自 `createI18nResources(resources, nameSpacesMap)`。 |
| fallbackLng | LanguageEnum | 否 | `LanguageEnum.ZH` | 回退语言。 |
| onLoadExtraBundles | `onLoadExtraBundles` | 否 | — | 按语言拉取额外文案；Provider 通过 `addResourceBundle` 注入。 |

### `onLoadExtraBundles` 签名

```ts
(lng: LanguageEnum) => Promise<ExtraBundleItem | ExtraBundleItem[] | null | undefined>
```

其中 `ExtraBundleItem = { namespace: string; bundle: Record<string, unknown> }`。

---

## 行为

- **同步初始化：** 首次渲染时执行 `initI18n({ bundles, fallbackLng, onLoadExtraBundles })`，再渲染子节点。
- **内置合并：** `initI18n` 将 NFX 文案包（`theme`、`language`、`layout`、`preference`）与你的 `bundles` 合并。
- **应用本地语言：** `useEffect` 内 `getLocalLanguage()` → `setLanguageStorage` → `i18n.changeLanguage`。

---

## 输入 / 输出

- **输入：** `LanguageProviderProps`。
- **输出：** i18next 就绪，可使用 `useTranslation`；语言变更时自动持久化。

---

## 示例

```tsx
import { ThemeProvider, ThemeEnum } from "nfx-ui/themes";
import { LanguageEnum, LanguageProvider, createI18nResources } from "nfx-ui/languages";
import { LayoutProvider } from "nfx-ui/layouts";
import { RESOURCES, NAME_SPACES_MAP } from "@/assets/languages/i18nResources";

const bundles = createI18nResources(RESOURCES, NAME_SPACES_MAP);

async function onLoadExtraBundles(lng: LanguageEnum) {
  const json = await fetch(`/api/locales/${lng}/errors`).then((r) => r.json());
  return json ? { namespace: "errors", bundle: json } : null;
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme={ThemeEnum.DEFAULT}>
    <LanguageProvider
      bundles={bundles}
      fallbackLng={LanguageEnum.ZH}
      onLoadExtraBundles={onLoadExtraBundles}
    >
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </LanguageProvider>
  </ThemeProvider>
);
```

`createI18nResources` / `initI18n` 详见 [i18n-setup.md](./i18n-setup.md)。

---

## 与 ThemeProvider 顺序

通常外层 `ThemeProvider`，内层 `LanguageProvider`。
