angular.module('fuels')

.factory('Fuel', ['model', function (model) {

    return model('fuels');
}]);
