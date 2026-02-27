# Stores 模块 / Stores Module

状态与持久化 Store 工厂。**未从 nfx-ui 主包导出**，仅在本仓库内从 `@/stores` 引用。参数与 Input/Output 见子文档。  
State and persist store factories. **Not exported from nfx-ui**; use `@/stores` in repo only. Parameters and Input/Output in sub-docs.

---

## 入口 / Entry

```ts
import { makeStore, makePersistStore } from "@/stores";
import type { SetState, GetState, MakePersistStoreOptions } from "@/stores";
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [make-store.md](./make-store.md) | makeStore、makePersistStore 与类型 |
