angular.module('starter', [
    'ionic',
    'ngResource',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'overview',
    'profile',
    'cars',
    'refuels',
    'fuels',
    'stats',
    'settings',
    'utils',
    'intro'
])

.run([
    '$ionicPlatform',
    '$rootScope',
    '$translate',
    '$ionicSideMenuDelegate',
    'tmhDynamicLocale',
    'Setting',
    function ($ionicPlatform, $rootScope, $translate, $ionicSideMenuDelegate,
        tmhDynamicLocale, Setting) {

        $ionicPlatform.ready(function () {

            var isAndroid = /android/i.test(navigator.userAgent),
                settings = Setting.query();

            if (window.analytics) {
                window.analytics.startTrackerWithId('UA-16179838-10');
                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    window.analytics.trackView(toState);
                });
            } else {
                console.log('Google Analytics Unavailable');
            }

            if (!isAndroid && window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.hide();
            }

            if (!isAndroid && window.ionic) {
                ionic.Platform && ionic.Platform.fullScreen && ionic.Platform.fullScreen();
            }

            if (isAndroid) {
                $ionicPlatform.on('menubutton', function () {
                    $ionicSideMenuDelegate.toggleLeft();
                });
            }

            if (!settings._id) {
                settings.initialize();
            } else {
                $translate.use(settings.language);
            }

            tmhDynamicLocale.set(settings.locale || 'es-uy');

            // to make underscore available at any template
            $rootScope._ = _;

            // if social sharing plugin is not available hide the share button
            $rootScope.socialSharingAvailable = !!(window.plugins &&
                window.plugins.socialsharing);
        });
    }
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    'tmhDynamicLocaleProvider',
    '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider,
        tmhDynamicLocaleProvider, $ionicConfigProvider) {

        $stateProvider.state('app', {
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'menuController'
        });

        $urlRouterProvider.otherwise('/overview');

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');

        tmhDynamicLocaleProvider.localeLocationPattern(
            'lib/angular-i18n/angular-locale_{{locale}}.js');

        // just for test in browser
        $ionicConfigProvider.views.transition('android');
        // do not cache views
        $ionicConfigProvider.views.maxCache(0);
        // forward cache
        $ionicConfigProvider.views.forwardCache(true);
        // prefetch all the templates until now
        $ionicConfigProvider.templates.maxPrefetch(24);

    }
])

.controller('menuController', ['$scope', '$filter', function ($scope, $filter) {

    $scope.share = function () {
        window.plugins.socialsharing.share(
            $filter('translate')('SHARE_MESSAGE'),
            null,
            null,
            'http://www.cargasapp.com/'
        );
    };

}]);
