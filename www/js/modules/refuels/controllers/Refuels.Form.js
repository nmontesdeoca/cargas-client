angular.module('refuels')

.controller('Refuels.Form', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Refuel',
    'Car',
    'Fuel',
    'utils',
    function ($scope, $ionicPopup, $state, Refuel, Car, Fuel, utils) {

        $scope.refuel = $state.params.id ? Refuel.get({
            _id: parseInt($state.params.id, 10)
        }) : new Refuel();

        $scope.fuels = Fuel.query();
        $scope.cars = Car.query();

        $scope.refuel.date = utils.formatDate(new Date());

        $scope.cars = _.object(
            _.pluck($scope.cars, '_id'),
            _.map($scope.cars, function (car) {
                return car.make + ' ' + car.model;
            })
        );

        $scope.fuels = _.object(
            _.pluck($scope.fuels, '_id'),
            _.map($scope.fuels, function (fuel) {
                return fuel.name;
            })
        );

        $scope.addNewCar = function () {
            $state.go('app.carNew');
        };

        $scope.addNewFuel = function () {
            $state.go('app.fuelNew');
        };

        $scope.create = function () {
            $scope.refuel.$save(function () {
                $state.go('app.refuelList');
            });
        };

        $scope.$watch('refuel.fuel', function (fuel) {
            $scope.refuel.fuelObject = Fuel.get({
                _id: parseInt(fuel)
            });
        });

        $scope.$watch('refuel.fuelObject.price * refuel.capacity', function (amount) {
            $scope.refuel.amount = amount;
        });

        $scope.$watch('refuel.car', function (carId) {
            if (carId) {
                $scope.refuel.fuel = Car.get({
                    _id: parseInt(carId)
                }).fuel;
            }
        });

    }
]);
