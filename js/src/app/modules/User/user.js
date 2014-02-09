angular.module('CarGas.User', ['ngResource'])
.config([
    '$routeProvider',
    function ($routeProvider) {
        var config = angular.module('CarGas.Config');

        $routeProvider

        .when('/login', {
            templateUrl: '/js/src/app/modules/User/partials/login.html',
            controller: 'User.Login'
        })
        .when('/register', {
            templateUrl: '/js/src/app/modules/User/partials/register.html',
            controller: 'User.Register'
        })
        .when('/account', {
            templateUrl: '/js/src/app/modules/User/partials/account.html',
            controller: 'User.Account',
            resolve: {
                fuels: config.fuels,
                user: config.user
            }
        })
        .when('/account/fuels', {
            templateUrl: '/js/src/app/modules/User/partials/account.fuels.html',
            controller: 'User.Account.Fuels',
            resolve: {
                fuels: config.fuels,
                user: config.user
            }
        })
        .when('/logout', {
            template: '',
            controller: 'User.Logout'
        });
    }
]);