angular.module('intro')

.controller('Intro', [
    '$scope',
    'cars',
    'refuels',
    'Refuel',
    'Car',
    'Utils',
    function ($scope, cars, refuels, Refuel, Car, Utils) {

        if (window.analytics) {
            window.analytics.trackView('Intro');
        }

        $scope.hasRefuels = !!refuels.length;
        $scope.hasCars = !!cars.length;
        if ($scope.hasRefuels) {
            var lastRefuel = refuels[0];

            lastRefuel = _.extend(lastRefuel, {
                car: Car.get(lastRefuel.car)
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

        $scope.slideChanged = function () {
            // $state.transitionTo('intro.initialCarForm');
        };
    }
]);
