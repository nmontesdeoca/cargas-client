angular.module('CarGas.User').factory('User', [
    '$rootScope',
    '$resource',
    function ($rootScope, $resource) {
        var config = angular.module('CarGas.Config');

        return $resource(config.apiURL + '/user/:id', { id: '@_id' }, {
            getCurrentUser: { method: 'GET', url: config.apiURL + '/user', isArray: false }
        });
        // { addCar: { method: 'POST', url: '/api/user/:id/cars' } }
    }
]);
