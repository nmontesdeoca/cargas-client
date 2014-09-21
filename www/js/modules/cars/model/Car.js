angular.module('cars')

.factory('Car', ['model', 'utils', function (model, utils) {

    var CarModel = model('cars');

    /**
     * replace the current fuel object with the correct one from the list
     * if the second parameter "id" is present, the correct fuel will be that
     */
    CarModel.prototype.replaceFuel = function () {
        return utils.replaceFuel.apply(this, arguments);
    };

    return CarModel;
}]);
