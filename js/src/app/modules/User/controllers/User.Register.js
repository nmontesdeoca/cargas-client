angular.module('CarGas.User')
.controller('User.Register', [
    '$scope',
    '$http',
    '$location',
    'User',
    function ($scope, $http, $location, User) {
        $scope.user = {};

        $scope.$parent.menuSelected = 'Register';
        $scope.$parent.title = 'Registro';

        $scope.register = function () {
            new User({
                firstName: $scope.user.firstName,
                lastName: $scope.user.lastName,
                email: $scope.user.email,
                password: $scope.user.password
            }).$save(function () {
                $http.post('/api/login', {
                    email: $scope.user.email,
                    password: $scope.user.password
                }).then(
                    function (user) {
                        $location.url('/');
                    },
                    function () {
                        $location.url('/login');
                    }
                );
            });
        };
    }
]);