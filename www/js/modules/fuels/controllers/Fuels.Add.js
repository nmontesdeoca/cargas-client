angular.module('fuels')

.controller('Fuels.Add', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Fuel',
    function ($scope, $ionicPopup, $state, Fuel) {

        $scope.fuel = new Fuel();

        $scope.create = function () {
            $scope.fuel.$save(function () {
                $ionicPopup.alert({
                    title: 'Fuel',
                    template: 'Fuel added successfully.'
                }).then(function () {
                    $state.go('app.fuelList');
                });
            });
        };

}]);
