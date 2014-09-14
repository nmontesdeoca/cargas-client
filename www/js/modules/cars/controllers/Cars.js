angular.module('cars')

.controller('Cars', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    '$state',
    'Car',
    function ($scope, $ionicPopup, $ionicListDelegate, $state, Car) {

        $scope.cars = Car.query();

        $scope.delete = function (car) {
            $ionicPopup.confirm({
                title: 'Delete Car',
                template: 'Are you sure you want to remove this car?'
            }).then(function (yes) {
                if (yes) {
                    car.$remove(function () {
                        $scope.cars = Car.query();
                    });
                }
                $ionicListDelegate.closeOptionButtons();
            });
        };
    }
]);
