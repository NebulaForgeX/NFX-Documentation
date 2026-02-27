# Utils 工具函数 / Utility Functions

从 `nfx-ui` 导出的工具函数：地址、数组、API 错误、颜色、邮箱、表单、对象、电话、轮询、价格、Promise、Result、重试、单例、Suspense、时间等。  
Exported utilities: address, array, API error, colors, email, form, object, phone, polling, price, promise, result, retry, singleton, suspense, time, etc.

---

## 入口 / Entry

```ts
import {
  normalizeAddress,
  getApiError,
  getApiErrorMessage,
  mergeById,
  pruneArray,
  toRgbaWithAlpha,
  isValidEmail,
  toTextInputValue,
  omit,
  getCountryCode,
  isValidPhoneNumber,
  pollUntil,
  toDisplayPrice,
  onceAsync,
  ok,
  err,
  withRetryResult,
  singleton,
  suspenseIfNull,
  formatDisplayDate,
  formatRelativeTime,
} from "nfx-ui";
```

---

## 文档（按模块）/ Docs by module

| 模块 Module | 说明 Description | 文档 Doc |
|-------------|------------------|----------|
| address | 地址规范化 Address normalize | [address.md](./address.md) |
| apiError | API 错误解析 API error parse | [api-error.md](./api-error.md) |
| array | 数组合并、裁剪 Array merge/prune | [array.md](./array.md) |
| colors | 颜色转换、插值 Color convert/interpolate | [colors.md](./colors.md) |
| email | 邮箱校验 Email validate | [email.md](./email.md) |
| form | 表单值转换 Form value convert | [form.md](./form.md) |
| object | omit 等对象工具 Object utils (omit) | [object.md](./object.md) |
| phone | 电话、国家码 Phone, country code | [phone.md](./phone.md) |
| polling | 轮询直到条件满足 Poll until condition | [polling.md](./polling.md) |
| price | 价格显示与存储转换 Price display/storage | [price.md](./price.md) |
| promise | onceAsync、onceAsyncByKey Promise once | [promise.md](./promise.md) |
| result | Result、ok、err Result type | [result.md](./result.md) |
| retry | withRetryResult Retry | [retry.md](./retry.md) |
| singleton | 单例包装 Singleton wrapper | [singleton.md](./singleton.md) |
| suspense | suspenseIfNull Suspense helper | [suspense.md](./suspense.md) |
| time | 日期时间格式化 Date/time format | [time.md](./time.md) |
| types | createMap 等 Type/runtime utils | [types.md](./types.md) |
