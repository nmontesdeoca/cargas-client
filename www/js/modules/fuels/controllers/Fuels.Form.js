angular.module('fuels')

.controller('Fuels.Form', [
    '$scope',
    '$ionicViewService',
    'fuel',
    function ($scope, $ionicViewService, fuel) {

        $scope.fuel = fuel;

        $scope.createFuel = function () {
            $scope.fuel.$save(function () {
                var backView = $ionicViewService.getBackView();
                backView && backView.go();
            });
        };
    }
]);
