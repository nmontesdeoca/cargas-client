angular.module('CarGas.Refuel').factory('Refuel', ['$resource', function ($resource) {
    var config = angular.module('CarGas.Config');

    return $resource(config.apiURL + '/refuel/:id', { id: '@_id' });
}]);
