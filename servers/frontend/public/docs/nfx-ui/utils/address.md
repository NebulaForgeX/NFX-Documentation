# normalizeAddress

Normalizes an address string (trim, uniform format, etc.).

---

## Import

```ts
import { normalizeAddress } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| address | string | Yes | — | Raw address string. |

---

## Input / Output

- **Input:** address — e.g. `"  Beijing Chaoyang  "`.
- **Output:** string — normalized address string.

---

## Example

```ts
const raw = "  Beijing Chaoyang  ";
const out = normalizeAddress(raw);
```

---

---

# normalizeAddress — 地址规范化

规范化地址字符串（去空白、统一格式等）。

---

## 引入

```ts
import { normalizeAddress } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| address | string | 是 | — | 原始地址字符串。 |

---

## 输入 / 输出

- **输入：** address — 例如 `"  北京市 朝阳区  "`。
- **输出：** string — 规范化后的地址。

---

## 示例

```ts
const raw = "  北京市 朝阳区  ";
const out = normalizeAddress(raw);
```
