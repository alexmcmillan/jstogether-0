import React from 'react';
import $ from 'jquery';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

import AppComponent from './component/app';

if (ExecutionEnvironment.canUseDOM) {
	window.$ = $;
}

let App = React.createFactory(AppComponent);
let json = 'application/json; charset=utf-8';

$.ajaxSetup({
	contentType: json,
	processData: false,
	beforeSend (req, options) {
		// This ensures that requests using JSON stringify their content before sending
		if (options.contentType === json && options.data && typeof options.data !== 'string') {
			options.data = JSON.stringify(options.data);
		}
	}
});

if (!Array.prototype.find) {
	Array.prototype.find = function(predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}

		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
}

React.render(App(), document.getElementById('react-mount'));