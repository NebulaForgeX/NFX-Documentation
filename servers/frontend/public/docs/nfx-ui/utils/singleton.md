# singleton

Singleton factory: wrap a constructor so multiple `new` calls return the same instance. Throws if later `new` uses different constructor args.

---

## Import

```ts
import { singleton } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| className | Constructor&lt;T&gt; | Yes | — | Class (constructor) to wrap; T must extend object. |

---

## Input / Output

- **Input:** A class constructor.
- **Output:** Proxied constructor; first `new` creates instance, later `new` with same args returns same instance; different args throw.

---

## Example

```ts
class MyService {}
const SingleMyService = singleton(MyService);
const a = new SingleMyService();
const b = new SingleMyService();
// a === b
```

---

---

# singleton — 单例包装

单例工厂：包装构造函数，多次 `new` 返回同一实例。若后续 `new` 传入不同参数则 throw。

---

## 引入

```ts
import { singleton } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| className | Constructor&lt;T&gt; | 是 | — | 要包装的类（构造函数）；T 须为 object。 |

---

## 输入 / 输出

- **输入：** 类构造函数。
- **输出：** 代理后的构造函数；首次 `new` 创建实例，相同参数再次 `new` 返回同一实例；参数不同则 throw。

---

## 示例

```ts
class MyService {}
const SingleMyService = singleton(MyService);
const a = new SingleMyService();
const b = new SingleMyService();
// a === b
```
