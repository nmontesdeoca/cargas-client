angular.module('cars', ['utils'])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    .state('app.carList', {
        url: '/cars',
        resolve: {
            Cars: 'Car'
        },
        views: {
            menuContent: {
                templateUrl: 'templates/cars/cars.html',
                controller: 'Cars'
            }
        }
    })

    .state('app.carNew', {
        url: '/cars/new',
        views: {
            menuContent: {
                templateUrl: 'templates/cars/new.html',
                controller: 'Cars.Add'
            }
        }
    });

}]);
