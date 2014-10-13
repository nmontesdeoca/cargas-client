angular.module('settings')

.controller('Settings', [
    '$scope',
    'UnitsService',
    function ($scope, UnitsService) {
        $scope.capacityUnits = UnitsService.getCapacityUnits();
        $scope.selectedCapacity = UnitsService.getSelectedCapacity();

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


        //units
        $scope.$watch('selectedCapacity', function(newCapacityUnit) {
            UnitsService.setCapacityUnit(newCapacityUnit);
        });

        $scope.setCapacityUnit = function (unit) {
            $scope.selectedCapacity = unit;
        };

        $scope.isSelectedCapacityUnit = function(unit) {
            return $scope.selectedCapacity === unit;
        };
    }
]);
