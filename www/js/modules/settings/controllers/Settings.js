angular.module('settings')

.controller('Settings', [
    '$scope',
    function ($scope) {

        $scope.settings = [{
            name: 'Units',
            link: '#/settings/units'
        },
        {
            name: 'Language',
            link: '#/settings/language'
        },
        {
            name: 'Terms and Conditions',
            link: '#/settings/terms-conditions'
        },
        {
            name: 'About',
            link: '#/settings/about'
        }];

    }
]);
