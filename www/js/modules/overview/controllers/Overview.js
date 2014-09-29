angular.module('overview')

.controller('Overview', [
    '$scope',
    'cars',
    'Refuel',
    function ($scope, cars, Refuel) {
    	$scope.cars = cars;

    	var today = new Date(),
    		refuelsThisYear = Refuel.getRefuelsByMonth(today.getMonth(), today.getYear()),
    		refuelsLastYear = Refuel.getRefuelsByMonth(today.getMonth(), today.getYear() - 1);

    	$scope.carsRefueledThisMonth = function() {
	    	var cars = $scope.cars;
	    	cars = _.filter(cars, function(car) {
	    		// console.log(car)
	    		car.refuels = car.getRefuelsByMonth(today.getMonth(), today.getYear());
	    		_.extend(car,{
	    			'totalSpent': car.getTotalSpent(),
	    			'totalCapacity': car.getTotalCapacity()
	    		});
	    		return car.getRefuels().length > 0;
	    	});
	    	return cars;
    	};

    	$scope.totalSpentCompare = function() {
    		var thisYear = function() {
					return _.reduce(refuelsThisYear, function (memo, current) {
						return memo + current.get('amount');
					}, 0);
    			},
    			lastYear = function() {
					return _.reduce(refuelsLastYear, function (memo, current) {
						return memo + current.get('amount');
					}, 0);
    			};
    		return {
    			"terms": [
					thisYear(),
					lastYear()
    			]
    		}
    	};
    	
    }
]);
