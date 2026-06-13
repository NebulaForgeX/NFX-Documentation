# Footer

Generic footer: layout and styling only; content passed from parent. Renders `DefaultFooterContent` when `children` is omitted.

---

## Import

```tsx
import { Footer, DefaultFooterContent } from "nfx-ui/layouts";
import type { FooterProps } from "nfx-ui/layouts";
```

---

## Parameters (`FooterProps`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| children | ReactNode | No | `DefaultFooterContent` | Footer content from parent. |
| className | string | No | — | Extra CSS class. |

---

## Input / Output

- **Input:** `FooterProps` — optional children and className.
- **Output:** Renders footer bar; falls back to copyright + links when no children.

Used internally by `MainWrapper`; pass `footerContent` on `MainWrapper` or `LayoutFrame` in most cases.

---

## Example

```tsx
<Footer>
  <span>© 2026 NFX</span>
</Footer>

{/* Default built-in content */}
<Footer />
```

---

---

# Footer — 底栏

通用底栏：仅负责布局与样式；内容由外部传入。未传 `children` 时渲染 `DefaultFooterContent`（版权 + 链接）。

---

## 引入

```tsx
import { Footer, DefaultFooterContent } from "nfx-ui/layouts";
import type { FooterProps } from "nfx-ui/layouts";
```

---

## 参数（`FooterProps`）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| children | ReactNode | 否 | `DefaultFooterContent` | 由使用方传入的底栏内容。 |
| className | string | 否 | — | 额外 CSS 类名。 |

---

## 输入 / 输出

- **输入：** `FooterProps` — 可选 children 与 className。
- **输出：** 渲染底栏；无 children 时显示内置版权与链接。

由 `MainWrapper` 内部使用；多数场景通过 `MainWrapper` 或 `LayoutFrame` 的 `footerContent` 传入。

---

## 示例

```tsx
<Footer>
  <span>© 2026 NFX</span>
</Footer>

{/* 使用内置默认内容 */}
<Footer />
```
