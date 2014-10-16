angular.module('refuels')

.controller('Refuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    'Refuel',
    'refuels',
    'cars',
    'defaultCar',
    function ($scope, $ionicPopup, $ionicListDelegate, Refuel, refuels, cars, defaultCar) {

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
                $scope.refuels = _.sortBy(Refuel.getRefuelsByCarId(newFilter), 'date').reverse();
            } else {
                $scope.refuels = refuels;
            }
        });

        $scope.delete = function (refuel) {
            $ionicPopup.confirm({
                title: 'Delete Refuel',
                template: 'Are you sure you want to remove this refuel?'
            }).then(function (yes) {
                if (yes) {
                    refuel.$remove(function () {
                        $scope.refuels = Refuel.getRefuelsSortByDate();
                    });
                }
                $ionicListDelegate.closeOptionButtons();
            });
        };

        $scope.formatRefuelsForGraph = function (refuels) {
            var entries = _.map(refuels, function (refuel) {
                return {
                    time: refuel.date,
                    count: refuel.amount
                };
            });
            return {
                'entries': entries
            };
        };
    }
]);
