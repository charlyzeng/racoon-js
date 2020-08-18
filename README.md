# racoon-js
A tiny tool for checking and cleaning json data.

[API Doc](https://racoon-js.gitbook.io/zh/)

## Features
- 🌈 Support both browser and node.
- ❄️ The data format can be flexibly defined, and any level of attribute nesting of Object is supported.
- 🔗 Support chain call without paying attention to call sequence.

## Browser Support
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 10 ✔ |

## Installing
Using npm:
```bash
$ npm install racoon-js
```

Using yarn:
```bash
yarn add racoon-js
```

Using cdn:
```html
<script src="//cdn.jsdelivr.net/npm/racoon-js@latest/dist/racoon.min.js"></script>
```

## Example
```javascript
import racoon from 'racoon-js';

// Define data format schema
const schema = racoon.object({
  name: racoon
    .string()
    .min(3)
    .error('name is too short') // You can add your custom error message
    .max(30)
    .error('name is too long')
    .required(), // Name can not be `undefined` or `null`
  age: racoon
    .number()
    .int()
    .default(1) // If value is `null` or `undefined`, then return default value `false`
  married: racoon.boolean(),
  favorite: racoon.object({ // You can define deep nested object format schema
    sports: racoon.array(
      racoon.string().min(1).max(100).required()
    ),
    book: racoon.object({
      title: racoon.string().required(),
      date: racoon
        .string()
        .pattern(/^\d{4}-\d{1,2}-\d{1,2}$/)
        .format((date) => { // Format the return value
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
  // ↑↑↑ The error message can be customed
}

// If you don't like `try-catch` code style
// you can use `validateSilent` method
// If validate fail
// then `error` is not emtpy
// otherwise，`error` is `undefined`
// For Example:
const { error, value } = schema.validateSilent({ ... });
```
