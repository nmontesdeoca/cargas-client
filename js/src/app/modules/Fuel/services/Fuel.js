angular.module('CarGas.Fuel').factory('Fuel', ['$resource', 'API_URL',
    function ($resource, API_URL) {
        return $resource(API_URL + '/fuel/:id', { id: '@_id' });
    }
]);
