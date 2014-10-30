angular.module('cars')

.controller('Cars', [
    '$scope',
    'cars',
    function ($scope, cars) {
        $scope.cars = cars;
    }
]);
