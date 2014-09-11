angular.module('refuels', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    .state('app.refuelList', {
        url: '/refuels',
        resolve: {
            refuels: 'Refuel'
        },
        views: {
            menuContent: {
                templateUrl: 'templates/refuels/refuels.html',
                controller: 'Refuels'
            }
        }
    })

    .state('app.refuelNew', {
        url: '/refuels/new',
        views: {
            menuContent: {
                templateUrl: 'templates/refuels/new.html',
                controller: 'Refuels.Add'
            }
        }
    });

}]);
