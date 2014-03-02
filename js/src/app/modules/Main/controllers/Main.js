angular.module('CarGas.Main')
.controller('Main', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $rootScope.menuSelected = 'Home';

    $rootScope.tabs = [
        {
            menu: 'Home',
            href: '/',
            text: 'Inicio',
            icon: 'fa-briefcase'
        },
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
        }
    ];

    angular.extend($rootScope, {
        _addClass: function (el, className) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },

        _hasClass: function (el, className) {
            if (el.classList) {
                return el.classList.contains(className);
            }
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        },

        _removeClass: function (el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(
                    new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
                    ' '
                );
            }
        },

        showMenu: function () {
            $rootScope._addClass(document.body, 'menu-active');
        },

        hideMenu: function () {
            $rootScope._removeClass(document.body, 'menu-active');
        },

        toggleMenu: function () {
            var body = document.body;

            if ($rootScope._hasClass(body, 'menu-active')) {
                $rootScope._removeClass(body, 'menu-active');
            } else {
                $rootScope._addClass(body, 'menu-active');
            }
        }
    });

}]);