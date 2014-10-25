angular.module('settings')

.controller('Settings', [
    '$scope',
    '$filter',
    function ($scope, $filter) {

        $scope.settings = [{
            name: $filter('translate')('FUELS'),
            link: '#/fuels',
            state: 'app.fuelList'
        }, {
            name: $filter('translate')('UNITS'),
            link: '#/settings/units',
            state: 'app.settingsUnits'
        }, {
            name: $filter('translate')('LANGUAGE'),
            link: '#/settings/language',
            state: 'app.settingsLanguage'
        }, {
            name: $filter('translate')('ABOUT'),
            link: '#/settings/about',
            state: 'app.settingsAbout'
        }, {
            name: $filter('translate')('HELP'),
            link: '#/settings/help',
            state: 'app.settingsHelp'
        }];
    }
]);
