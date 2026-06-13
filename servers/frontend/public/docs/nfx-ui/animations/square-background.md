# SquareBackground

Canvas grid-square animation background with directional scroll and hover cell highlight. Border color, hover fill color, and vignette edge color are derived from the current theme (`border5` / `fg`, `bg3` / `border3`, `fgHeading`). Parent must provide width and height (canvas fills 100% of its box).

---

## Import

```tsx
import { SquareBackground } from "nfx-ui/animations";
```

---

## Parameters

`borderColor` and `hoverFillColor` are not exposed; they are set internally from the theme. Default values below are those applied by the **SquareBackground** wrapper (overriding the base `Squares` defaults).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| direction | `"diagonal"` \| `"up"` \| `"right"` \| `"down"` \| `"left"` | No | `"diagonal"` | Direction of grid scroll animation. |
| speed | number | No | `0.5` | Scroll speed (minimum effective value `0.1`). |
| squareSize | number | No | `40` | Side length of each grid cell (px). |
| className | string | No | `""` | Class name appended to the `canvas` element. |
| style | `CSSProperties` | No | `{}` | Inline styles on the `canvas` element. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a full-size `canvas` with animated grid lines, hover fill on the cell under the cursor, and radial vignette overlay.

---

## Example

```tsx
<SquareBackground />

<SquareBackground direction="right" speed={1} />

<SquareBackground squareSize={32} />

<div style={{ position: "relative", width: "100%", height: 200 }}>
  <SquareBackground />
</div>
```

Must be used inside `ThemeProvider` so colors follow the theme.

---

---

# SquareBackground — 方块背景

Canvas 网格方块动画背景，支持方向滚动与悬停格高亮。边框色、悬停填充色与暗角边缘色由当前主题派生（`border5` / `fg`、`bg3` / `border3`、`fgHeading`）。父级须提供宽高（canvas 填满其盒子）。

---

## 引入

```tsx
import { SquareBackground } from "nfx-ui/animations";
```

---

## 参数

不暴露 `borderColor`、`hoverFillColor`，由组件内部从主题读取。下表默认值为 **SquareBackground** 包装器所使用（覆盖底层 `Squares` 默认值）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| direction | `"diagonal"` \| `"up"` \| `"right"` \| `"down"` \| `"left"` | 否 | `"diagonal"` | 网格滚动方向。 |
| speed | number | 否 | `0.5` | 滚动速度（有效最小值 `0.1`）。 |
| squareSize | number | 否 | `40` | 单格边长（px）。 |
| className | string | 否 | `""` | 追加到 `canvas` 的类名。 |
| style | `CSSProperties` | 否 | `{}` | `canvas` 上的内联样式。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染全尺寸 `canvas`：动画网格线、光标所在格填充高亮、径向暗角叠加。

---

## 示例

```tsx
<SquareBackground />

<SquareBackground direction="right" speed={1} />

<SquareBackground squareSize={32} />

<div style={{ position: "relative", width: "100%", height: 200 }}>
  <SquareBackground />
</div>
```

需在 `ThemeProvider` 内使用，颜色才会跟随主题。
