angular.module('CarGas.Main')
.controller('Main', ['$rootScope', function ($rootScope) {
    $rootScope.menuSelected = 'Home';

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
}]);