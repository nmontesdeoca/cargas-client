angular.module('CarGas.Home')
.controller('Home', [
    '$rootScope',
    '$scope',
    'user',
    function ($rootScope, $scope, user) {
        $rootScope.hideMenu();

        $scope.$parent.menuSelected = 'Home';
        $scope.$parent.title = 'Inicio';

        $scope.user = user;

    }
]);