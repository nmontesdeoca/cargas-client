angular.module('fuels')

.controller('Fuels.Form', [
    '$scope',
    '$ionicViewService',
    '$ionicPopup',
    '$filter',
    '$state',
    'fuel',
    function ($scope, $ionicViewService, $ionicPopup, $filter, $state, fuel) {
        $scope.fuel = fuel;

        $scope.createFuel = function () {
            $scope.fuel.$save(function () {
                var backView = $ionicViewService.getBackView();
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
