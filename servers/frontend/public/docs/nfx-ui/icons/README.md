# Icons 模块 / Icons Module

图标统一导出（如 Lucide）。从 **`nfx-ui/icons`** 子路径导出；本仓库内也可从 `@/icons` 引用。参数与示例见子文档。  
Icon re-exports (e.g. Lucide). Exported from **`nfx-ui/icons`**; in repo you can use `@/icons`. Parameters and examples in sub-docs.

---

## 入口 / Entry

**从 nfx-ui/icons 引用（业务项目）/ From nfx-ui/icons (consuming app):**

```ts
import { /* Lucide icons */ } from "nfx-ui/icons";
import type { LucideIcon } from "nfx-ui/icons";
```

**本仓库内 / In this repo:** `import { ... } from "@/icons";`、`import type { LucideIcon } from "@/icons";`

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [lucide.md](./lucide.md) | Lucide 图标与类型 Lucide icons and types |
