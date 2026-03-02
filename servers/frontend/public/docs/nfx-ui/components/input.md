# Input

Input with label, error, helper text, left/right icons and optional clickable right icon.

---

## Import

```tsx
import { Input } from "nfx-ui/components";
import type { InputProps } from "nfx-ui/components";
```

---

## Parameters

Extends input HTML attributes (except `size`).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| label | string | No | — | Label text. |
| error | string | No | — | Error message (shows error state). |
| helperText | string | No | — | Helper text (when no error). |
| leftIcon | ReactNode | No | — | Left icon. |
| rightIcon | ReactNode | No | — | Right icon. |
| rightIconInteractive | boolean | No | false | When true, right icon is clickable. |
| size | `"small"` \| `"medium"` \| `"large"` | No | `"medium"` | Size. |
| variant | `"default"` \| `"filled"` | No | `"default"` | Variant. |
| fullWidth | boolean | No | false | Full width. |

---

## Input / Output

- **Input:** Props above plus value/onChange and native input props.
- **Output:** Renders input with label/error/helper; error state when `error` is set.

---

## Example

```tsx
<Input
  label="Username"
  error={errors.name?.message}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<Input
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  rightIcon={<X size={16} />}
  rightIconInteractive
  onRightIconClick={clearKeyword}
/>

<Input label="Email" helperText="We won't share your email." />
```

---

---

# Input — 输入框

输入框，支持 label、错误信息、辅助文案、左右图标与可点击右侧图标。

---

## 引入

```tsx
import { Input } from "nfx-ui/components";
import type { InputProps } from "nfx-ui/components";
```

---

## 参数

继承 `InputHTMLAttributes`（除 `size` 被覆盖）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| label | string | 否 | — | 标签文案。 |
| error | string | 否 | — | 错误信息（展示错误样式与文案）。 |
| helperText | string | 否 | — | 辅助说明（无 error 时显示）。 |
| leftIcon | ReactNode | 否 | — | 左侧图标。 |
| rightIcon | ReactNode | 否 | — | 右侧图标。 |
| rightIconInteractive | boolean | 否 | false | 为 true 时右侧图标可点击（如清除、密码切换）。 |
| size | `"small"` \| `"medium"` \| `"large"` | 否 | `"medium"` | 尺寸。 |
| variant | `"default"` \| `"filled"` | 否 | `"default"` | 视觉变体。 |
| fullWidth | boolean | 否 | false | 是否占满宽度。 |

---

## 输入 / 输出

- **输入：** 上述 props + value/onChange 等原生 input 属性。
- **输出：** 渲染带 label/错误/辅助文案的输入框；error 时显示错误样式。

---

## 示例

```tsx
<Input
  label="用户名"
  error={errors.name?.message}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<Input
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  rightIcon={<X size={16} />}
  rightIconInteractive
  onRightIconClick={clearKeyword}
/>

<Input label="邮箱" helperText="我们不会公开你的邮箱。" />
```
