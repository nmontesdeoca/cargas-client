angular.module('spents', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('app.spents', {
        url: '/spents',
        resolve: {
            totalSpent: ['Refuel', function (Refuel) {
                return Refuel.getTotalSpent();
            }],
            spentByYear: ['Refuel', 'utils', function (Refuel, utils) {
                var firstDate = Refuel.getFirstRefuel().date,
                    lastDate = Refuel.getLastRefuel().date;

                return Refuel.getTotalSpent() /
                    utils.millisecondsToYears(lastDate - firstDate);
            }],
            spentByMonth: ['Refuel', 'utils', function (Refuel, utils) {
                var firstDate = Refuel.getFirstRefuel().date,
                    lastDate = Refuel.getLastRefuel().date;

                return Refuel.getTotalSpent() /
                    utils.millisecondsToMonths(lastDate - firstDate);
            }],
            spentByDay: ['Refuel', 'utils', function (Refuel, utils) {
                var firstDate = Refuel.getFirstRefuel().date,
                    lastDate = Refuel.getLastRefuel().date;

                return Refuel.getTotalSpent() /
                    utils.millisecondsToDays(lastDate - firstDate);
            }]
        },
        views: {
            menuContent: {
                templateUrl: 'templates/spents/spents.html',
                controller: 'Spents'
            }
        }
    });

}]);
