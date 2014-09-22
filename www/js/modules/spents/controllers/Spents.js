angular.module('spents')

.controller('Spents', [
    '$scope',
    'totalSpent',
    'spentByYear',
    'spentByMonth',
    'spentByDay',
    function ($scope, totalSpent, spentByYear, spentByMonth, spentByDay) {
        $scope.totalSpent = totalSpent;
        $scope.spentByYear = spentByYear;
        $scope.spentByMonth = spentByMonth;
        $scope.spentByDay = spentByDay;
    }
]);
