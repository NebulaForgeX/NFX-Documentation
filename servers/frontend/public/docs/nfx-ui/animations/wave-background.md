# WaveBackground

Wave line background; line color follows theme primary; suitable as page or section background.

---

## Import

```tsx
import { WaveBackground } from "nfx-ui/animations";
```

---

## Parameters

`lineColor` and `backgroundColor` are not exposed; they are read from theme internally. Default values below are used by the **WaveBackground** wrapper.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| waveSpeedX | number | No | 0.05 | Wave speed on X axis. |
| waveSpeedY | number | No | 0.01 | Wave speed on Y axis. |
| waveAmpX | number | No | 40 | Amplitude on X. |
| waveAmpY | number | No | 20 | Amplitude on Y. |
| xGap | number | No | 10 | Horizontal grid gap. |
| yGap | number | No | 32 | Vertical grid gap. |
| friction | number | No | 0.925 | Friction. |
| tension | number | No | 0.005 | Tension. |
| maxCursorMove | number | No | 100 | Max cursor influence. |
| style | CSSProperties | No | — | Container style. |
| className | string | No | — | Container class. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a canvas-based wave animation.

---

## Example

```tsx
<WaveBackground />

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <WaveBackground className="absolute inset-0" />
  <div className="content">...</div>
</div>

<WaveBackground waveSpeedX={0.08} waveAmpX={60} />
```

Must be used inside `ThemeProvider`.

---

---

# WaveBackground — 波浪背景

波浪线背景，线条颜色会随当前主题主色变化，适合作为页面或区块背景。

---

## 引入

```tsx
import { WaveBackground } from "nfx-ui/animations";
```

---

## 参数

不暴露 `lineColor`、`backgroundColor`，由组件内部从主题读取。下表默认值为 **WaveBackground** 包装器所使用。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| waveSpeedX | number | 否 | 0.05 | 波浪 X 方向速度。 |
| waveSpeedY | number | 否 | 0.01 | 波浪 Y 方向速度。 |
| waveAmpX | number | 否 | 40 | X 方向振幅。 |
| waveAmpY | number | 否 | 20 | Y 方向振幅。 |
| xGap | number | 否 | 10 | 横向网格间距。 |
| yGap | number | 否 | 32 | 纵向网格间距。 |
| friction | number | 否 | 0.925 | 摩擦系数。 |
| tension | number | 否 | 0.005 | 张力。 |
| maxCursorMove | number | 否 | 100 | 鼠标影响最大位移。 |
| style | CSSProperties | 否 | — | 容器样式。 |
| className | string | 否 | — | 容器类名。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染全屏或指定区域的 Canvas 波浪动画。

---

## 示例

```tsx
<WaveBackground />

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <WaveBackground className="absolute inset-0" />
  <div className="content">...</div>
</div>

<WaveBackground waveSpeedX={0.08} waveAmpX={60} />
```

需在 `ThemeProvider` 内使用。
