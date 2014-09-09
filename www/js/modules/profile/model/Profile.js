angular.module('profile')

.factory('Profile', ['model', function (model) {

    return model('profile', true);
}]);
