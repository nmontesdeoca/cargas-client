angular.module('refuels')

.factory('Refuel', ['Model', 'Utils', function (Model, Utils) {

    var RefuelModel = Model('refuels');

    /**
     * Class methods - Static method
     */

    /**
     * return the total kilometers (last refuel kms - first refuel kms)
     */
    RefuelModel.getTotalKilometers = function () {
        return this.getLastRefuel().overallKilometers - this.getFirstRefuel().overallKilometers;
    };

    /**
     * adds each refuel capacity and return the total
     */
    RefuelModel.getTotalCapacity = function () {
        return _.reduce(this.query(), function (memo, current) {
            return memo + current.get('capacity');
        }, 0);
    };

    /**
     * adds each refuel amount and return the total spent
     */
    RefuelModel.getTotalSpent = function () {
        return _.reduce(this.query(), function (memo, current) {
            return memo + current.get('amount');
        }, 0);
    };

    /**
     * get refuels sort by date
     */
    RefuelModel.getRefuelsSortByDate = function () {
        return _.sortBy(this.query(), 'date').reverse();
    };

    /**
     * get the last refuel
     */
    RefuelModel.getLastRefuel = function () {
        return _.first(this.getRefuelsSortByDate());
    };

    /**
     * get the first refuel
     */
    RefuelModel.getFirstRefuel = function () {
        return _.last(this.getRefuelsSortByDate());
    };

    /**
     * returns true if there is at least one refuel, false otherwise
     */
    RefuelModel.hasRefuels = function () {
        return !!this.query().length;
    };

    /**
     * returns refuels by car id
     */
    RefuelModel.getRefuelsByCarId = function (carId) {
        return _.where(this.query(), {'car': carId});
    };

    // /**
    //  * returns total spent by car id
    //  */
    // RefuelModel.getTotalSpentByCarId = function (carId) {
    //     var refuelsByCar = this.getRefuelsByCarId(carId);

    //     // practically the same as the getTotalSpent function
    //     return _.reduce(refuelsByCar, function (memo, current) {
    //         return memo + current.get('amount');
    //     }, 0);
    // };

    // *
    //  * returns total gas filled by car id

    // RefuelModel.getTotalCapacityByCarId = function (carId) {
    //     var refuelsByCar = this.getRefuelsByCarId(carId);

    //     // practically the same as the getTotalCapacity function
    //     return _.reduce(refuelsByCar, function (memo, current) {
    //         return memo + current.get('capacity');
    //     }, 0);
    // };

    /**
     * Instance methods
     */

    /**
     * replace the current fuel object with the correct one from the list
     * if the second parameter "id" is present, the correct fuel will be that
     */
    RefuelModel.prototype.replaceFuel = function () {
        return Utils.replaceFuel.apply(this, arguments);
    };

    /**
     * get previous refuel
     * preconditions:
     *  there is one refuel at least and the current refuel is not the first
     *  RefuelModel.hasRefuels() && this._id !== RefuelModel.getFirstRefuel()._id
     */
    RefuelModel.prototype.getPreviousRefuel = function () {
        var index,
            self = this,
            refuels = RefuelModel.getRefuelsSortByDate();

        _.find(refuels, function (refuel, _index) {
            // _index + 1 because _index is the index of the current refuel,
            // and we want the next one
            index = _index + 1;
            return self._id === refuel._id;
        });

        return refuels[index];
    };

    return RefuelModel;
}]);
