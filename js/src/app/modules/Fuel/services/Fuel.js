angular.module('CarGas.Fuel').factory('Fuel', ['$resource', function ($resource) {
    var config = angular.module('CarGas.Config');

    return $resource(config.apiURL + '/fuel/:id', { id: '@_id' });
}]);
