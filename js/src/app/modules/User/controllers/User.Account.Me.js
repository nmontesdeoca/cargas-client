angular.module('CarGas.User')
.controller('User.Account.Me', [
    '$scope',
    '$location',
    'user',
    function ($scope, $location, user) {

        $scope.$parent.menuSelected = 'AccountMe';
        $scope.$parent.title = 'Mi Cuenta';

        $scope.user = user;

        $scope.update = function () {
            $scope.user.$save(function () {
                $location.path('/');
            });
        };
    }
]);