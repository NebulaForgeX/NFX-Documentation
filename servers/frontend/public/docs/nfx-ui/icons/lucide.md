# Lucide 图标 / Lucide Icons

从 lucide-react 重导出图标与类型，供本仓库内统一引用。参数与示例见下。  
Re-export Lucide icons and types from lucide-react for use in repo. Parameters and example below.

---

## 引入（本仓库内）/ Import (in repo)

```ts
import { Search, ChevronDown, X } from "@/icons";
import type { LucideIcon } from "@/icons";
```

---

## 类型 / Type

| 类型 Type | 说明 Description |
|-----------|------------------|
| LucideIcon | 图标组件类型。Icon component type. |

具体导出名与 lucide-react 一致，见 `src/icons/lucide.ts`。Export names match lucide-react; see `src/icons/lucide.ts`.

---

## 示例 / Example

```tsx
<Search size={20} />
<ChevronDown size={16} className="text-gray-500" />
```

依赖 `lucide-react`，使用方若需直接使用图标需自行安装。Requires `lucide-react` if you use icons directly.
