angular.module('CarGas.User')
.controller('User.Register', [
    '$scope',
    '$http',
    '$location',
    'User',
    'Auth',
    function ($scope, $http, $location, User, Auth) {
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
                    Auth.setCredentials($scope.user.email, $scope.user.password);
                    $http.post('/api/login').then(
                        function (user) {
                            $location.url('/');
                        },
                        function () {
                            $location.url('/login');
                        }
                    );
                } else {
                    $scope.error = data.message || 'Ha ocurrido un error';
                }
            });
        };
    }
]);