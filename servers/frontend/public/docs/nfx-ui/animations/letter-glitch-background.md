# LetterGlitchBackground

Canvas letter glitch background with a random character grid and color shifts. Glitch colors are derived from the current theme (`primary`, `info`, `success`). Container background uses `--color-bg`.

---

## Import

```tsx
import { LetterGlitchBackground } from "nfx-ui/animations";
```

---

## Parameters

`glitchColors` is not exposed; it is set internally from the theme. Default values below are those applied by the **LetterGlitchBackground** wrapper (overriding the base `LetterGlitch` defaults).

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| glitchSpeed | number | No | `300` | Minimum interval (ms) between character/color batch updates. |
| centerVignette | boolean | No | `true` | Show center dark vignette overlay. |
| outerVignette | boolean | No | `false` | Show outer edge dark vignette overlay. |
| smooth | boolean | No | `true` | Animate color transitions between glitch updates. |
| characters | string | No | `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$&*()-_+=/[]{};:<>.,0123456789` | Character pool for random glyphs. |
| className | string | No | `""` | Class name appended to the container `div`. |
| style | `CSSProperties` | No | `{}` | Inline styles on the container `div`. |

---

## Input / Output

- **Input:** Optional props above.
- **Output:** Renders a container `div` with full-size `canvas` letter grid animation and optional vignette overlays. Resizes on window resize (debounced 100 ms).

---

## Example

```tsx
<LetterGlitchBackground />

<LetterGlitchBackground glitchSpeed={500} outerVignette />

<LetterGlitchBackground characters="01" />

<div style={{ position: "relative", minHeight: "100vh" }}>
  <LetterGlitchBackground style={{ opacity: 0.6 }} />
  <main>...</main>
</div>
```

Must be used inside `ThemeProvider` so glitch colors follow the theme.

---

---

# LetterGlitchBackground — 字母故障背景

Canvas 字母故障（Glitch）风格背景，随机字符网格带颜色变化。故障色由当前主题派生（`primary`、`info`、`success`）。容器背景使用 `--color-bg`。

---

## 引入

```tsx
import { LetterGlitchBackground } from "nfx-ui/animations";
```

---

## 参数

不暴露 `glitchColors`，由组件内部从主题读取。下表默认值为 **LetterGlitchBackground** 包装器所使用（覆盖底层 `LetterGlitch` 默认值）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| glitchSpeed | number | 否 | `300` | 字符/颜色批量更新的最小间隔（ms）。 |
| centerVignette | boolean | 否 | `true` | 是否显示中心暗角叠加层。 |
| outerVignette | boolean | 否 | `false` | 是否显示外圈暗角叠加层。 |
| smooth | boolean | 否 | `true` | 是否在故障更新之间平滑过渡颜色。 |
| characters | string | 否 | `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$&*()-_+=/[]{};:<>.,0123456789` | 随机字符池。 |
| className | string | 否 | `""` | 追加到容器 `div` 的类名。 |
| style | `CSSProperties` | 否 | `{}` | 容器 `div` 上的内联样式。 |

---

## 输入 / 输出

- **输入：** 上述 props（可选）。
- **输出：** 渲染容器 `div`、全尺寸 `canvas` 字母网格动画及可选暗角层。窗口 resize 时防抖（100 ms）重算网格。

---

## 示例

```tsx
<LetterGlitchBackground />

<LetterGlitchBackground glitchSpeed={500} outerVignette />

<LetterGlitchBackground characters="01" />

<div style={{ position: "relative", minHeight: "100vh" }}>
  <LetterGlitchBackground style={{ opacity: 0.6 }} />
  <main>...</main>
</div>
```

需在 `ThemeProvider` 内使用，故障色才会跟随主题。
