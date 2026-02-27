# SlideDownSwitcher / 折叠切换

可折叠/展开的区块，带标题或触发区域，内容向下展开或收起。  
Collapsible block with title/trigger; content expands or collapses downward.

---

## 引入 / Import

```tsx
import { SlideDownSwitcher } from "nfx-ui";
import type { SlideDownSwitcherProps } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| title | ReactNode | No | — | 标题或触发区文案。Title or trigger text. |
| open | boolean | No | — | 是否展开。Whether expanded. |
| onToggle | () => void | No | — | 切换展开/收起。Toggle callback. |
| children | ReactNode | No | — | 折叠内容。Collapsed content. |

---

## 输入 Input / 输出 Output

- **Input**：title、open、onToggle、children。title, open, onToggle, children.
- **Output**：点击标题/触发区时 onToggle 被调用，open 控制内容显隐。Clicking title/trigger calls onToggle; open controls visibility.

---

## 示例 / Example

```tsx
<SlideDownSwitcher
  title="高级选项 / Advanced options"
  open={advancedOpen}
  onToggle={() => setAdvancedOpen((v) => !v)}
>
  <div>... 高级表单 ... / ... advanced form ...</div>
</SlideDownSwitcher>
```
