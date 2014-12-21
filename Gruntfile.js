/* jshint globalstrict:true */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// Configurable paths
			dist: '.',
			styles: 'styles',
			scripts: 'scripts',
			fonts: 'fonts',
			components: 'bower_components',
			modules: 'node_modules',
			tests: 'test/scripts'
		},

		watch: {
			sass: {
				files: ['<%= yeoman.styles %>/**/*.scss'],
				tasks: [
					'sass:dev',
					'autoprefixer',
					'csslint',
					'notify:sass'
				]
			},
			scripts: {
				files: ['<%= yeoman.scripts %>/**/*.js'],
				tasks: [
					'jshint:all',
					// 'concat:scripts',
					// 'jasmine:watch',
					'notify:scripts'
				]
			},
			// tests: {
			// 	files: ['<%= yeoman.tests %>/**/*.js'],
			// 	tasks: ['jasmine:watch']
			// },
			config: {
				files: ['Gruntfile.js'],
				options: {
					reload: true
				}
			}
		},

		sass: {
			options: {
				sourceMap: true,
				update: true,
				includePaths: [
					'<%= yeoman.components %>'
				]
			},
			prod: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.styles %>',
					src: ['*.scss'],
					dest: '<%= yeoman.dist %>',
					ext: '.css'
				}]
			},
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.styles %>',
					src: ['*.scss'],
					dest: '<%= yeoman.dist %>',
					ext: '.css'
				}]
			}
		},

		// concat: {
		// 	options: {
		// 		stripBanners: true
		// 	},
		// 	scripts: {
		// 		options: {
		// 			separator: ';'
		// 		},
		// 		files: scriptFiles
		// 	}
		// },

		// uglify: {
		// 	prod: {
		// 		options: {
		// 			sourceMap: true
		// 		},
		// 		files: scriptFiles
		// 	}
		// },

		concurrent: {
			prod: [
				'sass:prod'
				// 'newer:uglify:prod'
			],
			dev: [
				'sass:dev'
				// 'newer:concat:scripts'
			]
		},

		notify: {
			build: {
				options: {
					title: 'Grunt Finished',
					message: 'Grunt has finished its build.'
				}
			},
			watch: {
				options: {
					title: 'Watch Started',
					message: 'Grunt is now watching source files for changes.'
				}
			},
			sass: {
				options: {
					title: 'Sass Finished',
					message: 'Grunt has finished compiling Sass files.'
				}
			},
			scripts: {
				options: {
					title: 'Scripts Finished',
					message: 'Grunt has finished compiling javascript files.'
				}
			}
		},

		clean: [
			'<%= yeoman.styles %>/*.css',
			'<%= yeoman.scripts %>/*.min.js'
		],

		// jasmine: {
		// 	watch: {
		// 		src: jasmineSource,
		// 		options: {
		// 			display: 'short',
		// 			specs: jasmineSpecs
		// 		}
		// 	},
		// 	test: {
		// 		src: jasmineSource,
		// 		options: {
		// 			display: 'full',
		// 			specs: jasmineSpecs
		// 		}
		// 	}
		// },

		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			prod: {
				src: ['<%= yeoman.styles %>/*.css']
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 9'],
				map: true
			},
			prod: {
				src: '<%= yeoman.styles %>/*.css'
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: {
				src: [
					'<%= yeoman.scripts %>/*.js'
				]
			}
		}

	});

	grunt.registerTask('serve', [
		'notify:watch',
		'watch'
	]);

	grunt.registerTask('test', [
		// 'jasmine:test'
	]);

	grunt.registerTask('local', [
		'concurrent:dev',
		'jshint:all',
		'autoprefixer',
		'csslint',
		'notify:build'
	]);

	grunt.registerTask('build', [
		'concurrent:prod',
		'jshint:all',
		'autoprefixer',
		'csslint'
	]);

	grunt.registerTask('default', [
		'build',
		'test'
	]);
};