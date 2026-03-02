# LetterGlitchBackground

Letter glitch-style background with random character grid and color shifts.

---

## Import

```tsx
import { LetterGlitchBackground } from "nfx-ui/animations";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| glitchColors | string[] | No | `["#2b4539", "#61dca3", "#61b3dc"]` | Glitch color palette. |
| glitchSpeed | number | No | 500 | Color/char change interval (ms). |
| centerVignette | boolean | No | false | Enable center vignette. |
| outerVignette | boolean | No | true | Enable outer vignette. |
| smooth | boolean | No | true | Smooth transitions. |
| characters | string | No | alphanumeric set | Character set for random. |
| className | string | No | — | Container class. |
| style | CSSProperties | No | — | Container style. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a canvas letter glitch animation.

---

## Example

```tsx
<LetterGlitchBackground />

<LetterGlitchBackground
  glitchColors={["#1a1a2e", "#16213e", "#0f3460"]}
  glitchSpeed={300}
/>

<div style={{ position: "relative", minHeight: "100vh" }}>
  <LetterGlitchBackground className="absolute inset-0" style={{ opacity: 0.6 }} />
  <main>...</main>
</div>
```

---

---

# LetterGlitchBackground — 字母故障背景

字母故障（Glitch）风格背景，随机字符网格带颜色与渐变变化。

---

## 引入

```tsx
import { LetterGlitchBackground } from "nfx-ui/animations";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| glitchColors | string[] | 否 | `["#2b4539", "#61dca3", "#61b3dc"]` | 故障色列表。 |
| glitchSpeed | number | 否 | 500 | 颜色/字符变化间隔（ms）。 |
| centerVignette | boolean | 否 | false | 是否启用中心暗角。 |
| outerVignette | boolean | 否 | true | 是否启用外圈暗角。 |
| smooth | boolean | 否 | true | 是否平滑过渡。 |
| characters | string | 否 | 字母数字符号串 | 参与随机的字符集。 |
| className | string | 否 | — | 容器类名。 |
| style | CSSProperties | 否 | — | 容器样式。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染 Canvas 字母故障动画。

---

## 示例

```tsx
<LetterGlitchBackground />

<LetterGlitchBackground
  glitchColors={["#1a1a2e", "#16213e", "#0f3460"]}
  glitchSpeed={300}
/>

<div style={{ position: "relative", minHeight: "100vh" }}>
  <LetterGlitchBackground className="absolute inset-0" style={{ opacity: 0.6 }} />
  <main>...</main>
</div>
```
