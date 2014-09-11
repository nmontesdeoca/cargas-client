angular.module('spents')

.factory('Spent', ['model', function (model) {

    return model('spents');
}]);
