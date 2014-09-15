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
                templateUrl: 'templates/cars/list.html',
                controller: 'Cars'
            }
        }
    })

    .state('app.carNew', {
        url: '/cars/new',
        views: {
            menuContent: {
                templateUrl: 'templates/cars/form.html',
                controller: 'Cars.Form'
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
                templateUrl: 'templates/cars/form.html',
                controller: 'Cars.Form'
            }
        }
    })

    .state('app.carNewMakeModel', {
        url: '/cars/new/make-model',
        views: {
            menuContent: {
                templateUrl: 'templates/cars/new-make-model.html',
                controller: 'Cars.Form'
            }
        }
    });

}]);
