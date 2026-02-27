# Input / 输入框

输入框，支持 label、错误信息、辅助文案、左右图标与可点击右侧图标。  
Input with label, error, helper text, left/right icons and optional clickable right icon.

---

## 引入 / Import

```tsx
import { Input } from "nfx-ui";
import type { InputProps } from "nfx-ui";
```

---

## 参数 / Parameters

继承 `InputHTMLAttributes`（除 `size` 被覆盖）。Extends input HTML attributes (except `size`).

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| label | string | No | — | 标签文案。Label text. |
| error | string | No | — | 错误信息（展示错误样式与文案）。Error message (shows error state). |
| helperText | string | No | — | 辅助说明（无 error 时显示）。Helper text (when no error). |
| leftIcon | ReactNode | No | — | 左侧图标。Left icon. |
| rightIcon | ReactNode | No | — | 右侧图标。Right icon. |
| rightIconInteractive | boolean | No | false | 为 true 时右侧图标可点击（如清除、密码切换）。When true, right icon is clickable. |
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | 尺寸。Size. |
| variant | `"default"` \| `"filled"` | No | `"default"` | 视觉变体。Variant. |
| fullWidth | boolean | No | false | 是否占满宽度。Full width. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props + value/onChange 等原生 input 属性。Props above plus value/onChange and native input props.
- **Output**：渲染带 label/错误/辅助文案的输入框；error 时显示错误样式。Renders input with label/error/helper; error state when `error` is set.

---

## 示例 / Example

```tsx
// 带标签与错误 / With label and error
<Input
  label="用户名 / Username"
  error={errors.name?.message}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// 右侧可点击图标（如清除）/ Clickable right icon (e.g. clear)
<Input
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  rightIcon={<X size={16} />}
  rightIconInteractive
  onRightIconClick={clearKeyword}
/>

// 辅助文案 / Helper text
<Input label="邮箱 / Email" helperText="我们不会公开你的邮箱。We won't share your email." />
```
