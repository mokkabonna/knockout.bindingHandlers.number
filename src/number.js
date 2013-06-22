define(['knockout', 'jquery'], function(ko, $) {
	'use strict';
	ko.bindingHandlers.number = {
		init: function(element, valueAccessor) {
			var variable = valueAccessor();
			var type = typeof ko.utils.unwrapObservable(variable);
			var isNumber = type === 'number';
			var updateAsNumber = isNumber || type === 'undefined';

			//call original value binding
			ko.bindingHandlers.value.init.apply(this, arguments);

			ko.utils.registerEventHandler(element, 'change', function() {
				var onlyDigits = ko.bindingHandlers.number.replace(element.value);
				element.value = onlyDigits;
				//update the observable, if the original value vas a number or undefined, then upate it as a number
				if (ko.isObservable(variable)) variable(updateAsNumber ? onlyDigits === '' ? undefined :  parseInt(onlyDigits, 10) : onlyDigits);
			});

			//if a number just assign the number as it, it will be converted to a string, if not then first strip any non digit values from the beginning
			element.value = isNumber ? ko.utils.unwrapObservable(variable) :  ko.bindingHandlers.number.replace(ko.utils.unwrapObservable(variable));
		},
		update: function(element, valueAccessor) {
			var variable = valueAccessor();
			var type = typeof ko.utils.unwrapObservable(variable);
			var isNumber = type === 'number';
			var updateAsNumber = isNumber || type === 'undefined';

			//call original value update
			ko.bindingHandlers.value.update.apply(this, arguments);
			element.value = isNumber ? ko.utils.unwrapObservable(variable) :  ko.bindingHandlers.number.replace(ko.utils.unwrapObservable(variable));
		},
		replace: function(val) {
			return (val || '').replace(/[^\d]/g, '');
		}
	};
});
