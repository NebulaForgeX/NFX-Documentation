# NFX-UI 组件与模块文档

**NFX-UI** 是 NebulaForgeX 生态的统一前端 UI 库，提供 React 组件、设计令牌、主题系统、布局基元、多语言与工具函数。  
**NFX-UI** is the shared frontend UI library of the NebulaForgeX ecosystem (React components, design tokens, theme, layouts, i18n, utilities).

按模块划分，与 **src 下 16 个文件夹** 一一对应；每个组件/导出有单独说明文件，便于查阅用法与 Props。  
Modules map to **16 folders under src/**; each component/export has its own doc for usage and props.

---

## 文档规范 / Doc standard

各子文档均包含**中英文说明**、**标准参数表**（参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description），以及 **Input / Output 示例**与代码示例。  
All sub-docs include **Chinese & English descriptions**, **parameter tables** (Parameter | Type | Required | Default | Description), and **Input/Output examples** with code samples.

---

## 文档结构（对应 src/）

| 目录 | 说明 | 主包导出 |
|------|------|----------|
| [animations](./animations/) | 动效与加载：ECGLoading、TruckLoading、WaveBackground、SquareBackground 等 | ✅ |
| [apis](./apis/) | API 路径、端点、getAnalyticsLocaleJsonUrl | ❌ 仅 @/apis |
| [components](./components/) | 基础组件：Button、Input、Dropdown、Icon、Slider、VirtualList 等 | ✅ |
| [constants](./constants/) | 公用常量与 Query key：createKey、createListKey、createItemKey、defineEnum 等 | ✅ |
| [events](./events/) | 通用 EventEmitter、defineEvents | ❌ 仅 @/events |
| [hooks](./hooks/) | makeUnifiedQuery、makeUnifiedInfiniteQuery、makeCursorFetchFunction 等 | ✅ |
| [icons](./icons/) | Lucide 图标重导出 | ❌ 仅 @/icons |
| [languages](./languages/) | LanguageProvider、LanguageSwitcher、getLocalLanguage | ✅ |
| [layouts](./layouts/) | LayoutProvider、Sidebar、Header、Footer、Background 等 | ✅ |
| [navigations](./navigations/) | defineRouter、createRouter、isActiveRoute、matchRoute | ❌ 仅 @/navigations |
| [preference](./preference/) | DashboardBackgroundEnum、parsePreferenceJson、getDefaultPreference | ✅ |
| [services](./services/) | compressImage 等 | ❌ 仅 @/services |
| [stores](./stores/) | makeStore、makePersistStore | ❌ 仅 @/stores |
| [themes](./themes/) | ThemeProvider、ThemeSwitcher、主题枚举与变量 | ✅ |
| [types](./types/) | API 类型、工具类型：ApiErrorBody、ListDTO、Nullable、Result 等 | ✅ |
| [utils](./utils/) | 地址、数组、颜色、邮箱、电话、价格、时间、Result、retry、singleton 等 | ✅ |

---

## 安装与使用前 / Install & before use

### 安装 / Install

- **方式 A**：发布到 npm 后，在业务项目中执行 `npm install nfx-ui`。
- **方式 B**：未发布时，在 NFX-UI 目录执行 `npm run build` 与 `npm link`，在业务项目目录执行 `npm link nfx-ui`。

```bash
# 方式 A / Option A
npm install nfx-ui

# 方式 B / Option B（在 NFX-UI 目录 / in NFX-UI）
npm run build && npm link
# 在业务项目 / in your app
npm link nfx-ui
```

### 依赖要求 / Peer dependencies

项目需已安装 `react`、`react-dom`（^18.0.0 或 ^19.0.0）。按需可能还需 `lucide-react`、`recharts`、`@tanstack/react-query` 等（见仓库 `package.json`）。  
Your project must have `react` and `react-dom` (^18.0.0 or ^19.0.0); optionally `lucide-react`, `recharts`, `@tanstack/react-query`.

### 使用要点 / Usage notes

- 无需单独引入 CSS，样式已内联。No separate CSS; styles are inlined.
- 类型从 `nfx-ui` 引入即可获得类型提示。Import types from `nfx-ui` for full type hints.

```tsx
import {
  Button,
  ECGLoading,
  ThemeProvider,
  LanguageProvider,
  type ApiErrorBody,
} from "nfx-ui";

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Button>确定 / Confirm</Button>
      </LanguageProvider>
    </ThemeProvider>
  );
}
```

---

## 在线阅读 / Read online

本文档目录（`docs/`）已同步至 **NFX-Documentation** 站点，可在 UI-API 页面逐模块、逐组件查阅：  
This docs folder is synced to the **NFX-Documentation** site; you can browse all modules and components in the UI-API section.

- 仓库：<https://github.com/NebulaForgeX/NFX-Documentation>  
- 部署后访问路径示例：`/ui-api`（概述）、`/ui-api/components`、`/ui-api/components/button` 等。

---

## 本仓库开发 / Development (this repo)

- **构建**：`npm run build`，产物在 `dist/`（ESM、CJS、类型，样式内联）。
- **本地联调**：NFX-UI 目录 `npm run link`，业务项目 `npm link nfx-ui`；修改 NFX-UI 后需重新 `npm run build`。
- **代码检查**：`npm run lint`、`npm run lint:code-format`、`npm run format`。

---

## License 许可证

UNLICENSED（仅内部使用）。若对外发布请在 `package.json` 中修改许可证。  
UNLICENSED (private use). Change the license in `package.json` if you publish.
