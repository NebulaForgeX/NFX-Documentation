# Stores 模块 / Stores Module

状态与持久化 Store 工厂。**未从 nfx-ui 主包导出**，仅在本仓库内从 `@/stores` 引用。参数与 Input/Output 见子文档。  
State and persist store factories. **Not exported from nfx-ui**; use `@/stores` in repo only. Parameters and Input/Output in sub-docs.

---

## 入口 / Entry

```ts
import { makeStore, makePersistStore } from "@/stores";
import type { SetState, GetState, MakePersistStoreOptions } from "@/stores";
```

## 引入示例 / Import example

```ts
import { makeStore, makePersistStore } from "@/stores";

const { useStore } = makeStore(
  { count: 0 },
  (set) => ({ increment: () => set((s) => ({ count: s.count + 1 })) })
);
const count = useStore((s) => s.count);

const { useStore: useAuth } = makePersistStore({
  name: "auth",
  initialState: { token: null },
  actions: (set) => ({ setToken: (t) => set({ token: t }) }),
});
```

## 文档 / Docs

| 文件 File | 说明 Description |
|-----------|------------------|
| [make-store.md](./make-store.md) | makeStore、makePersistStore 与类型 |
