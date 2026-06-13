# makeStore / makePersistStore

Create plain store or persist store with zustand + subscribeWithSelector. Returns `{ store, useStore }`.

---

## Import

```ts
import { makeStore, makePersistStore } from "nfx-ui/stores";
import type { SetState, GetState, MakePersistStoreOptions } from "nfx-ui/stores";
```

---

## makeStore

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| initialState | S (object) | Yes | Initial state. |
| actions | (set, get) => A | Yes | Returns action object. |

- **Input:** initialState, actions(set, get).
- **Output:** `{ store, useStore }` — zustand store and bound selector hook.

---

## makePersistStore

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| name | string | Yes | Persist key (localStorage). |
| initialState | S (object) | Yes | Initial state. |
| actions | (set, get) => A | Yes | Returns action object. |
| partialize | (state) => Partial&lt;S & A&gt; | No | Subset to persist; default full state. |
| version | number | No | Persist version for migrate. |
| migrate | (persistedState, version) => Partial&lt;S & A&gt; | No | Migrate old persisted data. |

- **Input:** MakePersistStoreOptions.
- **Output:** `{ store, useStore }` — store with persist + subscribeWithSelector.

---

## Types

- **SetState&lt;S&gt;** — `(partial: Partial<S> | ((state: S) => Partial<S>)) => void`.
- **GetState&lt;S&gt;** — `() => S`.
- **MakePersistStoreOptions&lt;S, A&gt;** — config type for makePersistStore.

---

## Example

```ts
const { store, useStore } = makeStore(
  { count: 0 },
  (set) => ({
    increment: () => set((s) => ({ count: s.count + 1 })),
    reset: () => set({ count: 0 }),
  })
);
const count = useStore((s) => s.count);
const increment = useStore((s) => s.increment);

const { store, useStore } = makePersistStore({
  name: "auth-storage",
  initialState: { token: null as string | null },
  actions: (set) => ({
    setToken: (t: string | null) => set({ token: t }),
  }),
  partialize: (state) => ({ token: state.token }),
});
const token = useStore((s) => s.token);
const setToken = useStore((s) => s.setToken);
```

See `src/stores/makeStore.ts` for full API.

---

---

# makeStore / makePersistStore — Store 工厂

创建普通 Store 或带 persist 的 Store（zustand + subscribeWithSelector）。返回 `{ store, useStore }`。

---

## 引入

```ts
import { makeStore, makePersistStore } from "nfx-ui/stores";
import type { SetState, GetState, MakePersistStoreOptions } from "nfx-ui/stores";
```

---

## makeStore

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| initialState | S (object) | 是 | 初始状态。 |
| actions | (set, get) => A | 是 | 返回方法对象。 |

- **输入：** initialState、actions(set, get)。
- **输出：** `{ store, useStore }` — zustand store 与绑定后的 selector hook。

---

## makePersistStore

| 选项 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 持久化 key（localStorage）。 |
| initialState | S (object) | 是 | 初始状态。 |
| actions | (set, get) => A | 是 | 返回方法对象。 |
| partialize | (state) => Partial&lt;S & A&gt; | 否 | 只持久化部分 state；缺省全量。 |
| version | number | 否 | 持久化版本号（用于 migrate）。 |
| migrate | (persistedState, version) => Partial&lt;S & A&gt; | 否 | 迁移旧持久化数据。 |

- **输入：** MakePersistStoreOptions。
- **输出：** `{ store, useStore }` — 带 persist + subscribeWithSelector 的 store。

---

## 类型

- **SetState&lt;S&gt;** — `(partial: Partial<S> | ((state: S) => Partial<S>)) => void`。
- **GetState&lt;S&gt;** — `() => S`。
- **MakePersistStoreOptions&lt;S, A&gt;** — makePersistStore 的配置类型。

---

## 示例

```ts
const { store, useStore } = makeStore(
  { count: 0 },
  (set) => ({
    increment: () => set((s) => ({ count: s.count + 1 })),
    reset: () => set({ count: 0 }),
  })
);
const count = useStore((s) => s.count);
const increment = useStore((s) => s.increment);

const { store, useStore } = makePersistStore({
  name: "auth-storage",
  initialState: { token: null as string | null },
  actions: (set) => ({
    setToken: (t: string | null) => set({ token: t }),
  }),
  partialize: (state) => ({ token: state.token }),
});
const token = useStore((s) => s.token);
const setToken = useStore((s) => s.setToken);
```

详见 `src/stores/makeStore.ts`。
