angular.module('settings')

.controller('Settings', [
    '$scope',
    '$filter',
    'LocalStorage',
    function ($scope, $filter, LocalStorage) {

        $scope.data = {
            exportdata: JSON.stringify({
                cars: LocalStorage.get('cars'),
                fuels: LocalStorage.get('fuels'),
                profile: LocalStorage.get('profile') || '',
                refuels: LocalStorage.get('refuels'),
                settings: LocalStorage.get('settings')
            })
        };

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
            name: $filter('translate')('HELP'),
            link: '#/intro',
            state: 'intro'
        }, {
            name: $filter('translate')('DATA'),
            link: '#/settings/data',
            state: 'app.settingsData'
        }];

        $scope.import = function () {
            var data = JSON.parse($scope.data.importdata);

            if (data) {
                LocalStorage.set('cars', data.cars);
                LocalStorage.set('fuels', data.fuels);
                LocalStorage.set('profile', data.profile);
                LocalStorage.set('refuels', data.refuels);
                LocalStorage.set('settings', data.settings);
            }
        };
    }
]);
