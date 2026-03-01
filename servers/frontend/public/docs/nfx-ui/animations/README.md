# Animations 动效与加载 / Animations & Loaders

所有动效与加载组件均从 **`nfx-ui/animations`** 按名引入，无需单独引入 CSS。  
All animation and loading components are imported by name from **`nfx-ui/animations`**; no separate CSS import.

---

## 组件列表 / Component list

| 组件 Component | 说明 Description | 文档 Doc |
|----------------|------------------|----------|
| ECGLoading | 心电图风格加载 ECG-style loader | [ecg-loading.md](./ecg-loading.md) |
| TruckLoading | 卡车行驶风格加载 Truck-style loader | [truck-loading.md](./truck-loading.md) |
| BounceLoading | 弹跳方块/圆点加载 Bouncing square/circle loader | [bounce-loading.md](./bounce-loading.md) |
| WaveBackground | 波浪背景（随主题色） Wave background (theme-aware) | [wave-background.md](./wave-background.md) |
| SquareBackground | 网格方块背景 Grid square background | [square-background.md](./square-background.md) |
| LetterGlitchBackground | 字母故障风格背景 Letter glitch background | [letter-glitch-background.md](./letter-glitch-background.md) |
| PixelBlastBackground | 像素爆炸风格背景（WebGL） Pixel blast background (WebGL) | [pixel-blast-background.md](./pixel-blast-background.md) |

---

## 引入示例 / Import example

```tsx
import {
  ECGLoading,
  TruckLoading,
  BounceLoading,
  WaveBackground,
  SquareBackground,
  LetterGlitchBackground,
  PixelBlastBackground,
} from "nfx-ui/animations";
```
