angular.module('intro', [])

.config(['$stateProvider', function($stateProvider) {
	
	$stateProvider
		.state('intro', {
			url: '/intro',
			templateUrl: 'templates/intro/intro.html',
			controller: 'Intro'
		});

}]);