angular.module('cars')

.controller('Cars.Add', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Car',
    function ($scope, $ionicPopup, $state, Car) {

        $scope.car = new Car();

        $scope.create = function () {
            $scope.car.$save(function () {
                $ionicPopup.alert({
                    title: 'Car',
                    template: 'Car added successfully.'
                }).then(function () {
                    $state.go('app.carList');
                });
            });
        };

}]);
