angular.module('CarGas.Refuel')
.controller('Refuel.Add', [
    '$scope',
    '$rootScope',
    '$location',
    'Refuel',
    'fuels',
    'Utils',
    function ($scope, $rootScope, $location, Refuel, fuels, Utils) {
        $rootScope.hideMenu();

        $scope.$parent.menuSelected = 'Refuel';
        $scope.$parent.title = 'Cargar';

        $scope.fuels = fuels;

        $scope.refuel = {
            date: Utils.formatDate(new Date())
        };

        $scope.validate = function () {
            return $scope.refuel.fuel && $scope.refuel.cost &&
                $scope.refuel.kilometers && $scope.refuel.capacity;
        };

        $scope.update = function () {
            $scope.sent = true;
            if ($scope.validate()) {
                new Refuel($scope.refuel).$save(function () {
                    $location.path('/refuels');
                });
            } else {
                alert('Todos los campos son obligatorios');
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        };
    }
]);
