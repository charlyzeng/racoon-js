# racoon-js
Little raccoon who loves washing hands, means this is a tiny tool lib for checking and cleaning json data.

# When To Use
When your node server get data from a browser request, you may need to validate the data format. As instance, you may write the `validate data code` as follow:
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/foo', (req, res) => {
  const data = req.body;
  // --begin--
  // validate `name` for rules:
  //  1. it should be required
  //  2. it should be a type of string
  //  3. it's length should be greater than or equal 10
  //  4. it's length should be less than or equal 20
  if (data.name === undefined || data.name === null) {
    throw new Error('`name` is required');
  }
  if (typeof data.name !== 'string') {
    throw new Error('`name` should be string');
  }
  if (data.name.length < 10) {
    throw new Error('`name` length should greater than or equal 10');
  }
  if (data.name.length > 20) {
    throw new Error('`name` length should less than or equal 20');
  }
  // --end--
  
  // validate `age` for rules:
  //  1. it should be required
  //  2. it should be int
  //  3. it should be greater than to 0
  //  4. it should be less than to 100
  // some boring code
});
```
You will write so many boring code for validating a data field `name`! It will be much more boring and complex when the fields to validate increase.
Then, `racoon-js` can save you. If you use `racoon-js`. You can write the follow code to validate:
```javascript
const express = require('express');
const racoon = requrie('racoon-js');
const app = express();

app.use(express.json());

app.post('/api/foo', (req, res) => {
  const data = req.body;
  const schema = racoon.object({
    name: racoon.string().min(10).max(20).required(),
    age: racoon.number().int().min(0, false).max(100, false).required()
  });
  const cleanData = schema.validate(data);
  // cleanData example
  // { name: 'Tom', age: 20 }
});
```

# How To Use

## 1. Define type schema
`racoon` supports 6 types:
1. number
2. string
3. boolean
4. object
5. array
6. any
Each one can be defined by the same name method. For Example:
```javascript
const schema = racoon.number();
```

## 2. Add restricts to schema
```javascript
const schema = racoon.number().min(0).max(10).required();
```

## 3. Call `validate` or `validateSilent` of schema
```javascript
const schema = racoon.number();

try {
  const value = schema.validate(12);
} catch (error) {
  console.error(error);
}
// or
const { error, value } = schema.validateSilent(12);
if (error) { // if validate success, error will be undefined 
  console.error(error);
}
```

# Api Document
## racoon.number()
Return a number `schema`. **Be Careful, `NaN` is not accepted by default. You can call `allowNaN` to accept it.**
```javascript
const schema = racoon.number();
schema.validate(undefined); // success
schema.validate(null); // success
schema.validate(1); // success
schema.validate(1.2); // success
schema.validate(NaN); // fail
schema.validate('abc'); // fail
schema.validate({}); // fail
schema.validate([]); // fail
```

## number().allowNaN([enable = true])
Allow number accept `NaN`.
### params
- enable
  - default to be `true`. If you pass `enable=false` explicitly, `NaN` will not be accepted, it is the same as not calling `allowNaN`.
```javascript
const schema = racoon.number().allowNaN();
schema.validate(NaN); // success
```

## number().int()
Restrict number to be an integer.
```javascript
const schema = racoon.number().int();
schema.validate(1); // success
schema.validate(1.2); // fail
```

## number().min(minValue, [closed=true])
Restrict number's min value
### params
- minValue *(number)*
  - the min value that target data can be.
- enable
  - default to be `true`, means target data can greater than or equal to the min value. If you pass `enable=false` explicitly, means target data must strictly greater than the min value.
```javascript
const schema1 = racoon.number().min(10);
schema1.validate(11); // success
schema1.validate(10); // success
schema1.validate(9); // fail
const schema2 = racoon.number().min(10, false);
schema2.validate(11); // success
schema2.validate(10); // fail
schema2.validate(9); // fail
```

## number().max(maxValue, [closed=true])
Restrict number's max value
### params
- maxValue *(number)*
  - the max value that target data can be.
- enable
  - default to be `true`, means target data can less than or equal to the max value. If you pass `enable=false` explicitly, means target data must strictly less than the max value.
```javascript
const schema1 = racoon.number().max(10);
schema1.validate(9); // success
schema1.validate(10); // success
schema1.validate(11); // fail
const schema2 = racoon.number().max(10, false);
schema2.validate(9); // success
schema2.validate(10); // fail
schema2.validate(11); // fail
```
