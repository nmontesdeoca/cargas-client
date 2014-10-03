angular.module('refuels')

.controller('OneCarRefuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    'refuels',
    'fuels',
    'car',
    function ($scope, $ionicPopup, $ionicListDelegate, refuels, fuels, car) {

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
                        $scope.car.refuels = $scope.car.getRefuels();
                    });
                }
                $ionicListDelegate.closeOptionButtons();
            });
        };

    }
]);
