angular.module('profile')

.controller('Profile', [
    '$scope',
    '$ionicPopup',
    'profile',
    function ($scope, $ionicPopup, profile) {

        if (window.analytics) {
            window.analytics.trackView('Profile');
        }

        $scope.profile = profile;

        $scope.save = function () {
            $scope.profile.$save(function () {
                $ionicPopup.alert({
                    title: 'Profile',
                    template: 'Successfully saved.'
                });
            });
        };
    }
]);
