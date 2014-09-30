angular.module('cars')

.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
}])

.controller('Cars.Form', [
    '$scope',
    '$ionicPopup',
    '$ionicViewService',
    '$ionicModal',
    '$ionicActionSheet',
    'car',
    'fuels',
    'makes',
    'Utils',
    'Car',
    'Fuel',
    'Camera',
    function ($scope, $ionicPopup, $ionicViewService, $ionicModal, $ionicActionSheet, car, fuels, makes, Utils, Car, Fuel, Camera) {

        $scope.car = car;
        $scope.fuels = fuels;
        $scope.makes = makes;
        $scope.years = Utils.getYears();
        $scope.displayTakePicture = !!Camera.isAvailable;

        $scope.car.replaceFuel($scope.fuels);

        Utils.turnOnDefaultCar(Car, $scope.car);

        $scope.createCar = function () {
            // this is to ensure that always there is only one car by default
            Utils.unsetDefaultCar(Car, $scope.car);
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
                    console.error(err);
                });
            };
        };
    }
]);
