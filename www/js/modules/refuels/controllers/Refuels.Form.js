angular.module('refuels')

.controller('Refuels.Form', [
    '$scope',
    '$ionicPopup',
    '$state',
    '$ionicModal',
    'Refuel',
    'Car',
    'refuel',
    'cars',
    'fuels',
    'utils',
    function ($scope, $ionicPopup, $state, $ionicModal, Refuel, Car, refuel, cars, fuels, utils) {
        $scope.refuel = refuel;
        $scope.fuels = fuels;
        $scope.cars = cars;

        $scope.refuel.replaceFuel($scope.fuels);

        $scope.addNewCar = function () {
            $state.go('app.carNew');
        };

        $scope.addNewFuel = function () {
            $state.go('app.fuelNew');
        };

        $scope.create = function () {
            // date saved as timestamp
            $scope.refuel.date = utils.formatDateToTime($scope.refuel.date);
            $scope.refuel.$save(function () {
                $state.go('app.refuelList');
            });
        };

        $scope.$watch('refuel.fuel.price * refuel.capacity', function (amount) {
            $scope.refuel.amount = !isNaN(amount) ? Math.round(amount * 100) / 100 : '';
        });

        $scope.$watch('refuel.car', function (newCar, oldCar) {
            if (newCar && newCar !== oldCar) {
                var car = Car.get({
                    _id: parseInt(newCar, 10)
                });

                $scope.refuel.replaceFuel($scope.fuels, car.fuel._id);
            }
        });

        // create fuel modal
        $ionicModal.fromTemplateUrl('templates/fuels/new-modal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.fuelModal = modal;
        });

        $scope.addNewFuel = function () {
            // $state.go('app.fuelNew');
            $scope.fuel = new Fuel();
            $scope.fuelModal.show();
        };

        $scope.createFuel = function () {
            $scope.fuel.$save(function () {
                $scope.fuels = _.sortBy(Fuel.query(), 'name');
                $scope.refuel.replaceFuel($scope.fuels);
                $scope.fuelModal.hide();
            });
        };

        // remove modal instances from DOM
        $scope.$on('$destroy', function () {
            $scope.fuelModal.remove();
        });

    }
]);
