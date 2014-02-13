angular.module('CarGas.Refuel', ['ngResource'])
.config([
    '$routeProvider',
    'FUELS',
    'REFUEL',
    'REFUELS',
    function ($routeProvider, FUELS, REFUEL, REFUELS) {
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
                fuels: FUELS
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
                fuels: FUELS,
                refuel: REFUEL
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
                refuels: REFUELS
            }
        });
    }
]);