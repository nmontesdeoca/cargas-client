angular.module('CarGas.User')
.controller('User.Account.Fuels', [
    '$scope',
    '$location',
    '$filter',
    'user',
    'fuels',
    'Fuel',
    function ($scope, $location, $filter, user, fuels, Fuel) {

        $scope.$parent.menuSelected = 'Account';
        $scope.$parent.title = 'Mi Cuenta';

        $scope.user = user;
        $scope.fuel = new Fuel();
        $scope.fuels = fuels;

        $scope.defaultFuels = function (fuel) {
            return !fuel.user;
        },

        $scope.myFuels = function (fuel) {
            return fuel.user === $scope.user._id;
        };

        $scope.add = function () {
            $scope.error = '';
            $scope.fuel.user = user._id;
            $scope.fuel.$save(function (fuel) {
                if (fuel._id) {
                    $scope.fuels.push($scope.fuel);
                    $scope.fuel = new Fuel();
                } else {
                    $scope.error = 'Combustible no creado. Algo anduvo mal';
                }
            });
        };

        $scope.delete = function (id) {
            var fuel = Fuel.get({ _id: id }).$remove();
            $scope.fuels = $filter('filter')($scope.fuels, function (fuel) {
                return fuel._id !== id;
            });
        };
    }
]);

