angular.module('cars')

.controller('Cars', [
    '$scope',
    'Car',
    function ($scope, Car) {

        $scope.cars = Car.query();

}]);
