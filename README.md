## [中文](README-ZH.md)

# racoon-js
The easiest to use and powerful data validate and formatter library for JS.

[![npm version](https://img.shields.io/npm/v/racoon-js.svg?style=flat-square)](https://www.npmjs.com/package/racoon-js)
[![build status](https://img.shields.io/travis/charlyzeng/racoon-js/master.svg?style=flat-square)](https://travis-ci.org/charlyzeng/racoon-js)
[![code coverage](https://img.shields.io/coveralls/charlyzeng/racoon-js.svg?style=flat-square)](https://coveralls.io/r/charlyzeng/racoon-js)
[![install size](https://packagephobia.com/badge?p=racoon-js)](https://packagephobia.com/result?p=racoon-js)
[![npm downloads](https://img.shields.io/npm/dm/racoon-js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=racoon-js)

## Table Of Contents
- [API Document](/doc/API.md)
- [Features](#features)
- [Browser Support](#browser-support)
- [Installing](#installing)
- [Example](#example)

## Features
- 🌈 Support both browser and node.
- ❄️ The data format can be flexibly defined, and any level of attribute nesting of object and array is supported.
- 🔗 Support chain call without paying attention to call sequence.
- ✨ Error message can be easily customed.

## Browser Support
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
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
<script src="https://cdn.jsdelivr.net/npm/racoon-js@latest/dist/racoon.min.js"></script>
```
The JS from cdn is _21kB_, and it will be only _4.6kB_ after be compressed by gzip.

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
    .default(1) // If value is `null` or `undefined`, then return default value `1`
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
  // Error: "favorite.book.title": value should be a type of string
  // ↑↑↑ The error message can be customed
}

// If you don't like `try-catch` code style,
// you can use `validateSilent` method. When
// validate failed, the `error` will not be
// empty. Otherwise，the `error` is `undefined`.
//
// For Example:
const { error, value } = schema.validateSilent({ ... });
```
