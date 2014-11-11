angular.module('intro')

.controller('Intro', [
	'$scope',
	'$ionicSlideBoxDelegate',
	'$state',
	function($scope, $ionicSlideBoxDelegate, $state) {
		$scope.slideChanged = function() {
			$state.transitionTo('intro.initialCarForm');
		};
}]);