# Lucide Icons

Re-export **71** Lucide icons and `LucideIcon` type from `lucide-react` for unified use in consuming apps.

---

## Import

```ts
import {
  Search,
  ChevronDown,
  X,
  /* … see full list below … */
} from "nfx-ui/icons";
import type { LucideIcon } from "nfx-ui/icons";
```

**In this repo:**

```ts
import { Search, ChevronDown, X } from "@/icons";
import type { LucideIcon } from "@/icons";
```

---

## Type

| Type | Description |
|------|-------------|
| LucideIcon | Icon component type from lucide-react. |

---

## Exported icons (71)

`AlertCircle`, `ArrowLeft`, `ArrowRight`, `Ban`, `Bell`, `Box`, `Briefcase`, `Calendar`, `Camera`, `Check`, `CheckCircle`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `ChevronUp`, `Clock`, `Coffee`, `CreditCard`, `DollarSign`, `Edit`, `ExternalLink`, `Eye`, `EyeOff`, `FileText`, `Filter`, `FolderOpen`, `FolderPlus`, `FolderTree`, `Folders`, `Globe`, `GraduationCap`, `GripVertical`, `Hash`, `History`, `Home`, `Image`, `Info`, `Languages`, `LayoutGrid`, `LayoutList`, `Leaf`, `Layers`, `List`, `Loader`, `Loader2`, `Lock`, `LockKeyhole`, `LogOut`, `Mail`, `Menu`, `MessageCircle`, `Package`, `Pencil`, `Phone`, `Plus`, `Search`, `Settings`, `Shield`, `Tag`, `Trash2`, `TrendingUp`, `Upload`, `User`, `UserCheck`, `UserPlus`, `UserRound`, `UserRoundSearch`, `UserX`, `Wand2`, `X`, `XCircle`

Source of truth: `src/icons/lucide.ts`.

---

## Example

```tsx
<Search size={20} />
<ChevronDown size={16} className="text-gray-500" />
<UserRound size={24} />
```

Requires `lucide-react` as a peer/transitive dependency.

---

---

# Lucide 图标

从 `lucide-react` 重导出 **71** 个图标与 `LucideIcon` 类型，供业务项目统一引用。

---

## 引入

```ts
import {
  Search,
  ChevronDown,
  X,
  /* … 完整列表见下 … */
} from "nfx-ui/icons";
import type { LucideIcon } from "nfx-ui/icons";
```

**本仓库内：**

```ts
import { Search, ChevronDown, X } from "@/icons";
import type { LucideIcon } from "@/icons";
```

---

## 类型

| 类型 | 说明 |
|------|------|
| LucideIcon | lucide-react 的图标组件类型。 |

---

## 导出图标（71 个）

`AlertCircle`, `ArrowLeft`, `ArrowRight`, `Ban`, `Bell`, `Box`, `Briefcase`, `Calendar`, `Camera`, `Check`, `CheckCircle`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `ChevronUp`, `Clock`, `Coffee`, `CreditCard`, `DollarSign`, `Edit`, `ExternalLink`, `Eye`, `EyeOff`, `FileText`, `Filter`, `FolderOpen`, `FolderPlus`, `FolderTree`, `Folders`, `Globe`, `GraduationCap`, `GripVertical`, `Hash`, `History`, `Home`, `Image`, `Info`, `Languages`, `LayoutGrid`, `LayoutList`, `Leaf`, `Layers`, `List`, `Loader`, `Loader2`, `Lock`, `LockKeyhole`, `LogOut`, `Mail`, `Menu`, `MessageCircle`, `Package`, `Pencil`, `Phone`, `Plus`, `Search`, `Settings`, `Shield`, `Tag`, `Trash2`, `TrendingUp`, `Upload`, `User`, `UserCheck`, `UserPlus`, `UserRound`, `UserRoundSearch`, `UserX`, `Wand2`, `X`, `XCircle`

真源：`src/icons/lucide.ts`。

---

## 示例

```tsx
<Search size={20} />
<ChevronDown size={16} className="text-gray-500" />
<UserRound size={24} />
```

依赖 `lucide-react`（peer 或传递依赖）。
