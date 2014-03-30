angular.module('CarGas.Home', [])
.config([
    '$routeProvider',
    'USER',
    function ($routeProvider, USER) {
        $routeProvider.when('/', {
            templateUrl: '/js/src/app/modules/Home/partials/home.html',
            controller: 'Home',
            resolve: {
                user: USER
            }
        });
    }
]);