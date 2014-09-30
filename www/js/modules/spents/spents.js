angular.module('spents', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('app.spents', {
        url: '/spents',
        resolve: {
            totalSpent: ['Refuel', function (Refuel) {
                return Refuel.getTotalSpent();
            }],
            totalKilometers: ['Refuel', function (Refuel) {
                return Refuel.getTotalKilometers();
            }],
            totalCapacity: ['Refuel', function (Refuel) {
                return Refuel.getTotalCapacity();
            }],
            spentByYear: ['Refuel', 'Utils', function (Refuel, Utils) {
                var firstDate = Refuel.getFirstRefuel().date,
                    lastDate = Refuel.getLastRefuel().date;

                return Refuel.getTotalSpent() /
                    Utils.millisecondsToYears(lastDate - firstDate);
            }],
            spentByMonth: ['Refuel', 'Utils', function (Refuel, Utils) {
                var firstDate = Refuel.getFirstRefuel().date,
                    lastDate = Refuel.getLastRefuel().date;

                return Refuel.getTotalSpent() /
                    Utils.millisecondsToMonths(lastDate - firstDate);
            }],
            spentByDay: ['Refuel', 'Utils', function (Refuel, Utils) {
                var firstDate = Refuel.getFirstRefuel().date,
                    lastDate = Refuel.getLastRefuel().date;

                return Refuel.getTotalSpent() /
                    Utils.millisecondsToDays(lastDate - firstDate);
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
