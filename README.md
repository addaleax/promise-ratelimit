q-ratelimit
============

[![NPM Version](https://img.shields.io/npm/v/q-ratelimit.svg?style=flat)](https://npmjs.org/package/q-ratelimit)
[![NPM Downloads](https://img.shields.io/npm/dm/q-ratelimit.svg?style=flat)](https://npmjs.org/package/q-ratelimit)
[![Build Status](https://travis-ci.org/addaleax/q-ratelimit.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/q-ratelimit?branch=master)
[![Coverage Status](https://coveralls.io/repos/addaleax/q-ratelimit/badge.svg?branch=master)](https://coveralls.io/r/addaleax/q-ratelimit?branch=master)
[![Dependency Status](https://david-dm.org/addaleax/q-ratelimit.svg?style=flat)](https://david-dm.org/addaleax/q-ratelimit)
[![devDependency Status](https://david-dm.org/addaleax/q-ratelimit/dev-status.svg?style=flat)](https://david-dm.org/addaleax/q-ratelimit#info=devDependencies)

Rate limiting (throttling) implementation for Q promises on Node.js

Install:
`npm install q-ratelimit`

Limit frequency of promise fulfilling:

```javascript
var throttle = require('q-ratelimit')(2000); /* rateInMilliseconds */

var startTime = Date.now();

for (var i = 0; i < 10; i++) {
	throttle().then(function() { console.log(Date.now() - startTime); }).done();
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
