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
                                filterConsumptionUnits();
                                // consumption unit selected is not in consumption units displayed
                                if (!($scope.setting.selectedUnits.consumption in $scope.units.consumption)) {
                                    triggerWatch = false;
                                    $scope.setting.selectedUnits.consumption = Object.keys($scope.units.consumption)[0];
                                }
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
            },

            filterConsumptionUnits = function () {
                var consumptionUnits = {};
                $scope.units = _.extend({}, units);
                _.each($scope.units.consumption, function (value, key) {
                    if (value.capacity === $scope.setting.selectedUnits.capacity &&
                            value.distance === $scope.setting.selectedUnits.distance) {
                        consumptionUnits[key] = value;
                    }
                });
                $scope.units.consumption = consumptionUnits;
            };

        $scope.setting = setting;
        filterConsumptionUnits();

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
