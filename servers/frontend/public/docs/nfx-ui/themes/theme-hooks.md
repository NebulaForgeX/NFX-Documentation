# Theme Hooks

Hooks for consuming theme context and injecting CSS variables. Used internally by `ThemeProvider` and available for advanced scenarios.

---

## Import

```tsx
import {
  useTheme,
  useThemeVariables,
  useVariables,
  useBaseVariables,
  getThemeColorStorage,
  setThemeColorStorage,
  getThemeBaseStorage,
  setThemeBaseStorage,
  removeThemeStorage,
} from "nfx-ui/themes";
```

---

## 1. useTheme

Consumer hook inside `ThemeProvider`.

### Parameters

No parameters.

### Return value (`ThemeContextType`)

| Field | Type | Description |
|-------|------|-------------|
| currentTheme | Theme | Full theme (colors + base). |
| themeName | ThemeEnum | Current color theme key. |
| baseName | BaseEnum | Current base theme key. |
| setTheme | `(themeName: ThemeEnum) => void` | Switch color theme. |
| setBase | `(baseName: BaseEnum) => void` | Switch base theme (persisted). |
| availableThemes | ThemeEnum[] | All color theme options. |
| availableBases | BaseEnum[] | All base theme options. |

### Example

```tsx
const { currentTheme, themeName, setTheme, setBase } = useTheme();
setTheme(ThemeEnum.DARK);
setBase(BaseEnum.IOS);
```

---

## 2. useThemeVariables

Injects **color** CSS custom properties onto `document.documentElement` and persists color theme to `theme-color`.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| currentTheme | Theme | Yes | Full theme object. |
| themeName | ThemeEnum | Yes | Current color theme key (for persistence). |

### Return value

`void` — side-effect hook (no return).

### Example

```tsx
// Called inside ThemeProvider via useVariables
useThemeVariables(currentTheme, themeName);
```

Sets `--color-primary`, `--color-bg-2`, chart colors, temperature/solar/traffic/electricity/echarts/chartjs tokens, etc.

---

## 3. useBaseVariables

Injects **non-color** base tokens (radius, spacing, typography, motion, z-index) onto `:root`.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| base | BaseTheme | Yes | Base theme (e.g. `currentTheme.base`). |

### Return value

`void` — side-effect hook (no return).

### Example

```tsx
useBaseVariables(currentTheme.base);
```

Sets `--radius-button`, `--space-md`, `--font-family-base`, `--z-modal`, etc.

---

## 4. useVariables

Combines `useThemeVariables` + `useBaseVariables`. Used by `ThemeProvider`.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| currentTheme | Theme | Yes | Full theme object. |
| themeName | ThemeEnum | Yes | Current color theme key. |

### Return value

`void` — side-effect hook (no return).

### Example

```tsx
// Inside ThemeProvider
useVariables(currentTheme, themeName);
```

---

## Storage utils

| Function | Signature | Storage key | Description |
|----------|-----------|-------------|-------------|
| `getThemeColorStorage` | `() => Nilable<ThemeEnum>` | `theme-color` | Read saved color theme; validates against `THEME_VALUES`. |
| `setThemeColorStorage` | `(value: ThemeEnum) => void` | `theme-color` | Write color theme (called by `useThemeVariables`). |
| `getThemeBaseStorage` | `() => Nilable<BaseEnum>` | `theme-base` | Read saved base theme; validates against `BASE_VALUES`. |
| `setThemeBaseStorage` | `(value: BaseEnum) => void` | `theme-base` | Write base theme (called by `setBase` in ThemeProvider). |
| `removeThemeStorage` | `() => void` | both | Clear color and base keys. |

```tsx
import { removeThemeStorage } from "nfx-ui/themes";

// Reset persisted theme preferences
removeThemeStorage();
```

---

---

# 主题 Hooks

消费主题上下文与注入 CSS 变量的 Hooks。由 `ThemeProvider` 内部使用，也可用于高级场景。

---

## 引入

```tsx
import {
  useTheme,
  useThemeVariables,
  useVariables,
  useBaseVariables,
  getThemeColorStorage,
  setThemeColorStorage,
  getThemeBaseStorage,
  setThemeBaseStorage,
  removeThemeStorage,
} from "nfx-ui/themes";
```

---

## 1. useTheme

在 `ThemeProvider` 内使用的业务侧 Hook。

### 参数

无参数。

### 返回值（`ThemeContextType`）

| 字段 | 类型 | 说明 |
|------|------|------|
| currentTheme | Theme | 完整主题（颜色 + 基础）。 |
| themeName | ThemeEnum | 当前颜色主题键。 |
| baseName | BaseEnum | 当前基础主题键。 |
| setTheme | `(themeName: ThemeEnum) => void` | 切换颜色主题。 |
| setBase | `(baseName: BaseEnum) => void` | 切换基础主题（会持久化）。 |
| availableThemes | ThemeEnum[] | 所有颜色主题选项。 |
| availableBases | BaseEnum[] | 所有基础主题选项。 |

### 示例

```tsx
const { currentTheme, themeName, setTheme, setBase } = useTheme();
setTheme(ThemeEnum.DARK);
setBase(BaseEnum.IOS);
```

---

## 2. useThemeVariables

将**颜色** CSS 变量注入 `document.documentElement`，并将颜色主题持久化到 `theme-color`。

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| currentTheme | Theme | 是 | 完整主题对象。 |
| themeName | ThemeEnum | 是 | 当前颜色主题键（用于持久化）。 |

### 返回值

`void` — 副作用 Hook，无返回值。

### 示例

```tsx
// 由 ThemeProvider 通过 useVariables 调用
useThemeVariables(currentTheme, themeName);
```

设置 `--color-primary`、`--color-bg-2`、图表色、temperature/solar/traffic/electricity/echarts/chartjs 等 token。

---

## 3. useBaseVariables

将**非颜色**基础 token（圆角、间距、字号、动效、z-index）注入 `:root`。

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| base | BaseTheme | 是 | 基础主题（如 `currentTheme.base`）。 |

### 返回值

`void` — 副作用 Hook，无返回值。

### 示例

```tsx
useBaseVariables(currentTheme.base);
```

设置 `--radius-button`、`--space-md`、`--font-family-base`、`--z-modal` 等。

---

## 4. useVariables

组合 `useThemeVariables` + `useBaseVariables`，由 `ThemeProvider` 使用。

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| currentTheme | Theme | 是 | 完整主题对象。 |
| themeName | ThemeEnum | 是 | 当前颜色主题键。 |

### 返回值

`void` — 副作用 Hook，无返回值。

### 示例

```tsx
// ThemeProvider 内部
useVariables(currentTheme, themeName);
```

---

## 存储工具

| 函数 | 签名 | 存储键 | 说明 |
|------|------|--------|------|
| `getThemeColorStorage` | `() => Nilable<ThemeEnum>` | `theme-color` | 读取已保存颜色主题；校验 `THEME_VALUES`。 |
| `setThemeColorStorage` | `(value: ThemeEnum) => void` | `theme-color` | 写入颜色主题（由 `useThemeVariables` 调用）。 |
| `getThemeBaseStorage` | `() => Nilable<BaseEnum>` | `theme-base` | 读取已保存基础主题；校验 `BASE_VALUES`。 |
| `setThemeBaseStorage` | `(value: BaseEnum) => void` | `theme-base` | 写入基础主题（由 ThemeProvider 的 `setBase` 调用）。 |
| `removeThemeStorage` | `() => void` | 两者 | 清除颜色与基础键。 |

```tsx
import { removeThemeStorage } from "nfx-ui/themes";

removeThemeStorage();
```
