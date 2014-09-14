angular.module('cars', [])

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

    .state('app.carEdit', {
        url: '/cars/:id',
        resolve: {
            Cars: 'Car'
        },
        views: {
            menuContent: {
                templateUrl: 'templates/cars/edit.html',
                controller: 'Cars.Edit'
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
    })

    .state('app.carNewMakeModel', {
        url: '/cars/new/make-model',
        views: {
            menuContent: {
                templateUrl: 'templates/cars/new-make-model.html',
                controller: 'Cars.Add'
            }
        }
    });

}]);
