angular.module('overview')

.controller('Overview', [
    '$scope',
    'data',
    'Refuel',
    'Car',
    '$ionicHistory',
    function ($scope, data, Refuel, Car, $ionicHistory) {

        $ionicHistory.clearHistory();
        //add the car object to the last refuel
        $scope.hasRefuels = !!data.refuels.length;
        $scope.hasCars = !!data.cars.length;
        if ($scope.hasRefuels) {
            var lastRefuel = data.refuels[0];

            lastRefuel = _.extend(lastRefuel, {
                car: Car.get(lastRefuel.car)
            });

            _.extend($scope, {
                cars: data.cars,
                refuels: data.refuels,
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
