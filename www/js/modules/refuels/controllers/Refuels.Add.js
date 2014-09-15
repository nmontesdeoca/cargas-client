angular.module('refuels')

.controller('Refuels.Add', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Refuel',
    'Car',
    'Fuel',
    'utils',
    function ($scope, $ionicPopup, $state, Refuel, Car, Fuel, utils) {

        $scope.refuel = new Refuel();

        $scope.refuel.date = utils.formatDate(new Date());

        $scope.cars = Car.query();

        $scope.fuels = Fuel.query();

        $scope.selectFuel = function () {
            var car = Car.get({
                _id: parseInt($scope.refuel.car, 10)
            });
            $scope.refuel.fuel = Fuel.get({
                _id: parseInt(car.fuel, 10)
            })._id;
        };

        $scope.addNewFuel = function () {
            if ($scope.refuel.fuel === 'new') {
                $state.go('app.fuelNew');
            }
        };

        $scope.create = function () {
            $scope.refuel.$save(function () {
                // same of other creation, maybe display an alert when an error happens
                /*$ionicPopup.alert({
                    title: 'Refuel',
                    template: 'Refuel added successfully.'
                }).then(function () {*/
                    $state.go('app.refuelList');
                //});
            });
        };

    }
]);
