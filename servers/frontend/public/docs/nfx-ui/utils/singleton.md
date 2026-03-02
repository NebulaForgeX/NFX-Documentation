# singleton

Singleton wrapper: multiple new of same constructor return same instance.

---

## Import

```ts
import { singleton } from "nfx-ui/utils";
```

---

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| className | Constructor&lt;T&gt; | Yes | — | Class (constructor) to wrap. |

---

## Input / Output

- **Input:** A class (constructor).
- **Output:** Wrapped constructor; first new creates instance, later new return same instance.

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

类单例包装：同一构造函数多次 new 得到同一实例。

---

## 引入

```ts
import { singleton } from "nfx-ui/utils";
```

---

## 参数

| 参数 | 类型 | 必填 | 默认 | 说明 |
|------|------|------|------|------|
| className | Constructor&lt;T&gt; | 是 | — | 要包装的类（构造函数）。 |

---

## 输入 / 输出

- **输入：** className — 一个类（构造函数）。
- **输出：** 包装后的构造函数；首次 new 创建实例，之后 new 返回同一实例。

---

## 示例

```ts
class MyService {}
const SingleMyService = singleton(MyService);
const a = new SingleMyService();
const b = new SingleMyService();
// a === b
```
