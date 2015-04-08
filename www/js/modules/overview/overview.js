angular.module('overview', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

        .state('app.overview', {
            url: '/overview',
            resolve: {
                refuels: ['Refuel', function (Refuel) {
                    return Refuel.getRefuelsSortByDate();
                }],
                cars: ['Car', function (Car) {
                    return Car.query();
                }]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/overview/overview.html',
                    controller: 'Overview'
                },
                'withData@app.overview': {
                    templateUrl: 'templates/overview/overview-with-data.html'
                },
                'noData@app.overview': {
                    templateUrl: 'templates/overview/overview-no-data.html'
                }
            }
        });
}]);
