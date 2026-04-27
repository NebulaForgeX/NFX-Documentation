# Preference — user preference

Constants, types and helpers for user preference (e.g. dashboard background, parse/serialize preference JSON). Parameters and Input/Output in types and source.

---

## Exports

| Name | Description |
|------|-------------|
| DashboardBackgroundEnum | Dashboard background enum |
| DEFAULT_DASHBOARD_BACKGROUND | Default background |
| DASHBOARD_BACKGROUND_VALUES | Enum values array |
| Preference | Preference type |
| parsePreferenceJson | Parse preference from JSON |
| preferenceToJson | Serialize preference to JSON |

---

## Import example

```tsx
import {
  DashboardBackgroundEnum,
  parsePreferenceJson,
  preferenceToJson,
  type Preference,
} from "nfx-ui/preference";
```

---

---

# 用户偏好

用户偏好相关常量、类型与工具函数（如仪表盘背景、解析/序列化偏好 JSON）。参数与 Input/Output 见类型定义与源码。

---

## 导出概览

| 名称 | 说明 |
|------|------|
| DashboardBackgroundEnum | 仪表盘背景枚举 |
| DEFAULT_DASHBOARD_BACKGROUND | 默认背景值 |
| DASHBOARD_BACKGROUND_VALUES | 枚举值数组 |
| Preference | 偏好对象类型 |
| parsePreferenceJson | 从 JSON 字符串解析偏好 |
| preferenceToJson | 将偏好序列化为 JSON |

---

## 引入示例

```tsx
import {
  DashboardBackgroundEnum,
  parsePreferenceJson,
  preferenceToJson,
  type Preference,
} from "nfx-ui/preference";
```