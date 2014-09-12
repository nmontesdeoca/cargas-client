angular.module('cars')

.controller('Cars.Add', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Car',
    function ($scope, $ionicPopup, $state, Car) {

        $scope.car = new Car();

        $scope.makes = [
            {
                make: 'Fiat',
                models: ['Uno', 'Palio', 'Siena']
            },
            {
                make: 'Renault',
                models: ['Clio', 'Sandero', 'Megane']
            },
            {
                make: 'Peugeot',
                models: ['208', '307', '308']
            }
        ];

        $scope.years = function () {
            var years = [],
                actualYear = new Date().getFullYear(),
                i = actualYear,
                range = 60;

            for (; i > actualYear - range; i--) {
                years.push(i);
            }

            return years;
        };

        $scope.create = function () {
            $scope.car.$save(function () {
                $ionicPopup.alert({
                    title: 'Car',
                    template: 'Car added successfully.'
                }).then(function () {
                    $state.go('app.carList');
                });
            });
        };

}]);
