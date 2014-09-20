angular.module('refuels')

.controller('Refuels.Form', [
    '$scope',
    '$ionicPopup',
    '$state',
    '$ionicModal',
    'Refuel',
    'Car',
    'Fuel',
    'utils',
    function ($scope, $ionicPopup, $state, $ionicModal, Refuel, Car, Fuel, utils) {

        $scope.refuel = $state.params.id ? Refuel.get({
            _id: parseInt($state.params.id, 10)
        }) : new Refuel();

        $scope.refuel.date = utils.formatDateForInput(
            $scope.refuel.date ? new Date($scope.refuel.date) : new Date()
        );

        // $scope.fuels = Fuel.query();
        $scope.fuels = _.sortBy(Fuel.query(), 'name');
        $scope.cars = Car.query();


        $scope.cars = _.object(
            _.pluck($scope.cars, '_id'),
            _.map($scope.cars, function (car) {
                return car.make + ' ' + car.model;
            })
        );

        $scope.refuel.fuel = $scope.refuel.fuel ? _.findWhere($scope.fuels, {
            _id: $scope.refuel.fuel._id
        }) : '';

        /*$scope.fuels = _.object(
            _.pluck($scope.fuels, '_id'),
            _.map($scope.fuels, function (fuel) {
                return fuel.name;
            })
        );*/

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

        /*$scope.$watch('refuel.fuel', function (fuel) {
            $scope.refuel.fuelObject = Fuel.get({
                _id: parseInt(fuel)
            });
        });*/

        $scope.$watch('refuel.fuel.price * refuel.capacity', function (amount) {
            $scope.refuel.amount = !isNaN(amount) ? Math.round(amount * 100) / 100 : '';
        });

        // TODO: this is not correct when enter to the page in edit mode, the refuel.fuel is overlapped by car.fuel
        $scope.$watch('refuel.car', function (newValue, oldValue) {
            //if (carId) {
            // console.log($scope.refuel.car);
            if (newValue !== oldValue) {
                var car = Car.get({
                    _id: parseInt(newValue, 10)
                });
                console.log('new value: ', newValue);
                console.log('old value: ', oldValue);
                $scope.refuel.fuel = car && car.fuel ? _.findWhere($scope.fuels, {
                    _id: car.fuel._id
                }) : '';
            }
            //}
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
                /*$scope.fuels = _.object(
                    _.pluck($scope.fuels, '_id'),
                    _.pluck($scope.fuels, 'name')
                );*/
                $scope.refuel.fuel = _.findWhere($scope.fuels, {
                    _id: $scope.fuel._id
                });
                $scope.fuelModal.hide();
            });
        };

        // remove modal instances from DOM
        $scope.$on('$destroy', function () {
            $scope.fuelModal.remove();
        });

    }
]);
