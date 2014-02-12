angular.module('CarGas.Refuel', ['ngResource'])
.config([
    '$routeProvider',
    function ($routeProvider) {
        var config = angular.module('CarGas.Config');

        $routeProvider

        .when('/refuel', {
            templateUrl: function () {
                if (config.isLoggedIn) {
                    return '/js/src/app/modules/Refuel/partials/form.html'
                }
            },
            controller: 'Refuel.Add',
            resolve: {
                fuels: config.fuels
            }
        })
        .when('/refuel/:id', {
            templateUrl: function () {
                if (config.isLoggedIn) {
                    return '/js/src/app/modules/Refuel/partials/form.html'
                }
            },
            controller: 'Refuel.Edit',
            resolve: {
                fuels: config.fuels,
                refuel: config.refuel
            }
        })
        .when('/refuels', {
            templateUrl: function () {
                if (config.isLoggedIn) {
                    return '/js/src/app/modules/Refuel/partials/list.html'
                }
            },
            controller: 'Refuel.List',
            resolve: {
                refuels: config.refuels
            }
        });
    }
]);