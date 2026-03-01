# LayoutSwitcher / 布局切换

用于切换布局的控件（如侧栏展开/收起按钮），依赖 `LayoutProvider` 上下文。  
Control to toggle layout (e.g. sidebar expand/collapse); requires LayoutProvider.

---

## 引入 / Import

```tsx
import { LayoutSwitcher } from "nfx-ui/layouts";
```

---

## 参数 / Parameters

无必填 props；可选 props 见组件实现。No required props; optional props per implementation.

---

## 输入 Input / 输出 Output

- **Input**：无或可选样式等。None or optional style etc.
- **Output**：渲染按钮/控件；点击触发布局切换（如侧栏显隐）。Renders button/control; click triggers layout toggle.

---

## 示例 / Example

```tsx
<Header>
  <LayoutSwitcher />
  ...
</Header>
```

放在 Header 或侧栏内。Place in Header or sidebar.
