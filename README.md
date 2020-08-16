# racoon-js
A tiny tool for checking and cleaning json data.

# How To Use
```javascript
import racoon from 'racoon-js';

// define data format schema
const schema = racoon.object({
  name: racoon
    .string()
    .min(3)
    .max(30)
    .required(),
  age: racoon
    .number()
    .int()
    .min(1)
    .max(100)
    .default(1),
  married: racoon
    .boolean()
    .default(false), // if value is `null` or `undefined`, then return default value `false`
  favorite: racoon.object({
    sports: racoon.array(
      racoon.string().min(1).max(100).required()
    ),
    book: racoon.object({
      title: racoon.string().required(),
      date: racoon
        .string()
        .pattern(/^\d{4}-\d{1,2}-\d{1,2}$/)
        .format((date) => { // format the return value
          return `${date} 12:00:00`;
        })
    })
  })
});

try {
  const result = schema.validate({
    name: 'Jack',
    age: 22,
    favorite: {
      sports: ['football', 'basketball'],
      book: {
        title: 12,
        date: '2010-1-1'
      }
    }
  });
} catch (error) {
  console.error(error);
  // Error: "favorite.book.title": value should be typeof string
}

// If you don't like `try-catch` code style
// you can use `validateSilent` method
// If validate fail
// then `error` is not emtpy
// otherwise，`error` is `undefined`
// For Example:
const { error, value } = schema.validateSilent({ ... });
```

# Api Document
[Click Here](https://racoon-js.gitbook.io/zh/)
