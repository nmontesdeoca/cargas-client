angular.module('refuels', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    .state('app.refuelList', {
        url: '/refuels',
        resolve: {
            refuels: ['Refuel', function (Refuel) {
                return _.sortBy(Refuel.query(), 'date').reverse();
            }],
            fuels: ['Fuel', function (Fuel) {
                return _.sortBy(Fuel.query(), 'name');
            }]
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
            refuel: ['Refuel', 'utils', function (Refuel, utils) {
                var refuel = new Refuel();

                refuel.date = utils.formatDateForInput(new Date());

                return refuel;
            }],
            fuels: ['Fuel', function (Fuel) {
                return _.sortBy(Fuel.query(), 'name');
            }],
            cars: ['Car', function (Car) {
                var cars = Car.query();

                return _.object(
                    _.pluck(cars, '_id'),
                    _.map(cars, function (car) {
                        return car.make + ' ' + car.model;
                    })
                );
            }]
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
            refuel: ['$stateParams', 'Refuel', 'utils', function ($stateParams, Refuel, utils) {
                var refuel = Refuel.get({
                    _id: parseInt($stateParams.id, 10)
                });

                refuel.date = utils.formatDateForInput(new Date(refuel.date));

                return refuel;
            }],
            fuels: ['Fuel', function (Fuel) {
                return _.sortBy(Fuel.query(), 'name');
            }],
            cars: ['Car', function (Car) {
                var cars = Car.query();

                return _.object(
                    _.pluck(cars, '_id'),
                    _.map(cars, function (car) {
                        return car.make + ' ' + car.model;
                    })
                );
            }]
        },
        views: {
            menuContent: {
                templateUrl: 'templates/refuels/form.html',
                controller: 'Refuels.Form'
            }
        }
    });

}]);
