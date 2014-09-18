angular.module('cars')

.controller('Cars.Form', [
    '$scope',
    '$ionicPopup',
    '$state',
    '$ionicViewService',
    '$ionicModal',
    'Car',
    'Fuel',
    function ($scope, $ionicPopup, $state, $ionicViewService, $ionicModal, Car, Fuel) {

        $scope.car = $state.params.id ? Car.get({
            _id: parseInt($state.params.id, 10)
        }) : new Car();

        // the next sort doesn't work due to the object transformation at the next line...
        $scope.fuels = _.sortBy(Fuel.query(), 'name');
        // console.log('fuels: ', $scope.fuels);
        /*$scope.fuels = _.object(
            _.pluck($scope.fuels, '_id'),
            _.pluck($scope.fuels, 'name')
        );*/

        $scope.car.fuel = $scope.car.fuel ? _.findWhere($scope.fuels, {
            _id: $scope.car.fuel._id
        }) : '';

        $scope.makes = _.sortBy([
            {
                make: 'Fiat',
                models: [
                    'Uno',
                    'Palio',
                    'Siena'
                ].sort()
            },
            {
                make: 'Renault',
                models: [
                    'Clio',
                    'Sandero',
                    'Megane'
                ].sort()
            },
            {
                make: 'Peugeot',
                models: [
                    '208',
                    '307',
                    '308',
                    '205',
                    '405',
                    '207'
                ].sort()
            }
        ], 'make');

        $scope.makes.push({
            make: 'Other',
            models: ['Other']
        });

        $scope.years = function () {
            var years = [],
                actualYear = new Date().getFullYear(),
                // variable name could be firstYear
                lastYear = 1935;

            for (; actualYear >= lastYear; actualYear--) {
                years.push(actualYear);
            }

            return years;
        };

        $scope.create = function () {
            $scope.car.$save(function () {
                var backView = $ionicViewService.getBackView();
                backView && backView.go();
            });
        };

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
                $scope.car.fuel = _.findWhere($scope.fuels, {
                    _id: $scope.fuel._id
                });
                $scope.fuelModal.hide();
            });
        };

        // we have to do this to have access to this object from the modal and the $scope
        $scope.newCar = {};

        // create new make and model modal
        $ionicModal.fromTemplateUrl('templates/cars/new-make-model.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.newMakeModelModal = modal;
        });

        $scope.newMakeModel = function () {
            console.log($scope.newCar);
            $ionicPopup.alert({
                title: 'New Make and Model',
                template: 'Thanks for suggest a new make and model.<br />' +
                    'Your suggestion will be reviewed and we will let you know if it is accepted.'
            }).then(function () {
                // $state.go('app.carNew');
                $scope.newCar = {};
                $scope.newMakeModelModal.hide();
            });
        };

        // remove modal instances from DOM
        $scope.$on('$destroy', function () {
            $scope.fuelModal.remove();
            $scope.newMakeModelModal.remove();
        });
    }
]);
