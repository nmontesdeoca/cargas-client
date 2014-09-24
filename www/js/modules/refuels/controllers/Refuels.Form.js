angular.module('refuels')

.controller('Refuels.Form', [
    '$scope',
    '$ionicPopup',
    '$state',
    '$ionicModal',
    'Refuel',
    'Car',
    'Fuel',
    'refuel',
    'cars',
    'fuels',
    'utils',
    'carByDefault',
    function ($scope, $ionicPopup, $state, $ionicModal, Refuel, Car, Fuel, refuel, cars, fuels, utils, carByDefault) {
        $scope.refuel = refuel;
        $scope.fuels = fuels;
        $scope.cars = cars;

        $scope.refuel.replaceFuel($scope.fuels);

        $scope.create = function () {
            // date saved as timestamp
            $scope.refuel.date = utils.formatDateToTime($scope.refuel.date);
            $scope.refuel.$save(function () {
                $state.go('app.refuelList');
            });
        };

        $scope.$watch('refuel.fuel', function (newFuel, oldFuel) {
            if (newFuel && newFuel !== oldFuel) {
                $scope.refuel.fuelPrice = newFuel.price;
            } else {
                $scope.refuel.fuelPrice = '';
            }
        });

        $scope.$watch('refuel.fuelPrice * refuel.capacity', function (amount) {
            $scope.refuel.amount = !isNaN(amount) ? Math.round(amount * 100) / 100 : '';
        });

        // watch for amount, but we have to discuss something here...
        // $scope.$watch('refuel.amount / refuel.capacity', function (fuelPrice) {
        //    $scope.refuel.fuelPrice = !isNaN(fuelPrice) ? Math.round(fuelPrice * 100) / 100 : '';
        // });

        $scope.$watch('refuel.car', function (newCar, oldCar) {
            var car;
            if (newCar && newCar !== oldCar) {
                car = Car.get({
                    _id: parseInt(newCar, 10)
                });

                if (car.fuel && car.fuel._id) {
                    $scope.refuel.replaceFuel($scope.fuels, car.fuel._id);
                }
            }
        });

        // set car by default when is a new refuel
        if (!$scope.refuel._id && carByDefault._id) {
            $scope.refuel.car = carByDefault._id.toString();
            if (carByDefault.fuel && carByDefault.fuel._id) {
                $scope.refuel.replaceFuel($scope.fuels, carByDefault.fuel._id);
            }
        }

        // create car modal
        $ionicModal.fromTemplateUrl('templates/cars/form-modal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.carModal = modal;
        });

        $scope.addNewCar = function () {
            // $state.go('app.carNew');
            $scope.car = new Car();
            $scope.makes = utils.getMakes();
            $scope.years = utils.getYears();
            utils.turnOnDefaultCar(Car, $scope.car);
            $scope.carModal.show();
        };

        $scope.createCar = function () {
            // this is to ensure that always there is only one car by default
            utils.unsetDefaultCar(Car, $scope.car);

            $scope.car.$save(function () {
                var cars = Car.query();
                $scope.cars = _.object(
                    _.pluck(cars, '_id'),
                    _.map(cars, function (car) {
                        return car.make + ' ' + car.model;
                    })
                );
                // I think we should have only strings or integers as ids
                $scope.refuel.car = $scope.car._id.toString();
                $scope.carModal.hide();
            });
        };

        // create fuel modal
        $ionicModal.fromTemplateUrl('templates/fuels/form-modal.html', {
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
                $scope.refuel.replaceFuel($scope.fuels, $scope.fuel._id);
                $scope.fuelModal.hide();
            });
        };

        // create new make and model modal
        $ionicModal.fromTemplateUrl('templates/cars/new-make-model.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.newMakeModelModal = modal;
        });

        $scope.newMakeModel = function () {
            $ionicPopup.alert({
                title: 'New Make and Model',
                template: 'Thanks for suggest a new make and model.<br />' +
                    'Your suggestion will be reviewed and we will let you know if it is accepted.'
            }).then(function () {
                $scope.newCar = {};
                $scope.newMakeModelModal.hide();
            });
        };

        // We are repeating a lot of code with modals, we have to review this,
        // maybe the above code can be in a function(s).

        // remove modal instances from DOM
        $scope.$on('$destroy', function () {
            $scope.fuelModal.remove();
            $scope.carModal.remove();
            $scope.newMakeModelModal.remove();
        });

    }
]);
