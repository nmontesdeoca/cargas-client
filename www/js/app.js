angular.module('starter', [
    'ionic',
    'overview',
    'profile',
    'cars',
    'refuels',
    'fuels',
    'spents',
    'settings',
    'utils'
])

.run(['$ionicPlatform', '$rootScope',
    function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            // to make underscore available at any template
            $rootScope._ = _;
        });
    }
])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'Menu'
        });

        $urlRouterProvider.otherwise('/overview');
    }
]);
