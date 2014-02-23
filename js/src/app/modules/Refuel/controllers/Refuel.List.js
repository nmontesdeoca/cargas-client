angular.module('CarGas.Refuel')
.controller('Refuel.List', [
    '$scope',
    '$rootScope',
    '$location',
    'Refuel',
    'refuels',
    function ($scope, $rootScope, $location, Refuel, refuels) {
        $rootScope.hideMenu();

        $scope.$parent.menuSelected = 'Refuels';
        $scope.$parent.title = 'Lista';

        $scope.refuels = refuels;

        $scope.delete = function (id) {
            Refuel.get({ _id: id }).$remove();
            $scope.refuels = Refuel.query();
        };
    }
]);