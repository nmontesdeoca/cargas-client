angular.module('cars')

.controller('Cars', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    'cars',
    function ($scope, $ionicPopup, $ionicListDelegate, cars) {

        $scope.cars = cars;

        $scope.delete = function (car) {
            $ionicPopup.confirm({
                title: 'Delete Car',
                template: 'Are you sure you want to remove this car?'
            }).then(function (yes) {
                if (yes) {
                    car.$remove(function () {
                        $scope.cars = cars;
                    });
                }
                $ionicListDelegate.closeOptionButtons();
            });
        };
    }
]);
