angular.module('CarGas.Refuel')
.controller('Refuel.Add', [
    '$scope',
    '$rootScope',
    '$location',
    'Refuel',
    'fuels',
    function ($scope, $rootScope, $location, Refuel, fuels) {

        $rootScope.hideMenu();

        $scope.$parent.menuSelected = 'Refuel';
        $scope.$parent.title = 'Cargar';

        $scope.fuels = fuels;

        $scope.update = function () {
            new Refuel($scope.refuel).$save(function () {
                $location.path('/list');
            });
        };
    }
]);