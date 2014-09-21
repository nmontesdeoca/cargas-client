angular.module('cars')

.controller('Cars.Form', [
    '$scope',
    '$ionicPopup',
    '$ionicViewService',
    '$ionicModal',
    'car',
    'fuels',
    'makes',
    'Fuel',
    function ($scope, $ionicPopup, $ionicViewService, $ionicModal, car, fuels, makes, Fuel) {

        $scope.car = car;
        $scope.fuels = fuels;

        $scope.car.replaceFuel($scope.fuels);

        $scope.makes = makes;

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
                // needed to query all the fuels adding the new one
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
