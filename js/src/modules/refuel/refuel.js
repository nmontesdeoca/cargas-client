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
            templateUrl: '/js/src/modules/refuel/partials/form.html',
            controller: 'Refuel.Add',
            resolve: {
                fuels: FUELS
            }
        })
        .when('/refuel/:id', {
            templateUrl: '/js/src/modules/refuel/partials/form.html',
            controller: 'Refuel.Edit',
            resolve: {
                fuels: FUELS,
                refuel: REFUEL
            }
        })
        .when('/refuels', {
            templateUrl: '/js/src/modules/refuel/partials/list.html',
            controller: 'Refuel.List',
            resolve: {
                refuels: REFUELS,
                fuels: FUELS
            }
        });
    }
]);
