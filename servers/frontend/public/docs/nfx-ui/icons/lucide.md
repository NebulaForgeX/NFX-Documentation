# Lucide Icons

Re-export Lucide icons and types from lucide-react for use in repo. Parameters and example below.

---

## Import (in repo)

```ts
import { Search, ChevronDown, X } from "@/icons";
import type { LucideIcon } from "@/icons";
```

---

## Type

| Type | Description |
|------|-------------|
| LucideIcon | Icon component type. |

Export names match lucide-react; see `src/icons/lucide.ts`.

---

## Example

```tsx
<Search size={20} />
<ChevronDown size={16} className="text-gray-500" />
```

Requires `lucide-react` if you use icons directly.

---

---

# Lucide 图标

从 lucide-react 重导出图标与类型，供本仓库内统一引用。参数与示例见下。

---

## 引入（本仓库内）

```ts
import { Search, ChevronDown, X } from "@/icons";
import type { LucideIcon } from "@/icons";
```

---

## 类型

| 类型 | 说明 |
|------|------|
| LucideIcon | 图标组件类型。 |

具体导出名与 lucide-react 一致，见 `src/icons/lucide.ts`。

---

## 示例

```tsx
<Search size={20} />
<ChevronDown size={16} className="text-gray-500" />
```

依赖 `lucide-react`，使用方若需直接使用图标需自行安装。
