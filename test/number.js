define(['knockout', 'jquery', 'js/number'], function(ko, $, numberBinding) {

	ko.bindingHandlers.number = numberBinding;

	var input, input2;

	// Patch $el.is(':focus') until PhantomJS supports it properly.
	// https://code.google.com/p/phantomjs/issues/detail?id=427

	function fixPhantomJSFocus() {
		var self = this;
		self._jQuery_is = $.fn.is;

		$.fn.is = function(s) {
			if (s === ':focus') {
				return this.get(0) === document.activeElement;
			}
			return self._jQuery_is.apply(this, arguments);
		};
	}

	function makeTargetFormat(value, type) {
		if (type === 'string') return value;
		if (type === 'number') return value * 1;
	}

	//shared testcases with different input values

	function testCase(initValue) {
		var observableTargetType = typeof initValue === 'string' ? 'string' : 'number';
		var type = typeof initValue;

		module('Init with ' + initValue + ' (' + type + ')', {
			fixture: '<input id="numberInput" type="text" data-bind="number: numeric" /><input id="numberInput2" type="text" data-bind="number: numeric, valueUpdate: \'afterkeydown\'" />',
			setup: function() {
				fixPhantomJSFocus();
				this.viewModel = {
					numeric: ko.observable(initValue)
				};
				input = $('#numberInput');
				input2 = $('#numberInput2');
				ko.applyBindings(this.viewModel);
			},
			teardown: function() {
				//restore phantomjs fix in jquery
				$.fn.is = this._jQuery_is;
			}
		});

		test('strips non digit numbers', function() {
			input.val('123abc456');
			input.trigger('change');
			equal(input.val(), '123456');
		});

		test('updates value to observable in original format (' + observableTargetType + ')', function() {
			input.val('a123a4');
			input.trigger('change');
			deepEqual(this.viewModel.numeric(), makeTargetFormat('1234', observableTargetType));
		});

		test('change in the observable is reflected in the input', function() {
			this.viewModel.numeric('500aa');
			deepEqual(input.val(), '500');
		});

		asyncTest('change in the observable is reflected in the input only if it do not have focus', function() {
			expect(4);
			var obs = this.viewModel.numeric;

			obs('500');
			input2.focus();
			input2.val('500aa4');
			input2.trigger('keydown');

			ok(input2.is(':focus'), 'the element do have focus');

			setTimeout(function() {
				deepEqual(obs(), makeTargetFormat('5004', observableTargetType)); //observable should be updated
				deepEqual(input2.val(), '500aa4'); //but input should not be changed before change event
				input2.blur();
				input2.trigger('change');
				deepEqual(input2.val(), '5004'); //now it should have changed
				start();

			}, 1);
		});

		test('change in the observable to a different type than ' + observableTargetType + ' will not affect init behaviour', function() {
			this.viewModel.numeric(500);
			input.val('a123a4');
			input.trigger('change');
			deepEqual(this.viewModel.numeric(), makeTargetFormat('1234', observableTargetType));
		});

		asyncTest('works with valueUpdate', 1, function() {
			var obs = this.viewModel.numeric;
			input2.val('ab56aa78--');
			input2.trigger('keydown');
			setTimeout(function() {
				deepEqual(obs(), makeTargetFormat('5678', observableTargetType));
				start();
			}, 1);
		});
	}

	module('General');
	asyncTest('AMD module does not return knockout, change from previous behaviour', 1, function() {
		require(['js/number', 'knockout'], function(knockoutFromNumber, knockout) {
			notDeepEqual(knockoutFromNumber, knockout);
			start();
		});
	});

	//Setup the actual tests
	testCase('1234'); //testing when the input is a string
	testCase('abc677agaf32'); //testing when the input is a polluted string
	testCase(123); //when it's a number
	testCase(undefined); //when it's undefinel
	testCase(null); //when it's null

});
