angular.module('CarGas.Refuel')
.controller('Refuel.List', [
    '$scope',
    '$rootScope',
    '$location',
    'Refuel',
    'refuels',
    'fuels',
    function ($scope, $rootScope, $location, Refuel, refuels, fuels) {
        $rootScope.hideMenu();

        $scope.$parent.menuSelected = 'Refuels';
        $scope.$parent.title = 'Lista';

        $scope.refuels = refuels;
        $scope.fuels = fuels;
    }
]);