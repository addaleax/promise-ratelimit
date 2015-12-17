promise-ratelimit
============

[![NPM Version](https://img.shields.io/npm/v/promise-ratelimit.svg?style=flat)](https://npmjs.org/package/promise-ratelimit)
[![NPM Downloads](https://img.shields.io/npm/dm/promise-ratelimit.svg?style=flat)](https://npmjs.org/package/promise-ratelimit)
[![Build Status](https://travis-ci.org/addaleax/promise-ratelimit.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/promise-ratelimit?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/promise-ratelimit/badge.svg?branch=master)](https://coveralls.io/r/addaleax/promise-ratelimit?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/promise-ratelimit.svg?style=flat)](https://david-dm.org/addaleax/promise-ratelimit)
[![devDependency Status](https://david-dm.org/addaleax/promise-ratelimit/dev-status.svg?style=flat)](https://david-dm.org/addaleax/promise-ratelimit#info=devDependencies)

Rate limiting (throttling) implementation for Promises on Node.js

Install:
`npm install promise-ratelimit`

Limit frequency of promise fulfilling:

```javascript
var throttle = require('promise-ratelimit')(2000); /* rateInMilliseconds */

var startTime = Date.now();

for (var i = 0; i < 10; i++) {
	throttle().then(function() { console.log(Date.now() - startTime); });
}

// example output:
// 11
// 2007
// 4007
// 6008
// 8011
// 10014
// 12016
// 14018
// 16020
// 18022
```

License
===

MIT

Note: [q-ratelimit](https://github.com/addaleax/q-ratelimit) and
[promise-ratelimit](https://github.com/addaleax/promise-ratelimit) are
sister modules based on the same original code.
