angular.module('cars')

.controller('Cars.Form', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Car',
    function ($scope, $ionicPopup, $state, Car) {

        $scope.car = $state.params.id ? Car.get($state.params.id) : new Car();

        $scope.makes = [
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
        ];

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
                // maybe we can display an alert only when an error happens
                /*$ionicPopup.alert({
                    title: 'Car',
                    template: 'Car added successfully.'
                }).then(function () {*/
                $state.go('app.carList');
                //});
            });
        };

        $scope.newMakeModel = function (newCar) {
            console.log(newCar);
            $ionicPopup.alert({
                title: 'New Make and Model',
                template: 'Thanks for suggest a new make and model.<br />' +
                    'Your suggestion will be reviewed and we will let you know if it is accepted.'
            }).then(function () {
                $state.go('app.carNew');
            });
        };
    }
]);
