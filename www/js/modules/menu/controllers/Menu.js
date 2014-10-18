angular.module('starter')

.controller('Menu', [
    '$scope',
    '$filter',
    function ($scope, $filter) {

        $scope.menuItems = [{
            iconName: 'stats-bars',
            name: $filter('translate')('OVERVIEW'),
            link: '#/overview',
            state: 'app.overview'
        },/* {
            iconName: 'person',
            name: $filter('translate')('PROFILE'),
            link: '#/profile',
            state: 'app.profile'
        },*/ {
            iconName: 'model-s',
            name: $filter('translate')('VEHICLES'),
            link: '#/cars',
            state: 'app.carList'
        }, {
            iconName: 'stats-bars',
            name: $filter('translate')('FUELS'),
            link: '#/fuels',
            state: 'app.fuelList'
        }, {
            iconName: 'waterdrop',
            name: $filter('translate')('REFUELS'),
            link: '#/refuels',
            state: 'app.refuelList'
        }, {
            iconName: 'stats-bars',
            name: $filter('translate')('STATS'),
            link: '#/stats',
            state: 'app.stats'
        }, {
            iconName: 'gear-a',
            name: $filter('translate')('SETTINGS'),
            link: '#/settings',
            state: 'app.settingsList'
        }];

    }
]);
