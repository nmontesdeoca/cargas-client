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
        $scope.fuels = _.object(
            _.pluck($scope.fuels, '_id'),
            _.pluck($scope.fuels, 'name')
        );

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
                // maybe we can display an alert only when an error happens
                /*$ionicPopup.alert({
                    title: 'Car',
                    template: 'Car added successfully.'
                }).then(function () {*/
                //});
            });
        };

        $ionicModal.fromTemplateUrl('templates/fuels/new-modal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.addNewFuel = function () {
            // $state.go('app.fuelNew');
            $scope.fuel = new Fuel();
            $scope.modal.show();
        };

        $scope.createFuel = function () {
            $scope.fuel.$save(function () {
                $scope.fuels = _.sortBy(Fuel.query(), 'name');
                $scope.fuels = _.object(
                    _.pluck($scope.fuels, '_id'),
                    _.pluck($scope.fuels, 'name')
                );
                $scope.car.fuel = $scope.fuel._id.toString();
                $scope.modal.hide();
            });
        };

        $scope.newMakeModel = function (newCar) {
            $ionicPopup.alert({
                title: 'New Make and Model',
                template: 'Thanks for suggest a new make and model.<br />' +
                    'Your suggestion will be reviewed and we will let you know if it is accepted.'
            }).then(function () {
                $state.go('app.carNew');
            });
        };

        // remove the modal instance of the DOM
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
    }
]);
