angular.module('refuels')

.controller('Refuels', [
    '$scope',
    '$ionicPopup',
    '$ionicListDelegate',
    '$state',
    'Refuel',
    'Fuel',
    function ($scope, $ionicPopup, $ionicListDelegate, $state, Refuel, Fuel) {

        $scope.refuels = Refuel.query();
        $scope.fuels = Fuel.query();

        // seguramente hay una mejor forma de hacerlo...
        _.each($scope.refuels, function (refuel) {
            refuel.fuel = _.findWhere($scope.fuels, {
                _id: refuel.fuel
            }).name;
        });

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
