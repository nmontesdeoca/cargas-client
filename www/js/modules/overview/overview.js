angular.module('overview', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

        .state('app.overview', {
        url: '/overview',
        resolve: {
            refuels: ['Refuel', function (Refuel) {
                return Refuel.getRefuelsSortByDate();
            }],
            cars: ['Car', 'Refuel', 'Utils', function (Car, Refuel, Utils) {
                    return Car.query();
                    // var cars = Car.getRefueledCars();

                    // return _.map(cars, function(car) {

                    //     car.refuels = car.getRefuels();
                    // 	return _.extend(car, {
                    // 		'totalSpent': car.getTotalSpent(),
                    // 		'totalCapacity': car.getTotalCapacity()
                    // 	});
                    // });
                }]
                // ,
                // refuels: ['Refuel', function(Refuel) {
                // 	return Refuel.query();
                // }]
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
