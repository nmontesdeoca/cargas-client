angular.module('stats', [])

.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('app.stats', {
            url: '/stats',
            resolve: {
                data: ['Refuel', function (Refuel) {
                    var data = {
                        averageDistanceBetweenRefuels: 0,
                        averageTimeBetweenRefuels: 0,
                        averageCapacity: 0,
                        averageSpent: 0,
                        kilometersByLiter: 0,
                        refuelsCount: Refuel.getRefuelsCount(),
                        spentByDay: 0,
                        spentByKilometer: 0,
                        spentByMonth: 0,
                        spentByYear: 0,
                        totalCapacity: Refuel.getTotalCapacity(),
                        totalKilometers: 0,
                        totalSpent: Refuel.getTotalSpent()
                    };

                    if (Refuel.hasMoreThanOneRefuel()) {
                        _.extend(data, {
                            averageCapacity: Refuel.getAverageCapacity(),
                            averageSpent: Refuel.getAverageSpent(),
                            averageDistanceBetweenRefuels: Refuel.getAverageDistanceBetweenRefuels(),
                            averageTimeBetweenRefuels: Refuel.getAverageTimeBetweenRefuels(),
                            totalKilometers: Refuel.getTotalKilometers(),
                            spentByDay: Refuel.getSpentByDay(),
                            spentByMonth: Refuel.getSpentByMonth(),
                            spentByYear: Refuel.getSpentByYear()
                        });

                        data.kilometersByLiter = Refuel.getConsumption();
                        data.spentByKilometer = Refuel.getSpentByKilometer();
                    }

                    return data;
                }],
                cars: ['CarFactory', function (CarFactory) {
                    var cars = CarFactory.query();

                    return _.object(
                        _.pluck(cars, '_id'),
                        _.map(cars, function (car) {
                            return car.getName();
                        })
                    );
                }],
                defaultCar: ['CarFactory', function (CarFactory) {
                    return CarFactory.get({
                        byDefault: true
                    });
                }]
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
