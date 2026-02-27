# makeStore / makePersistStore / Store 工厂

创建普通 Store 或带持久化的 Store。参数与 Input/Output 见下表。  
Create plain store or persist store. Parameters and Input/Output below.

---

## 引入 / Import

```ts
import { makeStore, makePersistStore } from "@/stores";
import type { SetState, GetState, MakePersistStoreOptions } from "@/stores";
```

---

## makeStore

| 参数 Parameter | 类型 Type | 必填 Required | 说明 Description |
|----------------|-----------|---------------|------------------|
| initialState | S (object) | Yes | 初始状态。Initial state. |
| actions | (set, get) => A | Yes | 返回方法对象。Returns action object. |

- **Input**：initialState、actions(set, get).  
- **Output**：{ getState, setState, ...actions } — 可读写状态与方法。Read/write state and actions.

---

## makePersistStore

| 参数 Parameter | 类型 Type | 必填 Required | 说明 Description |
|----------------|-----------|---------------|------------------|
| options | MakePersistStoreOptions&lt;S, A&gt; | Yes | name、initialState、actions、partialize 等。name, initialState, actions, partialize, etc. |

- **Input**：options（含 name、initialState、actions、partialize 等）。  
- **Output**：带持久化（如 localStorage）的 Store。Store with persistence.

---

## 类型 / Types

- **SetState&lt;S&gt;** — (partial \| (state) => partial) => void.  
- **GetState&lt;S&gt;** — () => S.  
- **MakePersistStoreOptions&lt;S, A&gt;** — makePersistStore 的配置类型。Config type for makePersistStore.

详见 `src/stores/makeStore.ts`. See `src/stores/makeStore.ts` for full API.
