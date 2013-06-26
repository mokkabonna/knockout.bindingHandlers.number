(function() {

	// Configure RequireJS so it resolves relative module paths from the `src` folder.
	require.config({
		baseUrl: "../src",
		paths: {
			knockout: '../lib/knockout-2.1.0/index',
			jquery : 'jquery.noglobals'
		}
	});


	require(['number'], function(ko) {
		var viewModel = {
			numeric : ko.observable(111),
			numericString : ko.observable('222'),
			numericPollutedString : ko.observable('aa333aa'),
			numericUndefined : ko.observable(),
			numericNull : ko.observable(null),
			extraEvents : ko.observableArray(['afterkeydown', 'input', 'blur', 'focus']),
			selectedEvents : ko.observableArray([])
		};

		viewModel.json = ko.computed(function() {
			var model = ko.toJS(viewModel);
			delete model.json;
			delete model.extraEvents;
			delete model.selectedEvents;
			return JSON.stringify(model, null, 2);
		});

		ko.applyBindings(viewModel);
	});
}());
