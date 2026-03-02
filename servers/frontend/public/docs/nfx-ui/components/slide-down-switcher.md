# SlideDownSwitcher

Collapsible block with title/trigger; content expands or collapses downward. Also used as a value switcher (e.g. theme, layout, language) with `value`, `options`, `getDisplayName`, `onChange`.

---

## Import

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import type { SlideDownSwitcherProps } from "nfx-ui/components";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| title | ReactNode | No | — | Title or trigger text. |
| open | boolean | No | — | Whether expanded. |
| onToggle | () => void | No | — | Toggle callback. |
| children | ReactNode | No | — | Collapsed content. |

When used as value switcher: `value`, `options`, `getDisplayName`, `onChange`, `status`.

---

## Input / Output

- **Input:** title, open, onToggle, children (or value, options, getDisplayName, onChange).
- **Output:** Clicking title/trigger calls onToggle; open controls visibility. Or: displays current value and options, onChange on select.

---

## Example

```tsx
<SlideDownSwitcher
  title="Advanced options"
  open={advancedOpen}
  onToggle={() => setAdvancedOpen((v) => !v)}
>
  <div>... advanced form ...</div>
</SlideDownSwitcher>
```

---

---

# SlideDownSwitcher — 折叠切换

可折叠/展开的区块，带标题或触发区域，内容向下展开或收起。也可作为取值切换器（如主题、布局、语言）使用，配合 `value`、`options`、`getDisplayName`、`onChange`。

---

## 引入

```tsx
import { SlideDownSwitcher } from "nfx-ui/components";
import type { SlideDownSwitcherProps } from "nfx-ui/components";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| title | ReactNode | 否 | — | 标题或触发区文案。 |
| open | boolean | 否 | — | 是否展开。 |
| onToggle | () => void | 否 | — | 切换展开/收起。 |
| children | ReactNode | 否 | — | 折叠内容。 |

作为取值切换器时：`value`、`options`、`getDisplayName`、`onChange`、`status`。

---

## 输入 / 输出

- **输入：** title、open、onToggle、children（或 value、options、getDisplayName、onChange）。
- **输出：** 点击标题/触发区时 onToggle 被调用，open 控制内容显隐。或：展示当前值与选项，选择时触发 onChange。

---

## 示例

```tsx
<SlideDownSwitcher
  title="高级选项"
  open={advancedOpen}
  onToggle={() => setAdvancedOpen((v) => !v)}
>
  <div>... 高级表单 ...</div>
</SlideDownSwitcher>
```
