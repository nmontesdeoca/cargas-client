angular.module('CarGas.Config').factory('HttpRequestInterceptor', [
    '$q',
    '$location',
    'Auth',
    function ($q, $location, Auth) {
        return {
            request: function($config) {
                $config.headers['Authorization'] = 'Bearer ' + Auth.getAccessToken();

                return $config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/login');
                    // we need to check if the refresh token is valid and get the refreshed token.
                }
                return $q.reject(rejection);
            }
        };
    }
]);