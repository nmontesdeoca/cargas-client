angular.module('CarGas.Config').factory('HttpRequestInterceptor', [
    '$q',
    '$location',
    'Auth',
    function ($q, $location, Auth) {
        return {
            request: function($config) {
                $config.headers['Authorization'] = 'Bearer ' + Auth.getAccessToken();

                return $config;
            }
        };
    }
]);