angular.module('overview')

.controller('Overview', [
    '$scope',
    'refuels',
    'cars',
    'Refuel',
    'CarFactory',
    '$ionicHistory',
    function ($scope, refuels, cars, Refuel, CarFactory, $ionicHistory) {
        $ionicHistory.clearHistory();
        // add the car object to the last refuel
        $scope.hasRefuels = !!refuels.length;
        $scope.hasCars = !!cars.length;
        if ($scope.hasRefuels) {
            var lastRefuel = refuels[0];

            lastRefuel = _.extend(lastRefuel, {
                car: CarFactory.get({
                    _id: Number(lastRefuel.car)
                })
            });

            _.extend($scope, {
                cars: cars,
                refuels: refuels,
                lastRefuel: lastRefuel,
                totals: {
                    totalSpent: Refuel.getTotalSpent(),
                    totalCapacity: Refuel.getTotalCapacity(),
                    totalDistance: Refuel.getTotalKilometers()
                }
            });
        }
    }
]);
