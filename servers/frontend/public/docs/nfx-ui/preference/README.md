# Preference 用户偏好 / User Preference

用户偏好相关常量、类型与工具函数（如仪表盘背景、解析/序列化偏好 JSON）。参数与 Input/Output 见类型定义与源码。  
Constants, types and helpers for user preference (e.g. dashboard background, parse/serialize preference JSON). Parameters and Input/Output in types and source.

---

## 导出概览 / Exports

| 名称 Name | 说明 Description |
|-----------|------------------|
| DashboardBackgroundEnum | 仪表盘背景枚举 Dashboard background enum |
| DEFAULT_DASHBOARD_BACKGROUND | 默认背景值 Default background |
| DASHBOARD_BACKGROUND_VALUES | 枚举值数组 Enum values array |
| Preference | 偏好对象类型 Preference type |
| parsePreferenceJson | 从 JSON 字符串解析偏好 Parse preference from JSON |
| preferenceToJson | 将偏好序列化为 JSON Serialize preference to JSON |
| getDefaultPreference | 获取默认偏好对象 Get default preference |

---

## 引入示例 / Import example

```tsx
import {
  DashboardBackgroundEnum,
  parsePreferenceJson,
  getDefaultPreference,
  type Preference,
} from "nfx-ui";
```
