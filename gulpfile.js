(function () {
    'use strict';

    var gulp = require('gulp'),
        gutil = require('gulp-util'),
        bower = require('bower'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        angularTemplateCache = require('gulp-angular-templatecache'),
        minifyCss = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        sh = require('shelljs'),
        paths = {
            sass: ['./scss/**/*.scss'],
            scripts: [
                './www/lib/ionic/js/ionic.bundle.js',
                './www/lib/angular-resource/angular-resource.js',
                './www/lib/underscore/underscore.js',
                './www/lib/angular-translate/angular-translate.js',
                './www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                './www/lib/angular-dynamic-locale/tmhDynamicLocale.min.js',
                './www/lib/firebase/firebase-app.js',
                './www/lib/firebase/firebase-auth.js',
                './www/lib/firebase/firebase-database.js',
                './www/cordova.js',
                './www/js/start-app.js',
                './www/js/app.js',
                './www/js/templates.js',
                './www/lib/templates.js',
                './www/js/modules/overview/overview.js',
                './www/js/modules/overview/controllers/Overview.js',
                './www/js/modules/profile/profile.js',
                './www/js/modules/profile/controllers/Profile.js',
                './www/js/modules/profile/model/Profile.js',
                './www/js/modules/cars/cars.js',
                './www/js/modules/cars/controllers/Cars.js',
                './www/js/modules/cars/controllers/Cars.Form.js',
                './www/js/modules/cars/model/Car.js',
                './www/js/modules/refuels/refuels.js',
                './www/js/modules/refuels/controllers/Refuels.js',
                './www/js/modules/refuels/controllers/Refuels.Form.js',
                './www/js/modules/refuels/model/Refuel.js',
                './www/js/modules/fuels/fuels.js',
                './www/js/modules/fuels/controllers/Fuels.js',
                './www/js/modules/fuels/controllers/Fuels.Form.js',
                './www/js/modules/fuels/model/Fuel.js',
                './www/js/modules/settings/settings.js',
                './www/js/modules/settings/controllers/Settings.js',
                './www/js/modules/settings/controllers/Units.js',
                './www/js/modules/settings/controllers/Languages.js',
                './www/js/modules/settings/model/Setting.js',
                './www/js/modules/stats/stats.js',
                './www/js/modules/stats/controllers/Stats.js',
                './www/js/modules/utils/utils.js',
                './www/js/modules/intro/intro.js',
                './www/js/modules/intro/controllers/intro.js'
            ],
            templates: './www/templates/**/*.html'
        };

    gulp.task('default', ['sass', 'scripts', 'templates']);

    gulp.task('sass', function (done) {
        gulp.src('./scss/ionic.app.scss')
            .pipe(sass())
            .pipe(gulp.dest('./www/css/'))
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(rename({
                extname: '.min.css'
            }))
            .pipe(gulp.dest('./www/css/'))
            .on('end', done);
    });

    gulp.task('watch', function () {
        gulp.watch(paths.sass, ['sass']);
    });

    gulp.task('install', ['git-check'], function () {
        return bower.commands.install()
            .on('log', function (data) {
                gutil.log('bower', gutil.colors.cyan(data.id), data.message);
            });
    });

    gulp.task('git-check', function (done) {
        if (!sh.which('git')) {
            console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required to download Ionic.',
                '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
            );
            process.exit(1);
        }
        done();
    });

    gulp.task('templates', function () {
        return gulp.src(paths.templates)
            .pipe(angularTemplateCache({ root: 'templates' }))
            .pipe(concat('templates.js'))
            .pipe(gulp.dest('./www/lib/'));
    });

    gulp.task('scripts', function() {
        return gulp.src(paths.scripts)
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest('./www/js/'))
            .pipe(rename('scripts.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./www/js/'));
    });
})();
