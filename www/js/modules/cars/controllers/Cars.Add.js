angular.module('cars')

.controller('Cars.Add', [
    '$scope',
    'Car',
    function ($scope, Car) {

        $scope.car = new Car();

        $scope.create = function () {
            $scope.car.$save(function () {
                
            });
        };

}]);
