angular.module('starter')

.controller('Menu', [
    '$scope',
    function ($scope) {

        $scope.menuItems = [{
            iconName: 'stats-bars',
            name: 'Overview',
            link: '#/overview'
        }, {
            iconName: 'person',
            name: 'Profile',
            link: '#/profile'
        }, {
            iconName: 'model-s',
            name: 'Vehicles',
            link: '#/cars'
        }, {
            iconName: 'stats-bars',
            name: 'Fuels',
            link: '#/fuels'
        }, {
            iconName: 'waterdrop',
            name: 'Refuels',
            link: '#/refuels'
        }, {
            iconName: 'stats-bars',
            name: 'Spents',
            link: '#/spents'
        }, {
            iconName: 'gear-a',
            name: 'Settings',
            link: '#/settings'
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
