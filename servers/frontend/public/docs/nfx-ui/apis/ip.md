# ip（URL 与端点）/ URL and Endpoints

API 路径常量与端点、多语言 JSON URL。参数与 Input/Output 见下表。  
API path constants, endpoints and locale JSON URL. Parameters and Input/Output below.

---

## 引入 / Import

```ts
import { URL_PATHS, API_ENDPOINTS, getAnalyticsLocaleJsonUrl } from "@/apis";
import type { URL_PATHS_TYPE, API_ENDPOINTS_TYPE } from "@/apis";
```

---

## 导出 / Exports

| 名称 Name | 类型 Type | 说明 Description |
|-----------|-----------|------------------|
| URL_PATHS | object | 路由/URL 路径常量 Route/URL path constants |
| API_ENDPOINTS | object | API 端点常量 API endpoint constants |
| getAnalyticsLocaleJsonUrl(lang, namespace) | function | 返回分析/多语言 JSON 的 URL Returns analytics/locale JSON URL |
| URL_PATHS_TYPE | type | URL_PATHS 的类型 Type of URL_PATHS |
| API_ENDPOINTS_TYPE | type | API_ENDPOINTS 的类型 Type of API_ENDPOINTS |

---

## 输入 Input / 输出 Output

- **getAnalyticsLocaleJsonUrl(lang, namespace)**  
  - **Input**：lang — 语言代码；namespace — 命名空间。lang: language code; namespace: namespace.  
  - **Output**：string — URL 字符串。URL string.

具体键与值见 `src/apis/ip.ts`。See `src/apis/ip.ts` for keys and values.
