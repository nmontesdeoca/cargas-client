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
    .constant('FUELS', ['Fuel', function (Fuel) {
        return Fuel.query();
    }])
    .constant('REFUEL', ['$route', 'Refuel', function ($route, Refuel) {
        return Refuel.get({ _id: parseInt($route.current.params.id, 10) });
    }])
    .constant('REFUELS', ['Refuel', function (Refuel) {
        return Refuel.query();
    }])
    .constant('USER', ['User', function (User) {
        return new User(User.query());
    }]);