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
            '<%= dirs.test %>/assets/css/*.css',
            '<%= dirs.test %>/assets/js/*.js',
            '<%= dirs.test %>/src/js/*.js',
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './'
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
          '<%= dirs.dist %>/LoadAssets.js': ['src/LoadAssets.js']
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
      html: {
        files: ['**.**.html']
      },
      css: {
        files: ['<%= dirs.test %>/assets/css/**/**.css']
      },
      javascript: {
        files: ['src/js/**/**.js'],
        tasks: ['uglify']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      }
    }

  });

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-documentation');

  // Register the tasks
  grunt.registerTask('default', ['uglify', 'browserSync', 'watch']);
  grunt.registerTask('build', ['uglify', 'documentation']);

}
