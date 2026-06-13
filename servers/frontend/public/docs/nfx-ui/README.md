# NFX-UI — Component and module docs

[![npm version](https://img.shields.io/npm/v/nfx-ui.svg)](https://www.npmjs.com/package/nfx-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)

**NFX-UI** is the shared frontend UI library of the NebulaForgeX ecosystem (React components, design tokens, theme, layouts, i18n, utilities). Docs map to **14 top-level folders under `src/`** (`designs` splits into components, layouts, and animations); each export has its own doc for usage and props.

---

## Doc standard

All sub-docs include **descriptions**, **parameter tables** (Parameter | Type | Required | Default | Description), **Input/Output** description, and **Example** (every function, type, and utility must have a usage example).

---

## Doc structure (mapping to src/)

| Directory | Description | Import from |
|-----------|-------------|-------------|
| [animations](./animations/) | Loaders and effects: ECGLoading, TruckLoading, WaveBackground, SquareBackground, etc. | `nfx-ui/animations` |
| [pixel-blast](./pixel-blast/) | WebGL pixel blast background (Three.js + postprocessing) | `nfx-ui/pixel-blast` |
| [apis](./apis/) | API path tree: path, PathNode (for URL_PATHS / API_ENDPOINTS) | `nfx-ui/apis` |
| [components](./components/) | Base components: Button, Input, ThemeSwitcher, LayoutSwitcher, VirtualList, etc. | `nfx-ui/components` |
| [constants](./constants/) | Shared constants and Query keys: createKey, createListKey, createItemKey, defineEnum, etc. | `nfx-ui/constants` |
| [events](./events/) | EventEmitter, defineEvents, EventNamesOf | `nfx-ui/events` |
| [hooks](./hooks/) | makeUnifiedQuery, makeUnifiedInfiniteQuery, NORMAL, SUSPENSE, hook types | `nfx-ui/hooks` |
| [icons](./icons/) | Lucide icon re-exports | `nfx-ui/icons` |
| [languages](./languages/) | LanguageProvider, initI18n, createI18nResources, label hooks | `nfx-ui/languages` |
| [layouts](./layouts/) | LayoutProvider, Sidebar, Header, Footer, Background, LayoutFrame, etc. | `nfx-ui/layouts` |
| [navigations](./navigations/) | defineRouter, createRouter, isActiveRoute, matchRoute, RouteKey, RoutePath | `nfx-ui/navigations` |
| [preference](./preference/) | DashboardBackgroundEnum, parsePreferenceJson, preferenceToJson | `nfx-ui/preference` |
| [services](./services/) | compressImage | `nfx-ui/services` |
| [stores](./stores/) | makeStore, makePersistStore | `nfx-ui/stores` |
| [themes](./themes/) | ThemeProvider, useTheme, theme enums and CSS variables | `nfx-ui/themes` |
| [types](./types/) | API and utility types: ApiErrorBody, ListDTOWithTotalNumber, Nullable, Maybe, etc. | `nfx-ui/types` |
| [utils](./utils/) | address, array, colors, email, price, time, Result, ok, err, retry, singleton, etc. | `nfx-ui/utils` |

---

## Install and before use

### Install

- **Option A:** After publishing to npm, run `npm install nfx-ui` in your app.
- **Option B:** When unpublished, run `npm run build` and `npm link` in NFX-UI, then `npm link nfx-ui` in your app.

```bash
# Option A
npm install nfx-ui

# Option B (in NFX-UI)
npm run build && npm link
# In your app
npm link nfx-ui
```

### Peer dependencies

Required: `react`, `react-dom` (^19.x), `@tanstack/react-query` (^5.x), `i18next` (>=26), `i18next-browser-languagedetector`, `react-i18next` (>=17), `zustand` (^5.x).

Optional (for `nfx-ui/pixel-blast`): `three`, `postprocessing`.

See [`package.json`](../package.json) for exact version ranges.

### Subpath exports

This package **only exposes subpath exports**; import from the relevant subpath to avoid pulling the whole lib.

| Subpath | Description |
|---------|-------------|
| `nfx-ui/themes` | ThemeProvider, useTheme, theme enums and variables |
| `nfx-ui/layouts` | LayoutProvider, Sidebar, Header, Footer, Background, etc. |
| `nfx-ui/components` | Button, Input, ThemeSwitcher, LayoutSwitcher, VirtualList, etc. |
| `nfx-ui/animations` | ECGLoading, TruckLoading, WaveBackground, SquareBackground, etc. |
| `nfx-ui/pixel-blast` | PixelBlastBackground (default export; WebGL) |
| `nfx-ui/hooks` | makeUnifiedQuery, makeUnifiedInfiniteQuery, NORMAL, SUSPENSE, hook types |
| `nfx-ui/preference` | DashboardBackgroundEnum, parsePreferenceJson, preferenceToJson |
| `nfx-ui/stores` | makeStore, makePersistStore |
| `nfx-ui/apis` | path, PathNode |
| `nfx-ui/events` | EventEmitter, defineEvents |
| `nfx-ui/services` | compressImage |
| `nfx-ui/navigations` | defineRouter, createRouter, isActiveRoute, matchRoute |
| `nfx-ui/types` | ApiErrorBody, ListDTOWithTotalNumber, ListDTOWithNextCursor, Nullable, Maybe, etc. |
| `nfx-ui/utils` | address, array, colors, Result, ok, err, retry, singleton, etc. |
| `nfx-ui/constants` | createKey, createListKey, defineEnum, etc. |
| `nfx-ui/languages` | LanguageProvider, createI18nResources, getLocalLanguage, LanguageEnum |
| `nfx-ui/icons` | Lucide icon re-exports |

### Usage notes

- No separate CSS; styles are inlined.
- Import types from the matching subpath for full type hints.
- `Result`, `ok`, `err` come from **`nfx-ui/utils`**, not `nfx-ui/types`.
- Hook-specific types (`FetchNumberListParams`, `InfiniteQueryOptions`, etc.) come from **`nfx-ui/hooks`**.

```tsx
import { ThemeProvider, useTheme } from "nfx-ui/themes";
import { LanguageProvider, getLocalLanguage, LanguageEnum } from "nfx-ui/languages";
import { Button } from "nfx-ui/components";
import type { ApiErrorBody } from "nfx-ui/types";

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider bundles={/* createI18nResources(...) */}>
        <Button>Confirm</Button>
      </LanguageProvider>
    </ThemeProvider>
  );
}
```

---

## Read online

This docs folder is synced to the **NFX-Documentation** site; you can browse all modules and components in the UI-API section.

- Repo: <https://github.com/NebulaForgeX/NFX-Documentation>
- Example paths after deploy: `/ui-api` (overview), `/ui-api/components`, `/ui-api/components/button`, etc.

---

## Development (this repo)

- **Build:** `npm run build`; output in `dist/` (ESM, CJS, types; styles inlined).
- **Local link:** In NFX-UI run `npm run link`, in your app run `npm link nfx-ui`; after changing NFX-UI run `npm run build` again.
- **Lint:** `npm run lint`, `npm run lint:code-format`, `npm run format`.

---

## License

MIT — see [`package.json`](../package.json).

---

---

# NFX-UI — 组件与模块文档

[![npm version](https://img.shields.io/npm/v/nfx-ui.svg)](https://www.npmjs.com/package/nfx-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)

**NFX-UI** 是 NebulaForgeX 生态的统一前端 UI 库，提供 React 组件、设计令牌、主题系统、布局基元、多语言与工具函数。按模块划分，对应 **`src/` 下 14 个顶层目录**（`designs` 拆为 components、layouts、animations）；每个组件/导出有单独说明文件，便于查阅用法与 Props。

---

## 文档规范

各子文档均包含**说明**、**标准参数表**（参数 | 类型 | 必填 | 默认 | 说明）、**Input / Output** 说明，以及**示例**（每个函数、类型、工具均需有对应使用示例）。

---

## 文档结构（对应 src/）

| 目录 | 说明 | 引入路径 |
|------|------|----------|
| [animations](./animations/) | 动效与加载：ECGLoading、TruckLoading、WaveBackground、SquareBackground 等 | `nfx-ui/animations` |
| [pixel-blast](./pixel-blast/) | WebGL 像素爆炸背景（Three.js + postprocessing） | `nfx-ui/pixel-blast` |
| [apis](./apis/) | API 路径树：path、PathNode | `nfx-ui/apis` |
| [components](./components/) | 基础组件：Button、Input、ThemeSwitcher、LayoutSwitcher、VirtualList 等 | `nfx-ui/components` |
| [constants](./constants/) | 公用常量与 Query key | `nfx-ui/constants` |
| [events](./events/) | EventEmitter、defineEvents | `nfx-ui/events` |
| [hooks](./hooks/) | makeUnifiedQuery、NORMAL、SUSPENSE、hooks 专用类型 | `nfx-ui/hooks` |
| [icons](./icons/) | Lucide 图标重导出 | `nfx-ui/icons` |
| [languages](./languages/) | LanguageProvider、createI18nResources、label hooks | `nfx-ui/languages` |
| [layouts](./layouts/) | LayoutProvider、Sidebar、LayoutFrame 等 | `nfx-ui/layouts` |
| [navigations](./navigations/) | defineRouter、createRouter 等 | `nfx-ui/navigations` |
| [preference](./preference/) | 用户偏好 parse/serialize | `nfx-ui/preference` |
| [services](./services/) | compressImage | `nfx-ui/services` |
| [stores](./stores/) | makeStore、makePersistStore | `nfx-ui/stores` |
| [themes](./themes/) | ThemeProvider、useTheme、主题变量 | `nfx-ui/themes` |
| [types](./types/) | ApiErrorBody、ListDTOWithTotalNumber、Nullable 等 | `nfx-ui/types` |
| [utils](./utils/) | Result、ok、err、地址、颜色、时间等 | `nfx-ui/utils` |

---

## 安装与使用前

### 安装

- **方式 A**：发布到 npm 后，在业务项目中执行 `npm install nfx-ui`。
- **方式 B**：未发布时，在 NFX-UI 目录执行 `npm run build` 与 `npm link`，在业务项目目录执行 `npm link nfx-ui`。

```bash
# 方式 A
npm install nfx-ui

# 方式 B（在 NFX-UI 目录）
npm run build && npm link
# 在业务项目
npm link nfx-ui
```

### 依赖要求

必需：`react`、`react-dom`（^19.x）、`@tanstack/react-query`（^5.x）、`i18next`（>=26）、`i18next-browser-languagedetector`、`react-i18next`（>=17）、`zustand`（^5.x）。

可选（`nfx-ui/pixel-blast`）：`three`、`postprocessing`。

详见 [`package.json`](../package.json)。

### 子路径导出

本库**仅提供子路径导出**，无聚合入口；按需从对应子路径引入，避免打进全量。

- `Result`、`ok`、`err` 从 **`nfx-ui/utils`** 引入，非 `nfx-ui/types`。
- hooks 专用类型（`FetchNumberListParams` 等）从 **`nfx-ui/hooks`** 引入。

### 使用要点

- 无需单独引入 CSS，样式已内联。
- 类型从对应子路径引入即可获得类型提示。

```tsx
import { ThemeProvider, useTheme } from "nfx-ui/themes";
import { LanguageProvider, getLocalLanguage, LanguageEnum } from "nfx-ui/languages";
import { Button } from "nfx-ui/components";
import type { ApiErrorBody } from "nfx-ui/types";

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider bundles={/* createI18nResources(...) */}>
        <Button>确定</Button>
      </LanguageProvider>
    </ThemeProvider>
  );
}
```

---

## 在线阅读

本文档目录（`docs/`）已同步至 **NFX-Documentation** 站点，可在 UI-API 页面逐模块、逐组件查阅。

- 仓库：<https://github.com/NebulaForgeX/NFX-Documentation>
- 部署后访问路径示例：`/ui-api`（概述）、`/ui-api/components`、`/ui-api/components/button` 等。

---

## 本仓库开发

- **构建**：`npm run build`，产物在 `dist/`（ESM、CJS、类型，样式内联）。
- **本地联调**：NFX-UI 目录 `npm run link`，业务项目 `npm link nfx-ui`；修改 NFX-UI 后需重新 `npm run build`。
- **代码检查**：`npm run lint`、`npm run lint:code-format`、`npm run format`。

---

## 许可证

MIT — 见 [`package.json`](../package.json)。
