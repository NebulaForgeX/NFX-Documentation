# makeStore / makePersistStore

Create plain store or persist store. Parameters and Input/Output below.

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
- **Output:** { getState, setState, ...actions } — read/write state and actions.

---

## makePersistStore

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options | MakePersistStoreOptions&lt;S, A&gt; | Yes | name, initialState, actions, partialize, etc. |

- **Input:** options (name, initialState, actions, partialize, etc.).
- **Output:** Store with persistence (e.g. localStorage).

---

## Types

- **SetState&lt;S&gt;** — (partial | (state) => partial) => void.
- **GetState&lt;S&gt;** — () => S.
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

创建普通 Store 或带持久化的 Store。参数与 Input/Output 见下表。

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
- **输出：** { getState, setState, ...actions } — 可读写状态与方法。

---

## makePersistStore

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| options | MakePersistStoreOptions&lt;S, A&gt; | 是 | name、initialState、actions、partialize 等。 |

- **输入：** options（含 name、initialState、actions、partialize 等）。
- **输出：** 带持久化（如 localStorage）的 Store。

---

## 类型

- **SetState&lt;S&gt;** — (partial | (state) => partial) => void。
- **GetState&lt;S&gt;** — () => S。
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
