(function() {
	'use strict';
	module.exports = function(grunt) {
		// Project configuration.
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			jshint: {
				all: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js']
			},
			watch: {
				scripts: {
					files: ['**/*.js', 'test/**', 'demo/**'],
					tasks: ['jshint', 'karma:server:run']
				}
			},
			bower: {
				options: {
					cleanTargetDir: true,
					cleanBowerDir: false,
					targetDir: 'app/vendor',
					layout: function(type, component) {
						return component; //want any resources, js or css or any in the vendor subfolder
					}
				},
				install: {},
				verify: {
					options: {
						install: false, //bower verify will handle the installation
					}
				}
			},
			"bower-verify": {
				test: {
					tasks: ['bower:verify', 'karma:once']
				}
			},
			"gh-pages": {
				options: {
					base: 'app'
				},
				src: ['**']
			},
			karma: {
				server: {
					configFile: 'karma.conf.js',
					background: true,
					runnerPort: 9999,
					port: 9998, //specific port for phantomjs only
					browsers: ['PhantomJS']
				},
				once: {
					configFile: 'karma.conf.js',
					runnerPort: 9888,
					singleRun: true,
					port: 9887, //specific port for phantomjs only
					browsers: ['PhantomJS']
				},
				standard: {
					configFile: 'karma.conf.js',
					background: false,
					browsers: ['PhantomJS']
				}
			},
			connect: {
				server: {
					options: {
						keepalive: true,
						port: 9001,
						base: 'app'
					}
				}
			},
			clean: ["components", "app/vendor", "node_modules"]
		});

		grunt.loadNpmTasks('grunt-bower-task');
		grunt.loadNpmTasks('grunt-bower-verify');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-gh-pages');
		grunt.loadNpmTasks('grunt-karma');

		// Default task(s).
		grunt.registerTask('test', ['jshint', 'karma:standard']);
		grunt.registerTask('develop', ['jshint', 'karma:server', 'watch:scripts']);
		grunt.registerTask('test:full', ['jshint', 'bower:install', 'bower-verify']);
		grunt.registerTask('default', ['bower:install', 'jshint', 'karma:once']);
	};
})();
