angular.module('CarGas.User')
.controller('User.Register', [
    '$scope',
    '$http',
    '$location',
    'User',
    'Auth',
    'ResolveAccessToken',
    'API_URL',
    function ($scope, $http, $location, User, Auth, ResolveAccessToken, API_URL) {
        $scope.user = {};

        $scope.error = null;

        $scope.$parent.menuSelected = 'Register';
        $scope.$parent.title = 'Registro';

        $scope.register = function () {
            new User({
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                email: $scope.user.email,
                password: $scope.user.password
            }).$save(function (data) {
                if (data.success !== false) {
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
                } else {
                    $scope.error = data.message || 'Ha ocurrido un error';
                }
            });
        };
    }
]);