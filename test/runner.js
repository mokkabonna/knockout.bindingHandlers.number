(function() {

	require.config({
		baseUrl: '../base/app',
		paths: {
			knockout: 'vendor/knockout.js/knockout',
			sinon: 'vendor/sinon/index',
			"sinon-qunit": 'vendor/sinon-qunit/index',
			jquery: 'js/jquery.noglobals',
			number: 'js/number'
		}
	});


	require(['test/helper','../test/number'], function(helper, number) {
		window.__karma__.start();
	});

})();
