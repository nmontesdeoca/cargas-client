angular.module('refuels')

.controller('Refuels.Form', [
    '$scope',
    '$ionicPopup',
    '$state',
    '$ionicModal',
    '$filter',
    'Refuel',
    'Car',
    'Fuel',
    'refuel',
    'Utils',
    'carByDefault',
    function ($scope, $ionicPopup, $state, $ionicModal, $filter, Refuel, Car, Fuel, refuel,
            Utils, carByDefault) {

        var getCars = function () {
                var cars = Car.query();
                cars.push(new Car({
                    make: $filter('translate')('ADD_NEW_CAR'),
                    model: '',
                    value: 'newCar'
                }));
                return cars;
            },

            getFuels = function () {
                var sortedFuels = _.sortBy(Fuel.query(), 'name');
                sortedFuels.push({
                    name: $filter('translate')('ADD_NEW_FUEL'),
                    value: 'newFuel'
                });
                return sortedFuels;
            };

        $scope.refuel = refuel;
        $scope.fuels = getFuels();
        $scope.cars = getCars();

        $scope.refuel.replaceFuel($scope.fuels);
        /**
         * if there is a car already set
         * we need to find it with the id inside
         * the cars array
         */
        if ($scope.refuel.car) {
            $scope.refuel.car = _.findWhere($scope.cars, { _id: Number($scope.refuel.car) });
        }

        $scope.create = function () {
            var previousRefuel = $scope.refuel.getPreviousRefuel(),
                nextRefuel = $scope.refuel.getNextRefuel(),
                message,
                error = previousRefuel &&
                    (previousRefuel.overallKilometers > $scope.refuel.overallKilometers) ||
                    nextRefuel && (nextRefuel.overallKilometers < $scope.refuel.overallKilometers);

            if (error) {
                if (!previousRefuel) {
                    message = $filter('translate')('SMALLER_THAN') + ' ' +
                        nextRefuel.overallKilometers;
                } else if (!nextRefuel) {
                    message = $filter('translate')('GREATHER_THAN') + ' ' +
                        previousRefuel.overallKilometers;
                } else {
                    message = $filter('translate')('BETWEEN') + ' ' +
                        previousRefuel.overallKilometers +
                        ' ' + $filter('translate')('AND') + ' ' +
                        nextRefuel.overallKilometers;
                }
                $ionicPopup.alert({
                    title: $filter('translate')('ERROR'),
                    template: $filter('translate')('REFUEL_DOESNT_MAKE_SENSE') + '<br />' +
                        $filter('translate')('IN_THIS_CASE_THE_ODOMETER') + ' ' + message
                });
            } else {
                // date saved as timestamp
                $scope.refuel.date = Utils.formatDateToTime($scope.refuel.date);
                $scope.refuel.car = $scope.refuel.car._id.toString();
                $scope.refuel.$save(function () {
                    $state.go('app.refuelList');
                });
            }
        };

        $scope.$watch('refuel.fuel', function (newFuel, oldFuel) {
            /*console.group('Fuel');
            console.log(newFuel);
            console.log(oldFuel);
            console.groupEnd();*/
            if (newFuel && (newFuel !== oldFuel || !$scope.refuel._id)) {
                $scope.refuel.fuelPrice = newFuel.price;
            } else if (!newFuel) {
                $scope.refuel.fuelPrice = '';
            }
        });

        $scope.$watch('refuel.car', function (newCar, oldCar) {
            var car;
            if (newCar) {
                if (newCar.fuel && newCar.fuel._id) {
                    $scope.refuel.replaceFuel($scope.fuels, newCar.fuel._id);
                }
            }
        });

        // set car by default when is a new refuel
        if (!$scope.refuel._id && carByDefault._id) {
            $scope.refuel.car = _.findWhere($scope.cars, {
                byDefault: true
            });
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
            if ($scope.refuel.car && $scope.refuel.car.value === 'newCar') {
                $scope.car = new Car();
                $scope.makes = Utils.getMakes();
                $scope.years = Utils.getYears();
                Utils.turnOnDefaultCar(Car, $scope.car);
                $scope.carModal.show();
            }
        };

        $scope.createCar = function () {
            // this is to ensure that always there is only one car by default
            Utils.unsetDefaultCar(Car, $scope.car);

            $scope.car.$save(function () {
                // var cars = Car.query();
                $scope.cars = getCars();
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
            if ($scope.refuel.fuel && $scope.refuel.fuel.value === 'newFuel') {
                $scope.fuel = new Fuel();
                $scope.fuelModal.show();
            }
        };

        $scope.createFuel = function () {
            $scope.fuel.$save(function () {
                // need to query all the fuels to get the new one
                $scope.fuels = getFuels();
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

        $scope.$on('modal.hidden', function () {
            if (arguments[1].modalEl.id === 'new-fuel-modal' && $scope.refuel.fuel &&
                    $scope.refuel.fuel.value === 'newFuel') {
                $scope.refuel.fuel = null;
            } else if (arguments[1].modalEl.id === 'new-car-modal' && $scope.refuel.car &&
                    $scope.refuel.car.value === 'newCar') {
                $scope.refuel.car = null;
            }
        });

        // remove modal instances from DOM
        $scope.$on('$destroy', function () {
            $scope.fuelModal.remove();
            $scope.carModal.remove();
            $scope.newMakeModelModal.remove();
        });

        $scope.$watch('[refuel.date, refuel.car, refuel.overallKilometers, refuel.capacity]',
            function (newData, oldData) {

            var car = $scope.refuel.car,
                previousRefuel,
                previousRefuelNoPartial,
                distance,
                distanceForConsumption,
                capacityForConsumption;

            _.extend($scope.refuel, {
                distance: 0,
                consumption: 0
            });
debugger;
            if (car) {
                previousRefuelNoPartial = $scope.refuel.getPreviousRefuelNoPartial();
                previousRefuel = $scope.refuel.getPreviousRefuel();

                if (previousRefuel && previousRefuel._id !== $scope.refuel._id) {
                    distance = $scope.refuel.overallKilometers - previousRefuel.overallKilometers;
                    $scope.refuel.distance = distance;
                    if (previousRefuelNoPartial) {
                        distanceForConsumption = $scope.refuel.overallKilometers -
                            previousRefuelNoPartial.overallKilometers;
                        capacityForConsumption = Refuel.getCapacityBetweenRefuels(
                            previousRefuelNoPartial,
                            $scope.refuel
                        );
                        $scope.refuel.consumption = distanceForConsumption / capacityForConsumption;
                    }
                }
            }
        }, true);

        $scope.$watch(
            '[refuel.amount, refuel.capacity, refuel.fuelPrice]',
            function (newValues, oldValues) {
                var newAmount,
                    newCapacity,
                    newFuelPrice,
                    oldAmount,
                    oldCapacity,
                    oldFuelPrice,
                    toNumber;

                if ($scope.autocalculated) {
                    $scope.autocalculated = false;
                } else {
                    newAmount = newValues[0];
                    newCapacity = newValues[1];
                    newFuelPrice = newValues[2];
                    oldAmount = oldValues[0];
                    oldCapacity = oldValues[1];
                    oldFuelPrice = oldValues[2];
                    toNumber = function (number) {
                        return Number(number.toFixed(2));
                    };

                    if (newAmount && newFuelPrice && (newAmount !== oldAmount || newFuelPrice !== oldFuelPrice)) {
                        $scope.refuel.capacity = toNumber(newAmount / newFuelPrice);
                        $scope.autocalculated = true;
                    } else if (newCapacity && newFuelPrice && (newCapacity !== oldCapacity || newFuelPrice !== oldFuelPrice)) {
                        $scope.refuel.amount = toNumber(newCapacity * newFuelPrice);
                        $scope.autocalculated = true;
                    } else if (newAmount && newCapacity && (newAmount !== oldAmount || newCapacity !== oldCapacity)) {
                        $scope.refuel.fuelPrice = toNumber(newAmount / newCapacity);
                        $scope.autocalculated = true;
                    }
                }
            },
            true
        );
    }
]);
