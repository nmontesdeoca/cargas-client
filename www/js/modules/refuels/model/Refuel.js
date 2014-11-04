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
             return _.groupBy(RefuelModel.getRefuelsSortByDate(), 'car');
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

                /**
                 * we can not use the car.getTotalKilometers() here
                 * because we will need Car as a dependency, but
                 * Car has already Refuel as a dependency
                 */

                totalKilometers += (
                    _.first(refuels).overallKilometers - _.last(refuels).overallKilometers
                );
            });

            return totalKilometers;
        };

        /**
         * returns kilometers by liters for all cars
         */
        RefuelModel.getKilometersByLiter = function () {
            return RefuelModel.getTotalKilometers() / RefuelModel.getTotalCapacityForStats();
        };

        /**
         * returns spent by kilometer for all cars
         */
        RefuelModel.getSpentByKilometer = function () {
            return RefuelModel.getTotalSpentForStats() / RefuelModel.getTotalKilometers();
        };

        /**
         * return the total time between the first and the last refuel
         * the unit used will be the passed by parameter using the constant
         * TIME
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getTotalTime = function (timeUnit) {
            var firstDate = RefuelModel.getFirstRefuel().date,
                lastDate = RefuelModel.getLastRefuel().date;

            return Utils.convertTime(lastDate - firstDate, timeUnit);
        };

        /**
         * return the spent by year amount
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getSpentByYear = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.YEARS);
        };

        /**
         * return the spent by month amount
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getSpentByMonth = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.MONTHS);
        };

        /**
         * return the spent by day amount
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getSpentByDay = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.DAYS);
        };

        /**
         * return the spent by hour amount
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getSpentByHour = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.HOURS);
        };

        /**
         * return the spent by minute amount
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getSpentByMinute = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.MINUTES);
        };

        /**
         * return the spent by second amount
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getSpentBySecond = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.SECONDS);
        };

        /**
         * return the spent by millisecond amount
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getSpentByMilisecond = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getTotalTime(TIME.MILLISECONDS);
        };

        /**
         * adds each refuel capacity and return the total
         */
        RefuelModel.getTotalCapacity = function () {
            return _.reduce(RefuelModel.getRefuelsSortByDate(), function (memo, current) {
                return memo + current.get('capacity');
            }, 0);
        };

        /**
         * adds each refuel capacity and return the total
         * used for some stats, this function doesn't take into account
         * the first refuel of each car
         */
        RefuelModel.getTotalCapacityForStats = function () {
            var refuelsByCar = RefuelModel.getRefuelsByCar(),
                totalCapacity = 0;

            _.each(refuelsByCar, function (carRefuels) {
                var refuels = _.sortBy(carRefuels, 'date').reverse().slice(0, -1);

                totalCapacity = _.reduce(refuels, function (total, refuel) {
                    return total + refuel.capacity;
                }, totalCapacity);
            });

            return totalCapacity;
        };

        /**
         * adds each refuel amount and return the total spent
         */
        RefuelModel.getTotalSpent = function () {
            return _.reduce(RefuelModel.getRefuelsSortByDate(), function (memo, current) {
                return memo + current.get('amount');
            }, 0);
        };

        /**
         * adds each refuel amount and return the total spent
         * used for some stats, this function doesn't take into account
         * the first refuel of each car
         */
        RefuelModel.getTotalSpentForStats = function () {
            var refuelsByCar = RefuelModel.getRefuelsByCar(),
                totalSpent = 0;

            _.each(refuelsByCar, function (carRefuels) {
                var refuels = _.sortBy(carRefuels, 'date').reverse().slice(0, -1);

                totalSpent = _.reduce(refuels, function (total, refuel) {
                    return total + refuel.amount;
                }, totalSpent);
            });

            return totalSpent;
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
         * returns true if there is at least two refuels, false otherwise
         */
        RefuelModel.hasMoreThanOneRefuel = function () {
            return RefuelModel.query().length > 1;
        };

        /**
         * returns refuels by car id
         */
        RefuelModel.getRefuelsByCarId = function (carId) {
            return _.where(RefuelModel.query(), {
                car: carId
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

        /**
         * returns the average timestamp between refuels
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getAverageTimeBetweenRefuels = function () {
            return Utils.getAverageTimeBetweenRefuels(RefuelModel.getRefuelsSortByDate());
        };

        /**
         * returns the average distance between refuels
         * precondition: RefuelModel.hasMoreThanOneRefuel()
         */
        RefuelModel.getAverageDistanceBetweenRefuels = function () {
            var refuelsByCar = RefuelModel.getRefuelsByCar(),
                distance = 0,
                count = 0;

            _.each(refuelsByCar, function (carRefuels) {
                if (carRefuels.length > 1) {
                    distance += Utils.getAverageDistanceBetweenRefuels(carRefuels);
                    count++;
                }
            });

            return distance / count;
        };

        /**
         * returns the number of refuels for all cars
         */
        RefuelModel.getRefuelsCount = function () {
            return RefuelModel.getRefuelsSortByDate().length;
        };

        /**
         * returns the average capacity of refuels for a car
         */
        RefuelModel.getAverageCapacity = function () {
            return RefuelModel.getTotalCapacity() / RefuelModel.getRefuelsCount();
        };

        /**
         * returns the average spent of refuels for a car
         */
        RefuelModel.getAverageSpent = function () {
            return RefuelModel.getTotalSpent() / RefuelModel.getRefuelsCount();
        };

        /**
         * get the total capacity between two refuels
         */
        RefuelModel.getCapacityBetweenRefuels = function (firstRefuel, lastRefuel) {
            var refuel = firstRefuel.getNextRefuel(),
                capacity = 0;

            capacity += refuel ? refuel.capacity : 0;

            while (refuel && refuel._id !== lastRefuel._id) {
                refuel = refuel.getNextRefuel();
                capacity += refuel ? refuel.capacity : 0;
            }

            return capacity;
        };

        RefuelModel.changeUnits = function (unit, newValue, oldValue) {
            var units = Utils.getUnits(unit),
                baseUnit = _.findWhere(units, {
                    ratio: 1
                }),
                refuels = RefuelModel.query();
            _.each(refuels, function (refuel) {
                refuel.changeUnit({
                    unit: unit,
                    newUnit: units[newValue],
                    oldUnit: units[oldValue],
                    baseUnit: baseUnit
                });
            });
        };

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
         *  f***cking preconditions
         */
        RefuelModel.prototype.getPreviousRefuel = function () {
            var index = 0,
                refuel,
                condition,
                currentDateTime = new Date(this.date).getTime(),
                carId = typeof this.car === 'object' ?
                    this.car._id.toString() : this.car,
                refuels = _.sortBy(
                    RefuelModel.getRefuelsByCarId(carId),
                    'date'
                ).reverse();

            do {
                refuel = refuels[index];
                condition = refuel && currentDateTime <= refuel.date;
                condition && index++;
            } while (condition);

            return refuels[index];
        };

        /**
         * get previous refuel that is no partial
         */
        RefuelModel.prototype.getPreviousRefuelNoPartial = function () {
            var previousRefuel = this;

            do {
                previousRefuel = previousRefuel.getPreviousRefuel();
            } while (previousRefuel && previousRefuel.partial);

            return previousRefuel;
        };

        /**
         * get next refuel
         * preconditions:
         *  there is one refuel at least and the current refuel is not the last
         *  RefuelModel.hasRefuels() && this._id !== RefuelModel.getLastRefuel()._id
         *  f***cking preconditions
         */
        RefuelModel.prototype.getNextRefuel = function () {
            var index = 0,
                refuel,
                condition,
                currentDateTime = new Date(this.date).getTime() + (23 * 60 * 60 * 1000),
                carId = typeof this.car === 'object' ?
                    this.car._id.toString() : this.car,
                refuels = _.sortBy(
                    RefuelModel.getRefuelsByCarId(carId),
                    'date'
                );

            do {
                refuel = refuels[index];
                condition = refuel && currentDateTime > refuel.date;
                condition && index++;
            } while (condition);

            return refuels[index];
        };

        RefuelModel.prototype.changeUnit = function (param) {
            // consumption should be updated too
            if (param.unit === 'capacity') {
                // capacity
                if (param.newUnit.ratio === 1 || param.oldUnit.ratio !== 1) {
                    this.capacity = Number((this.capacity * param.oldUnit.ratio / param.newUnit.ratio).toFixed(3));
                } else if (param.oldUnit.ratio === 1) {
                    this.capacity = Number((this.capacity / param.newUnit.ratio).toFixed(3));
                }
            } else if (param.unit === 'distance') {
                // distance and overallKilometers
                if (param.newUnit.ratio === 1 || param.oldUnit.ratio !== 1) {
                    this.distance = Number((this.distance * param.oldUnit.ratio / param.newUnit.ratio).toFixed(3));
                    this.overallKilometers = Number((this.overallKilometers * param.oldUnit.ratio / param.newUnit.ratio).toFixed(3));
                } else if (param.oldUnit.ratio === 1) {
                    this.distance = Number((this.distance / param.newUnit.ratio).toFixed(3));
                    this.overallKilometers = Number((this.overallKilometers / param.newUnit.ratio).toFixed(3));
                }
            }
            this.$save();
        };

        return RefuelModel;
    }
]);
