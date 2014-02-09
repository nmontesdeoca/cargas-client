angular.module('CarGas.Refuel')
.controller('Refuel.List', [
    '$scope',
    '$location',
    'Refuel',
    'refuels',
    function ($scope, $location, Refuel, refuels) {

        $scope.$parent.menuSelected = 'Refuels';
        $scope.$parent.title = 'Lista';

        $scope.refuels = refuels;

        $scope.delete = function (id) {
            var refuel = Refuel.get({ id: id }, function () {
                refuel.$remove(function () {
                    $location.path('/');
                });
            });
        };
    }
]);