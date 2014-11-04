angular.module('cars')

.factory('Car', ['Model', 'Utils', 'Refuel', 'TIME',
    function (Model, Utils, Refuel, TIME) {

        var CarModel = Model('cars');

        /**
         * Class methods - Static method
         */

        /*
         * get refueled cars (cars that have at least one refuel)
         */
        CarModel.getRefueledCars = function () {
            var cars = CarModel.query();

            return _.filter(cars, function (car) {
                return car.getRefuels().length > 0;
            });
        };

        /**
         * Instance methods
         */

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
        CarModel.prototype.getRefuels = function () {
            var refuels = this.refuels ? this.refuels : Refuel.getRefuelsSortByDate();

            return _.where(refuels, {
                car: this._id.toString()
            });
        };

        /*
         * returns total money spent in refuels for a car
         */
        CarModel.prototype.getTotalSpent = function () {
            var refuels = this.getRefuels();

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('amount');
            }, 0);
        };

        /*
         * returns total money spent in refuels for a car for stats
         * doesn't take into account the first refuel made
         */
        CarModel.prototype.getTotalSpentForStats = function () {
            var refuels = this.getRefuels().slice(0, -1);

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('amount');
            }, 0);
        };

        /**
         * returns true if the car has been refueled, false in other case
         */
        CarModel.prototype.hasRefuels = function () {
            return !!this.getRefuels().length;
        };

        /**
         * returns true if the car has been refueled more than one time, false in other case
         */
        CarModel.prototype.hasMoreThanOneRefuel = function () {
            return this.getRefuels().length > 1;
        };

        /**
         * return the first refuel for a car
         * precondition: this.hasRefuels()
         */
        CarModel.prototype.getFirstRefuel = function () {
            return _.last(this.getRefuels());
        };

        /**
         * return the last refuel for a car
         * precondition: this.hasRefuels()
         */
        CarModel.prototype.getLastRefuel = function () {
            return _.first(this.getRefuels());
        };


        /**
         * return the total time between the first and the last refuel for a car
         * the unit used will be the passed by parameter using the constant
         * TIME
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getTotalTime = function (timeUnit) {
            var firstDate = this.getFirstRefuel().date,
                lastDate = this.getLastRefuel().date;

            return Utils.convertTime(lastDate - firstDate, timeUnit);
        };

        /**
         * return the spent by year amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentByYear = function () {
            return this.getTotalSpent() / this.getTotalTime(TIME.YEARS);
        };

        /**
         * return the spent by month amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentByMonth = function () {
            return this.getTotalSpent() / this.getTotalTime(TIME.MONTHS);
        };

        /**
         * return the spent by day amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentByDay = function () {
            return this.getTotalSpent() / this.getTotalTime(TIME.DAYS);
        };

        /**
         * return the spent by hour amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentByHour = function () {
            return this.getTotalSpent() / this.getTotalTime(TIME.HOURS);
        };

        /**
         * return the spent by minute amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentByMinute = function () {
            return this.getTotalSpent() / this.getTotalTime(TIME.MINUTES);
        };

        /**
         * return the spent by second amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentBySecond = function () {
            return this.getTotalSpent() / this.getTotalTime(TIME.SECONDS);
        };

        /**
         * return the spent by millisecond amount in refuels for  car
         * precondition: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentByMilisecond = function () {
            return this.getTotalSpent() / this.getTotalTime(TIME.MILLISECONDS);
        };

        /*
         * returns total capacity spent in refuels for a car
         */
        CarModel.prototype.getTotalCapacity = function () {
            var refuels = this.getRefuels();

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('capacity');
            }, 0);
        };

        /*
         * returns total capacity spent in refuels for a car for stats
         * doesn't take into account the first refuel made
         */
        CarModel.prototype.getTotalCapacityForStats = function () {
            var refuels = this.getRefuels().slice(0, -1);

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('capacity');
            }, 0);
        };

        /*
         * returns the refuels of the car by a given month of a certain year
         */
        CarModel.prototype.getRefuelsByMonth = function (month, year) {
            var refuels = Refuel.getRefuelsByMonth(month, year);
            // practically the same as the getTotalSpent function
            return _.where(refuels, {
                car: this._id.toString()
            });
        };

        /*
         * returns the complete name of the car: make + model
         */
        CarModel.prototype.getName = function () {
            return this.make + " " + this.model;
        };

        /**
         * returns the total kilometers traveled for a car
         * preconditions: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getTotalKilometers = function () {
            var firstRefuelKilometers = this.getFirstRefuel().overallKilometers,
                lastRefuelKilometers = this.getLastRefuel().overallKilometers;

            return lastRefuelKilometers - firstRefuelKilometers;
        };

        /**
         * returns the amount spent by kilometer
         * preconditions: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getSpentByKilometer = function () {
            return this.getTotalSpentForStats() / this.getTotalKilometers();
        };

        /**
         * returns the kilometers traveled with one liter of fuel
         * preconditions: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getConsumption = function () {
            // return this.getTotalKilometers() / this.getTotalCapacityForStats();
            return Utils.calculateConsumption(this.getTotalKilometers(),
                this.getTotalCapacityForStats());
        };

        /**
         * returns the average timestamp between refuels for a car
         * preconditions: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getAverageTimeBetweenRefuels = function () {
            return Utils.getAverageTimeBetweenRefuels(this.getRefuels());
        };

        /**
         * returns the average distance between refuels for a car
         * preconditions: this.hasMoreThanOneRefuel()
         */
        CarModel.prototype.getAverageDistanceBetweenRefuels = function () {
            return Utils.getAverageDistanceBetweenRefuels(this.getRefuels());
        };

        /**
         * returns the number of refuels for a car
         */
        CarModel.prototype.getRefuelsCount = function () {
            return this.getRefuels().length;
        };

        /**
         * returns the average capacity of refuels for a car
         */
        CarModel.prototype.getAverageCapacity = function () {
            return this.getTotalCapacity() / this.getRefuelsCount();
        };

        /**
         * returns the average spent of refuels for a car
         */
        CarModel.prototype.getAverageSpent = function () {
            return this.getTotalSpent() / this.getRefuelsCount();
        };

        return CarModel;
    }
]);
