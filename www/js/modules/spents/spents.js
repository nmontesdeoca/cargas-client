angular.module('spents', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('app.spents', {
        url: '/spents',
        resolve: {
            totalSpent: ['Refuel', function (Refuel) {
                return Refuel.getTotalSpent();
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
