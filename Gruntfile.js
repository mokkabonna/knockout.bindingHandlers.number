'use strict';
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			all: ['test/**/*.html']
		},
		watch: {
			scripts: {
				files: ['**/*.js', 'test/**'],
				tasks: ['qunit']
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('test', ['qunit', 'watch:scripts']);
	grunt.registerTask('default', ['qunit']);
};
