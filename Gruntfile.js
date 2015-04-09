module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      continuous: {
        background: true
      }
    },

    watch: {
      dev: {
        files: ['**/**/*.js', 'app/**/*.html', 'app/**/*.css', '!.#*'],
        options: {
          livereload: true
        }
      },
      karma: {
        files: ['karma.conf.js', 'app/**/*.js', 'test/unit/*.js'],
        tasks: ['karma:continous:run']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app/',
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('serve', ['connect:server', 'watch:dev'])
  grunt.registerTask('test', ['karma:continuous:start', 'watch:karma']);
};
