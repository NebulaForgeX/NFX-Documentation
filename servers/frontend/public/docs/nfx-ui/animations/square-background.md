# SquareBackground / 方块背景

网格方块动画背景，支持方向、速度、颜色与悬停高亮。  
Grid square animation background with direction, speed, color and hover highlight.

---

## 引入 / Import

```tsx
import { SquareBackground } from "nfx-ui/animations";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| direction | `"diagonal"` \| `"up"` \| `"right"` \| `"down"` \| `"left"` | No | `"right"` | 方块移动方向。Direction of movement. |
| speed | number | No | 1 | 动画速度。Animation speed. |
| borderColor | string \| CanvasGradient \| CanvasPattern | No | `"#999"` | 边框颜色。Border color. |
| squareSize | number | No | 40 | 单格边长（px）。Side length per cell (px). |
| hoverFillColor | string \| CanvasGradient \| CanvasPattern | No | `"#222"` | 悬停填充色。Fill color on hover. |
| className | string | No | — | 容器类名。Container class. |
| style | CSSProperties | No | — | 容器样式。Container style. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props（可选）。Optional props above.
- **Output**：渲染 Canvas 网格方块动画。Renders a canvas grid square animation.

---

## 示例 / Example

```tsx
// 默认向右流动 / Default: flow right
<SquareBackground />

// 对角线、更快 / Diagonal, faster
<SquareBackground direction="diagonal" speed={2} />

// 自定义颜色与格子大小 / Custom colors and cell size
<SquareBackground
  borderColor="#333"
  hoverFillColor="rgba(59, 130, 246, 0.5)"
  squareSize={32}
/>

// 作为区块背景 / As section background
<div style={{ position: "relative", height: 200 }}>
  <SquareBackground className="absolute inset-0" />
</div>
```
