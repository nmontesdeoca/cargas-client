angular.module('settings')

.controller('Settings', [
    '$scope',
    function ($scope) {

        $scope.settings = [{
            name: 'Units',
            link: '#/settings/units',
            state: 'app.settingsUnits'
        }, {
            name: 'Language',
            link: '#/settings/language',
            state: 'app.settingsLanguage'
        }, {
            name: 'Terms and Conditions',
            link: '#/settings/terms-conditions',
            state: 'app.settingsTerms'
        }, {
            name: 'About',
            link: '#/settings/about',
            state: 'app.settingsAbout'
        }, {
            name: 'Help',
            link: '#/settings/help',
            state: 'app.settingsHelp'
        }];

    }
]);
