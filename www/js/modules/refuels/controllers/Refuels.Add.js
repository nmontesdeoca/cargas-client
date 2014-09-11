angular.module('refuels')

.controller('Refuels.Add', [
    '$scope',
    '$ionicPopup',
    '$state',
    'Refuel',
    function ($scope, $ionicPopup, $state, Refuel) {

        $scope.refuel = new Refuel();

        $scope.create = function () {
            $scope.refuel.$save(function () {
                $ionicPopup.alert({
                    title: 'Refuel',
                    template: 'Refuel added successfully.'
                }).then(function () {
                    $state.go('app.refuelList');
                });
            });
        };

}]);
