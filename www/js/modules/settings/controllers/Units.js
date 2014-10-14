angular.module('settings')

.controller('Units', [
    '$scope',
    'Utils',
    'setting',
    function ($scope, Utils, setting) {
        $scope.units = Utils.getUnits();
        // $scope.selectedCapacity = UnitsService.getSelectedCapacity();
        $scope.setting = setting;

        $scope.setUnit = function (typeOfUnit, unitId) {
            $scope.setting.selectedUnits[typeOfUnit] = unitId;
            $scope.setting.$save();
        };

        $scope.isSelectedUnit = function(typeOfUnit, unitId) {
            return $scope.setting.selectedUnits[typeOfUnit] === unitId;
        };
    }
]);
