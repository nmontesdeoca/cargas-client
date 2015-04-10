angular.module('profile', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('app.profile', {
        url: '/profile',
        views: {
            menuContent: {
                templateUrl: 'templates/profile/profile.html',
                controller: 'Profile'
            }
        }
    });

}]);
