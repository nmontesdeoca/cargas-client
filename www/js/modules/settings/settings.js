angular.module('settings', [])

.constant('VALID_LANGUAGES', ['en', 'es'])

.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider

            .state('app.settingsList', {
            url: '/settings',
            views: {
                menuContent: {
                    templateUrl: 'templates/settings/settings.html',
                    controller: 'Settings'
                }
            }
        })

        .state('app.settingsLanguage', {
            url: '/settings/language',
            resolve: {
                setting: ['Setting', function (Setting) {
                    return Setting.query();
                }]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/settings/languages.html',
                    controller: 'Languages'
                }
            }
        })

        .state('app.settingsUnits', {
            url: '/settings/units',
            resolve: {
                setting: ['Setting', function (Setting) {
                    return Setting.query();
                }],
                units: ['Utils', function (Utils) {
                    return Utils.getUnits();
                }]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/settings/units.html',
                    controller: 'Units'
                }
            }
        })

        .state('app.settingsData', {
            url: '/settings/data',

            views: {
                menuContent: {
                    templateUrl: 'templates/settings/data.html',
                    controller: 'Settings'
                }
            }
        });

    }
]);
