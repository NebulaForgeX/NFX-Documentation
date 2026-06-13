# Components — Base components

Import by name from **`nfx-ui/components`**; no separate CSS. All components support `className` and standard DOM props (see each doc).

---

## Component list

| Component | Description | Doc |
|-----------|-------------|-----|
| Button | variant, size, icons, iconOnly, loading | [button.md](./button.md) |
| Input | label, error, helperText, left/right icons | [input.md](./input.md) |
| Textarea | Multiline text | [textarea.md](./textarea.md) |
| Dropdown | Dropdown select | [dropdown.md](./dropdown.md) |
| Icon | Icon wrapper | [icon.md](./icon.md) |
| SearchInput | Search input | [search-input.md](./search-input.md) |
| ShowFilter | Filter/visibility control | [show-filter.md](./show-filter.md) |
| SlideDownSwitcher | Dropdown value switcher | [slide-down-switcher.md](./slide-down-switcher.md) |
| Slider | Slider | [slider.md](./slider.md) |
| Suspense | Suspense boundary and error UI | [suspense.md](./suspense.md) |
| KeyValueEditor | Key-value editor | [key-value-editor.md](./key-value-editor.md) |
| VirtualList | Virtual list | [virtual-list.md](./virtual-list.md) |
| VirtualWindowList | Virtual list in window scroll | [virtual-window-list.md](./virtual-window-list.md) |
| ThemeSwitcher | Theme switcher (requires ThemeProvider) | [theme-switcher.md](./theme-switcher.md) |
| LayoutSwitcher | Layout mode switcher (requires LayoutProvider) | [layout-switcher.md](./layout-switcher.md) |

---

## Import example

```tsx
import {
  Button,
  Input,
  Dropdown,
  Icon,
  SearchInput,
  ShowFilter,
  SlideDownSwitcher,
  Slider,
  Suspense,
  Textarea,
  KeyValueEditor,
  VirtualList,
  VirtualWindowList,
  ThemeSwitcher,
  LayoutSwitcher,
} from "nfx-ui/components";
```

---

---

# Components — 基础组件

从 **`nfx-ui/components`** 按名引入，无需单独引入 CSS。所有组件支持 `className` 等标准 DOM 属性（按各组件说明为准）。

---

## 组件列表

| 组件 | 说明 | 文档 |
|------|------|------|
| Button | 按钮：variant、size、四向图标、iconOnly、loading | [button.md](./button.md) |
| Input | 输入框：label、error、helperText、左右图标 | [input.md](./input.md) |
| Textarea | 多行文本 | [textarea.md](./textarea.md) |
| Dropdown | 下拉选择 | [dropdown.md](./dropdown.md) |
| Icon | 图标封装 | [icon.md](./icon.md) |
| SearchInput | 搜索输入框 | [search-input.md](./search-input.md) |
| ShowFilter | 筛选展示控件 | [show-filter.md](./show-filter.md) |
| SlideDownSwitcher | 下拉取值切换器 | [slide-down-switcher.md](./slide-down-switcher.md) |
| Slider | 滑块 | [slider.md](./slider.md) |
| Suspense | 统一 Suspense 边界与错误态 | [suspense.md](./suspense.md) |
| KeyValueEditor | 键值对编辑 | [key-value-editor.md](./key-value-editor.md) |
| VirtualList | 虚拟列表 | [virtual-list.md](./virtual-list.md) |
| VirtualWindowList | 窗口滚动虚拟列表 | [virtual-window-list.md](./virtual-window-list.md) |
| ThemeSwitcher | 主题切换（需 ThemeProvider） | [theme-switcher.md](./theme-switcher.md) |
| LayoutSwitcher | 布局模式切换（需 LayoutProvider） | [layout-switcher.md](./layout-switcher.md) |

---

## 引入示例

```tsx
import {
  Button,
  Input,
  Dropdown,
  Icon,
  SearchInput,
  ShowFilter,
  SlideDownSwitcher,
  Slider,
  Suspense,
  Textarea,
  KeyValueEditor,
  VirtualList,
  VirtualWindowList,
  ThemeSwitcher,
  LayoutSwitcher,
} from "nfx-ui/components";
```
