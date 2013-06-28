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
					files: ['**/*.js', 'test/**', 'demo/**'],
					tasks: ['qunit', 'jshint']
				}
			},
			bower: {
				options: {
					targetDir: 'app/vendor'
				},
				install: {}
			},
			"gh-pages": {
				src: ['app/**/*']
			},
			connect: {
				server: {
					options: {
						keepalive: true,
						port: 9001,
						base: ''
					}
				}
			},
			clean: ["components", "lib", "node_modules"]
		});

		grunt.loadNpmTasks('grunt-contrib-qunit');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-bower-task');
		grunt.loadNpmTasks('grunt-bower-task');
		grunt.loadNpmTasks('grunt-gh-pages');

		// Default task(s).
		grunt.registerTask('test', ['jshint', 'qunit', 'watch:scripts']);
		grunt.registerTask('default', ['bower:install', 'jshint', 'qunit']);
	};
})();
