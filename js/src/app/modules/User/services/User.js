angular.module('CarGas.User').factory('User', [
    '$rootScope',
    '$resource',
    'Model',
    'API_URL',
    function ($rootScope, $resource, Model, API_URL) {
        return Model('user', true);
        /*
        return $resource(API_URL + '/user/:id', { id: '@_id' }, {
            getCurrentUser: { method: 'GET', url: API_URL + '/user', isArray: false }
        });
        // { addCar: { method: 'POST', url: '/api/user/:id/cars' } }
        */
    }
]);