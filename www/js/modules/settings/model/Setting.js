angular.module('settings')

.factory('Setting', ['model', function (model) {

    return model('settings');
}]);
