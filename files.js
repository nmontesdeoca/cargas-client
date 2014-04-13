module.exports = function (isTest) {
    var files = [
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-touch/angular-touch.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-local-storage/angular-local-storage.js',
        'bower_components/underscore/underscore.js',
        'js/src/*.js',
        'js/src/modules/config/*.js',
        'js/src/modules/config/**/*.js',
        'js/src/modules/home/*.js',
        'js/src/modules/home/**/*.js',
        'js/src/modules/main/*.js',
        'js/src/modules/main/**/*.js',
        'js/src/modules/refuel/*.js',
        'js/src/modules/refuel/**/*.js',
        'js/src/modules/user/*.js',
        'js/src/modules/user/**/*.js',
        'js/src/modules/fuel/*.js',
        'js/src/modules/fuel/**/*.js'
    ];

    if (isTest) {
        files = files.concat([
            'bower_components/angular-mocks/angular-mocks.js',
            'js/test/modules/**/*.js'
        ]);
    }

    return files;
};
