angular.module('fuels', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    .state('app.fuelList', {
        url: '/fuels',
        resolve: {
            Fuels: 'Fuel'
        },
        views: {
            menuContent: {
                templateUrl: 'templates/fuels/fuels.html',
                controller: 'Fuels'
            }
        }
    })

    .state('app.fuelNew', {
        url: '/fuels/new',
        views: {
            menuContent: {
                templateUrl: 'templates/fuels/new.html',
                controller: 'Fuels.Add'
            }
        }
    });

}]);
