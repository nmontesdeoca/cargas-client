angular.module('CarGas.User', ['ngResource'])
.config([
    '$routeProvider',
    'USER',
    'FUELS',
    function ($routeProvider, USER, FUELS) {
        var config = angular.module('CarGas.Config');

        $routeProvider

        .when('/login', {
            templateUrl: 'js/src/modules/user/partials/login.html',
            controller: 'User.Login'
        })
        .when('/register', {
            templateUrl: 'js/src/modules/user/partials/register.html',
            controller: 'User.Register'
        })
        .when('/account', {
            templateUrl: 'js/src/modules/user/partials/account.html',
            controller: 'User.Account',
            resolve: {
                fuels: FUELS,
                user: USER
            }
        })
        .when('/account/me', {
            templateUrl: 'js/src/modules/user/partials/account.me.html',
            controller: 'User.Account.Me',
            resolve: {
                fuels: FUELS,
                user: USER
            }
        })
        .when('/account/fuels', {
            templateUrl: 'js/src/modules/user/partials/account.fuels.html',
            controller: 'User.Account.Fuels',
            resolve: {
                fuels: FUELS,
                user: USER
            }
        })
        .when('/account/cars', {
            templateUrl: 'js/src/modules/user/partials/account.cars.html',
            controller: 'User.Account.Cars',
            resolve: {
                fuels: FUELS,
                user: USER
            }
        })
        .when('/logout', {
            template: '',
            controller: 'User.Logout'
        });
    }
]);