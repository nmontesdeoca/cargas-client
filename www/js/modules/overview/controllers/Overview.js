angular.module('overview')

.controller('Overview', [
    '$scope',
    'cars',
    'refuels',
    'Refuel',
    'Car',
    'Utils',
    function ($scope, cars, refuels, Refuel, Car, Utils) {
        //add the car object to the last refuel
        var lastRefuel = refuels[0];

        lastRefuel = _.extend(lastRefuel, {
            car: Car.get(lastRefuel.car),
            daysAgo: Utils.calculateDays(lastRefuel.date, new Date())
        });


    	_.extend($scope, {
            'cars': cars,
            'refuels': refuels,
            'lastRefuel': lastRefuel,
            'totals': {
                'totalSpent': Refuel.getTotalSpent(),
                'totalCapacity': Refuel.getTotalCapacity()
            }
        });


    	// var today = new Date(),
    	// 	refuelsThisYear = Refuel.getRefuelsByMonth(today.getMonth(), today.getYear()),
    	// 	refuelsLastYear = Refuel.getRefuelsByMonth(today.getMonth(), today.getYear() - 1);

    	// $scope.carsRefueledThisMonth = function() {
	    // 	var cars = $scope.cars;
	    // 	cars = _.filter(cars, function(car) {
	    		
	    // 		car.refuels = car.getRefuelsByMonth(today.getMonth(), today.getYear());
	    // 		_.extend(car,{
	    // 			'totalSpent': car.getTotalSpent(),
	    // 			'totalCapacity': car.getTotalCapacity()
	    // 		});
	    // 		return car.getRefuels().length > 0;
	    // 	});
	    // 	return cars;
    	// };

    	// totalSpentCompare = function() {
    	// 	var thisYear = function() {
					// return _.reduce(refuelsThisYear, function (memo, current) {
					// 	return memo + current.get('amount');
					// }, 0);
    	// 		},
    	// 		lastYear = function() {
					// return _.reduce(refuelsLastYear, function (memo, current) {
					// 	return memo + current.get('amount');
					// }, 0);
    	// 		};
    	// 	return {
    	// 		"entries": [
     //                {time: 1, count: thisYear()},
					// {time: 2, count: lastYear()}
    	// 		]
    	// 	};
    	// };
     //    $scope.totalSpentComparison = totalSpentCompare();
    	
    }
]);
