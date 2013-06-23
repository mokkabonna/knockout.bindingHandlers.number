define(['knockout', 'jquery'], function(ko, $) {
	'use strict';
	ko.bindingHandlers.number = {
		init: function(element, valueAccessor, allBindings) {
			var variable = valueAccessor();
			var val = ko.utils.unwrapObservable(variable);
			var type = typeof val;
			var isNumber = type === 'number';
			var updateAsNumber = type !== 'string';

			//listen to change event by default, and any events defined in valueUpdate, space separated string or an array
			var events = ['change'];
			var extraEvents = allBindings().valueUpdate ? ko.utils.unwrapObservable(allBindings().valueUpdate) : [];
			extraEvents = Array.isArray(extraEvents) ? extraEvents : extraEvents.split(' ');
			events = events.concat(extraEvents);

			var asyncEvents = [];
			var newEvents = [];
			events.forEach(function(e) {
				if (e.indexOf('after') === 0) {
					e = e.substring(5);
					asyncEvents.push(e);
				}
				newEvents.push(e);
			});

			//update the observable, if the original value was a number or undefined, then update it as a number

			function updateObservable(event) {
				var onlyDigits = ko.bindingHandlers.number.replace(element.value);
				if (event === 'change') element.value = onlyDigits;
				if (ko.isObservable(variable)) variable(updateAsNumber ? onlyDigits === '' ? undefined : parseInt(onlyDigits, 10) : onlyDigits);
			}

			$(element).on(newEvents.join(' '), function(e) {
				var type = e.type;
				if (asyncEvents.indexOf(type) !== -1) {
					//asynchronous update
					setTimeout(function() {
						updateObservable(type);
					}, 0);
				} else {
					//synchronous update
					updateObservable(type);
				}
			});

			//if a number just assign the number as it, it will be converted to a string, if not then first strip any non digit values from the beginning
			element.value = isNumber ? ko.utils.unwrapObservable(variable) : ko.bindingHandlers.number.replace(ko.utils.unwrapObservable(variable));
		},
		update: function(element, valueAccessor) {
			var variable = valueAccessor();
			var type = typeof ko.utils.unwrapObservable(variable);
			var isNumber = type === 'number';
			var updateAsNumber = type !== 'string';

			//only update input itself if it does not have focus, we don't want altering text before change event
			if (!$(element).is(':focus')) {
				element.value = isNumber ? ko.utils.unwrapObservable(variable) : ko.bindingHandlers.number.replace(ko.utils.unwrapObservable(variable));
			}
		},
		replace: function(val) {
			return (val || '').replace(/[^\d]/g, '');
		}
	};

	return ko;
});
