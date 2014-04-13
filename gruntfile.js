var files = require('./files');

module.exports = function (grunt) {
    grunt.initConfig({

        cssmin: {
            combine: {
                files: {
                    'css/dist/combined.css': [
                        'css/src/ratchet.css',
                        'css/src/font-awesome.css',
                        'css/src/app.css'
                    ]
                }
            }
        },

        uglify: {
            combine: {
                files: {
                    'js/dist/combined.min.js': files(false)
                }
            }
        },

        watch: {}

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('server', 'Start a custom web server', function () {
        grunt.log.writeln('Started web server on port 3001');
        require('./server.js');
    });

    grunt.registerTask('default', ['uglify', 'cssmin', 'server', 'watch']);
};
