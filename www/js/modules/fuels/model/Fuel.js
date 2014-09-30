angular.module('fuels')

.factory('Fuel', ['Model', function (Model) {

    return Model('fuels');
}]);
