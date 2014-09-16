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
        $scope.cars = _.object(
            _.pluck($scope.cars, '_id'),
            _.map($scope.cars, function (car) {
                return car.make + ' ' + car.model;
            })
        );

        $scope.fuels = Fuel.query();

        $scope.selectFuel = function () {
            var car = Car.get({
                _id: parseInt($scope.refuel.car, 10)
            });
            $scope.refuel.fuel = Fuel.get({
                _id: parseInt(car.fuel, 10)
            })._id;
            $scope.getFuelCost();
        };

        $scope.addNewCar = function () {
            $state.go('app.carNew');
        };

        $scope.addNewFuel = function () {
            $state.go('app.fuelNew');
        };

        $scope.getFuelCost = function () {
            if ($scope.refuel.fuel) {
                $scope.refuel.fuelcost = Fuel.get({
                    _id: parseInt($scope.refuel.fuel, 10)
                }).price;
            }
        };

        $scope.create = function () {
            $scope.refuel.$save(function () {
                $state.go('app.refuelList');
            });
        };

        $scope.$watch('refuel.fuelcost * refuel.capacity', function (newValue) {
            $scope.refuel.amount = newValue;
        });

    }
]);
