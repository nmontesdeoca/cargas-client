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
                templateUrl: 'templates/fuels/form.html',
                controller: 'Fuels.Form'
            }
        }
    })

    .state('app.fuelEdit', {
        url: '/fuels/:id',
        views: {
            menuContent: {
                templateUrl: 'templates/fuels/form.html',
                controller: 'Fuels.Form'
            }
        }
    });

}]);
