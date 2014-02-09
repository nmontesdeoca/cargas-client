angular.module('CarGas.User')
.controller('User.Login', [
    '$scope',
    '$http',
    '$location',
    '$rootScope',
    'Auth',
    function ($scope, $http, $location, $rootScope, Auth) {
        $scope.user = {};
        $rootScope.error = null;

        $scope.$parent.menuSelected = 'Login';
        $scope.$parent.title = 'Ingreso';

        $scope.login = function () {
            Auth.setCredentials($scope.user.email, $scope.user.password);

            $http
                .post(angular.module('CarGas.Config').apiURL + '/login')
                .then(function (response) {
                    debugger;
                    if (response && response.data) {
                        if (response.data.authenticated) {
                            $location.url('/');
                        } else {
                            $rootScope.error = 'Email o contraseña incorrecta';
                        }
                    } else {
                        $rootScope.error = 'Pasó algo!';
                    }
                },
                function () {
                    debugger;
                    $location.url('/login');
                });

        };
    }
]);