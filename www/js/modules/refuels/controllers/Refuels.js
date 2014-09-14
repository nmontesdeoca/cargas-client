angular.module('refuels')

.controller('Refuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    '$state',
    'Refuel',
    function ($scope, $ionicPopup, $ionicListDelegate, $state, Refuel) {

        $scope.refuels = Refuel.query();

        /*$scope.delete = function (car) {
            $ionicPopup.confirm({
                title: 'Delete Car',
                template: 'Are you sure you want to remove this car?'
            }).then(function (yes) {
                var $car;
                if (yes) {
                    $car = Car.get(car._id);
                    $car.$remove(function () {
                        $scope.cars = Car.query();
                        $state.go('app.carList');
                    });
                }
                $ionicListDelegate.closeOptionButtons();
            });
        };*/

    }
]);
