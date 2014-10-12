angular.module('stats')

.controller('Stats', [
    '$scope',
    'totalSpent',
    'spentByYear',
    'spentByMonth',
    'spentByDay',
    'totalKilometers',
    'totalCapacity',
    function ($scope, totalSpent, spentByYear, spentByMonth, spentByDay, totalKilometers,
        totalCapacity) {

        $scope.totalSpent = totalSpent;
        $scope.spentByYear = spentByYear;
        $scope.spentByMonth = spentByMonth;
        $scope.spentByDay = spentByDay;
        $scope.totalKilometers = totalKilometers;
        $scope.totalCapacity = totalCapacity;
        $scope.spentByKilometer = totalKilometers ? totalSpent / totalKilometers : 0;
        $scope.kilometersByLiter = totalCapacity ? totalKilometers / totalCapacity : 0;
    }
]);
