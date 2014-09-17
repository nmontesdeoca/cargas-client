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
                templateUrl: 'templates/refuels/list.html',
                controller: 'Refuels'
            }
        }
    })

    .state('app.refuelNew', {
        url: '/refuels/new',
        resolve: {
            cars: 'Car'
        },
        views: {
            menuContent: {
                templateUrl: 'templates/refuels/form.html',
                controller: 'Refuels.Form'
            }
        }
    })

    .state('app.refuelEdit', {
        url: '/refuels/:id',
        resolve: {
            cars: 'Car'
        },
        views: {
            menuContent: {
                templateUrl: 'templates/refuels/form.html',
                controller: 'Refuels.Form'
            }
        }
    });

}]);
