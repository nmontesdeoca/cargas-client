angular.module('refuels', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    .state('app.refuelList', {
        url: '/refuels',
        resolve: {
            refuels: ['Refuel', function (Refuel) {
                return Refuel.getRefuelsSortByDate();
            }],
            fuels: ['Fuel', function (Fuel) {
                return _.sortBy(Fuel.query(), 'name');
            }],
            cars: ['Car', 'Refuel', function (Car, Refuel) {
                //remove cars that do not have refuels yet
                var cars = _.filter(Car.query(), function(car) {
                    return Refuel.getRefuelsByCarId(car._id.toString()).length > 0;
                });

                return _.map(cars, function(car) {
                    var carId = car._id.toString();
                    
                    return _.extend(car, {
                        'refuels': Refuel.getRefuelsByCarId(carId)
                    });
                });
            }]
        },
        views: {
            menuContent: {
                templateUrl: 'templates/refuels/list.html',
                controller: 'Refuels'
            }
        }
    })

    .state('app.refuelListByCar', {
        url: '/refuels/by-car/:carId',
        resolve: {
            refuels: ['Refuel', function (Refuel) {
                return Refuel.getRefuelsSortByDate();
            }],
            fuels: ['Fuel', function (Fuel) {
                return _.sortBy(Fuel.query(), 'name');
            }],
            cars: ['$stateParams', 'Car', 'Refuel', function ($stateParams, Car, Refuel) {

                var cars = _.where(Car.query(), {'_id': Number($stateParams.carId)});
                return _.map(cars, function(car) {
                     // console.log('refuelsbyidtostring', Refuel.getRefuelsByCarId(car._id.toString()))
                    var carId = car._id.toString();
                    
                    return _.extend(car, {
                        'refuels': Refuel.getRefuelsByCarId(carId)
                    });
                });
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
            }],
            carByDefault: ['Car', function (Car) {
                return Car.get({
                    byDefault: true
                });
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
            }],
            carByDefault: ['Car', function (Car) {
                return Car.get({
                    byDefault: true
                });
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
