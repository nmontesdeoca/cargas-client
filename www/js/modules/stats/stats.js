angular.module('stats', [])

.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('app.stats', {
            url: '/stats',
            resolve: {
                data: ['Refuel', function (Refuel) {
                    var data = {
                        kilometersByLiter: 0,
                        totalCapacity: Refuel.getTotalCapacity(),
                        totalKilometers: 0,
                        totalSpent: Refuel.getTotalSpent(),
                        spentByDay: 0,
                        spentByKilometer: 0,
                        spentByMonth: 0,
                        spentByYear: 0
                    };

                    if (Refuel.hasMoreThanOneRefuel()) {
                        _.extend(data, {
                            totalKilometers: Refuel.getTotalKilometers(),
                            spentByDay: Refuel.getSpentByDay(),
                            spentByMonth: Refuel.getSpentByMonth(),
                            spentByYear: Refuel.getSpentByYear()
                        });

                        data.kilometersByLiter = data.totalKilometers / data.totalCapacity;
                        data.spentByKilometer = data.totalSpent / data.totalKilometers;
                    }

                    return data;
                }],
                cars: ['Car', function (Car) {
                    var cars = Car.query();

                    return _.object(
                        _.pluck(cars, '_id'),
                        _.map(cars, function (car) {
                            return car.getName();
                        })
                    );
                }],
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/stats/stats.html',
                    controller: 'Stats'
                }
            }
        });

    }
]);
