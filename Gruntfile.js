module.exports = function(grunt) {

  grunt.initConfig({

    // The output directory
    dirs: {
      dist: 'dist',
      test: 'test'
    },

     // Launchs a server with livereload included
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '**/*.css',
            '**/*.js',
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './'
        }
      }
    },
    
    // Bundle all the js modules into one universal file
    browserify: {
      dist: {
        files: {
          '<%= dirs.dist %>/LoadAssets.js': ['src/LoadAssets.js']
        },
        options: {
          browserifyOptions: {
            standalone: 'LoadAssets'
          }
        }
      }
    },

    // Minify your javascripts
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          '<%= dirs.dist %>/LoadAssets.js': ['<%= dirs.dist %>/LoadAssets.js']
        }
      }
    },

    documentation: {
      default: {
        files: [{
        "expand": true,
        "cwd": "src",
        "src": ["**/*.js"]
      }],
        options: {
          destination: "docs"
        }
      },
    },

    // Configures the watch task
    watch: {
      all: {
        files: ['**.html',
                '<%= dirs.test %>/assets/css/**/**.css',
                'src/js/**/**.js',
                'Gruntfile.js'],
        tasks: ['build']
      }
    }

  });

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-documentation');

  // Register the tasks
  grunt.registerTask('default', ['browserify', 'uglify', 'browserSync', 'watch']);
  grunt.registerTask('build', ['browserify','uglify', 'documentation']);

}
