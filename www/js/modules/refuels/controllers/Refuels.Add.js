angular.module('refuels')

.controller('Refuels.Add', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Refuel',
    'Car',
    'utils',
    function ($scope, $ionicPopup, $state, Refuel, Car, utils) {

        $scope.refuel = new Refuel();

        $scope.refuel.date = utils.formatDate(new Date());

        $scope.cars = Car.query();
        $scope.cars = _.object(
            _.pluck($scope.cars, '_id'),
            _.map($scope.cars, function (car) {
                return car.make + ' ' + car.model;
            })
        );

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
