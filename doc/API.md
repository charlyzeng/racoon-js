- [number()](#number)
  - [int()](#int)
  - [min(limit, [closed=true])](#minlimit-closedtrue)
  - [max(limit, [closed=true])](#maxlimit-closedtrue)
  - [enum(...values)](#enumvalues)
  - [custom(callback, [ctx])](#customcallback-ctx)
  - [allowNaN()](#allownan)
  - [allowInfinity()](#allowinfinity)
  - [allowString()](#allowstring)
  - [required()](#required)
  - [default(value, [ctx])](#defaultvalue-ctx)
- [string()](#string)
  - [min(limit, [closed=true])](#minlimit-closedtrue-1)
  - [max(limit, [closed=true])](#maxlimit-closedtrue-1)
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
  - [min(limit, [closed=true])](#minlimit-closedtrue-2)
  - [max(limit, [closed=true])](#maxlimit-closedtrue-2)
  - [custom(callback, [ctx])](#customcallback-ctx-4)
  - [required([strict=false])](#requiredstrictfalse-2)
  - [default(value, [strict=false], [ctx])](#defaultvalue-strictfalse-ctx-1)
- [any()](#any)
  - [enum(...values)](#enumvalues-3)
  - [custom(callback, [ctx])](#customcallback-ctx-5)
  - [required([strict=false])](#requiredstrictfalse-3)
  - [default(value, [strict=false], [ctx])](#defaultvalue-strictfalse-ctx-2)
- [Common Methods](#common-methods)
  - [error(message, [ctx])](#errormessage-ctx)
  - [errorForAll(message, [ctx])](#errorforallmessage-ctx)
  - [format(formatter, [ctx])](#formatformatter-ctx)

# number()

Get a schema object of number.

Arguments

None.

Example
```javascript
const schema = racoon.number();
schema.validate('abc'); // fail
schema.validate(123);   // pass
```

## int()
Restrict the detected number to be an integer.

Arguments

None.

Example
```javascript
const schema = racoon.number().int();
schema.validate(1);   // pass
schema.validate(1.0); // pass
schema.validate(1.2); // fail
```

## min(limit, [closed=true])
Restrict the min value of the detected number.

Arguments

- `limit` ***(number)*** - The min value.
- `[closed]` ***(boolean)*** - Whether it is a closed interval, its default is true, which means a closed interval, it requires the detected number greater than or equal to `limit`. If you exactly set `closed` to false, you'll get an opened interval, it requires the detected number strictly greater than `limit`.

Example
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

## max(limit, [closed=true])
Restrict the max value of the detected number.

Arguments

- `limit` ***(number)*** - The max value.
- `[closed]` ***(boolean)*** - Whether it is a closed interval, its default is true, which means a closed interval, it requires the detected number less than or equal to `limit`. If you exactly set closed to false, you'll get an opened interval, it requires the detected number strictly less than `limit`.

Example
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
Restrict the detected number to be one of the `values`.

Arguments

- `...values` ***(Array<number>)*** - The valid values that allow the detected number to be.

Example
```javascript
const schema = racoon.number().enum(1, 3, 5);
schema.validate(1); // pass
schema.validate(3); // pass
schema.validate(5); // pass
schema.validate(2); // fail
```

## custom(callback, [ctx])
Add a custom restrict by a custom callback function.

Arguments

- `callback` ***(Function)*** - The custom function for restricting. `callback` has a parameter: the detected value. If validate failed, the `callback` should throw an error or return a non-empty string. Otherwise, it means validation passed.
- `[ctx]` ***(any)*** - The execute context of `callback`.

Example

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
By default, number schema doesn't allow the detected value to be NaN. If you want NaN to be allowed, you should call `allowNaN`.

> If you call both `allowNaN` and `required`, the effect is up to `required`, it means NaN won't be allowed.

Arguments

None.

Example

```javascript
const schema1 = racoon.number();
schema1.validate(NaN); // fail

const schema2 = racoon.number().allowNaN();
schema2.validate(NaN); // pass

const schema3 = racoon.number().allowNaN().required();
schema3.validate(NaN); // fail
```

## allowInfinity()
This is similar to `allowNaN`. By default, number schema doesn't allow the detected value to be Infinity. If you want Infinity to be allowed, you should call `allowInfinity`.

Arguments

None.

Example

```javascript
const schema1 = racoon.number();
schema1.validate(Infinity);  // fail
schema1.validate(-Infinity); // fail

const schema2 = racoon.number().allowInfinity();
schema1.validate(Infinity);  // pass
schema1.validate(-Infinity); // pass
```

## allowString()
Enable number schema preparse string by call `Number(value)`, this will make *string style number* be allowed.

> *String style number* means a string that can be parsed by `Number(xxx)`. But if the string is an empty string or a string only includes white spaces, it can be parsed by `Number(xxx)` although, it's not a *string style number* still.

Arguments

None.

Example

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
Restrict the detected number is not undefined or null.

Arguments

None.

Example

```javascript
const schema1 = racoon.number();
schema1.validate(undefined); // pass, return undefined
schema1.validate(null);      // pass, return null

const schema2 = racoon.number().required();
schema2.validate(undefined); // fail
schema2.validate(null);      // fail
```

## default(value, [ctx])
Set the default return value of `validate` and `validateSilent` when the detected value is undefined, null or NaN.

Arguments

- `value` ***(any)*** - The default return value of `validate` and `validateSilent`. It is recommended but not necessarily to be a number. When `value` is a function, then set the return value of `value` to be the default return value. The function has a parameter: the original detected value - undefined, null or NaN.
- `[ctx]` ***(any)*** - The execute context if `value` is a function.

Example

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

Get a schema object of string.

Parameter

None.

Example

```javascript
const schema = racoon.string();
schema.validate(123);   // fail
schema.validate('abc'); // pass
```

## min(limit, [closed=true])

Restrict the min length of the detected string.

Arguments

- `limit` ***(number)***  - The min length.
- `[closed]` ***(boolean)*** - Whether it is a closed interval, its default is true, which means a closed interval, it requires the length of the detected string is greater than or equal to `limit`. If you exactly set `closed` to false, you'll get an opened interval, it requires the length of the detected string is strictly greater than `limit`.

Example

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

Arguments

- `limit` ***(number)***  - The max length.
- `[closed]` ***(boolean)*** - Whether it is a closed interval, its default is true, which means a closed interval, it requires the length of the detected string is less than or equal to `limit`. If you exactly set `closed` to false, you'll get an opened interval, it requires tthe length of the detected string is strictly less than `limit`.

Example

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

Restrict the detected string to be one of the `values`.

Arguments

- `...values` ***(Array<string>)*** - The valid values that allow the detected string to be.

Example

```javascript
const schema = racoon.string().enum('a', 'b', 'c');
schema.validate('a'); // pass
schema.validate('b'); // pass
schema.validate('c'); // pass
schema.validate('d'); // fail
```

## partten(regExp)

Restrict string format by a regular expression.

Arguments

- `regExp` ***(RegExp)*** - The regular expression used to restrict the format of the detected string.

Example

```javascript
const schema = racoon.string().pattern(/$\d{4}-\d{2}-\d{2}^/);
schema.validate('2020-ab-cd'); // fail
schema.validate('2020-08-03'); // pass
```

## custom(callback, [ctx])

Add a custom restrict by a custom callback function.

Arguments

- `callback` ***(Function)*** - The custom function for restricting. `callback` has a parameter: the detected value. If validate failed, the `callback` should throw an error or return a non-empty string. Otherwise, it means validation passed.
- `[ctx]` ***(any)*** - The execute context of `callback`.

Example

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

Restrict the detected string is not undefined or null. If in strict mode, the detected string can not be undefined, null or empty string.

Arguments

- `[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set `strict` to true to enable strict mode.

Example

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

Set the return value of `validate` and `validateSilent`, when the detected value is undefined or null. If strict mode is enabled, set the return value when the detected value is undefined, null or empty string.

Arguments

- `value` ***(any)*** - The default return value of `validate` and `validateSilent`. It is recommended but not necessarily to be a string. When value is a function, then set the return value of `value` to be the default return value. The function has a parameter: the original detected value - undefined, null or empty string.
- `[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set `strict` to true to enable strict mode.
- `[ctx]` ***(any)*** - The execute context if `value` is a function.

Example

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

Get a schema object of boolean.

Arguments

None.

Example

```javascript
const schema = racoon.boolean();
schema.validate(1);     // fail
schema.validate(true);  // pass
schema.validate(false); // pass
```

## enum(...values)

Restrict the detected boolean to be one of the `values`.

Arguments

- `...values` ***(Array<boolean>)*** - The valid values that allow the detected boolean to be.

Example

```javascript
const schema = racoon.boolean().enum(true);
schema.validate(true);  // pass
schema.validate(false); // pass
```

## custom(callback, [ctx])

Add a custom restrict by a custom callback function.

Arguments

- `callback` ***(Function)*** - The custom function for restricting. callback has a parameter: the detected value. If validate failed, the callback should throw an error or return a non-empty string. Otherwise, it means validation passed.
- `[ctx]` ***(any)*** - The execute context of callback.

Example

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

Restrict the detected value is not undefined or null.

Arguments

None.

Example

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

Set the return value of `validate` and `validateSilent` when the detected value is undefined or null.

Arguments

- `value` ***(any)*** - The default return value of `validate` and `validateSilent`. It is recommended but not necessarily to be a boolean. When `value` is a function, then set the return value of `value` to be the default return value. The function has a parameter: the original detected value - undefined or null.
- `[ctx]` ***(any)*** - The execute context if `value` is a function.

Example

```javascript
const schema = racoon.boolean().default(false);
schema.validate(undefined); // pass, return false
schema.validate(null);      // pass, return false
```

# object([config])

Get a schema object of object.

Arguments

- `[config]` ***(Object)*** - The config that describes the structure of object. If config is not passed, then the structure of object won't be restricted. 
  - [config.prop] ***(Schema)*** - A schema object declared by racoon-js. If it's not a schema object, it will be ignored.

Example

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

Add a custom restrict by a custom callback function.

Arguments

- `callback` ***(Function)*** - The custom function for restricting. `callback` has a parameter: the detected value. If validate failed, the callback should throw an error or return a non-empty string. Otherwise, it means validation passed.
- `[ctx]` ***(any)*** - The execute context of callback.

Example

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

By default, object schema doesn't allow unknown keys exist. If you want unknown keys to be allowed, you can call `allowUnknown`.

Arguments

None.

Example

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

When you call `allowUnknown` to allow unknown keys, the return value of `validate` and `validateSilent` will retain the unknown keys and corresponding values. If you want to strip the unknown keys and corresponding values, you can call `stripUnknown`.

> If you called `stripUnknown`, you don't need to call `allowUnknown`, `stripUnknown` contains the effect of `allowUnknown`.

Arguments

None.

Example

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

Restrict the detect object is not undefined or null. If strict mode is enabled, restrict the detected value is not undefined, null or empty object.

Arguments

- `[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set `strict` to true to enable strict mode.

Example

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

Set the return value of `validate` and `validateSilent` when the detected value is undefined or null. If strict mode is enabled, set the return value when the detected value is undefined, null or empty object.

Arguments

`value` ***(any)*** - The default return value of `validate` and `validateSilent`. It is recommended but not necessarily to be an object. When value is a function, then set the return value of `value` to be the default return value. The function has a parameter: the original detected value - undefined, null or empty object.
`[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set strict to `true` to enable strict mode. 
`[ctx]` ***(any)***  - The execute context if `value` is a function.

> **ATTENTION**
> It is highly recommended to use a function to set the default return value, to avoid returning the same object when you call `validate` or `validateSilent` multiple times.


Example

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

Get a schema object of array.

Arguments

- `[itemSchema]` ***(Schema)*** - The schema object to restrict every elements of array. If it's not a type of schema or it's not given, it will be ignored, which means elements of the array can be any type.

Example

```javascript
const schema1 = racoon.array();
schema1.validate(1);            // fail
schema1.validate({});           // fail
schema1.validate([1, 'a', {}]); // pass

const schema2 = racoon.array(racoon.number());
schema2.validate(['a', 'b']); // fail
schema2.validate([1, 2]);     // pass
```

## min(limit, [closed=true])

Restrict the min length of the detected array.

Arguments

- `limit` ***(number)*** - The min length.
- `[closed]` ***(boolean)*** - Whether it is a closed interval, its default is true, which means a closed interval, it requires the length of the detected array is greater than or equal to `limit`. If you exactly set `closed` to false, you'll get an opened interval, it requires the length of the detected array is strictly greater than `limit`.


Example

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

## max(limit, [closed=true])

Restrict the max length of the detected array.

Arguments

- `limit` ***(number)*** - The max length.
- `[closed]` ***(boolean)*** - Whether it is a closed interval, its default is true, which means a closed interval, it requires the length of the detected array is less than or equal to `limit`. If you exactly set `closed` to false, you'll get an opened interval, it requires the detected array's length strictly less than `limit`.

Example

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

Add a custom restrict by a custom callback function.

Arguments

- `callback` ***(Function)*** - The custom function for restricting. `callback` has an argument: the detected value. If validate failed, the `callback` should throw an error or return a non-empty string. Otherwise, it means validation passed.
- `[ctx]` ***(any)*** - The execute context of `callback`.

Example

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

Restrict the detect value is not undefined or null. If strict mode is enabled, restrict the detected array is not undefined, null or empty array.

Arguments

- `[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set `strict` to true to enable strict mode.

Example

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

Set the return value of `validate` and `validateSilent` when the detected value is undefined, null. If strict mode is enabled, set the return value when the detected value is undefined, null, or empty array.

Arguments

- `value` ***(any)*** - The default return value of `validate` and `validateSilent`. It is recommended but not necessarily to be an array. When `value` is a function, then set the return value of `value` to be the default return value. The function has a parameter: the original detected value - undefined, null or empty array.
- `[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set `strict` to true to enable strict mode. 
- [ctx] ***(any)***  - The execute context if `value` is a function.

> **ATTENTION**
> It is highly recommended to use a function to set the default return value, to avoid returning the same array when you call validate or validateSilent multiple times.

Example

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

Get a schema object of any type.

Arguments

None.

Example

```javascript
const schema = racoon.any();
schema.validate(1);     // pass
schema.validate('abc'); // pass
schema.validate(true);  // pass
schema.validate({});    // pass
```

## enum(...values)

Restrict the detected value to be one of the  `values`.

Arguments
- `...values` ***(Array<any>)*** - The valid values that allow the detected value to be.

Example

```javascript
const schema = racoon.any().enum('a', 1, true);
schema.validate('a');  // pass
schema.validate(1);    // pass
schema.validate(true); // pass
schema.validate('b');  // fail
```

## custom(callback, [ctx])

Add a custom restrict by a custom callback function.

Arguments

- `callback` ***(Function)*** - The custom function for restricting. callback has a parameter: the detected value. If validate failed, the callback should throw an error or return a non-empty string. Otherwise, it means validation passed.
- `[ctx]` ***(any)*** - The execute context of callback.

Example

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

Restrict the detect value is not undefined, null or NaN. If strict mode is enabled, restrict the detected value is not undefined, null, NaN, empty string, empty object or empty array.

Arguments

- `[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set `strict` to true to enable strict mode.

Example

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

Set the return value of `validate` and `validateSilent`, when the detected value is undefined, null or NaN. If strict mode is enabled, set the return value when the detected value is undefined, null, NaN, empty string, empty object, empty array.

Arguments

- `value` ***(any)*** The default return value of `validate` and `validateSilent`. When `value` is a function, then set the return value of `value` to be the default return value. The function has a parameter: the original detected value - undefined, null NaN, empty string, empty object or empty array.
- `[strict]` ***(boolean)*** - Whether enable strict mode, default is false, means non-strict mode. You can exactly set `strict` to true to enable strict mode.
- [ctx] ***(any)*** The execute context if `value` is a function.

Example

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

# Common Methods
## error(message, [ctx])

Set the custom error message when validate failed. By default, the error message is friendly only to the developer. If you want to use custom error message, call error method.

Arguments

- `message` ***(string | Function)*** - The custom error message. If it's a function, the function should return a string, describe the custom error message. The function has an argument: the original validate error object.
- `[ctx]` ***(any)*** - The execute context of `message` when it's a function. 

Example

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

`error` set the custom error message for the restrict before error calling position. `errorForAll` set custom error message for all restrict.

Arguments

- `message` ***(string | Function)*** - The custom error message. If it's a function, the function should return a string, describe the custom error message. The function has an argument: the original validate error object.
- `[ctx]` ***(any)*** - The execute context of message when it's a function. 

Example

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

Format the final return value of `validate` and `validateSilent`, the return value of `formatter` will be the final return value.

Arguments

- `formatter` ***(Function)*** - The function has an argument: the origin value returned by validate. The return value of `formatter` is recommended but not necessarily to be the type of the schema declared.
- `[ctx]` ***(any)*** - The execute context of `formatter`.

Example

```javascript
const schema = racoon.number();
schema.validate(1.2).format(num => num.toFixed(2)); // pass, return '1.20'
```
