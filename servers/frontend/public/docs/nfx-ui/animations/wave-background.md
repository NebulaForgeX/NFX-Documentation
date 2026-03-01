# WaveBackground / 波浪背景

波浪线背景，线条颜色会随当前主题主色变化，适合作为页面或区块背景。  
Wave line background; line color follows theme primary; suitable as page or section background.

---

## 引入 / Import

```tsx
import { WaveBackground } from "nfx-ui/animations";
```

---

## 参数 / Parameters

（不暴露 `lineColor`、`backgroundColor`，由组件内部从主题读取。Not exposed; read from theme internally. 下表默认值为 **WaveBackground** 包装器所使用；底层 Waves 组件默认值不同。Default values below are used by the **WaveBackground** wrapper.)

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| waveSpeedX | number | No | 0.05 | 波浪 X 方向速度。Wave speed on X axis. |
| waveSpeedY | number | No | 0.01 | 波浪 Y 方向速度。Wave speed on Y axis. |
| waveAmpX | number | No | 40 | X 方向振幅。Amplitude on X. |
| waveAmpY | number | No | 20 | Y 方向振幅。Amplitude on Y. |
| xGap | number | No | 10 | 横向网格间距。Horizontal grid gap. |
| yGap | number | No | 32 | 纵向网格间距。Vertical grid gap. |
| friction | number | No | 0.925 | 摩擦系数。Friction. |
| tension | number | No | 0.005 | 张力。Tension. |
| maxCursorMove | number | No | 100 | 鼠标影响最大位移。Max cursor influence. |
| style | CSSProperties | No | — | 容器样式。Container style. |
| className | string | No | — | 容器类名。Container class. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props（可选）。Optional props above.
- **Output**：渲染全屏或指定区域的 Canvas 波浪动画。Renders a canvas-based wave animation.

---

## 示例 / Example

```tsx
// 默认：使用主题主色 / Default: uses theme primary
<WaveBackground />

// 全屏背景 / Full-screen background
<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <WaveBackground className="absolute inset-0" />
  <div className="content">...</div>
</div>

// 调整波浪参数 / Custom wave params
<WaveBackground waveSpeedX={0.08} waveAmpX={60} />
```

需在 `ThemeProvider` 内使用。 Must be used inside `ThemeProvider`.
