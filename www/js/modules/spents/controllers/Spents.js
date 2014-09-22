angular.module('spents')

.controller('Spents', [
    '$scope',
    'totalSpent',
    'spentByYear',
    'spentByMonth',
    'spentByDay',
    'totalKilometers',
    'totalCapacity',
    function ($scope, totalSpent, spentByYear, spentByMonth, spentByDay, totalKilometers, totalCapacity) {
        // we can use a simple object with all the data instead of multiple parameters
        $scope.totalSpent = totalSpent;
        $scope.spentByYear = spentByYear;
        $scope.spentByMonth = spentByMonth;
        $scope.spentByDay = spentByDay;
        $scope.totalKilometers = totalKilometers;
        $scope.totalCapacity = totalCapacity;
    }
]);
