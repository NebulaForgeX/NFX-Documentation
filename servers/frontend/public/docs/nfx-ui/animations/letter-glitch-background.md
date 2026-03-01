# LetterGlitchBackground / 字母故障背景

字母故障（Glitch）风格背景，随机字符网格带颜色与渐变变化。  
Letter glitch-style background with random character grid and color shifts.

---

## 引入 / Import

```tsx
import { LetterGlitchBackground } from "nfx-ui/animations";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| glitchColors | string[] | No | `["#2b4539", "#61dca3", "#61b3dc"]` | 故障色列表。Glitch color palette. |
| glitchSpeed | number | No | 500 | 颜色/字符变化间隔（ms）。Color/char change interval (ms). |
| centerVignette | boolean | No | false | 是否启用中心暗角。Enable center vignette. |
| outerVignette | boolean | No | true | 是否启用外圈暗角。Enable outer vignette. |
| smooth | boolean | No | true | 是否平滑过渡。Smooth transitions. |
| characters | string | No | 字母数字符号串 | 参与随机的字符集。Character set for random. |
| className | string | No | — | 容器类名。Container class. |
| style | CSSProperties | No | — | 容器样式。Container style. |

---

## 输入 Input / 输出 Output

- **Input**：上述 props（可选）。Optional props above.
- **Output**：渲染 Canvas 字母故障动画。Renders a canvas letter glitch animation.

---

## 示例 / Example

```tsx
// 默认 / Default
<LetterGlitchBackground />

// 自定义颜色与速度 / Custom colors and speed
<LetterGlitchBackground
  glitchColors={["#1a1a2e", "#16213e", "#0f3460"]}
  glitchSpeed={300}
/>

// 全屏背景 / Full-screen background
<div style={{ position: "relative", minHeight: "100vh" }}>
  <LetterGlitchBackground className="absolute inset-0" style={{ opacity: 0.6 }} />
  <main>...</main>
</div>
```
