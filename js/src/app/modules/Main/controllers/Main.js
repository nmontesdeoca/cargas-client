angular.module('CarGas.Main')
.controller('Main', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $rootScope.menuSelected = 'Home';

    alert(window.localStorage.test);
    window.localStorage.test = 'testing';
    alert(window.localStorage.test);

    $rootScope.tabs = [
        {
            menu: 'Account',
            href: '/account',
            text: 'Mi Cuenta',
            icon: 'fa-briefcase'
        },
        {
            menu: 'Refuel',
            href: '/refuel',
            text: 'Cargar',
            icon: 'fa-plus'
        },
        {
            menu: 'Refuels',
            href: '/refuels',
            text: 'Listar',
            icon: 'fa-archive'
        },
        {
            menu: 'Logout',
            href: '/logout',
            text: 'Salir',
            icon: 'fa-power-off'
        }
    ];

    $scope.menuToogle = function () {
        var body = document.body;

        if (~body.className.indexOf('menu-active')) {
            body.className = body.className.replace('menu-active', '');
        } else {
            body.className += ' menu-active';
        }
    };
}]);