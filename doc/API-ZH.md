## [English](API.md)

- [number()](#number)
  - [int()](#int)
  - [even()](#even)
  - [odd()](#odd)
  - [min(min, [closed=true])](#minmin-closedtrue)
  - [max(max, [closed=true])](#maxmax-closedtrue)
  - [enum(...values)](#enumvalues)
  - [custom(callback, [ctx])](#customcallback-ctx)
  - [allowNaN()](#allownan)
  - [allowInfinity()](#allowinfinity)
  - [allowString()](#allowstring)
  - [required()](#required)
  - [default(value, [ctx])](#defaultvalue-ctx)
- [string()](#string)
  - [min(limit, [closed=true])](#minlimit-closedtrue)
  - [max(limit, [closed=true])](#maxlimit-closedtrue)
  - [enum(...values)](#enumvalues-1)
  - [partten(regExp)](#parttenregexp)
  - [custom(callback, [ctx])](#customcallback-ctx-1)
  - [required([strict=false])](#requiredstrictfalse)
  - [default(value, [strict=false], [ctx])](#defaultvalue-strictfalse-ctx)
- [boolean()](#boolean)
  - [enum(...values)](#enumvalues-2)
  - [custom(callback, [ctx])](#customcallback-ctx-2)
  - [required()](#required-1)
  - [default(value, [ctx])](#defaultvalue-ctx-1)
- [object([config])](#objectconfig)
  - [custom(callback, [ctx])](#customcallback-ctx-3)
  - [allowUnknown()](#allowunknown)
  - [stripUnknown()](#stripunknown)
  - [required([strict=false])](#requiredstrictfalse-1)
  - [default(value, [strict=true], [ctx])](#defaultvalue-stricttrue-ctx)
- [array([itemSchema])](#arrayitemschema)
  - [min(min, [closed=true])](#minmin-closedtrue-1)
  - [max(max, [closed=true])](#maxmax-closedtrue-1)
  - [custom(callback, [ctx])](#customcallback-ctx-4)
  - [required([strict=false])](#requiredstrictfalse-2)
  - [default(value, [strict=false], [ctx])](#defaultvalue-strictfalse-ctx-1)
- [any()](#any)
  - [enum(...values)](#enumvalues-3)
  - [custom(callback, [ctx])](#customcallback-ctx-5)
  - [required([strict=false])](#requiredstrictfalse-3)
  - [default(value, [strict=false], [ctx])](#defaultvalue-strictfalse-ctx-2)
- [其它通用方法](#其它通用方法)
  - [error(message, [ctx])](#errormessage-ctx)
  - [errorForAll(message, [ctx])](#errorforallmessage-ctx)
  - [format(formatter, [ctx])](#formatformatter-ctx)

# number()

获取一个 number 类型的 schema 对象。

参数

无。

示例

```javascript
const schema = racoon.number();
schema.validate('abc'); // fail
schema.validate(123);   // pass
```

## int()
限制被检测数值为一个整数。

参数

无。

示例

```javascript
const schema = racoon.number().int();
schema.validate(1);   // pass
schema.validate(1.0); // pass
schema.validate(1.2); // fail
```

## even()
限制被检测数值为一个偶数整数。

参数

无。

示例
```javascript
const schema = racoon.number().even();

schema.validate(0);   // pass
schema.validate(2);   // pass
schema.validate(-2);  // pass
schema.validate(-1);  // fail
schema.validate(1);   // fail
schema.validate(2.2); // fail
```

## odd()
限制被检测数值为一个奇数整数。

参数

无。

示例
```javascript
const schema = racoon.number().odd();

schema.validate(1);   // pass
schema.validate(-1);  // pass
schema.validate(2);   // fail
schema.validate(-2);  // fail
schema.validate(1.1); // fail
```

## min(min, [closed=true])
限制被检测数值的最小值。

参数

- `min` ***(number)*** - 最小值。
- `[closed]` ***(boolean)*** - 是否为闭区间，默认为 true, 表示闭区间，这要求被检测数值大于或等于 `min`. 如果你确切地将 `closed` 设置为 false, 你将获得一个开区间，这要求被检测数值必须严格大于 `min`.

示例

```javascript
const schema = racoon.number().min(10);
schema.validate(9);  // fail
schema.validate(10); // pass
schema.validate(11); // pass

const schema2 = racoon.number().min(10, false);
schema2.validate(9); // fail
schema.validate(10); // fail
schema.validate(11); // pass
```

## max(max, [closed=true])
限制被检测数值的最大值。

参数

- `max` ***(number)*** - 最大值。
- `[closed]` ***(boolean)*** - 是否为闭区间，默认为 true, 表示闭区间，这要求被检测数值小于或等于 `max`. 如果你确切地将 `closed` 设置为 false, 你将获得一个开区间，这要求被检测数值必须严格小于 `max`.

示例

```javascript
const schema = racoon.number().max(10);
schema.validate(11); // fail
schema.validate(10); // pass
schema.validate(9);  // pass

const schema2 = racoon.number().max(10, false);
schema2.validate(11); // fail
schema.validate(10);  // fail
schema.validate(9);   // pass
```

## enum(...values)
限制被检测数值为 `values` 的其中一个。

参数

- `...values` ***(Array<number>)*** - 有效的枚举值。

示例

```javascript
const schema = racoon.number().enum(1, 3, 5);
schema.validate(1); // pass
schema.validate(3); // pass
schema.validate(5); // pass
schema.validate(2); // fail
```

## custom(callback, [ctx])
通过一个自定义回调函数添加自定义的限制器。

参数

- `callback` ***(Function)*** - 用于限制的自定义函数。`callback` 有一个参数：被检测数值。如果校验失败，`callback` 应当抛错或者返回非空字符串，否则表示校验通过。
- `[ctx]` ***(any)*** - `callback` 执行上下文。

示例

```javascript
const schema = racoon.number().custom((val) => {
  if (val % 2 === 0) {
    return true;
  }
  throw new Error('The detected number should be even');
});
schema.validate(2); // pass
schema.validate(1); // fail
```

## allowNaN()
默认情况下，number schema 不允许被检测数值为 NaN. 如果你希望 NaN 被允许，你可以调用 `allowNaN` 方法。

> 如果你同时调用了 `allowNaN` 和 `required`, 最终的效果取决于 `required`, 意味着 NaN 不被允许。

参数

无。

示例

```javascript
const schema1 = racoon.number();
schema1.validate(NaN); // fail

const schema2 = racoon.number().allowNaN();
schema2.validate(NaN); // pass

const schema3 = racoon.number().allowNaN().required();
schema3.validate(NaN); // fail
```

## allowInfinity()
这与 `allowNaN` 相似。默认情况下，number schema 不允许被检测数值为 Infinity 或者 -Infinity. 如果你希望 Infinity 被允许，你可以调用 `allowInfinity` 方法。

参数

无。

示例

```javascript
const schema1 = racoon.number();
schema1.validate(Infinity);  // fail
schema1.validate(-Infinity); // fail

const schema2 = racoon.number().allowInfinity();
schema1.validate(Infinity);  // pass
schema1.validate(-Infinity); // pass
```

## allowString()
使 number schema 通过调用 `Number(value)` 预解析字符串，这使得*字符串形式数值*被允许。

> *字符串形式数值*是指可以被 `Number(xxx)` 解析为数值的字符串。但是，如果字符串是空字符串或者只包含空白字符的字符串，虽然这样的字符串可以被 `Number(xxx)` 解析为零，但它不被允许。

参数

无。

示例

```javascript
const schema1 = racoon.number();
schema1.validate('123'); // fail

const schema2 = racoon.number().allowString();
schema2.validate('123');            // pass, return 123
schema2.validate('.123');           // pass, return 0.123
schema2.validate('-123');           // pass, return -123
schema2.validate('+123');           // pass, return 123
schema2.validate('');               // fail, value should be a typeof number
schema2.validate('  ');             // fail, value should be a typeof number
schema2.validate('9'.repeat(9999)); // fail, Infinity is not allowed
```

## required()
限制被检测数值不是 undefined 或者 null.

参数

无。

示例

```javascript
const schema1 = racoon.number();
schema1.validate(undefined); // pass, return undefined
schema1.validate(null);      // pass, return null

const schema2 = racoon.number().required();
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
```

## default(value, [ctx])
当被检测值为 undefined, null 或者 NaN 时，设置 `validate` 和 `validateSilent` 方法的默认返回值。

参数

- `value` ***(any)*** - 希望 `validate` 和 `validateSilent` 默认返回的值。推荐但不必须将 `value` 传入为一个数值。当 `value` 是一个函数时，则设置 `value` 的返回值为默认返回值，此时，`value` 有一个参数：原始被检测值，也就是 undefined, null 或者 NaN.
- `[ctx]` ***(any)*** - 当 `value` 是函数时的执行上下文。

示例

```javascript
const schema = racoon.number().allowNaN().default(1);
schema.validate(undefined); // pass, return 1
schema.validate(null);      // pass, return 1
schema.validate(NaN);       // pass, return 1

schema.default((val) => {
  if (val === undefined) {
    return 1;
  }
  if (val === null) {
    return 2;
  }
  return 3; // The val must be NaN in this case.
});
schema.validate(undefined); // pass, return 1
schema.validate(null);      // pass, return 2
schema.validate(NaN);       // pass, return 3
```

# string()
获取一个 string 类型的 schema 对象。

参数

无。

示例

```javascript
const schema = racoon.string();
schema.validate(123);   // fail
schema.validate('abc'); // pass
```

## min(limit, [closed=true])

限制被检测字符串的最小长度。

参数

- `min` ***(number)***  - 最小长度.
- `[closed]` ***(boolean)*** - 是否为闭区间，默认为 true, 表示闭区间，这要求被检测字符串的长度大于或等于 `min`. 如果你确切地将 `closed` 设置为 false, 你将获得一个开区间，这要求被检测字符串的长度必须严格大于 `min`.

示例

```javascript
const schema1 = racoon.string().min(3);
schema1.validate('ab');   // fail
schema1.validate('abc');  // pass
schema1.validate('abcd'); // pass

const schema2 = racoon.string().min(3, false);
schema2.validate('ab');   // fail
schema2.validate('abc');  // fail
schema2.validate('abcd'); // pass
```

## max(limit, [closed=true])

Restrict the max length of the detected string.

参数

- `max` ***(number)***  - 最大长度.
- `[closed]` ***(boolean)*** - 是否为闭区间，默认为 true, 表示闭区间，这要求被检测字符串的长度小于或等于 `max`. 如果你确切地将 `closed` 设置为 false, 你将获得一个开区间，这要求被检测字符串的长度必须严格小于 `max`.


示例

```javascript
const schema1 = racoon.string().max(3);
schema1.validate('abcd'); // fail
schema1.validate('abc');  // pass
schema1.validate('ab');   // pass

const schema2 = racoon.string().max(3, false);
schema2.validate('abcd'); // fail
schema2.validate('abc');  // fail
schema2.validate('ab');   // pass
```

## enum(...values)

限制被检测字符串为 `values` 的其中一个。

参数

- `...values` ***(Array<string>)*** - 合法的字符串枚举列表。

示例

```javascript
const schema = racoon.string().enum('a', 'b', 'c');
schema.validate('a'); // pass
schema.validate('b'); // pass
schema.validate('c'); // pass
schema.validate('d'); // fail
```

## partten(regExp)

通过正则表达式限制字符串格式。

参数

- `regExp` ***(RegExp)*** - 用于限制字符串格式的正则表达式。

示例

```javascript
const schema = racoon.string().pattern(/$\d{4}-\d{2}-\d{2}^/);
schema.validate('2020-ab-cd'); // fail
schema.validate('2020-08-03'); // pass
```

## custom(callback, [ctx])

通过一个自定义回调函数添加自定义的限制器。

参数

- `callback` ***(Function)*** - 用于限制的自定义函数。`callback` 有一个参数：被检测字符串。如果校验失败，`callback` 应当抛错或者返回非空字符串，否则表示校验通过。
- `[ctx]` ***(any)*** - `callback` 执行上下文。

示例

```javascript
const schema = racoon.string().custom((val) => {
  if (val.length % 2 === 0) {
    return true;
  }
  throw new Error('The length of detected string should be even');
});
schema.validate('12');  // pass
schema.validate('123'); // fail
```

## required([strict=false])

限制被检测字符串不是 undefined 或者 null. 严格模式下，被检测字符串不能是 undefined, null 或者空字符串。

参数

- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示不启用。你可以明确设置 `strict` 为 true 以启用严格模式。

示例

```javascript
const schema1 = racoon.string();
schema1.validate(undefined); // pass, return undefined
schema1.validate(null);      // pass, return null
schema1.validate('');        // pass, return ''

const schema2 = racoon.string().required();
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
schema2.validate('');        // pass, return ''

const schema3 = racoon.string().required(true);
schema3.validate(undefined); // fail
schema3.validate(null);      // fail
schema3.validate('');        // fail
```

## default(value, [strict=false], [ctx])

当被检测值为 undefined, null 时，设置 `validate` 和 `validateSilent` 方法的默认返回值。严格模式下，当被检测值为 undefined, null 或者空字符串时返回默认值。

参数

- `value` ***(any)*** - 希望 `validate` 和 `validateSilent` 默认返回的值。推荐但不必须将 `value` 传入为一个字符串。当 `value` 是一个函数时，则设置 `value` 的返回值为默认返回值，此时，`value` 有一个参数：原始被检测值，也就是 undefined, null 或者空字符串。
- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示非严格模式。你可以明确设置 `strict` 为 true 以启用严格模式。
- `[ctx]` ***(any)*** - 当 `value` 是函数时的执行上下文。

示例

```javascript
const schema1 = racoon.string().default('abc');
schema1.validate(undefined); // pass, return 'abc'
schema1.validate(null);      // pass, return 'abc'
schema1.validate('');        // pass, return ''

const schema2 = racoon().string().default('abc', true);
schema2.validate(undefined); // pass, return 'abc'
schema2.validate(null);      // pass, return 'abc'
schema2.validate('');        // pass, return 'abc'
```

# boolean()

获取一个 boolean 类型的 schema 对象。

参数

无。

示例

```javascript
const schema = racoon.boolean();
schema.validate(1);     // fail
schema.validate(true);  // pass
schema.validate(false); // pass
```

## enum(...values)

限制被检布尔值为 `values` 的其中一个。

参数

- `...values` ***(Array<boolean>)*** - 有效的枚举值。

示例

```javascript
const schema = racoon.boolean().enum(true);
schema.validate(true);  // pass
schema.validate(false); // pass
```

## custom(callback, [ctx])

通过一个自定义回调函数添加自定义的限制器。

参数

- `callback` ***(Function)*** - 用于限制的自定义函数。`callback` 有一个参数：被检测布尔值。如果校验失败，`callback` 应当抛错或者返回非空字符串，否则表示校验通过。
- `[ctx]` ***(any)*** - `callback` 执行上下文。

示例

```javascript
const schema = racoon.string().custom((val) => {
  if (val === false) {
    return true;
  }
  throw new Error('The detected value must be false');
});
schema.validate(false); // pass
schema.validate(true);  // fail
```

## required()

限制被检测值不是 undefined 或者 null.

参数

无。

示例

```javascript
const schema1 = racoon.boolean();
schema1.validate(undefined); // pass, return undefined
schema1.validate(null);      // pass, return null

const schema2 = racoon.boolean().required();
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
schema2.validate(false);     // pass
```

## default(value, [ctx])

当被检测值为 undefined, null 时，设置 `validate` 和 `validateSilent` 方法的默认返回值。

参数

- `value` ***(any)*** - 希望 `validate` 和 `validateSilent` 默认返回的值。推荐但不必须将 `value` 传入为一个布尔值。当 `value` 是一个函数时，则设置 `value` 的返回值为默认返回值，此时，`value` 有一个参数：原始被检测值，也就是 undefined, null 或者 NaN.
- `[ctx]` ***(any)*** - 当 `value` 是函数时的执行上下文。

示例

```javascript
const schema = racoon.boolean().default(false);
schema.validate(undefined); // pass, return false
schema.validate(null);      // pass, return false
```

# object([config])

获取一个 object 类型的 schema 对象。

参数

- `[config]` ***(Object)*** - 描述对象结构的配置对象。如果没有传 `config`，则表示被检测对象的结构不受限制。
  - [config.prop] ***(Schema)*** - 一个 schema 对象。如果不是 schema 对象，则其将会被忽略。

示例

```javascript
const schema1 = racoon.object();
schema1.validate(1);           // fail
schema1.validate([1, 2]);      // fail
schema1.validate({});          // pass
schema1.validate({ prop: 1 }); // pass

const schema2 = racoon.object({
  name: racoon.string(),
  age: racoon.number(),
});
schema2.validate({ name: 123, age: 20 });   // fail
schema2.validate({ name: 'abc', age: 20 }); // pass
```

## custom(callback, [ctx])

通过一个自定义回调函数添加自定义的限制器。

参数

- `callback` ***(Function)*** - 用于限制的自定义函数。`callback` 有一个参数：被检测对象。如果校验失败，`callback` 应当抛错或者返回非空字符串，否则表示校验通过。
- `[ctx]` ***(any)*** - `callback` 执行上下文。

示例

```javascript
const schema = racoon.object().custom((val) => {
  if (Object.keys(val) === 1) {
    return true;
  }
  throw new Error('The detected object must have only one key');
});
schema.validate({ a: 1 });       // pass
schema.validate({ a: 1, b: 2 }); // fail
```

## allowUnknown()

默认情况下，object schema 不允许未知 key 存在，如果你希望未知 key 被允许，你可以调用 `allowUnknown` 方法。

参数

无。

示例

```javascript
const schema1 = racoon.object({
  name: racoon.string()
});
schema1.validate({ name: 'Jack' });          // pass
schema1.validate({ name: 'Jack', age: 22 }); // fail

const schema1 = racoon
  .object({
    name: racoon.string()
  })
  .allowUnknown();
schema1.validate({ name: 'Jack' });          // pass
schema1.validate({ name: 'Jack', age: 22 }); // pass, return { name: 'Jack', age: 22 }
```

## stripUnknown()

当你调用 `allowUnknown` 允许未知 key 存在时，`validate` 和 `validateSilent` 方法的返回值将会原封不动保留原本的未知 key 和其相应的值。如果你希望允许未知 key 但将其从返回结果中剔除，那么你可以调用 `stripUnknown`.

> 如果你调用了 `stripUnknown`, 那么你就没有必要再调用 `allowUnknown`, `stripUnknown` 包含了 `allowUnknown` 的效果。

参数

无。

示例

```javascript
const schema1 = racoon
  .object({
    name: racoon.string()
  })
  .allowUnknown();
schema1.validate({ name: 'Jack', age: 22 }); // pass, return { name: 'Jack', age: 22 }

const schema2 = racoon
  .object({
    name: racoon.string()
  })
  .stripUnknown();
schema2.validate({ name: 'Jack', age: 22 }); // pass, return { name: 'Jack' }
```

## required([strict=false])

限制被检测对象不是 undefined 或者 null. 如果开启严格模式，则要求被检测对象不是 undefined, null 或者空对象。

参数

- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示不启用。你可以明确设置 `strict` 为 true 以启用严格模式。

示例

```javascript
const schema1 = racoon.object();
schema1.validate(undefined); // pass, return undefined
schema1.validate(null);      // pass, return null
schema1.validate({});        // pass, return {}

const schema2 = racoon.object().required();
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
schema2.validate({});        // pass

const schema3 = racoon.object().required(true);
schema3.validate(undefined); // fail
schema3.validate(null);      // fail
schema3.validate({});        // fail
```

## default(value, [strict=true], [ctx])

当被检测值为 undefined, null 时，设置 `validate` 和 `validateSilent` 方法的默认返回值。严格模式下，当被检测值为 undefined, null 或者空字对象时返回默认值。

参数

- `value` ***(any)*** - 希望 `validate` 和 `validateSilent` 默认返回的值。推荐但不必须将 `value` 传入为一个对象。当 `value` 是一个函数时，则设置 `value` 的返回值为默认返回值，此时，`value` 有一个参数：原始被检测值，也就是 undefined, null 或者空对象。
- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示非严格模式。你可以明确设置 `strict` 为 true 以启用严格模式。
- `[ctx]` ***(any)*** - 当 `value` 是函数时的执行上下文。

> **注意**
> 强烈建议使用函数设置默认值，避免多次调用 `validate` 或 `validateSilent` 对象的默认值为同一个引用。


示例

```javascript
const schema1 = racoon
  .object()
  .default(
    () => ({ a: 1 })
  );
schema1.validate(undefined); // pass, return { a: 1 }
schema1.validate(null);      // pass, return { a: 1 }
schema1.validate({});        // pass, return {}

const schema2 = racoon()
  .object()
  .default(
    () => ({ a: 1 }),
    true
  );
schema2.validate(undefined); // pass, return { a: 1 }
schema2.validate(null);      // pass, return { a: 1 }
schema2.validate({});        // pass, return { a: 1 }
```

# array([itemSchema])

获取一个 array 类型的 schema 对象。

参数

- `[itemSchema]` ***(Schema)*** - 限制每个数组元素的 schema 对象。如果 `itemSchema` 没有传，或者不是一个 schema 对象，则其将会被忽略，表示不限制数组元素的格式。

示例

```javascript
const schema1 = racoon.array();
schema1.validate(1);            // fail
schema1.validate({});           // fail
schema1.validate([1, 'a', {}]); // pass

const schema2 = racoon.array(racoon.number());
schema2.validate(['a', 'b']); // fail
schema2.validate([1, 2]);     // pass
```

## min(min, [closed=true])

限制被检测数组的最小长度。

参数

- `min` ***(number)***  - 最小长度.
- `[closed]` ***(boolean)*** - 是否为闭区间，默认为 true, 表示闭区间，这要求被检测数组的长度大于或等于 `min`. 如果你确切地将 `closed` 设置为 false, 你将获得一个开区间，这要求被检测数组的长度必须严格大于 `min`.


示例

```javascript
const schema1 = racoon.array(racoon.number()).min(3);
schema1.validate([1, 2]);       // fail
schema1.validate([1, 2, 3]);    // pass
schema1.validate([1, 2, 3, 4]); // pass

const schema2 = racoon.array(racoon.number()).min(3, false);
schema2.validate([1, 2]);       // fail
schema2.validate([1, 2, 3]);    // fail
schema2.validate([1, 2, 3, 4]); // pass
```

## max(max, [closed=true])

限制被检测数组的最大长度。

参数

- `max` ***(number)***  - 最大长度.
- `[closed]` ***(boolean)*** - 是否为闭区间，默认为 true, 表示闭区间，这要求被检测数组的长度大于或等于 `max`. 如果你确切地将 `closed` 设置为 false, 你将获得一个开区间，这要求被检测数组的长度必须严格大于 `min`.

示例

```javascript
const schema = racoon.array(racoon.number()).max(3);
schema.validate([1, 2, 3, 4]); // fail
schema.validate([1, 2, 3]);    // pass
schema.validate([1, 2]);       // pass

const schema2 = racoon.array(racoon.number()).max(3, false);
schema2.validate([1, 2, 3, 4]); // fail
schema2.validate([1, 2, 3]);    // fail
schema2.validate([1, 2]);       // pass
```

## custom(callback, [ctx])

通过一个自定义回调函数添加自定义的限制器。

参数

- `callback` ***(Function)*** - 用于限制的自定义函数。`callback` 有一个参数：被检测值。如果校验失败，`callback` 应当抛错或者返回非空字符串，否则表示校验通过。
- `[ctx]` ***(any)*** - `callback` 执行上下文。

示例

```javascript
const schema = racoon.object().custom((val) => {
  if (Object.keys(val) === 1) {
    return true;
  }
  throw new Error('The detected object must have only one key');
});
schema.validate({ a: 1 });       // pass
schema.validate({ a: 1, b: 2 }); // fail
```

## required([strict=false])

限制被检测数组不是 undefined 或者 null. 严格模式下，被检测数组不能是 undefined, null 或者空数组。

参数

- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示不启用。你可以明确设置 `strict` 为 true 以启用严格模式。

示例

```javascript
const schema1 = racoon.array();
schema1.validate(undefined); // pass, return undefined
schema1.validate(null);      // pass, return null
schema1.validate([]);        // pass, return []

const schema2 = racoon.array().required();
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
schema2.validate([]);        // pass

const schema3 = racoon.array().required(true);
schema3.validate(undefined); // fail
schema3.validate(null);      // fail
schema3.validate([]);        // fail
```

## default(value, [strict=false], [ctx])

当被检测值为 undefined, null 时，设置 `validate` 和 `validateSilent` 方法的默认返回值。严格模式下，当被检测值为 undefined, null 或者空数组时返回默认值。

参数

- `value` ***(any)*** - 希望 `validate` 和 `validateSilent` 默认返回的值。推荐但不必须将 `value` 传入为一个数组。当 `value` 是一个函数时，则设置 `value` 的返回值为默认返回值，此时，`value` 有一个参数：原始被检测值，也就是 undefined, null 或者空数组。
- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示非严格模式。你可以明确设置 `strict` 为 true 以启用严格模式。
- `[ctx]` ***(any)*** - 当 `value` 是函数时的执行上下文。

> **注意**
> 强烈建议使用函数设置默认值，避免多次调用 `validate` 或 `validateSilent` 数组的默认值为同一个引用。

示例

```javascript
const schema1 = racoon
  .array()
  .default(() => [1]);
schema1.validate(undefined); // pass, return [1]
schema1.validate(null);      // pass, return [1]
schema1.validate([]);        // pass, return []
​
const schema2 = racoon
  .array()
  .default(
    () => [1],
    true
  );
schema2.validate(undefined); // pass, return [1]
schema2.validate(null);      // pass, return [1]
schema2.validate([]);        // pass, return [1]
```

# any()

获取一个 any 类型的 schema 对象。

参数

无。

示例

```javascript
const schema = racoon.any();
schema.validate(1);     // pass
schema.validate('abc'); // pass
schema.validate(true);  // pass
schema.validate({});    // pass
```

## enum(...values)

限制被检测值为 `values` 的其中一个。

参数
- `...values` ***(Array<any>)*** - 有效的枚举值。

示例

```javascript
const schema = racoon.any().enum('a', 1, true);
schema.validate('a');  // pass
schema.validate(1);    // pass
schema.validate(true); // pass
schema.validate('b');  // fail
```

## custom(callback, [ctx])

通过一个自定义回调函数添加自定义的限制器。

参数

- `callback` ***(Function)*** - 用于限制的自定义函数。`callback` 有一个参数：被检测数值。如果校验失败，`callback` 应当抛错或者返回非空字符串，否则表示校验通过。
- `[ctx]` ***(any)*** - `callback` 执行上下文。

示例

```javascript
const schema = racoon.any().custom((val) => {
  if (typeof val === 'number' || typeof val === 'string') {
    return true;
  }
  throw new Error('The detected value must be a typeof number or string');
});
schema.validate(1);     // pass
schema.validate('abc'); // pass
schema.validate(true);  // fail
```

## required([strict=false])

限制被检测值不是 undefined, null 或者 NaN. 严格模式下，被检测值不能是 undefined, null, NaN, 空字符串, 空对象或者空数组。

参数

- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示不启用。你可以明确设置 `strict` 为 true 以启用严格模式。

示例

```javascript
const schema1 = racoon.any();
schema1.validate(undefined); // pass, return undefined
schema1.validate(null);      // pass, return null
schema1.validate(NaN);       // pass, return NaN
schema1.validate('');        // pass, return ''
schema1.validate({});        // pass, return {}
schema1.validate([]);        // pass, return []

const schema2 = racoon.any().required();
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
schema2.validate(NaN);       // fail
schema1.validate('');        // pass, return ''
schema1.validate({});        // pass, return {}
schema1.validate([]);        // pass, return []

const schema3 = racoon.any().required(true);
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
schema2.validate(NaN);       // fail
schema1.validate('');        // fail
schema1.validate({});        // fail
schema1.validate([]);        // fail
```

## default(value, [strict=false], [ctx])

当被检测值为 undefined, null 或者 NaN 时，设置 `validate` 和 `validateSilent` 方法的默认返回值。如果启用严格模式，则设置被检测值为 undefined, null, NaN, 空字符串, 空对象或空数组时的默认值。

参数

- `value` ***(any)*** - 希望 `validate` 和 `validateSilent` 默认返回的值。当 `value` 是一个函数时，则设置 `value` 的返回值为默认返回值，此时，`value` 有一个参数：原始被检测值，也就是 undefined, null 或者空字符串。
- `[strict]` ***(boolean)*** - 是否启用严格模式，默认为 false, 表示非严格模式。你可以明确设置 `strict` 为 true 以启用严格模式。
- `[ctx]` ***(any)*** - 当 `value` 是函数时的执行上下文。

示例

```javascript
const schema1 = racoon.any().default(1);
schema1.validate(undefined); // pass, return 1
schema1.validate(null);      // pass, return 1
schema1.validate(NaN);       // pass, return 1

const schema2 = racoon.any().default(1, true);
schema2.validate(undefined); // pass, return 1
schema2.validate(null);      // pass, return 1
schema2.validate(NaN);       // pass, return 1
schema2.validate('');        // pass, return 1
schema2.validate({});        // pass, return 1
schema2.validate([]);        // pass, return 1
```

# 其它通用方法
## error(message, [ctx])

设置自定义错误信息。默认情况下，`validate` 和 `validateSilent` 给出的错误信息只对开发者友好，若需要自定义错误文案，可以调用 `error` 方法。

参数

- `message` ***(string | Function)*** - 错误消息文案。如果这是一个函数，则函数需要返回一个非空字符串以描述错误信息。函数有一个参数：原始的抛错对象。
- `[ctx]` ***(any)*** - 当 `message` 是函数时的执行上下文。

示例

```javascript
const schema = racoon
    .string()
    .error('Name should be a type of string')
    .required()
    .error('Name is required');
schema.validate(1); // fail, error message is 'Name should be a type of string'
schema.validate(null); // fail, error message is 'Name is required'
```

## errorForAll(message, [ctx])

`error` 只是为当前限制器添加自定义错误。`errorForAll` 为所有限制器设置自定义错误。

参数

- `message` ***(string | Function)*** - 错误消息文案。如果这是一个函数，则函数需要返回一个非空字符串以描述错误信息。函数有一个参数：原始的抛错对象。
- `[ctx]` ***(any)*** - 当 `message` 是函数时的执行上下文。

示例

```javascript
const schema = racoon
  .number()
  .error('error 1')
  .int()
  .min(2)
  .error('error 2')
  .max(5)
  .errorForAll('error for all');
  
schema.validate('abc'); // fail, error message: 'error 1'
schema.validate(3.2);   // fail, error message: 'error for all'
schema.validate(1);     // fail, error message: 'error 2'
schema.validate(6);     // fail, error message: 'error for all'
```

## format(formatter, [ctx])

在 `validate` 或 `validateSilent` 返回之前格式化返回值。

参数

- `formatter` ***(Function)*** - `formatter` 有一个参数：原本应当被返回的值。`formatter` 建议但不必须返回 schema 声明的类型的值。
- `[ctx]` ***(any)*** - `formatter` 的执行上下文。

示例

```javascript
const schema = racoon.number();
schema.validate(1.2).format(num => num.toFixed(2)); // pass, return '1.20'
```
