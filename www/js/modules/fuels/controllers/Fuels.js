angular.module('fuels')

.controller('Fuels', [
    '$scope',
    'fuels',
    function ($scope, fuels) {
        $scope.fuels = fuels;
    }
]);
