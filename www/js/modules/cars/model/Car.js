angular.module('cars')

.factory('Car', ['model', function (model) {

    var CarModel = model('cars');

    /**
     * replace the current fuel object with the correct one from the list
     * if the second parameter "id" is present, the correct fuel will be that
     */
    CarModel.prototype.replaceFuel = function (fuels, id) {
        this.fuel = this.fuel ? _.findWhere(fuels, {
            _id: (id || this.fuel._id)
        }) : '';
    };

    return CarModel;
}]);
