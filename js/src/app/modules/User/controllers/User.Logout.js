angular.module('CarGas.User')
.controller('User.Logout', [
    '$scope',
    '$location',
    'Auth',
    function ($scope, $location, Auth) {

        $scope.$parent.menuSelected = 'Logout';

        debugger;
        Auth.clearCredentials();

        // redirect to / when logout will take the user to login page
        $location.url('/');
    }
]);