angular.module('settings', [])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider

    .state('app.settingsList', {
        url: '/settings',
        /*resolve: {
            Settings: 'Setting'
        },*/
        views: {
            menuContent: {
                templateUrl: 'templates/settings/settings.html',
                controller: 'Settings'
            }
        }
    });

}]);
