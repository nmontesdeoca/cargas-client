angular.module('profile')

.controller('Profile', [
    '$scope',
    '$ionicPopup',
    'Profile',
    function ($scope, $ionicPopup, Profile) {

    $scope.profile = new Profile(Profile.query());

    $scope.save = function () {
        $scope.profile.$save(function () {
            $ionicPopup.alert({
                title: 'Profile',
                template: 'Successfully saved.'
            });
        });
    };

}]);
