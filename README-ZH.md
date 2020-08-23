## [English](README.md)

# racoon-js
一款轻量级的JSON数据格式校验、清洗工具库。

[![npm version](https://img.shields.io/npm/v/racoon-js.svg?style=flat-square)](https://www.npmjs.com/package/racoon-js)
[![build status](https://img.shields.io/travis/charlyzeng/racoon-js/master.svg?style=flat-square)](https://travis-ci.org/charlyzeng/racoon-js)
[![code coverage](https://img.shields.io/coveralls/charlyzeng/racoon-js.svg?style=flat-square)](https://coveralls.io/r/charlyzeng/racoon-js)
[![install size](https://packagephobia.com/badge?p=racoon-js)](https://packagephobia.com/result?p=racoon-js)
[![npm downloads](https://img.shields.io/npm/dm/racoon-js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=racoon-js)

## Table Of Contents
- [API文档](https://racoon-js.gitbook.io/zh)
- [特性](#特性)
- [浏览器支持](#浏览器支持)
- [安装](#安装)
- [示例](#示例)

## 特性
- 🌈 同时支持浏览器和Node端。
- ❄️ 可以灵活定义数据格式，并且支持任意层级的对象、数组格式定义。
- 🔗 支持链式调用，且无需关注调用顺序。

## 浏览器支持
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 10 ✔ |

## 安装
使用npm
```bash
$ npm install racoon-js
```

使用yarn:
```bash
yarn add racoon-js
```

使用CDN:
```html
<script src="//cdn.jsdelivr.net/npm/racoon-js@latest/dist/racoon.min.js"></script>
```

## 示例
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
