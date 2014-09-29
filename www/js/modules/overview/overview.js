angular.module('overview',['dangle'])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    .state('app.overview', {
        url: '/overview',
        resolve: {
        	cars: ['Car', 'Refuel', 'utils', function(Car, Refuel, utils) {
                var cars = Car.getRefueledCars();

                return _.map(cars, function(car) {
                	 // console.log('refuelsbyidtostring', Refuel.getRefuelsByCarId(car._id.toString()))
                    car.refuels = car.getRefuels();
                	return _.extend(car, {
                		'totalSpent': car.getTotalSpent(),
                		'totalCapacity': car.getTotalCapacity()
                	});
                });
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
            }
        }
    });

}]);

