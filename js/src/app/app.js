angular.module('CarGas', [
    'ngRoute',
    'ngTouch',
    'ngCookies',
    'CarGas.Config',
    'CarGas.Main',
    'CarGas.Fuel',
    'CarGas.Refuel',
    'CarGas.User'
])
.config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.otherwise({
            redirectTo: '/refuels'
        });
    }
]);