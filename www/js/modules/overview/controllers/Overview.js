angular.module('overview')

.controller('Overview', [
    '$scope',
    'cars',
    'refuels',
    'Refuel',
    'Car',
    function ($scope, cars, refuels, Refuel, Car) {
        //add the car object to the last refuel
        var lastRefuel = _.extend(refuels[0], {
            car: Car.get(refuels[0].car)
        });

    	_.extend($scope, {
            cars: cars,
            refuels: refuels,
            lastRefuel: refuels[0]        
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
