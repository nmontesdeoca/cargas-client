(function () {
    'use strict';

    angular
        .module('cars')
        .controller('CarsFormController', CarsFormController);

        CarsFormController.$inject = [
            '$ionicPopup',
            '$ionicHistory',
            '$ionicModal',
            '$ionicActionSheet',
            '$state',
            '$filter',
            'car',
            'fuels',
            'makes',
            'Utils',
            'CarFactory',
            'Fuel',
            'Camera'
        ];

        function CarsFormController($ionicPopup, $ionicHistory, $ionicModal, $ionicActionSheet, $state,
                $filter, car, fuelsFunction, makes, Utils, CarFactory, Fuel, Camera) {

            var translate = $filter('translate');

            // http://stackoverflow.com/quevstions/21714655/angular-js-angular-ui-router-reloading-current-state-refresh-data

            $scope.car = car;
            $scope.fuels = fuelsFunction(translate('ADD_NEW_FUEL'));
            $scope.makes = makes;
            $scope.years = Utils.getYears();
            $scope.displayTakePicture = !!Camera.isAvailable;

            $scope.car.replaceFuel($scope.fuels);

            Utils.turnOnDefaultCar(CarFactory, $scope.car);

            $scope.createCar = function () {
                // this is to ensure that always there is only one car by default
                Utils.unsetDefaultCar(CarFactory, $scope.car);
                $scope.car.$save(function () {
                    var backView = $ionicHistory.backView();
                    backView && backView.go();
                });
            };

            // create fuel modal
            $ionicModal.fromTemplateUrl('templates/fuels/form-modal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.fuelModal = modal;
            });

            $scope.$on('modal.hidden', function () {
                if (arguments[1].modalEl.id === 'new-fuel-modal' && $scope.car.fuel &&
                    $scope.car.fuel.value === 'newFuel') {
                    $scope.car.fuel = null;
                }
            });

            $scope.addNewFuel = function () {
                if ($scope.car.fuel && $scope.car.fuel.value === 'newFuel') {
                    $scope.fuel = new Fuel();
                    $scope.fuelModal.show();
                }
            };

            $scope.createFuel = function () {
                $scope.fuel.$save(function () {
                    // need to query all the fuels to get the new one
                    $scope.fuels = fuelsFunction(translate('ADD_NEW_FUEL'));
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

            $scope.getPhoto = function () {
                var hideSheet = $ionicActionSheet.show({
                        buttons: [{
                            text: 'From camera'
                        }, {
                            text: 'From Photo Album'
                        }],
                        // destructiveText: 'Delete',
                        titleText: 'Take Photo',
                        cancelText: 'Cancel',
                        cancel: function () {
                            // add cancel code..
                        },
                        buttonClicked: function (index) {
                            switch (index) {
                                case 0:
                                    takePhoto(Camera.PictureSourceType.CAMERA);
                                    break;
                                case 1:
                                    takePhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM);
                                    break;
                                default:
                                    break;
                            }
                            return true;
                        }
                    }),

                    takePhoto = function (sourceType) {
                        Camera.getPicture({
                            sourceType: sourceType
                        }).then(function (imageURI) {
                            $scope.car.image = imageURI;
                        }, function (err) {
                            console.log(err);
                        });
                    };
            };

            $scope.deleteCar = function (car) {
                if (car.getRefuelsCount()) {
                    $ionicPopup.alert({
                        title: translate('DELETE_CAR'),
                        template: translate('DELETE_REFUELS_MESSAGE')
                    });
                } else {
                    $ionicPopup.confirm({
                        title: translate('DELETE_CAR'),
                        template: translate('DELETE_CAR_QUESTION')
                    }).then(function (yes) {
                        if (yes) {
                            car.$remove();
                            $state.go('app.carList');
                        }
                    });
                }
            };
        }
    ]);

})();
