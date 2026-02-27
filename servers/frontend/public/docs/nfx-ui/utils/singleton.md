# singleton / 单例包装

类单例包装：同一构造函数多次 new 得到同一实例。  
Singleton wrapper: multiple new of same constructor return same instance.

---

## 引入 / Import

```ts
import { singleton } from "nfx-ui";
```

---

## 参数 / Parameters

| 参数 Parameter | 类型 Type | 必填 Required | 默认 Default | 说明 Description |
|----------------|-----------|---------------|--------------|------------------|
| className | Constructor&lt;T&gt; | Yes | — | 要包装的类（构造函数）。Class (constructor) to wrap. |

---

## 输入 Input / 输出 Output

- **Input**：className — 一个类（构造函数）。A class (constructor).
- **Output**：包装后的构造函数；首次 new 创建实例，之后 new 返回同一实例。Wrapped constructor; first new creates instance, later new return same instance.

---

## 示例 / Example

```ts
class MyService {}
const SingleMyService = singleton(MyService);
const a = new SingleMyService();
const b = new SingleMyService();
// a === b
```
