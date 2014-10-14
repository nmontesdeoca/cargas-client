angular.module('starter', [
    'ionic',
    'ngResource',
    'overview',
    'profile',
    'cars',
    'refuels',
    'fuels',
    'stats',
    'settings',
    'utils'
])

.run(['$ionicPlatform', '$rootScope', 'Setting',
    function ($ionicPlatform, $rootScope, Setting) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.hide();
            }

            if (window.ionic) {
                ionic.Platform && ionic.Platform.fullScreen && ionic.Platform.fullScreen();
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
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'Menu'
        });

        $urlRouterProvider.otherwise('/overview');
    }
]);
