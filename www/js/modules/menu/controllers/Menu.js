angular.module('starter')

.controller('Menu', [
    '$scope',
    function ($scope) {

        $scope.menuItems = [{
            iconName: 'stats-bars',
            name: 'Overview',
            link: '#/overview',
            state: 'app.overview'
        }, {
            iconName: 'person',
            name: 'Profile',
            link: '#/profile',
            state: 'app.profile'
        }, {
            iconName: 'model-s',
            name: 'Vehicles',
            link: '#/cars',
            state: 'app.carList'
        }, {
            iconName: 'stats-bars',
            name: 'Fuels',
            link: '#/fuels',
            state: 'app.fuelList'
        }, {
            iconName: 'waterdrop',
            name: 'Refuels',
            link: '#/refuels',
            state: 'app.refuelList'
        }, {
            iconName: 'stats-bars',
            name: 'Spents',
            link: '#/spents',
            state: 'app.spents'
        }, {
            iconName: 'gear-a',
            name: 'Settings',
            link: '#/settings',
            state: 'app.settingsList'
        }
        // ,
        // {
        //     iconName: 'stats-bars',
        //     name: 'Stats',
        //     link: '#/stats'
        // }
        ];

    }
]);
