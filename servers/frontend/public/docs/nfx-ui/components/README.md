# Components 基础组件 / Base Components

从 `nfx-ui` 按名引入，无需单独引入 CSS。所有组件支持 `className` 等标准 DOM 属性（按各组件说明为准）。  
Import by name from `nfx-ui`; no separate CSS. All components support `className` and standard DOM props (see each doc).

---

## 组件列表 / Component list

| 组件 Component | 说明 Description | 文档 Doc |
|----------------|-------------------|----------|
| Button | 按钮：variant、size、左右图标、loading | [button.md](./button.md) |
| Input | 输入框：label、error、helperText、左右图标 | [input.md](./input.md) |
| Textarea | 多行文本 Multiline text | [textarea.md](./textarea.md) |
| Dropdown | 下拉选择 Dropdown select | [dropdown.md](./dropdown.md) |
| Icon | 图标封装 Icon wrapper | [icon.md](./icon.md) |
| IconButton | 图标按钮 Icon button | [icon-button.md](./icon-button.md) |
| SearchInput | 搜索输入框 Search input | [search-input.md](./search-input.md) |
| ShowFilter | 筛选展示控件 Filter/visibility control | [show-filter.md](./show-filter.md) |
| SlideDownSwitcher | 折叠切换 Collapsible toggle | [slide-down-switcher.md](./slide-down-switcher.md) |
| Slider | 滑块 Slider | [slider.md](./slider.md) |
| Suspense | 统一 Suspense 边界与错误态 Suspense + error UI | [suspense.md](./suspense.md) |
| KeyValueEditor | 键值对编辑 Key-value editor | [key-value-editor.md](./key-value-editor.md) |
| VirtualList | 虚拟列表 Virtual list | [virtual-list.md](./virtual-list.md) |
| VirtualWindowList | 窗口内虚拟列表 Virtual list in container | [virtual-window-list.md](./virtual-window-list.md) |

---

## 引入示例 / Import example

```tsx
import {
  Button,
  Input,
  Dropdown,
  Icon,
  IconButton,
  SearchInput,
  ShowFilter,
  SlideDownSwitcher,
  Slider,
  Suspense,
  Textarea,
  KeyValueEditor,
  VirtualList,
  VirtualWindowList,
} from "nfx-ui";
```
