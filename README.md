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
});
```
