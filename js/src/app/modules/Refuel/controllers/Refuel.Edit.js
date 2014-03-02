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

        $scope.validate = function () {
            return $scope.refuel.fuel && $scope.refuel.cost &&
                $scope.refuel.kilometers && $scope.refuel.capacity;
        };

        $scope.update = function () {
            $scope.sent = true;
            if ($scope.validate()) {
                $scope.refuel.$save(function () {
                    $location.path('/');
                });
            } else {
                alert('Todos los campos son obligatorios');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        };

        $scope.delete = function (id) {
            Refuel.get({ _id: id }).$remove();
            $scope.refuels = Refuel.query();
            $location.path('/refuels');
        };
    }
]);