(function() {

	// Defer Qunit so RequireJS can work its magic and resolve all modules.
	QUnit.config.autostart = false;

	// Configure RequireJS so it resolves relative module paths from the `src`
	// folder.
	require.config({
		baseUrl: '../app',
		paths: {
			knockout: 'vendor/knockout/index',
			jquery : 'js/jquery.noglobals',
			number : 'js/number'
		}
	});

	// A list of all QUnit test Modules.  Make sure you include the `.js`
	// extension so RequireJS resolves them as relative paths rather than using
	// the `baseUrl` value supplied above.
	var testModules = [
			'../test/number'
	];

	// Resolve all testModules and then start the Test Runner.
	require(testModules, QUnit.start);
}());
