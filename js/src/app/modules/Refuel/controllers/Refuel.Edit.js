angular.module('CarGas.Refuel')
.controller('Refuel.Edit', [
    '$scope',
    '$routeParams',
    '$location',
    'Refuel',
    'fuels',
    'refuel',
    function ($scope, $routeParams, $location, Refuel, fuels, refuel) {

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