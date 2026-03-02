# SquareBackground

Grid square animation background with direction, speed, color and hover highlight.

---

## Import

```tsx
import { SquareBackground } from "nfx-ui/animations";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| direction | `"diagonal"` \| `"up"` \| `"right"` \| `"down"` \| `"left"` | No | `"right"` | Direction of movement. |
| speed | number | No | 1 | Animation speed. |
| borderColor | string \| CanvasGradient \| CanvasPattern | No | `"#999"` | Border color. |
| squareSize | number | No | 40 | Side length per cell (px). |
| hoverFillColor | string \| CanvasGradient \| CanvasPattern | No | `"#222"` | Fill color on hover. |
| className | string | No | — | Container class. |
| style | CSSProperties | No | — | Container style. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a canvas grid square animation.

---

## Example

```tsx
<SquareBackground />

<SquareBackground direction="diagonal" speed={2} />

<SquareBackground
  borderColor="#333"
  hoverFillColor="rgba(59, 130, 246, 0.5)"
  squareSize={32}
/>

<div style={{ position: "relative", height: 200 }}>
  <SquareBackground className="absolute inset-0" />
</div>
```

---

---

# SquareBackground — 方块背景

网格方块动画背景，支持方向、速度、颜色与悬停高亮。

---

## 引入

```tsx
import { SquareBackground } from "nfx-ui/animations";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| direction | `"diagonal"` \| `"up"` \| `"right"` \| `"down"` \| `"left"` | 否 | `"right"` | 方块移动方向。 |
| speed | number | 否 | 1 | 动画速度。 |
| borderColor | string \| CanvasGradient \| CanvasPattern | 否 | `"#999"` | 边框颜色。 |
| squareSize | number | 否 | 40 | 单格边长（px）。 |
| hoverFillColor | string \| CanvasGradient \| CanvasPattern | 否 | `"#222"` | 悬停填充色。 |
| className | string | 否 | — | 容器类名。 |
| style | CSSProperties | 否 | — | 容器样式。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染 Canvas 网格方块动画。

---

## 示例

```tsx
<SquareBackground />

<SquareBackground direction="diagonal" speed={2} />

<SquareBackground
  borderColor="#333"
  hoverFillColor="rgba(59, 130, 246, 0.5)"
  squareSize={32}
/>

<div style={{ position: "relative", height: 200 }}>
  <SquareBackground className="absolute inset-0" />
</div>
```
