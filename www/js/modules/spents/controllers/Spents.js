angular.module('spents')

.controller('Spents', [
    '$scope',
    'totalSpent',
    function ($scope, totalSpent) {
        $scope.totalSpent = totalSpent;
    }
]);
