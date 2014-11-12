angular.module('intro', [])

.config(['$stateProvider', function($stateProvider) {
	
	$stateProvider
		.state('intro', {
			url: '/intro',
			templateUrl: 'templates/intro/intro.html',
			controller: 'Intro',
            resolve: {
                refuels: ['Refuel', function (Refuel) {
                    return Refuel.getRefuelsSortByDate();
                }],
                cars: ['Car', 'Refuel', 'Utils', function (Car, Refuel, Utils) {
                        return Car.query();
                        // var cars = Car.getRefueledCars();

                        // return _.map(cars, function(car) {

                        //     car.refuels = car.getRefuels();
                    //  return _.extend(car, {
                    //      'totalSpent': car.getTotalSpent(),
                    //      'totalCapacity': car.getTotalCapacity()
                    //  });
                    // });
                }]
                // ,
                // refuels: ['Refuel', function(Refuel) {
                //  return Refuel.query();
                // }]
            }
		});
		// .state('intro.initialCarForm', {
  //           resolve: {
  //               car: ['$stateParams', 'Car',
  //                   function ($stateParams, Car) {
  //                       return Car.get({
  //                           _id: parseInt($stateParams.id, 10)
  //                       });
  //                   }
  //               ],
  //               fuels: ['Fuel',
  //                   function (Fuel) {
  //                       return _.sortBy(Fuel.query(), 'name');
  //                   }
  //               ],
  //               makes: ['Utils',
  //                   function (Utils) {
  //                       return Utils.getMakes();
  //                   }
  //               ]
  //           },
  //           views: {
  //               'initialCarForm': {
  //                   templateUrl: 'templates/cars/form.html',
  //                   controller: 'Cars.Form'
                    
  //               }
  //           }
		// });

}]);