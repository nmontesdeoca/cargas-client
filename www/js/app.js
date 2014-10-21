angular.module('starter', [
    'ionic',
    'ngResource',
    'pascalprecht.translate',
    'overview',
    'profile',
    'cars',
    'refuels',
    'fuels',
    'stats',
    'settings',
    'utils'
])

.run(['$ionicPlatform', '$rootScope', '$translate', 'Setting',
    function ($ionicPlatform, $rootScope, $translate, Setting) {

        $ionicPlatform.ready(function () {

            var isAndroid = /android/i.test(navigator.userAgent),
                settings = Setting.query();

            if (!isAndroid && window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.hide();
            }

            if (!isAndroid && window.ionic) {
                ionic.Platform && ionic.Platform.fullScreen && ionic.Platform.fullScreen();
            }

            if (!settings._id) {
                settings.initialize();
            } else {
                $translate.use(settings.language);
            }

            // to make underscore available at any template
            $rootScope._ = _;
        });
    }
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: 'templates/menu.html'
        });

        $urlRouterProvider.otherwise('/overview');

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    }
]);
