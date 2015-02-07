angular.module('fuels')

.controller('Fuels.Form', [
    '$scope',
    '$ionicHistory',
    '$ionicPopup',
    '$filter',
    '$state',
    'fuel',
    function ($scope, $ionicHistory, $ionicPopup, $filter, $state, fuel) {
        $scope.fuel = fuel;

        $scope.createFuel = function () {
            $scope.fuel.$save(function () {
                var backView = $ionicHistory.backView();
                backView && backView.go();
            });
        };

        $scope.deleteFuel = function (fuel) {
            $ionicPopup.confirm({
                title: $filter('translate')('DELETE_FUEL'),
                template: $filter('translate')('DELETE_FUEL_QUESTION')
            }).then(function (yes) {
                if (yes) {
                    fuel.$remove();
                    $state.go('app.fuelList');
                }
            });
        };
    }
]);
