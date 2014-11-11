angular.module('intro', [])

.config(['$stateProvider', function($stateProvider) {
	
	$stateProvider
		.state('intro', {
			url: '/intro',
			templateUrl: 'templates/intro/intro.html',
			controller: 'Intro'
		})
		.state('intro.initialCarForm', {
            resolve: {
                car: ['$stateParams', 'Car',
                    function ($stateParams, Car) {
                        return Car.get({
                            _id: parseInt($stateParams.id, 10)
                        });
                    }
                ],
                fuels: ['Fuel',
                    function (Fuel) {
                        return _.sortBy(Fuel.query(), 'name');
                    }
                ],
                makes: ['Utils',
                    function (Utils) {
                        return Utils.getMakes();
                    }
                ]
            },
            views: {
                'initialCarForm': {
                    templateUrl: 'templates/cars/form.html',
                    controller: 'Cars.Form'
                    
                }
            }
		});

}]);