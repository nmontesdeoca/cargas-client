angular.module('fuels')

.controller('Fuels.Add', [
    '$scope',
    '$ionicPopup',
    '$ionicViewService',
    'Fuel',
    function ($scope, $ionicPopup, $ionicViewService, Fuel) {

        $scope.fuel = new Fuel();

        $scope.create = function () {
            $scope.fuel.$save(function () {
                var backView = $ionicViewService.getBackView();
                backView && backView.go();
            });
        };
    }
]);
