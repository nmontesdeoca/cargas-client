angular.module('CarGas.Config', [])

    .constant('CLIENT_CREDENTIALS', {
        // we need to use _ instead of camelCase
        client_id: 'angular',
        client_secret: 'angular'
    })
    .constant('API_URL', (function () {
        return ~location.href.indexOf('localhost') ?
            'http://localhost:3000' :
            'http://cargas-server.herokuapp.com';
    })())
    .constant('FUELS', ['$location', 'Fuel', 'UserService',
        function ($location, Fuel, UserService) {
            if (!UserService.isLoggedIn) {
                return $location.path('/login');
            }
            return Fuel.query();
        }
    ])
    .constant('REFUEL', ['$route', '$location', 'Refuel', 'UserService',
        function ($route, $location, Refuel, UserService) {
            if (!UserService.isLoggedIn) {
                return $location.path('/login');
            }
            return Refuel.get({ id: $route.current.params.id });
        }
    ])
    .constant('REFUELS', ['Refuel', '$location', 'UserService',
        function (Refuel, $location, UserService) {
            if (!UserService.isLoggedIn) {
                return $location.path('/login');
            }
            return Refuel.query();
        }
    ])
    .constant('USER', ['User', 'UserService', function (User, UserService) {
        if (UserService.isLoggedIn) {
            return User.getCurrentUser();
        }
    }])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('HttpRequestInterceptor');
    }]);