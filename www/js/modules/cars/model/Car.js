angular.module('cars')

.factory('Car', ['Model', 'Utils', 'Refuel',
    function (Model, Utils, Refuel) {

        var CarModel = Model('cars');

        /**
         * replace the current fuel object with the correct one from the list
         * if the second parameter "id" is present, the correct fuel will be that
         */
        CarModel.prototype.replaceFuel = function () {
            return Utils.replaceFuel.apply(this, arguments);
        };

        /*
    	* returns the refuels of the instantiated car sort by date
        */
        CarModel.prototype.getRefuels = function() {
        	var refuels = this.refuels ? this.refuels : Refuel.getRefuelsSortByDate();

            return _.where(refuels, {
                car: this._id.toString()
            });
        };

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
        * returns the complete name of the car: make + model
        */
        CarModel.prototype.getName = function() {
            return this.make + " " + this.model;
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
    }
]);
