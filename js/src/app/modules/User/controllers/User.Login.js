angular.module('CarGas.User')
.controller('User.Login', [
    '$scope',
    '$http',
    '$location',
    'Auth',
    function ($scope, $http, $location, Auth) {
        $scope.user = {};
        $scope.error = null;

        $scope.$parent.menuSelected = 'Login';
        $scope.$parent.title = 'Ingreso';

        $scope.login = function () {

            Auth.setCredentials($scope.user.email, $scope.user.password);

            $http
                .post(angular.module('CarGas.Config').apiURL + '/login')
                .then(function (response) {
                    // debugger;
                    if (response && response.data) {
                        if (response.data.authenticated) {
                            $location.url('/');
                        } else {
                            // clear credentials
                            Auth.clearCredentials();
                            $scope.error = 'Email o contraseña incorrecta';
                        }
                    } else {
                        // clear credentials
                        Auth.clearCredentials();
                        $scope.error = 'Pasó algo!';
                    }
                },
                function () {
                    // debugger;
                    // clear credentials
                    Auth.clearCredentials();
                    $location.url('/login');
                });

        };
    }
]);