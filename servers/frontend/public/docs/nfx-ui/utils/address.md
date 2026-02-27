# normalizeAddress / 地址规范化

规范化地址字符串（去空白、统一格式等）。  
Normalizes an address string (trim, uniform format, etc.).

---

## 引入 / Import

```ts
import { normalizeAddress } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| address | string | Yes | — | 原始地址字符串。Raw address string. |

---

## 输入 Input / 输出 Output

- **Input**：`address` — 例如 `"  北京市 朝阳区  "`  
  Example: `"  Beijing Chaoyang  "`
- **Output**：string — 规范化后的地址，如 `"北京市 朝阳区"`  
  Normalized address string.

---

## 示例 / Example

```ts
const raw = "  北京市 朝阳区  ";
const out = normalizeAddress(raw);
// 输出 / Output: "北京市 朝阳区" (或项目约定格式)
```
