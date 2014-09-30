angular.module('cars')

.factory('Car', ['Model', 'Utils', function (Model, Utils) {

    var CarModel = Model('cars');

    /**
     * replace the current fuel object with the correct one from the list
     * if the second parameter "id" is present, the correct fuel will be that
     */
    CarModel.prototype.replaceFuel = function () {
        return Utils.replaceFuel.apply(this, arguments);
    };

    return CarModel;
}]);
