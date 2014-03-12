// Karma configuration
// Generated on Fri Jun 28 2013 14:51:32 GMT+0200 (CEST)

module.exports = function(config) {
		config.set({
				// base path, that will be used to resolve files and exclude
				basePath: '',

				frameworks: ["requirejs", 'qunit'],


				// list of files / patterns to load in the browser
				files: [
						// 'app/vendor/qunit/qunit/qunit.js',
						// 'test/adapter-qunit.js',
						'test/runner.js', {
								pattern: 'test/helper.js',
								included: true
						}, {
								pattern: 'app/js/number.js',
								included: false
						}, {
								pattern: 'app/js/jquery.noglobals.js',
								included: false
						}, {
								pattern: 'app/vendor/jquery/dist/jquery.js',
								included: false
						}, {
								pattern: 'app/vendor/knockout.js/knockout.js',
								included: false
						}, {
								pattern: 'test/number.js',
								included: false
						}
				],


				// list of files to exclude
				exclude: [

				],


				// test results reporter to use
				// possible values: 'dots', 'progress', 'junit'
				reporters: ['progress'],


				// web server port
				port: 9876,


				// enable / disable colors in the output (reporters and logs)
				colors: true,


				// level of logging
				// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
				logLevel: config.LOG_INFO,


				// enable / disable watching file and executing tests whenever any file changes
				autoWatch: false,


				// Start these browsers, currently available:
				// - Chrome
				// - ChromeCanary
				// - Firefox
				// - Opera
				// - Safari (only Mac)
				// - PhantomJS
				// - IE (only Windows)
				browsers : [],


				// If browser does not capture in given timeout [ms], kill it
				captureTimeout: 8000,


				// Continuous Integration mode
				// if true, it capture browsers, run tests and exit
				singleRun: false,
		});
};
