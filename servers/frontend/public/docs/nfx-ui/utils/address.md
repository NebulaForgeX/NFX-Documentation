# normalizeAddress

Normalizes an address string: trim and collapse consecutive whitespace to a single space.

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

- **Input:** address — e.g. `"  Beijing   Chaoyang  "`.
- **Output:** string — trimmed, internal runs of whitespace replaced with single space.

---

## Example

```ts
normalizeAddress("  Beijing   Chaoyang  "); // "Beijing Chaoyang"
```

---

---

# normalizeAddress — 地址规范化

规范化地址字符串：去除首尾空白，并将连续空白合并为单个空格。

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

- **输入：** address — 例如 `"  北京市   朝阳区  "`。
- **输出：** string — 去首尾空白、内部连续空白合并为单空格。

---

## 示例

```ts
normalizeAddress("  北京市   朝阳区  "); // "北京市 朝阳区"
```
