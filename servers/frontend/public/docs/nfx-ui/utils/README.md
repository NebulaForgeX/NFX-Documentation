# Utils — utility functions

Exported utilities from **`nfx-ui/utils`**: address, array, API error, colors, email, form, object, polling, price, promise, result, retry, safe, singleton, suspense, time, random, idle, lstorage, types.

---

## Entry

```ts
import {
  normalizeAddress,
  getApiError,
  getApiErrorMessage,
  mergeById,
  pruneArray,
  toRgbaWithAlpha,
  interpolateColorHex,
  isValidEmail,
  toTextInputValue,
  toNumberInputValue,
  omit,
  pollUntil,
  toDisplayPrice,
  onceAsync,
  onceAsyncByKey,
  ok,
  err,
  withRetryResult,
  singleton,
  suspenseIfNull,
  formatDisplayDate,
  formatRelativeTime,
  getItem,
  setItem,
  removeItem,
  safeNullable,
  safeMaybe,
  safeNilable,
  safeArray,
  safeZeroable,
  safeStringable,
  safeOr,
  safeNum,
  createMap,
  scheduleBrowserIdleTask,
  randomBetween,
  pickRandom,
} from "nfx-ui/utils";
```

---

## Import example

```ts
import {
  normalizeAddress,
  getApiErrorMessage,
  mergeById,
  toRgbaWithAlpha,
  isValidEmail,
  ok,
  err,
  withRetryResult,
  formatDisplayDate,
} from "nfx-ui/utils";

normalizeAddress("  New York  NY  ");
getApiErrorMessage(e, "Request failed");
mergeById(list, added, (x) => x.id, "append", "upsert");
toRgbaWithAlpha("#ff0000", 0.5);
isValidEmail("a@b.com");
const [data, errResult] = await withRetryResult(fn, { retries: 3 });
formatDisplayDate("2025-02-27");
```

## Docs by module

| Module | Description | Doc |
|--------|-------------|-----|
| address | Address normalize | [address.md](./address.md) |
| apiError | API error parse | [api-error.md](./api-error.md) |
| array | Array merge/prune | [array.md](./array.md) |
| colors | Color convert/interpolate | [colors.md](./colors.md) |
| random | Random helpers | [random.md](./random.md) |
| email | Email validate | [email.md](./email.md) |
| form | Form value convert | [form.md](./form.md) |
| object | Object utils (omit) | [object.md](./object.md) |
| polling | Poll until condition | [polling.md](./polling.md) |
| price | Price display/storage | [price.md](./price.md) |
| promise | onceAsync, onceAsyncByKey | [promise.md](./promise.md) |
| result | Result, ok, err | [result.md](./result.md) |
| retry | withRetryResult | [retry.md](./retry.md) |
| safe | safeNullable, safeMaybe, etc. | [safe.md](./safe.md) |
| singleton | Singleton wrapper | [singleton.md](./singleton.md) |
| suspense | suspenseIfNull | [suspense.md](./suspense.md) |
| time | Date/time format | [time.md](./time.md) |
| types | createMap | [types.md](./types.md) |
| lstorage | getItem / setItem / removeItem | [lstorage.md](./lstorage.md) |
| idle | scheduleBrowserIdleTask | [idle.md](./idle.md) |

---

---

# 工具函数

从 **`nfx-ui/utils`** 子路径导出的工具函数：地址、数组、API 错误、颜色、邮箱、表单、对象、轮询、价格、Promise、Result、重试、safe、单例、Suspense、时间、随机、idle、本地存储等。

---

## 入口

```ts
import {
  normalizeAddress,
  getApiError,
  getApiErrorMessage,
  mergeById,
  pruneArray,
  toRgbaWithAlpha,
  interpolateColorHex,
  isValidEmail,
  toTextInputValue,
  toNumberInputValue,
  omit,
  pollUntil,
  toDisplayPrice,
  onceAsync,
  onceAsyncByKey,
  ok,
  err,
  withRetryResult,
  singleton,
  suspenseIfNull,
  formatDisplayDate,
  formatRelativeTime,
  getItem,
  setItem,
  removeItem,
  safeNullable,
  safeMaybe,
  safeNilable,
  safeArray,
  safeZeroable,
  safeStringable,
  safeOr,
  safeNum,
  createMap,
  scheduleBrowserIdleTask,
} from "nfx-ui/utils";
```

---

## 引入示例

```ts
import {
  normalizeAddress,
  getApiErrorMessage,
  mergeById,
  toRgbaWithAlpha,
  isValidEmail,
  ok,
  err,
  withRetryResult,
  formatDisplayDate,
} from "nfx-ui/utils";

normalizeAddress("  北京 朝阳  ");
getApiErrorMessage(e, "请求失败");
mergeById(list, added, (x) => x.id, "append", "upsert");
toRgbaWithAlpha("#ff0000", 0.5);
isValidEmail("a@b.com");
const [data, errResult] = await withRetryResult(fn, { retries: 3 });
formatDisplayDate("2025-02-27");
```

## 文档（按模块）

| 模块 | 说明 | 文档 |
|------|------|------|
| address | 地址规范化 | [address.md](./address.md) |
| apiError | API 错误解析 | [api-error.md](./api-error.md) |
| array | 数组合并、裁剪 | [array.md](./array.md) |
| colors | 颜色转换、插值 | [colors.md](./colors.md) |
| random | 随机工具 | [random.md](./random.md) |
| email | 邮箱校验 | [email.md](./email.md) |
| form | 表单值转换 | [form.md](./form.md) |
| object | omit 等对象工具 | [object.md](./object.md) |
| polling | 轮询直到条件满足 | [polling.md](./polling.md) |
| price | 价格显示与存储转换 | [price.md](./price.md) |
| promise | onceAsync、onceAsyncByKey | [promise.md](./promise.md) |
| result | Result、ok、err | [result.md](./result.md) |
| retry | withRetryResult | [retry.md](./retry.md) |
| safe | safeNullable、safeMaybe 等 | [safe.md](./safe.md) |
| singleton | 单例包装 | [singleton.md](./singleton.md) |
| suspense | suspenseIfNull | [suspense.md](./suspense.md) |
| time | 日期时间格式化 | [time.md](./time.md) |
| types | createMap | [types.md](./types.md) |
| lstorage | 本地存储封装 | [lstorage.md](./lstorage.md) |
| idle | scheduleBrowserIdleTask | [idle.md](./idle.md) |
