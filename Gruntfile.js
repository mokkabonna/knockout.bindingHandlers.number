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
				options: {
					livereload: true
				},
				scripts: {
					files: ['**/*.js', 'test/**', 'demo/**'],
					tasks: ['qunit', 'jshint']
				}
			},
			bower: {
				install: {}
			},
			connect: {
				server: {
					options: {
						keepalive: true,
						port: 9001,
						base: ''
					}
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-qunit');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-bower-task');

		// Default task(s).
		grunt.registerTask('test', ['jshint', 'qunit', 'watch:scripts']);
		grunt.registerTask('default', ['bower:install', 'jshint', 'qunit']);
	};
})();
