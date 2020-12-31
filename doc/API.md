- [number()](#number)
  - [Arguments](#arguments)
  - [Example](#example)
  - [Methods](#methods)
    - [int()](#int)
      - [Arguments](#arguments-1)
      - [Example](#example-1)
    - [min(limit, [closed=true])](#minlimit-closedtrue)
      - [Arguments](#arguments-2)
      - [Example](#example-2)
    - [max(limit, [closed=true])](#maxlimit-closedtrue)
      - [Arguments](#arguments-3)
      - [Example](#example-3)
    - [enum(...values)](#enumvalues)
      - [Arguments](#arguments-4)
      - [Example](#example-4)
    - [custom(callback, [ctx])](#customcallback-ctx)
      - [Arguments](#arguments-5)
      - [Example](#example-5)
    - [allowNaN()](#allownan)
      - [Arguments](#arguments-6)
      - [Example](#example-6)

# number()
Get a schema object of type number.

## Arguments
None.

## Example
```javascript
const schema = racoon.number();
schema.validate('abc'); // fail
schema.validate(123); // pass
```

## Methods
### int()
Restrict the detected number to be an integer.

#### Arguments
None.

#### Example
```javascript
const schema = racoon.number().int();
schema.validate(1); // pass
schema.validate(1.0); // pass
schema.validate(1.2); // fail
```

### min(limit, [closed=true])
Restrict the min value of the detected number.

#### Arguments
- limit ***(number)*** - The min value.
- [closed] ***(boolean)*** - Whether it is a closed interval or not, the default is `true`, which means a closed interval, it requires the detected number greater than or equal to `limit`. If you exactly set `closed` to `false`, you'll get an opened interval, it requires the detected number strictly greater than `limit`.

#### Example
```javascript
const schema = racoon.number().min(10);
schema.validate(9); // fail
schema.validate(10); // pass
schema.validate(11); // pass

const schema2 = racoon.number().min(10, false);
schema2.validate(9); // fail
schema.validate(10); // fail
schema.validate(11); // pass
```

### max(limit, [closed=true])
Restrict the max value of the detected number.

#### Arguments
- limit ***(number)*** - The max value.
- [closed] ***(boolean)*** - Whether it is a closed interval or not, the default is `true`, which means a closed interval, it requires the detected number less than or equal to `limit`. If you exactly set closed to `false`, you'll get an opened interval, it requires the detected number strictly less than `limit`.

#### Example
```javascript
const schema = racoon.number().max(10);
schema.validate(11); // fail
schema.validate(10); // pass
schema.validate(9); // pass

const schema2 = racoon.number().max(10, false);
schema2.validate(11); // fail
schema.validate(10); // fail
schema.validate(9); // pass
```

### enum(...values)
Restrict the detected number to be one of `values`.

#### Arguments
- `...values` ***(Array<number>)*** - The valid values that allow the detected value to be.

#### Example
```javascript
const schema = racoon.number().enum(1, 3, 5);
schema.validate(1); // pass
schema.validate(3); // pass
schema.validate(5); // pass
schema.validate(2); // fail
```

### custom(callback, [ctx])
Add a custom restrict by a custom callback function.

#### Arguments
- `callback` ***(Function)*** - The custom function for restricting. `callback` has a parameter: the detected value. If validate failed, the `callback` should throw an error or return a non-empty string, otherwise, it means validation passed.
- `[ctx]` ***(*)*** - The execution context of `callback`.

#### Example
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

### allowNaN()
By default, number doesn't allow the detected value to be NaN. If you want NaN to be allowed, you should call allowNaN.

> If you call both allowNaN and required, the effect is up to required, means NaN is not allowed.

#### Arguments
None.

#### Example
```javascrpt
const schema1 = racoon.number();
schema1.validate(NaN); // fail

const schema2 = racoon.number().allowNaN();
schema2.validate(NaN); // pass

const schema3 = racoon.number().allowNaN().required();
schema3.validate(NaN); // fail
```
