# Types 类型定义 / Type Definitions

从 `nfx-ui` 导出的共享 TypeScript 类型与 API 相关类型。  
Shared TypeScript and API-related types exported from `nfx-ui`.

---

## 入口 / Entry

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, ListDTOWithNextCursor, Nullable, Maybe, Result } from "nfx-ui";
```

---

## 引入示例 / Import example

```ts
import type { ApiErrorBody, ListDTOWithTotalNumber, Nullable, Maybe } from "nfx-ui";
import { ok, err } from "nfx-ui";

// 类型注解 / Type annotations
const errorBody: ApiErrorBody = { status: 400, message: "Bad request" };
const list: ListDTOWithTotalNumber<{ id: string }> = { items: [], total: 0 };
const name: Nullable<string> = "Alice";

// Result 构造 / Result constructors
const [data, error] = ok(42);   // [42, null]
const [d2, e2] = err(new Error("x")); // [null, Error]
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [api.md](./api.md) | API 相关：ApiErrorBody、ListDTO、OffsetLimit 等 API types |
| [utils.md](./utils.md) | 类型工具：Nullable、Maybe、Defined、KeyOf 等 Type utils |
