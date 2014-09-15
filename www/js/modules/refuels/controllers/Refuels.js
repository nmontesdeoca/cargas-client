angular.module('refuels')

.controller('Refuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    '$state',
    'Refuel',
    function ($scope, $ionicPopup, $ionicListDelegate, $state, Refuel) {

        $scope.refuels = Refuel.query();

        $scope.delete = function (refuel) {
            $ionicPopup.confirm({
                title: 'Delete Refuel',
                template: 'Are you sure you want to remove this refuel?'
            }).then(function (yes) {
                if (yes) {
                    refuel.$remove(function () {
                        $scope.refuels = Refuel.query();
                    });
                }
                $ionicListDelegate.closeOptionButtons();
            });
        };

    }
]);
