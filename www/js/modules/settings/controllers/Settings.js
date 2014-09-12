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
            name: 'Setting 2',
            link: '#/settings/2'
        },
        {
            name: 'Setting n',
            link: '#/settings/n'
        }];

}]);
