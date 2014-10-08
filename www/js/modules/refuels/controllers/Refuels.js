angular.module('refuels')

.controller('Refuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    'Refuel',
    'refuels',
    'fuels',
    'cars',
    '$state',
    function ($scope, $ionicPopup, $ionicListDelegate, Refuel, refuels, fuels, cars, $state) {
        $scope.refuels = refuels;
        $scope.fuels = fuels;
        $scope.cars = cars;

        //if the car is only 1, go directly to see the refuels of that car
        if (cars.length === 1) {
            $state.go('app.refuelListByCar', {
                carId: cars[0]._id
            });
        }

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
