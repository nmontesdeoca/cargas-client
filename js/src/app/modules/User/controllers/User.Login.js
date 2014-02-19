angular.module('CarGas.User')
.controller('User.Login', [
    '$scope',
    '$http',
    '$location',
    'Auth',
    'API_URL',
    'ResolveAccessToken',
    'Fuel',
    function ($scope, $http, $location, Auth, API_URL, ResolveAccessToken, Fuel) {
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
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        },
                        function () {
                            // debugger;
                            // clear credentials
                            Auth.clearCredentials();
                            $location.url('/login');
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        });

                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
            );
        };
    }
]);