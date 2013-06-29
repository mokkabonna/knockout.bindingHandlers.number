// Karma configuration
// Generated on Fri Jun 28 2013 14:51:32 GMT+0200 (CEST)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  'app/vendor/qunit/qunit.js',
  'test/adapter-qunit.js',
  REQUIRE,
  REQUIRE_ADAPTER,
  'test/runner.js',
  {pattern: 'app/js/number.js', included: false},
  {pattern: 'test/helper.js', included: false},
  {pattern: 'app/js/jquery.noglobals.js', included: false},
  {pattern: 'app/vendor/jquery/jquery.js', included: false},
  {pattern: 'app/vendor/knockout/index.js', included: false},
  {pattern: 'app/vendor/sinon/index.js', included: true},
  //{pattern: 'app/vendor/sinon-qunit/index.js', included: true},
  {pattern: 'test/number.js', included: false}
];


// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_WARN;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
//browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 8000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
