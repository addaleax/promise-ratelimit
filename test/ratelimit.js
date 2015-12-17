'use strict';

var assert = require('assert');
var _ = require('lodash');
var ratelimit = require('../');

describe('ratelimit', function() {
	var periods = [100, 200, 500, 900, 2000];
		
	for (var i = 0; i < periods.length; ++i) { (function() {
		var period = periods[i];
		
	it('should fulfill promises with approximately the specified period of ' + period + ' ms', function() {
		var throttle = ratelimit(period);
		var promiseCount = parseInt(4000 / period) + 1;
		
		var lastExecTime = Date.now() - period;
		
		return Promise.all(_.range(promiseCount).map(function() {
			return throttle().then(function() {
				var now = Date.now();
				
				var diff = now - lastExecTime;
				lastExecTime = now;
				
				return diff;
			});
		})).then(function(executionTimes) {
			var sum = function(a, b) { return a + b; };
			
			var rmsDev = Math.sqrt(executionTimes.map(function(t) {
				return Math.pow(t - period, 2);
			}).reduce(sum) / executionTimes.length);
			
			assert.ok(rmsDev / period < 0.03); // less than 3 % deviation is okay
		});
	});
	
	})(); }
});
