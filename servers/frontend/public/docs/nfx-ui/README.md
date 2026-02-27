# NFX-UI 组件与模块文档

按模块划分，与 **src 下 16 个文件夹** 一一对应；每个组件/导出有单独说明文件，便于查阅用法与 Props。

**文档规范 / Doc standard**：各子文档均包含**中英文说明**、**标准参数表**（参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description），以及 **Input / Output 示例**与代码示例。  
All sub-docs include **Chinese & English descriptions**, **parameter tables** (Parameter | Type | Required | Default | Description), and **Input/Output examples** with code samples.

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

## 使用前

- 安装：`npm install nfx-ui` 或本地 `npm link nfx-ui`
- 无需单独引入 CSS，样式已内联
- 类型：从 `nfx-ui` 引入即可获得类型提示

```tsx
import { Button, ECGLoading, ThemeProvider } from "nfx-ui";
```
