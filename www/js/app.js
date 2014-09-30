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
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
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
