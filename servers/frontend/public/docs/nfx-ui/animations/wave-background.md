# WaveBackground

Canvas wave-line background with mouse/touch interaction. Line color is derived from the current theme primary color (lightened); background is transparent. The root container is absolutely positioned and fills its parent (`width` / `height` 100%).

---

## Import

```tsx
import { WaveBackground } from "nfx-ui/animations";
```

---

## Parameters

`lineColor` and `backgroundColor` are not exposed; they are set internally from the theme. Default values below are those applied by the **WaveBackground** wrapper (overriding the base `Waves` defaults).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| waveSpeedX | number | No | `0.05` | Perlin noise time factor on the X axis. |
| waveSpeedY | number | No | `0.01` | Perlin noise time factor on the Y axis. |
| waveAmpX | number | No | `40` | Wave displacement amplitude on X. |
| waveAmpY | number | No | `20` | Wave displacement amplitude on Y. |
| xGap | number | No | `10` | Horizontal spacing between grid columns (px). |
| yGap | number | No | `32` | Vertical spacing between grid rows (px). |
| friction | number | No | `0.925` | Cursor influence friction (velocity damping). |
| tension | number | No | `0.005` | Spring tension pulling cursor offset back to zero. |
| maxCursorMove | number | No | `100` | Maximum cursor-induced displacement per axis (px). |
| style | `CSSProperties` | No | `{}` | Inline styles merged onto the container (after built-in layout styles). |
| className | string | No | `""` | Class name appended to the container. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders an absolutely positioned `div` with a full-size `canvas` wave animation. Responds to `mousemove` and `touchmove` on the window.

---

## Example

```tsx
<WaveBackground />

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <WaveBackground />
  <div className="content">...</div>
</div>

<WaveBackground waveSpeedX={0.08} waveAmpX={60} />
```

Must be used inside `ThemeProvider` so line color follows the theme.

---

---

# WaveBackground — 波浪背景

Canvas 波浪线背景，支持鼠标/触摸交互。线条颜色由当前主题主色派生（变浅），背景透明。根容器绝对定位并填满父级（`width` / `height` 100%）。

---

## 引入

```tsx
import { WaveBackground } from "nfx-ui/animations";
```

---

## 参数

不暴露 `lineColor`、`backgroundColor`，由组件内部从主题读取。下表默认值为 **WaveBackground** 包装器所使用（覆盖底层 `Waves` 默认值）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| waveSpeedX | number | 否 | `0.05` | X 轴 Perlin 噪声时间因子。 |
| waveSpeedY | number | 否 | `0.01` | Y 轴 Perlin 噪声时间因子。 |
| waveAmpX | number | 否 | `40` | X 方向波浪位移振幅。 |
| waveAmpY | number | 否 | `20` | Y 方向波浪位移振幅。 |
| xGap | number | 否 | `10` | 网格列横向间距（px）。 |
| yGap | number | 否 | `32` | 网格行纵向间距（px）。 |
| friction | number | 否 | `0.925` | 光标影响摩擦系数（速度衰减）。 |
| tension | number | 否 | `0.005` | 弹簧张力，将光标偏移拉回零点。 |
| maxCursorMove | number | 否 | `100` | 单轴光标影响最大位移（px）。 |
| style | `CSSProperties` | 否 | `{}` | 合并到容器上的内联样式（在内置布局样式之后）。 |
| className | string | 否 | `""` | 追加到容器的类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染绝对定位的 `div` 及全尺寸 `canvas` 波浪动画。监听窗口 `mousemove` 与 `touchmove`。

---

## 示例

```tsx
<WaveBackground />

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <WaveBackground />
  <div className="content">...</div>
</div>

<WaveBackground waveSpeedX={0.08} waveAmpX={60} />
```

需在 `ThemeProvider` 内使用，线条颜色才会跟随主题。
