angular.module('CarGas.User').factory('User', [
    '$rootScope',
    '$resource',
    'API_URL',
    function ($rootScope, $resource, API_URL) {
        return $resource(API_URL + '/user/:id', { id: '@_id' }, {
            getCurrentUser: { method: 'GET', url: API_URL + '/user', isArray: false }
        });
        // { addCar: { method: 'POST', url: '/api/user/:id/cars' } }
    }
])

.service('UserService', function () {
    // used from templates
    var config = angular.module('CarGas.Config');
    config.isLoggedIn = window.localStorage.accessToken;
    alert(config.isLoggedIn);
    return {
        isLoggedIn: config.isLoggedIn
    };
})

.service('ResolveAccessToken', ['$q', '$http', 'Auth', 'API_URL', 'CLIENT_CREDENTIALS',
    function ($q, $http, Auth, API_URL, CLIENT_CREDENTIALS) {

        return function (email, password) {
            var deferred = $q.defer(),
                accessToken = Auth.getAccessToken();

            if (!accessToken) {
                CLIENT_CREDENTIALS.grant_type = 'password';
                CLIENT_CREDENTIALS.username = email;
                CLIENT_CREDENTIALS.password = password;

                $http
                    .post(API_URL + '/oauth/token', CLIENT_CREDENTIALS)
                    .then(function (response) {
                        if (response && response.data) {
                            Auth.setAccessToken(
                                response.data.access_token,
                                response.data.expires_in / 60 / 60 / 24
                            );
                            Auth.setRefreshToken(response.data.refresh_token);
                            deferred.resolve(response.data.access_token);
                        }
                    });
            } else {
                deferred.resolve(accessToken);
            }

            return deferred.promise;
        }
    }
]);
