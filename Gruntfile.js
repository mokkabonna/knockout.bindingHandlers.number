(function() {
	'use strict';
	module.exports = function(grunt) {
		// Project configuration.
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			jshint: {
				all: ['Gruntfile.js', 'src/**/*.js']
			},
			qunit: {
				all: ['test/**/*.html']
			},
			watch: {
				scripts: {
					files: ['**/*.js', 'test/**'],
					tasks: ['qunit', 'jshint']
				}
			},
			bower: {
				install: {}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-qunit');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-bower-task');

		// Default task(s).
		grunt.registerTask('test', ['jshint', 'qunit', 'watch:scripts']);
		grunt.registerTask('default', ['bower:install', 'jshint', 'qunit']);
	};
})();
