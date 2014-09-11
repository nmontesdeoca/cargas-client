angular.module('cars')

.factory('Car', ['model', function (model) {

    return model('cars');
}]);
