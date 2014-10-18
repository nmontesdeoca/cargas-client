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
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.hide();
            }

            if (window.ionic) {
                ionic.Platform && ionic.Platform.fullScreen && ionic.Platform.fullScreen();
            }

            if (navigator.globalization) {
                navigator.globalization.getPreferredLanguage(
                    function (language) {
                        $translate.use(language.value.split('-').shift());
                    },
                    function () {
                        console.log('Error getting language');
                    }
                );
            }

            // to make underscore available at any template
            $rootScope._ = _;

            Setting.initialize();
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
