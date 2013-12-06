'use strict';

var js_files = [
  // 'third_party/emberjs/js/libs/handlebars-1.0.0.js',
  'third_party/jquery/jquery.js',
  'third_party/underscore/underscore.js',
  // 'third_party/emberjs/js/libs/ember-1.0.0.js',

  // 'app/toggle.js',
  'app/popups.js',
  'app/app.js'
];

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    handlebars: {
      compile: {
        options: {
          namespace: 'Ember.TEMPLATES',
          processName: function(filePath) { 
            // get beginning and end of sub string
            var beginning = filePath.indexOf('/') + 1;
            var end = filePath.indexOf('.');
            return filePath.substring(beginning, end);
          },
          processPartialName: function(filePath) { // input:  templates/_header.hbs
            var name = filePath.split('/').pop();
            return name.substring(1, name.length - 4); // output: header
          },
          node: true
        },
        files: {
          'app/templates.js': 'app/**/*.hbs'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/assets/app.js': js_files
        }
      }
    },

    livereload: {
      port: 35729 // Default livereload listening port.
    },

    stylus: {
      compile: {
        options: {
          compress: true,
          use: []
        },
        files: {
          'public/assets/app.css': ['third_party/**/*.{styl,css}', 'app/**/*.styl'] // compile and concat into single file
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app/server.js',
          nodeArgs: ['--debug'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['app'],
          env: {
            PORT: '8000'
          },
          cwd: __dirname
        }
      }
    },

    'node-inspector': {
      dev: {}
    },

    concurrent: {
      server: {
        tasks: ['livereload-start', 'nodemon', 'node-inspector', 'regarde'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // regarde configuration
    regarde: {

      uglify: {
        files: js_files,
        tasks: 'uglify'
      },

      templates: {
        files: ['app/**/*.hbs'],
        tasks: 'handlebars'
      },

      stylus: {
        files: ['app/**/*.styl'],
        tasks: 'stylus'
      },

      refreshBrowser: {
        files: [
          'public/assets/**/*'
        ],
        tasks: 'livereload'
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-node-inspector');

  // Define tasks
  grunt.registerTask('default', ['handlebars', 'uglify', 'stylus']);
  grunt.registerTask('server', ['concurrent:server']);

};
