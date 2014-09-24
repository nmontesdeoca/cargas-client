angular.module('starter')

.controller('Menu', [
    '$scope',
    function ($scope) {

        $scope.menuItems = [{
            name: 'Overview',
            link: '#/overview'
        },
        {
            name: 'Profile',
            link: '#/profile'
        },
        {
            name: 'Vehicles',
            link: '#/cars'
        },
        {
            name: 'Fuels',
            link: '#/fuels'
        },
        {
            name: 'Refuels',
            link: '#/refuels'
        },
        {
            name: 'Spents',
            link: '#/spents'
        },
        {
            name: 'Settings',
            link: '#/settings'
        }];

    }
]);
