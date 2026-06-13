# Preference — user preference

Constants, types and helpers for user preference JSON (`profile.preference`). Root always has logical `nfx` slice; host extensions are parsed via `parseExtra` / `serializeExtra`.

---

## Exports

| Name | Description |
|------|-------------|
| NFX_PREFERENCE_ROOT_KEY | Literal `"nfx"` — JSON root key for NFX built-in slice. |
| NfxPreferenceSlice | Built-in fields: theme, base, language, layoutMode, dashboardBackground. |
| Preference&lt;TExtra&gt; | `{ nfx: NfxPreferenceSlice } & TExtra` — full in-memory preference. |
| DashboardBackgroundEnum | Dashboard background enum. |
| DEFAULT_DASHBOARD_BACKGROUND | Default background (`NONE`). |
| DASHBOARD_BACKGROUND_VALUES | Enum values array. |
| parsePreferenceJson | Parse preference from JSON string; normalizes missing/invalid `nfx`. |
| preferenceToJson | Serialize preference to JSON string. |

---

## NfxPreferenceSlice fields

| Field | Type | Description |
|-------|------|-------------|
| theme | ThemeEnum | Theme preference. |
| base | BaseEnum | Base color preference. |
| language | LanguageEnum | Language preference. |
| layoutMode | LayoutModeEnum | Sidebar layout mode. |
| dashboardBackground | DashboardBackgroundEnum | Dashboard background animation. |

---

## parsePreferenceJson / preferenceToJson

```ts
parsePreferenceJson(json, parseExtra?)
// Missing/invalid nfx → normalized to defaults (not null)
// parseExtra receives root object minus nfx key

preferenceToJson(preference, serializeExtra?)
// Writes { [NFX_PREFERENCE_ROOT_KEY]: nfxSliceToBackend(nfx), ...extra }
```

---

## Import example

```tsx
import {
  NFX_PREFERENCE_ROOT_KEY,
  DashboardBackgroundEnum,
  parsePreferenceJson,
  preferenceToJson,
  type NfxPreferenceSlice,
  type Preference,
} from "nfx-ui/preference";

parsePreferenceJson("{}");
// => { nfx: { theme, base, language, layoutMode, dashboardBackground defaults } }

const p = parsePreferenceJson('{"nfx":{},"my_app":{"k":1}}', (raw) => ({
  myApp: { k: Number((raw.my_app as { k?: unknown })?.k) || 0 },
}));
```

---

---

# 用户偏好

用户偏好相关常量、类型与工具函数（`profile.preference` JSON 约定）。根对象必有逻辑上的 `nfx` 块；宿主扩展通过 `parseExtra` / `serializeExtra` 处理。

---

## 导出概览

| 名称 | 说明 |
|------|------|
| NFX_PREFERENCE_ROOT_KEY | 字面量 `"nfx"` — JSON 根上 NFX 内置块的键名。 |
| NfxPreferenceSlice | 内置字段：theme、base、language、layoutMode、dashboardBackground。 |
| Preference&lt;TExtra&gt; | `{ nfx: NfxPreferenceSlice } & TExtra` — 内存中的完整偏好。 |
| DashboardBackgroundEnum | 仪表盘背景枚举。 |
| DEFAULT_DASHBOARD_BACKGROUND | 默认背景（`NONE`）。 |
| DASHBOARD_BACKGROUND_VALUES | 枚举值数组。 |
| parsePreferenceJson | 从 JSON 字符串解析；缺省/非法 `nfx` 会规范化后再合并扩展。 |
| preferenceToJson | 序列化为 JSON 字符串。 |

---

## NfxPreferenceSlice 字段

| 字段 | 类型 | 说明 |
|------|------|------|
| theme | ThemeEnum | 主题偏好。 |
| base | BaseEnum | 基础色偏好。 |
| language | LanguageEnum | 语言偏好。 |
| layoutMode | LayoutModeEnum | 侧栏布局模式。 |
| dashboardBackground | DashboardBackgroundEnum | 仪表盘背景动画。 |

---

## parsePreferenceJson / preferenceToJson

```ts
parsePreferenceJson(json, parseExtra?)
// 缺 nfx 或非法 nfx → 按默认值规范化（不因缺 nfx 返回 null）
// parseExtra 收到的是根对象去掉 nfx 后的键值

preferenceToJson(preference, serializeExtra?)
// 写出 { [NFX_PREFERENCE_ROOT_KEY]: nfxSliceToBackend(nfx), ...extra }
```

---

## 引入示例

```tsx
import {
  NFX_PREFERENCE_ROOT_KEY,
  DashboardBackgroundEnum,
  parsePreferenceJson,
  preferenceToJson,
  type NfxPreferenceSlice,
  type Preference,
} from "nfx-ui/preference";

parsePreferenceJson("{}");
// => { nfx: { theme、base、language、layoutMode、dashboardBackground 默认值 } }

const p = parsePreferenceJson('{"nfx":{},"my_app":{"k":1}}', (raw) => ({
  myApp: { k: Number((raw.my_app as { k?: unknown })?.k) || 0 },
}));
```
