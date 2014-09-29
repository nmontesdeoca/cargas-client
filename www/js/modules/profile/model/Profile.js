angular.module('profile')

.factory('Profile', ['Model', function (Model) {

    return Model('profile', true);
}]);
