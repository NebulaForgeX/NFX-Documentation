# lstorage / 本地存储封装

localStorage 安全封装，在隐私模式、无痕模式等场景下不会抛错；读写失败时静默返回。  
Safe localStorage wrapper; does not throw in private/incognito mode; silently returns on read/write failure.

---

## 引入 / Import

```ts
import { getItem, setItem, removeItem } from "nfx-ui/utils";
```

---

## getItem

读取指定 key 的值。若 localStorage 不可用或 key 不存在，返回 `undefined` 或 `null`。  
Get value by key. Returns `undefined` or `null` if localStorage unavailable or key missing.

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| key | string | Yes | — | 存储键。Storage key. |

**Output**：`string | null | undefined`（Nilable&lt;string&gt;）。成功时为字符串，失败或不存在时为 null/undefined。

---

## setItem

写入 key-value。若 localStorage 不可用则静默忽略，不抛错。  
Set key-value. Silently no-op if localStorage unavailable.

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| key | string | Yes | — | 存储键。Storage key. |
| value | string | Yes | — | 要存储的字符串。String value to store. |

**Output**：void。

---

## removeItem

删除指定 key。若 localStorage 不可用则静默忽略。  
Remove key. Silently no-op if localStorage unavailable.

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| key | string | Yes | — | 要删除的存储键。Storage key to remove. |

**Output**：void。

---

## 示例 / Example

```ts
import { getItem, setItem, removeItem } from "nfx-ui/utils";

// 写入 / Write
setItem("user-theme", "dark");

// 读取 / Read
const theme = getItem("user-theme"); // "dark" or null/undefined

// 删除 / Remove
removeItem("user-theme");
```

适用于主题、语言、布局等偏好持久化；在隐私模式下不会导致应用崩溃。  
Suitable for persisting theme, language, layout preferences; avoids crashes in private mode.
