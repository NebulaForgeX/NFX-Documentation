# lstorage

Safe localStorage wrapper; does not throw in private/incognito mode; silently returns on read/write failure.

---

## Import

```ts
import { getItem, setItem, removeItem } from "nfx-ui/utils";
```

---

## getItem

Get value by key. Returns `undefined` or `null` if localStorage unavailable or key missing.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| key | string | Yes | — | Storage key. |

**Output:** string \| null \| undefined.

---

## setItem

Set key-value. Silently no-op if localStorage unavailable.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| key | string | Yes | — | Storage key. |
| value | string | Yes | — | String value to store. |

**Output:** void.

---

## removeItem

Remove key. Silently no-op if localStorage unavailable.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| key | string | Yes | — | Storage key to remove. |

**Output:** void.

---

## Example

```ts
import { getItem, setItem, removeItem } from "nfx-ui/utils";

setItem("user-theme", "dark");
const theme = getItem("user-theme");
removeItem("user-theme");
```

Suitable for persisting theme, language, layout preferences; avoids crashes in private mode.

---

---

# lstorage — 本地存储封装

localStorage 安全封装，在隐私模式、无痕模式等场景下不会抛错；读写失败时静默返回。

---

## 引入

```ts
import { getItem, setItem, removeItem } from "nfx-ui/utils";
```

---

## getItem

读取指定 key 的值。若 localStorage 不可用或 key 不存在，返回 `undefined` 或 `null`。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| key | string | 是 | — | 存储键。 |

**输出：** string \| null \| undefined。

---

## setItem

写入 key-value。若 localStorage 不可用则静默忽略，不抛错。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| key | string | 是 | — | 存储键。 |
| value | string | 是 | — | 要存储的字符串。 |

**输出：** void。

---

## removeItem

删除指定 key。若 localStorage 不可用则静默忽略。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| key | string | 是 | — | 要删除的存储键。 |

**输出：** void。

---

## 示例

```ts
import { getItem, setItem, removeItem } from "nfx-ui/utils";

setItem("user-theme", "dark");
const theme = getItem("user-theme");
removeItem("user-theme");
```

适用于主题、语言、布局等偏好持久化；在隐私模式下不会导致应用崩溃。
