define(['knockout', 'jquery', 'number'], function(ko, $, number) {
	var input;

	function sharedSetup(initVal) {
		return function() {
			this.viewModel = {
				numeric: ko.observable(initVal)
			};
			input = $('#numberInput');
			ko.applyBindings(this.viewModel);
		};
	}

	module('knockout number binding, init with string', {
		setup: sharedSetup('abc677agaf32')
	});

	test('strips non digit numbers', function() {
		input.val('123abc456');
		ko.utils.triggerEvent(input[0], 'change');
		equal(input.val(), '123456');
	});

	test('updates value to observable in original format (string)', function() {
		input.val('a123a4');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(this.viewModel.numeric(), '1234');
	});

	test('change in the observable is reflected in the input', function() {
		this.viewModel.numeric('500aa');
		deepEqual(input.val(), '500');
	});

	test('change in the observable to a non string value will not affect init behaviour', function() {
		this.viewModel.numeric(500);
		input.val('a123a4');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(this.viewModel.numeric(), '1234');
	});

	module('knockout number binding, init with number', {
		setup: sharedSetup(123)
	});

	test('strips non digit numbers', function() {
		input.val('123abc456');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(input.val(), '123456');
	});

	test('updates value to observable', function() {
		input.val('a123a4');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(this.viewModel.numeric(), 1234);
	});

	test('change in the observable is reflected in the input', function() {
		this.viewModel.numeric(500);
		deepEqual(input.val(), '500');
	});

	test('change in the observable to a non number value will not affect init behaviour', function() {
		this.viewModel.numeric('500aa');
		input.val('a123a4');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(this.viewModel.numeric(), 1234);
	});

	module('knockout number binding, init with nothing', {
		setup: sharedSetup()
	});

	test('strips non digit numbers', function() {
		input.val('123abc456');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(input.val(), '123456');
	});

	test('updates value to observable', function() {
		input.val('a123a4');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(this.viewModel.numeric(), 1234);
	});

	test('an empty string is reflected as undefined', function() {
		input.val('');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(this.viewModel.numeric(), undefined);
	});

	test('change in the observable is reflected in the input', function() {
		this.viewModel.numeric(342);
		deepEqual(input.val(), '342');
	});

	test('change in the observable to a non number value will not affect init behaviour', function() {
		this.viewModel.numeric('500aa');
		input.val('a123a4');
		ko.utils.triggerEvent(input[0], 'change');
		deepEqual(this.viewModel.numeric(), 1234); //still converted to number, not string
	});

});
