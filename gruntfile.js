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
                    'js/dist/combined.min.js': [
                        'js/vendor/angular/angular.js',
                        'js/vendor/angular/angular-animate.js',
                        'js/vendor/angular/angular-touch.js',
                        'js/vendor/angular/angular-route.js',
                        'js/vendor/angular/angular-resource.js',
                        'js/vendor/angular-local-storage.js',
                        'js/vendor/underscore.js',
                        'js/src/app/*.js',
                        'js/src/app/modules/Config/*.js',
                        'js/src/app/modules/Config/**/*.js',
                        'js/src/app/modules/Main/*.js',
                        'js/src/app/modules/Main/**/*.js',
                        'js/src/app/modules/Refuel/*.js',
                        'js/src/app/modules/Refuel/**/*.js',
                        'js/src/app/modules/User/*.js',
                        'js/src/app/modules/User/**/*.js',
                        'js/src/app/modules/Fuel/*.js',
                        'js/src/app/modules/Fuel/**/*.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};