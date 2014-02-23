angular.module('CarGas.Refuel')
.controller('Refuel.Edit', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    'Refuel',
    'fuels',
    'refuel',
    function ($scope, $rootScope, $routeParams, $location, Refuel, fuels, refuel) {
        $rootScope.hideMenu();

        $scope.$parent.menuSelected = 'Refuel';
        $scope.$parent.title = 'Editar';

        $scope.fuels = fuels;

        $scope.refuel = refuel;

        $scope.update = function () {
            $scope.refuel.$save(function () {
                $location.path('/');
            });
        };
    }
]);