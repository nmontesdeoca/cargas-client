angular.module('profile', ['utils'])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('app.profile', {
        url: '/profile',
        resolve: {
            Profile: 'Profile'
        },
        views: {
            menuContent: {
                templateUrl: 'templates/profile/profile.html',
                controller: 'Profile'
            }
        }
    });

}]);
