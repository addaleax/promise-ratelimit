'use strict';

const delay = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const defer = () => {
	var deferred = {};
	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred;
};

function ratelimit(rateInMs) {
	rateInMs = parseInt(rateInMs);
	if (rateInMs != rateInMs) // NaN check
		throw new TypeError('ratelimit needs a single numerical argument');
	
	if (rateInMs < 0)
		rateInMs = 0;
	
	var throttle = function() {
		var deferred = defer();
		throttle.queue.push(deferred);
		
		return throttle.check().then(function() {
			return deferred.promise;
		});
	};
	
	throttle.currentlyActiveCheck = null;
	throttle.lastExecutionTime = 0;
	throttle.queue = [];
	
	throttle.resolveUniform = function(fnName, v) {
		throttle.queue.forEach(function(deferred) {
			return deferred[fnName](v);
		});
		
		throttle.queue = [];
	};
	
	throttle.resolveAll = function(v) {
		return throttle.resolveUniform('resolve', v);
	};
	
	throttle.rejectAll = function(v) {
		return throttle.resolveUniform('reject', v);
	};
	
	throttle.check = function() {
		if (throttle.currentlyActiveCheck || throttle.queue.length == 0)
			return throttle.currentlyActiveCheck;
		
		var waitingTime = rateInMs - (Date.now() - throttle.lastExecutionTime);
		return throttle.currentlyActiveCheck =
			(waitingTime > 0 ? delay(waitingTime) : Promise.resolve()).then(function()
		{
			var now = Date.now();
			if (now - throttle.lastExecutionTime >= rateInMs) {
				throttle.lastExecutionTime = now;
				throttle.queue.shift().resolve();
			}
			
			throttle.currentlyActiveCheck = null;
			throttle.check();
		});
	};
	
	return throttle;
}

module.exports = ratelimit;
