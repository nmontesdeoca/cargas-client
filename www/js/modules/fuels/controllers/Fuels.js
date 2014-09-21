angular.module('fuels')

.controller('Fuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    'fuels',
    'Fuel',
    function ($scope, $ionicPopup, $ionicListDelegate, fuels, Fuel) {

        $scope.fuels = fuels;

        $scope.delete = function (fuel) {
            $ionicPopup.confirm({
                title: 'Delete Fuel',
                template: 'Are you sure you want to remove this fuel?'
            }).then(function (yes) {
                if (yes) {
                    fuel.$remove(function () {
                        $scope.fuels = Fuel.query();
                    });
                }
                $ionicListDelegate.closeOptionButtons();
            });
        };
    }
]);
