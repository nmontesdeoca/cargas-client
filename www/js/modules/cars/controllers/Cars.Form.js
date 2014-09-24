angular.module('cars')

.controller('Cars.Form', [
    '$scope',
    '$ionicPopup',
    '$ionicViewService',
    '$ionicModal',
    'car',
    'fuels',
    'makes',
    'utils',
    'Car',
    'Fuel',
    function ($scope, $ionicPopup, $ionicViewService, $ionicModal, car, fuels, makes, utils, Car, Fuel) {

        $scope.car = car;
        $scope.fuels = fuels;
        $scope.makes = makes;
        $scope.years = utils.getYears();

        $scope.car.replaceFuel($scope.fuels);

        $scope.createCar = function () {
            // this is to ensure that always there is only one car by default
            utils.unsetDefaultCar(Car, $scope.car);
            $scope.car.$save(function () {
                var backView = $ionicViewService.getBackView();
                backView && backView.go();
            });
        };

        // create fuel modal
        $ionicModal.fromTemplateUrl('templates/fuels/form-modal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.fuelModal = modal;
        });

        $scope.addNewFuel = function () {
            $scope.fuel = new Fuel();
            $scope.fuelModal.show();
        };

        $scope.createFuel = function () {
            $scope.fuel.$save(function () {
                // need to query all the fuels to get the new one
                $scope.fuels = Fuel.query();
                $scope.car.replaceFuel($scope.fuels, $scope.fuel._id);
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
            $ionicPopup.alert({
                title: 'New Make and Model',
                template: 'Thanks for suggest a new make and model.<br />' +
                    'Your suggestion will be reviewed and we will let you know if it is accepted.'
            }).then(function () {
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
