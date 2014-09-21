angular.module('cars')

.controller('Cars', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    'cars',
    'Car',
    function ($scope, $ionicPopup, $ionicListDelegate, cars, Car) {

        $scope.cars = cars;

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
