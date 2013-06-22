(function() {

	// Defer Qunit so RequireJS can work its magic and resolve all modules.
	QUnit.config.autostart = false;

	// Configure RequireJS so it resolves relative module paths from the `src`
	// folder.
	require.config({
		baseUrl: "../src",
		paths: {
			knockout: '../lib/knockout-2.1.0/index',
			jquery : 'jquery.noglobals'
		}
	});

	// A list of all QUnit test Modules.  Make sure you include the `.js`
	// extension so RequireJS resolves them as relative paths rather than using
	// the `baseUrl` value supplied above.
	var testModules = [
			"number.js"
	];

	// Resolve all testModules and then start the Test Runner.
	require(testModules, QUnit.start);
}());
