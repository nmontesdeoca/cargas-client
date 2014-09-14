angular.module('refuels')

.controller('Refuels.Add', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Refuel',
    'Car',
    function ($scope, $ionicPopup, $state, Refuel, Car) {

        $scope.refuel = new Refuel();

        $scope.cars = Car.query();

        console.log($scope.cars);

        $scope.create = function () {
            $scope.refuel.$save(function () {
                $ionicPopup.alert({
                    title: 'Refuel',
                    template: 'Refuel added successfully.'
                }).then(function () {
                    $state.go('app.refuelList');
                });
            });
        };

    }
]);
