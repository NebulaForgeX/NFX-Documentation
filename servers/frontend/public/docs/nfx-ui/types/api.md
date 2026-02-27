# API 相关类型 / API Types

请求与列表 DTO、分页参数、错误体等。与 hooks、constants 配合使用。  
Request/list DTOs, pagination params, error body; used with hooks and constants.

---

## 引入 / Import

```ts
import type {
  ApiErrorBody,
  ListDTOWithTotalNumber,
  ListDTOWithNextCursor,
  OffsetLimitNumber,
  OffsetLimitString,
} from "nfx-ui";
```

---

## 类型与说明 / Types and description

| 类型 Type | 说明 Description |
|-----------|------------------|
| ApiErrorBody | 错误响应体：status、errCode、message、details、traceId. Error response body. |
| ListDTOWithTotalNumber&lt;T&gt; | 列表+总数：`{ items: T[], total: number }`. List with total count. |
| ListDTOWithNextCursor&lt;T&gt; | 列表+游标：`{ items: T[], nextCursor: string }`. List with next cursor. |
| OffsetLimitNumber | 数字分页：offset、limit. Number-based pagination. |
| OffsetLimitString | 字符串游标分页。String cursor pagination. |

---

## 输入 Output 用法 / Input–output usage

- **Input**：请求参数或响应体符合上述类型。Request/response shapes match these types.
- **Output**：类型用于约束函数参数与返回值。Types constrain function params and return values.

详见源码 `src/types/api.ts`. See `src/types/api.ts` for full definitions.
