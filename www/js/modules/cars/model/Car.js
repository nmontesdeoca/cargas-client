angular.module('cars')

.factory('Car', ['model', 'utils', 'Refuel', function (model, utils, Refuel) {

    var CarModel = model('cars');

    /**
     * replace the current fuel object with the correct one from the list
     * if the second parameter "id" is present, the correct fuel will be that
     */
    CarModel.prototype.replaceFuel = function () {
        return utils.replaceFuel.apply(this, arguments);
    };

    /*
	* returns the refuels of the instantiated car
    */
    CarModel.prototype.getRefuels = function() {
    	var refuels = this.refuels? this.refuels : Refuel.query();
        return _.where(refuels, {'car': this._id.toString()});
    }

    /*
	* returns total money spent in refuels for a car
    */
    CarModel.prototype.getTotalSpent = function() {
        var refuels = this.getRefuels();

        return _.reduce(refuels, function (memo, current) {
            return memo + current.get('amount');
        }, 0);
    };

    /*
	* returns total capacity spent in refuels for a car
    */
    CarModel.prototype.getTotalCapacity = function() {
        var refuels = this.getRefuels();
        // practically the same as the getTotalSpent function
        return _.reduce(refuels, function (memo, current) {
            return memo + current.get('capacity');
        }, 0);
    };

    /*
	* returns the refuels of the car by a given month of a certain year
    */
    CarModel.prototype.getRefuelsByMonth = function(month, year) {
        var refuels = Refuel.getRefuelsByMonth(month, year);
        // practically the same as the getTotalSpent function
        return _.where(refuels, {'car': this._id.toString()});
    };

    /*
	* get refueled cars (cars that have at least one refuel)
    */
    CarModel.getRefueledCars = function(){
        var cars = this.query();

        return _.filter(cars, function(car) {
            return car.getRefuels().length > 0;
        });
    };

    return CarModel;
}]);
