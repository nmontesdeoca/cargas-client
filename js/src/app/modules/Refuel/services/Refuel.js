angular.module('CarGas.Refuel').factory('Refuel', ['$resource', 'API_URL',
    function ($resource, API_URL) {
        return $resource(API_URL + '/refuel/:id', { id: '@_id' });
    }
]);
