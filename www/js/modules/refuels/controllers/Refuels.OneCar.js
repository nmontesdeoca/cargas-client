angular.module('refuels')

.controller('OneCarRefuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    'Refuel',
    'refuels',
    'fuels',
    'car',
    function ($scope, $ionicPopup, $ionicListDelegate, Refuel, refuels, fuels, car) {

        // sort refuels by date (newest first)
        $scope.refuels = refuels;
        $scope.fuels = fuels;
        $scope.car = car;

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

    }
]);
