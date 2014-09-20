angular.module('fuels')

.controller('Fuels.Form', [
    '$scope',
    '$ionicPopup',
    '$ionicViewService',
    '$state',
    'Fuel',
    function ($scope, $ionicPopup, $ionicViewService, $state, Fuel) {

        $scope.fuel = $state.params.id ? Fuel.get({
            _id: parseInt($state.params.id, 10)
        }) : new Fuel();

        $scope.create = function () {
            $scope.fuel.$save(function () {
                var backView = $ionicViewService.getBackView();
                backView && backView.go();
            });
        };
    }
]);
