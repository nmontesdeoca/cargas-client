angular.module('CarGas', [
    'ngRoute',
    'ngTouch',
    'LocalStorageModule',
    'CarGas.Config',
    'CarGas.Main',
    'CarGas.Home',
    'CarGas.Fuel',
    'CarGas.Refuel',
    'CarGas.User'
])
.config([
    '$routeProvider',
    '$locationProvider',
    'localStorageServiceProvider',
    function ($routeProvider, $locationProvider, $localStorageServiceProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        $localStorageServiceProvider.setPrefix('CarGas');
    }
]);
