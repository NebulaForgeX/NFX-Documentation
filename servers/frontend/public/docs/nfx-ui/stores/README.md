# Stores 模块 / Stores Module

状态与持久化 Store 工厂。从 **`nfx-ui/stores`** 子路径导出；本仓库内也可从 `@/stores` 引用。参数与 Input/Output 见子文档。  
State and persist store factories. Exported from **`nfx-ui/stores`**; in repo you can use `@/stores`. Parameters and Input/Output in sub-docs.

---

## 入口 / Entry

**从 nfx-ui/stores 引用（业务项目）/ From nfx-ui/stores (consuming app):**

```ts
import { makeStore, makePersistStore } from "nfx-ui/stores";
import type { SetState, GetState, MakePersistStoreOptions } from "nfx-ui/stores";
```

**本仓库内 / In this repo:** `import { makeStore, makePersistStore } from "@/stores";`、`import type { SetState, GetState, MakePersistStoreOptions } from "@/stores";`

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
