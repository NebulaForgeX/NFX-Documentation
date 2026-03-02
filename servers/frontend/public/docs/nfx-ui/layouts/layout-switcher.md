# LayoutSwitcher

Control to toggle layout (e.g. sidebar expand/collapse); requires LayoutProvider.

---

## Import

```tsx
import { LayoutSwitcher } from "nfx-ui/layouts";
```

---

## Parameters

No required props; optional props per implementation.

---

## Input / Output

- **Input:** None or optional style etc.
- **Output:** Renders button/control; click triggers layout toggle.

---

## Example

```tsx
<Header>
  <LayoutSwitcher />
  ...
</Header>
```

Place in Header or sidebar.

---

---

# LayoutSwitcher — 布局切换

用于切换布局的控件（如侧栏展开/收起按钮），依赖 `LayoutProvider` 上下文。

---

## 引入

```tsx
import { LayoutSwitcher } from "nfx-ui/layouts";
```

---

## 参数

无必填 props；可选 props 见组件实现。

---

## 输入 / 输出

- **输入：** 无或可选样式等。
- **输出：** 渲染按钮/控件；点击触发布局切换（如侧栏显隐）。

---

## 示例

```tsx
<Header>
  <LayoutSwitcher />
  ...
</Header>
```

放在 Header 或侧栏内。
