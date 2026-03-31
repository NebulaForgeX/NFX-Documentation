# NFX-UI — Component and module docs

[![npm version](https://img.shields.io/npm/v/nfx-ui.svg)](https://www.npmjs.com/package/nfx-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)

**NFX-UI** is the shared frontend UI library of the NebulaForgeX ecosystem (React components, design tokens, theme, layouts, i18n, utilities). Modules map to **16 folders under src/**; each component/export has its own doc for usage and props.

---

## Doc standard

All sub-docs include **descriptions**, **parameter tables** (Parameter | Type | Required | Default | Description), **Input/Output** description, and **Example** (every function, type, and utility must have a usage example).

---

## Doc structure (mapping to src/)

| Directory | Description | Import from |
|-----------|-------------|-------------|
| [animations](./animations/) | Loaders and effects: ECGLoading, TruckLoading, WaveBackground, SquareBackground, etc. | `nfx-ui/animations` |
| [apis](./apis/) | API path tree: path, PathNode (for URL_PATHS / API_ENDPOINTS) | `nfx-ui/apis` |
| [components](./components/) | Base components: Button, Input, Dropdown, Icon, Slider, VirtualList, etc. | `nfx-ui/components` |
| [constants](./constants/) | Shared constants and Query keys: createKey, createListKey, createItemKey, defineEnum, etc. | `nfx-ui/constants` |
| [events](./events/) | EventEmitter, defineEvents, EventNamesOf | `nfx-ui/events` |
| [hooks](./hooks/) | makeUnifiedQuery, makeUnifiedInfiniteQuery, makeCursorFetchFunction, etc. | `nfx-ui/hooks` |
| [icons](./icons/) | Lucide icon re-exports | `nfx-ui/icons` |
| [languages](./languages/) | LanguageProvider, getLocalLanguage, LanguageEnum, useLanguageLabel, useThemeLabel | `nfx-ui/languages` |
| [layouts](./layouts/) | LayoutProvider, Sidebar, Header, Footer, Background, etc. | `nfx-ui/layouts` |
| [navigations](./navigations/) | defineRouter, createRouter, isActiveRoute, matchRoute, RouteKey, RoutePath | `nfx-ui/navigations` |
| [preference](./preference/) | DashboardBackgroundEnum, parsePreferenceJson, getDefaultPreference | `nfx-ui/preference` |
| [services](./services/) | compressImage, etc. | `nfx-ui/services` |
| [stores](./stores/) | makeStore, makePersistStore | `nfx-ui/stores` |
| [themes](./themes/) | ThemeProvider, useTheme, theme enums and variables | `nfx-ui/themes` |
| [types](./types/) | API and utility types: ApiErrorBody, ListDTO, Nullable, Result, etc. | `nfx-ui/types` |
| [utils](./utils/) | address, array, colors, email, phone, price, time, Result, retry, singleton, etc. | `nfx-ui/utils` |

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

Your project must have `react` and `react-dom` (^18.0.0 or ^19.0.0); optionally `lucide-react`, `recharts`, `@tanstack/react-query`.

### Subpath exports

This package **only exposes subpath exports**; import from the relevant subpath to avoid pulling the whole lib.

| Subpath | Description |
|---------|-------------|
| `nfx-ui/themes` | ThemeProvider, useTheme, theme enums and variables |
| `nfx-ui/layouts` | LayoutProvider, Sidebar, Header, Footer, Background, etc. |
| `nfx-ui/components` | Button, Input, Dropdown, Icon, Slider, VirtualList, SlideDownSwitcher, etc. |
| `nfx-ui/animations` | ECGLoading, TruckLoading, WaveBackground, SquareBackground, etc. |
| `nfx-ui/hooks` | makeUnifiedQuery, makeUnifiedInfiniteQuery, makeCursorFetchFunction, etc. |
| `nfx-ui/preference` | DashboardBackgroundEnum, parsePreferenceJson, getDefaultPreference |
| `nfx-ui/stores` | makeStore, makePersistStore |
| `nfx-ui/apis` | path, PathNode |
| `nfx-ui/events` | EventEmitter, defineEvents |
| `nfx-ui/services` | compressImage, etc. |
| `nfx-ui/navigations` | defineRouter, createRouter, isActiveRoute, matchRoute |
| `nfx-ui/types` | ApiErrorBody, ListDTO, Nullable, Maybe, Result, ok, err, etc. |
| `nfx-ui/utils` | address, array, colors, email, phone, price, time, retry, singleton, etc. |
| `nfx-ui/constants` | createKey, createListKey, defineEnum, etc. |
| `nfx-ui/languages` | LanguageProvider, getLocalLanguage, LanguageEnum |
| `nfx-ui/icons` | Lucide icon re-exports |

### Usage notes

- No separate CSS; styles are inlined.
- Import types from the matching subpath for full type hints.

```tsx
import { ThemeProvider, useTheme } from "nfx-ui/themes";
import { LanguageProvider, getLocalLanguage, LanguageEnum } from "nfx-ui/languages";
import { Button } from "nfx-ui/components";
import type { ApiErrorBody } from "nfx-ui/types";

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
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

UNLICENSED (private use). Change the license in `package.json` if you publish.

---

---

# NFX-UI — 组件与模块文档

[![npm version](https://img.shields.io/npm/v/nfx-ui.svg)](https://www.npmjs.com/package/nfx-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)

**NFX-UI** 是 NebulaForgeX 生态的统一前端 UI 库，提供 React 组件、设计令牌、主题系统、布局基元、多语言与工具函数。按模块划分，与 **src 下 16 个文件夹** 一一对应；每个组件/导出有单独说明文件，便于查阅用法与 Props。

---

## 文档规范

各子文档均包含**说明**、**标准参数表**（参数 | 类型 | 必填 | 默认 | 说明）、**Input / Output** 说明，以及**示例**（每个函数、类型、工具均需有对应使用示例）。

---

## 文档结构（对应 src/）

| 目录 | 说明 | 引入路径 |
|------|------|----------|
| [animations](./animations/) | 动效与加载：ECGLoading、TruckLoading、WaveBackground、SquareBackground 等 | `nfx-ui/animations` |
| [apis](./apis/) | API 路径树：path、PathNode（业务项目用其构建 URL_PATHS / API_ENDPOINTS） | `nfx-ui/apis` |
| [components](./components/) | 基础组件：Button、Input、Dropdown、Icon、Slider、VirtualList 等 | `nfx-ui/components` |
| [constants](./constants/) | 公用常量与 Query key：createKey、createListKey、createItemKey、defineEnum 等 | `nfx-ui/constants` |
| [events](./events/) | 通用 EventEmitter、defineEvents、EventNamesOf | `nfx-ui/events` |
| [hooks](./hooks/) | makeUnifiedQuery、makeUnifiedInfiniteQuery、makeCursorFetchFunction 等 | `nfx-ui/hooks` |
| [icons](./icons/) | Lucide 图标重导出 | `nfx-ui/icons` |
| [languages](./languages/) | LanguageProvider、getLocalLanguage、LanguageEnum、useLanguageLabel、useThemeLabel | `nfx-ui/languages` |
| [layouts](./layouts/) | LayoutProvider、Sidebar、Header、Footer、Background 等 | `nfx-ui/layouts` |
| [navigations](./navigations/) | defineRouter、createRouter、isActiveRoute、matchRoute、RouteKey、RoutePath | `nfx-ui/navigations` |
| [preference](./preference/) | DashboardBackgroundEnum、parsePreferenceJson、getDefaultPreference | `nfx-ui/preference` |
| [services](./services/) | compressImage 等 | `nfx-ui/services` |
| [stores](./stores/) | makeStore、makePersistStore | `nfx-ui/stores` |
| [themes](./themes/) | ThemeProvider、useTheme、主题枚举与变量 | `nfx-ui/themes` |
| [types](./types/) | API 类型、工具类型：ApiErrorBody、ListDTO、Nullable、Result 等 | `nfx-ui/types` |
| [utils](./utils/) | 地址、数组、颜色、邮箱、电话、价格、时间、Result、retry、singleton 等 | `nfx-ui/utils` |

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

项目需已安装 `react`、`react-dom`（^18.0.0 或 ^19.0.0）。按需可能还需 `lucide-react`、`recharts`、`@tanstack/react-query` 等（见仓库 `package.json`）。

### 子路径导出

本库**仅提供子路径导出**，无聚合入口；按需从对应子路径引入，避免打进全量。

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
      <LanguageProvider>
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

UNLICENSED（仅内部使用）。若对外发布请在 `package.json` 中修改许可证。
