# i18n Setup

Flow for building user bundles, initializing i18next, and switching languages. `LanguageProvider` calls `initI18n` on first render.

---

## Overview

```
Your JSON files
    ↓
createI18nResources(resources, nameSpacesMap)
    ↓
LanguageProvider({ bundles, fallbackLng, onLoadExtraBundles })
    ↓
initI18n (merges getDefaultNfxBundles + user bundles)
    ↓
useTranslation / changeLanguage / label hooks
```

---

## 1. createI18nResources

Builds the structure `initI18n` expects from your per-language JSON.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| resources | Resources | Yes | `{ [lng]: { [namespace]: bundle } }` — your translation JSON per language. |
| nameSpacesMap | NameSpacesMap | Yes | `{ key: namespaceString }` — e.g. `{ components: "components" }`. |

### Return value (`CreateI18nResourcesResult`)

| Field | Type | Description |
|-------|------|-------------|
| RESOURCES | Resources | Same as input `resources`. |
| NAME_SPACES_MAP | NameSpacesMap | Same as input `nameSpacesMap`. |
| NAME_SPACES | string[] | `Object.values(nameSpacesMap)` — used as i18n `ns` list. |

### Example

```tsx
import { createI18nResources, LanguageEnum } from "nfx-ui/languages";
import enComponents from "./en/components.json";
import zhComponents from "./zh/components.json";

const NAME_SPACES_MAP = { components: "components" };

const RESOURCES = {
  [LanguageEnum.EN]: { components: enComponents },
  [LanguageEnum.ZH]: { components: zhComponents },
  [LanguageEnum.FR]: { components: enComponents }, // fallback copy
};

export const bundles = createI18nResources(RESOURCES, NAME_SPACES_MAP);
// => { RESOURCES, NAME_SPACES_MAP, NAME_SPACES: ["components"] }
```

---

## 2. getDefaultNfxBundles / NFX_NAMESPACES

NFX-UI ships built-in bundles for switcher labels.

| Export | Description |
|--------|-------------|
| `getDefaultNfxBundles()` | Returns `{ RESOURCES, NAME_SPACES_MAP, NAME_SPACES }` for theme/language/layout/preference. |
| `NFX_NAMESPACES` | `["theme", "language", "layout", "preference"]` |
| `NFX_NAMESPACES_MAP` | Key → namespace string map |

`initI18n` merges NFX bundles **under** user bundles per language (user keys override). Namespaces: user `NAME_SPACES` first, then NFX namespaces not already listed.

You do **not** need to call `getDefaultNfxBundles` manually when using `LanguageProvider` — `initI18n` does it internally.

---

## 3. initI18n

Initializes the i18next singleton. Idempotent: skips if `i18n.isInitialized`.

### Parameters (`InitI18nOptions`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| bundles | CreateI18nResourcesResult | Yes | — | From `createI18nResources`. |
| fallbackLng | LanguageEnum | No | `LanguageEnum.ZH` | Fallback language. |
| onLoadExtraBundles | onLoadExtraBundles | No | — | Async fetch extra bundles per language (e.g. error codes). |

### Behavior

- Merges `getDefaultNfxBundles()` with `bundles` for en/zh/fr.
- Reads initial language from `getLanguageStorage()` or `fallbackLng`.
- `supportedLngs`: en, zh, fr; `load: "languageOnly"` (normalizes zh-CN → zh).
- Persists language on `languageChanged` via `setLanguageStorage`.
- Detector `lookupLocalStorage` uses `LANGUAGE_STORAGE_KEY` (`language-storage`).

### Example (usually via LanguageProvider)

```tsx
import { initI18n, LanguageEnum } from "nfx-ui/languages";
import { bundles } from "./i18nResources";

initI18n({
  bundles,
  fallbackLng: LanguageEnum.ZH,
  onLoadExtraBundles: async (lng) => {
    const json = await fetch(`/api/locales/${lng}/errors`).then((r) => r.json());
    return json ? { namespace: "errors", bundle: json } : null;
  },
});
```

---

## 4. changeLanguage

Switches language and persists to `language-storage`.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| lng | LanguageEnum | Yes | Target language (`en` / `zh` / `fr`). |

### Example

```tsx
import { changeLanguage, LanguageEnum } from "nfx-ui/languages";

changeLanguage(LanguageEnum.EN);
```

Equivalent to `setLanguageStorage(lng)` + `i18n.changeLanguage(lng)`.

---

## 5. i18n instance

Default export from `nfx-ui/languages` — the i18next singleton.

```tsx
import i18n from "nfx-ui/languages";

const label = i18n.t("welcome", { ns: "components" });
const current = i18n.language;
```

Use `useTranslation` from `react-i18next` in React components instead of direct `i18n.t` when possible.

---

## Full bootstrap example

```tsx
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "nfx-ui/themes";
import {
  LanguageProvider,
  LanguageEnum,
  createI18nResources,
} from "nfx-ui/languages";
import { RESOURCES, NAME_SPACES_MAP } from "@/assets/languages/i18nResources";

const bundles = createI18nResources(RESOURCES, NAME_SPACES_MAP);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider bundles={bundles} fallbackLng={LanguageEnum.ZH}>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
```

---

---

# i18n 初始化

