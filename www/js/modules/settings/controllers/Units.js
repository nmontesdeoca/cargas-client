angular.module('settings')

.controller('Units', [
    '$scope',
    '$ionicPopup',
    '$filter',
    'setting',
    'units',
    'Refuel',
    function ($scope, $ionicPopup, $filter, setting, units, Refuel) {

        var triggerWatch = true,
            changeUnit = function (newValue, oldValue, unit) {
                if (triggerWatch && newValue && newValue !== oldValue) {
                    $ionicPopup.confirm({
                        title: $filter('translate')('CHANGE_' + unit.toUpperCase()),
                        template: $filter('translate')('CHANGE_UNIT_MSG')
                    }).then(function (yes) {
                        if (yes) {
                            if (unit === 'distance' || unit === 'capacity') {
                                Refuel.changeUnits(unit, newValue, oldValue);
                            }
                            $scope.setting.$save();
                        } else {
                            triggerWatch = false;
                            // set the previous unit again
                            $scope.setting.selectedUnits[unit] = oldValue;
                        }
                    });
                } else if (!triggerWatch) {
                    triggerWatch = true;
                }
            };

        $scope.units = units;
        $scope.setting = setting;

        $scope.$watch('setting.selectedUnits.capacity', function (newCapacity, oldCapacity) {
            changeUnit(newCapacity, oldCapacity, 'capacity');
        });

        $scope.$watch('setting.selectedUnits.distance', function (newDistance, oldDistance) {
            changeUnit(newDistance, oldDistance, 'distance');
        });

        $scope.$watch('setting.selectedUnits.consumption', function (newConsumption, oldConsumption) {
            changeUnit(newConsumption, oldConsumption, 'consumption');
        });
    }
]);
