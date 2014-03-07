angular.module('CarGas.User')
.controller('User.Account', [
    '$scope',
    '$rootScope',
    '$location',
    'user',
    function ($scope, $rootScope, $location, user) {
        $rootScope.hideMenu();

        // $scope.$parent.menuSelected = 'Account';
        $scope.$parent.title = 'Mi Cuenta';

        $scope.user = user;

        $scope.update = function () {
            $scope.user.$save(function () {
                $location.path('/');
            });
        };
    }
]);