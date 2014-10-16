angular.module('stats')

.controller('Stats', [
    '$scope',
    '$state',
    'Car',
    'data',
    'cars',
    'defaultCar',
    function ($scope, $state, Car, data, cars, defaultCar) {

        var carKeys = Object.keys(cars);

        $scope.cars = cars;

        $scope.filter = {
            car: ''
        };

        // not display All filter if there is only one car
        $scope.showFilterAll = carKeys.length === 1 ? false : true;

        // set filter as the default car (maybe this is not needed)
        $scope.filter.car = defaultCar._id ? defaultCar._id.toString() : '';

        $scope.$watch('filter.car', function (newFilter, oldFilter) {
            if (newFilter) {
                $scope.car = Car.get({
                    _id: Number(newFilter)
                });

                $scope.totalSpent = $scope.car.getTotalSpent();
                $scope.totalCapacity = $scope.car.getTotalCapacity();

                if ($scope.car.hasMoreThanOneRefuel()) {
                    $scope.averageDistanceBetweenRefuels =
                        $scope.car.getAverageDistanceBetweenRefuels();
                    $scope.averageTimeBetweenRefuels = $scope.car.getAverageTimeBetweenRefuels();
                    $scope.spentByYear = $scope.car.getSpentByYear();
                    $scope.spentByMonth = $scope.car.getSpentByMonth();
                    $scope.spentByDay = $scope.car.getSpentByDay();
                    $scope.spentByKilometer = $scope.car.getSpentByKilometer();
                    $scope.kilometersByLiter = $scope.car.getKilometersByLiter();
                } else {
                    $scope.averageDistanceBetweenRefuels = 0;
                    $scope.averageTimeBetweenRefuels = 0;
                    $scope.spentByYear = 0;
                    $scope.spentByMonth = 0;
                    $scope.spentByDay = 0;
                    $scope.spentByKilometer = 0;
                    $scope.kilometersByLiter = 0;
                }
            } else {
                $scope.averageDistanceBetweenRefuels = data.averageDistanceBetweenRefuels;
                $scope.averageTimeBetweenRefuels = data.averageTimeBetweenRefuels;
                $scope.totalSpent = data.totalSpent;
                $scope.spentByYear = data.spentByYear;
                $scope.spentByMonth = data.spentByMonth;
                $scope.spentByDay = data.spentByDay;
                $scope.totalCapacity = data.totalCapacity;
                $scope.spentByKilometer = data.spentByKilometer;
                $scope.kilometersByLiter = data.kilometersByLiter;
            }
        });
    }
]);
