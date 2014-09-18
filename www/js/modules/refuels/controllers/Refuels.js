angular.module('refuels')

.controller('Refuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    '$state',
    'Refuel',
    'Fuel',
    function ($scope, $ionicPopup, $ionicListDelegate, $state, Refuel, Fuel) {

        // sort refuels by date (newest first)
        $scope.refuels = _.sortBy(Refuel.query(), 'date').reverse();
        $scope.fuels = Fuel.query();

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
