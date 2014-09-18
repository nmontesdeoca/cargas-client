angular.module('overview', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('app.overview', {
        url: '/overview',
        views: {
            menuContent: {
                templateUrl: 'templates/overview/overview.html',
                controller: 'Overview'
            }
        }
    });

}]);
