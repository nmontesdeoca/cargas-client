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
    })

    .state('app.settingsTerms', {
        url: '/settings/terms-conditions',
        /*resolve: {
            Settings: 'Setting'
        },*/
        views: {
            menuContent: {
                templateUrl: 'templates/settings/terms-conditions.html',
                controller: 'Settings'
            }
        }
    })

    .state('app.settingsAbout', {
        url: '/settings/about',
        /*resolve: {
            Settings: 'Setting'
        },*/
        views: {
            menuContent: {
                templateUrl: 'templates/settings/about.html',
                controller: 'Settings'
            }
        }
    });

}]);