自建文案包、初始化 i18next、切换语言的流程。`LanguageProvider` 在首次渲染时调用 `initI18n`。

---

## 流程概览

```
自建 JSON
    ↓
createI18nResources(resources, nameSpacesMap)
    ↓
LanguageProvider({ bundles, fallbackLng, onLoadExtraBundles })
    ↓
initI18n（合并 getDefaultNfxBundles + 用户 bundles）
    ↓
useTranslation / changeLanguage / 展示名 Hooks
```

---

## 1. createI18nResources

从各语言 JSON 生成 `initI18n` 所需结构。

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| resources | Resources | 是 | `{ [lng]: { [namespace]: bundle } }` — 各语言翻译 JSON。 |
| nameSpacesMap | NameSpacesMap | 是 | `{ key: namespaceString }`，如 `{ components: "components" }`。 |

### 返回值（`CreateI18nResourcesResult`）

| 字段 | 类型 | 说明 |
|------|------|------|
| RESOURCES | Resources | 与入参 `resources` 相同。 |
| NAME_SPACES_MAP | NameSpacesMap | 与入参 `nameSpacesMap` 相同。 |
| NAME_SPACES | string[] | `Object.values(nameSpacesMap)` — 作为 i18n 的 `ns` 列表。 |

### 示例

```tsx
import { createI18nResources, LanguageEnum } from "nfx-ui/languages";
import enComponents from "./en/components.json";
import zhComponents from "./zh/components.json";

const NAME_SPACES_MAP = { components: "components" };

const RESOURCES = {
  [LanguageEnum.EN]: { components: enComponents },
  [LanguageEnum.ZH]: { components: zhComponents },
  [LanguageEnum.FR]: { components: enComponents },
};

export const bundles = createI18nResources(RESOURCES, NAME_SPACES_MAP);
```

---

## 2. getDefaultNfxBundles / NFX_NAMESPACES

NFX-UI 内置切换器文案包。

| 导出 | 说明 |
|------|------|
| `getDefaultNfxBundles()` | 返回 theme/language/layout/preference 的 `{ RESOURCES, NAME_SPACES_MAP, NAME_SPACES }`。 |
| `NFX_NAMESPACES` | `["theme", "language", "layout", "preference"]` |
| `NFX_NAMESPACES_MAP` | key → 命名空间字符串映射 |

`initI18n` 按语言将 NFX bundles 与用户 bundles **合并**（用户键可覆盖）。命名空间：用户 `NAME_SPACES` 优先，再追加用户未声明的 NFX 命名空间。

使用 `LanguageProvider` 时**无需**手动调用 `getDefaultNfxBundles` — `initI18n` 内部自动合并。

---

## 3. initI18n

初始化 i18next 单例。幂等：若 `i18n.isInitialized` 则跳过。

### 参数（`InitI18nOptions`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| bundles | CreateI18nResourcesResult | 是 | — | 来自 `createI18nResources`。 |
| fallbackLng | LanguageEnum | 否 | `LanguageEnum.ZH` | 回退语言。 |
| onLoadExtraBundles | onLoadExtraBundles | 否 | — | 按语言异步拉取额外文案（如错误码）。 |

### 行为

- 合并 `getDefaultNfxBundles()` 与用户 `bundles`（en/zh/fr）。
- 初始语言：`getLanguageStorage()` 或 `fallbackLng`。
- `supportedLngs`：en、zh、fr；`load: "languageOnly"`（zh-CN → zh）。
- `languageChanged` 时通过 `setLanguageStorage` 持久化。
- 检测器 `lookupLocalStorage` 使用 `LANGUAGE_STORAGE_KEY`（`language-storage`）。

### 示例（通常经 LanguageProvider）

```tsx
import { initI18n, LanguageEnum } from "nfx-ui/languages";
import { bundles } from "./i18nResources";

initI18n({
  bundles,
  fallbackLng: LanguageEnum.ZH,
  onLoadExtraBundles: async (lng) => {
    const json = await fetch(`/api/locales/${lng}/errors`).then((r) => r.json());
    return json ? { namespace: "errors", bundle: json } : null;
  },
});
```

---

## 4. changeLanguage

切换语言并写入 `language-storage`。

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| lng | LanguageEnum | 是 | 目标语言（`en` / `zh` / `fr`）。 |

### 示例

```tsx
import { changeLanguage, LanguageEnum } from "nfx-ui/languages";

changeLanguage(LanguageEnum.EN);
```

等价于 `setLanguageStorage(lng)` + `i18n.changeLanguage(lng)`。

---

## 5. i18n 实例

`nfx-ui/languages` 默认导出 — i18next 单例。

```tsx
import i18n from "nfx-ui/languages";

const label = i18n.t("welcome", { ns: "components" });
const current = i18n.language;
```

React 组件中优先使用 `react-i18next` 的 `useTranslation`，而非直接 `i18n.t`。

---

## 完整启动示例

```tsx
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "nfx-ui/themes";
import {
  LanguageProvider,
  LanguageEnum,
  createI18nResources,
} from "nfx-ui/languages";
import { RESOURCES, NAME_SPACES_MAP } from "@/assets/languages/i18nResources";

const bundles = createI18nResources(RESOURCES, NAME_SPACES_MAP);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LanguageProvider bundles={bundles} fallbackLng={LanguageEnum.ZH}>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
```
