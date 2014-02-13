angular.module('CarGas.User')
.controller('User.Login', [
    '$scope',
    '$http',
    '$location',
    'Auth',
    'API_URL',
    'ResolveAccessToken',
    function ($scope, $http, $location, Auth, API_URL, ResolveAccessToken) {
        $scope.user = {};
        $scope.error = null;

        $scope.$parent.menuSelected = 'Login';
        $scope.$parent.title = 'Ingreso';

        $scope.login = function () {

            ResolveAccessToken($scope.user.email, $scope.user.password)
                .then(function (response) {
                    $http
                        .post(API_URL + '/login')
                        .then(function (response) {
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
                }
            );
        };
    }
]);