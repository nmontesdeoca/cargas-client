angular.module('refuels')

.factory('Refuel', ['Model', 'Utils', 'TIME',
    function (Model, Utils, TIME) {

        var RefuelModel = Model('refuels');

        /**
         * Class methods - Static method
         */

        /**
         * return all the refuels grouped by car
         */
        RefuelModel.getRefuelsByCar = function () {
             return _.groupBy(RefuelModel.query(), 'car');
        };

        /**
         * return the total kilometers between all of the cars
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getTotalKilometers = function () {
            var refuelsByCar = RefuelModel.getRefuelsByCar(),
                totalKilometers = 0;

            _.each(refuelsByCar, function (carRefuels) {
                var refuels = _.sortBy(carRefuels, 'date').reverse();
                totalKilometers += (
                    _.first(refuels).overallKilometers - _.last(refuels).overallKilometers
                );
            });

            return totalKilometers;
        };

        /**
         * return the total time between the first and the last refuel
         * the unit used will be the passed by parameter using the constant
         * TIME
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getTotalTime = function (timeUnit) {
            debugger;
            var firstDate = RefuelModel.getFirstRefuel().date,
                lastDate = RefuelModel.getLastRefuel().date,
                milliseconds = lastDate - firstDate;

            switch (timeUnit) {
                case TIME.SECONDS:
                    return Utils.millisecondsToSeconds(milliseconds);
                case TIME.MINUTES:
                    return Utils.millisecondsToMinutes(milliseconds);
                case TIME.HOURS:
                    return Utils.millisecondsToHours(milliseconds);
                case TIME.DAYS:
                    return Utils.millisecondsToDays(milliseconds);
                case TIME.MONTHS:
                    return Utils.millisecondsToMonths(milliseconds);
                case TIME.YEARS:
                    return Utils.millisecondsToYears(milliseconds);
            }

            return milliseconds;
        };

        /**
         * return the spent by year amount
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getSpentByYear = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.YEARS);
        };

        /**
         * return the spent by month amount
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getSpentByMonth = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.MONTHS);
        };

        /**
         * return the spent by day amount
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getSpentByDay = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.DAYS);
        };

        /**
         * return the spent by hour amount
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getSpentByHour = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.HOURS);
        };

        /**
         * return the spent by minute amount
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getSpentByMinute = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.MINUTES);
        };

        /**
         * return the spent by second amount
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getSpentBySecond = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.SECONDS);
        };

        /**
         * return the spent by millisecond amount
         * precondition: RefuelModel.hasRefuels()
         */
        RefuelModel.getSpentByMilisecond = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.MILLISECONDS);
        };

        /**
         * adds each refuel capacity and return the total
         */
        RefuelModel.getTotalCapacity = function () {
            return _.reduce(RefuelModel.query(), function (memo, current) {
                return memo + current.get('capacity');
            }, 0);
        };

        /**
         * adds each refuel amount and return the total spent
         */
        RefuelModel.getTotalSpent = function () {
            return _.reduce(RefuelModel.query(), function (memo, current) {
                return memo + current.get('amount');
            }, 0);
        };

        /**
         * get refuels sort by date
         */
        RefuelModel.getRefuelsSortByDate = function () {
            return _.sortBy(RefuelModel.query(), 'date').reverse();
        };

        /**
         * get the last refuel
         */
        RefuelModel.getLastRefuel = function () {
            return _.first(RefuelModel.getRefuelsSortByDate());
        };

        /**
         * get the first refuel
         */
        RefuelModel.getFirstRefuel = function () {
            return _.last(RefuelModel.getRefuelsSortByDate());
        };

        /**
         * returns true if there is at least one refuel, false otherwise
         */
        RefuelModel.hasRefuels = function () {
            return !!RefuelModel.query().length;
        };

        /**
         * returns refuels by car id
         */
        RefuelModel.getRefuelsByCarId = function (carId) {
            return _.where(RefuelModel.query(), {
                'car': carId
            });
        };

        /**
         * returns the refuels by certain date range
         */
        RefuelModel.getRefuelsByDateRange = function (startDate, endDate) {
            var refuels = _.filter(RefuelModel.query(), function (refuel) {
                // console.log('refuel.date', refuel.date + ' ' + new Date(refuel.date));
                return refuel.date >= startDate && refuel.date <= endDate;
            });

            return refuels;
        };

        /**
         * returns all the refuels by a given month of a certain year
         */
        RefuelModel.getRefuelsByMonth = function (month, year) {
            var refuels = RefuelModel.query();
            refuels = _.filter(refuels, function (refuel) {
                var thisDate = new Date(refuel.date);
                // console.log(thisDate.getYear())
                return thisDate.getMonth() === month &&
                    thisDate.getYear() === year;
            });

            return refuels;
        };

        // /**
        //  * returns total spent by car id
        //  */
        // RefuelModel.getTotalSpentByCarId = function (carId) {
        //     var refuelsByCar = RefuelModel.getRefuelsByCarId(carId);

        //     // practically the same as the getTotalSpent function
        //     return _.reduce(refuelsByCar, function (memo, current) {
        //         return memo + current.get('amount');
        //     }, 0);
        // };

        // *
        //  * returns total gas filled by car id

        // RefuelModel.getTotalCapacityByCarId = function (carId) {
        //     var refuelsByCar = RefuelModel.getRefuelsByCarId(carId);

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
    }
]);
