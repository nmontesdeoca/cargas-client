angular.module('CarGas.User', ['ngResource'])
.config([
    '$routeProvider',
    'USER',
    'FUELS',
    function ($routeProvider, USER, FUELS) {
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
            templateUrl: function () {
                if (config.isLoggedIn) {
                    return '/js/src/app/modules/User/partials/account.html'
                }
            },
            controller: 'User.Account',
            resolve: {
                fuels: FUELS,
                user: USER
            }
        })
        .when('/account/fuels', {
            templateUrl: function () {
                if (config.isLoggedIn) {
                    return '/js/src/app/modules/User/partials/account.fuels.html'
                }
            },
            controller: 'User.Account.Fuels',
            resolve: {
                fuels: FUELS,
                user: USER
            }
        })
        .when('/account/cars', {
            templateUrl: function () {
                if (config.isLoggedIn) {
                    return '/js/src/app/modules/User/partials/account.cars.html'
                }
            },
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