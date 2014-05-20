angular.module('CarGas.Main')
.controller('Main', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $rootScope.menuSelected = 'Home';

    $rootScope.tabs = [
        {
            menu: 'Home',
            href: '/',
            text: 'Cuenta',
            icon: 'fa-briefcase'
        },
        {
            menu: 'Refuel',
            href: '/refuel',
            text: 'Recargar',
            icon: 'fa-plus'
        },
        {
            menu: 'Refuels',
            href: '/refuels',
            text: 'Recargas',
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

        showMenu: function (menu) {
            (menu || angular.element(document.querySelector('[slide-menu]')))
                .css('webkitTransform', 'translate(258px)');
        },

        hideMenu: function (menu) {
            (menu || angular.element(document.querySelector('[slide-menu]')))
                .css('webkitTransform', 'translate(0px)');
        },

        toggleMenu: function (e) {
            e.preventDefault();
            var menu = angular.element(document.querySelector('[slide-menu]')),
                lastPosition = parseInt((menu.css('webkitTransform').match(/\d+/) || ["0"])[0], 10);

            if (lastPosition) {
                $rootScope.hideMenu(menu);
            } else {
                $rootScope.showMenu(menu);
            }
        }
    });

}]);
