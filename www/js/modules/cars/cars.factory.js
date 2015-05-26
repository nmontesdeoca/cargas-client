(function () {
    'use strict';

    angular
        .module('cars')
        .factory('CarFactory', CarFactory);

    CarFactory.$inject = ['Model', 'Utils', 'Refuel', 'TIME'];

    function CarFactory(model, Utils, Refuel, TIME) {
        /* jshint validthis:true */
        var CarModel = model('cars');

        /**
         * Class methods - Static method
         */
        CarModel.getRefueledCars = getRefueledCars;

        /**
         * Instance methods
         */
        _.extend(CarModel.prototype, {
            replaceFuel: replaceFuel,
            getRefuels: getRefuels,
            getTotalSpent: getTotalSpent,
            getTotalSpentForStats: getTotalSpentForStats,
            hasRefuels: hasRefuels,
            hasMoreThanOneRefuel: hasMoreThanOneRefuel,
            getFirstRefuel: getFirstRefuel,
            getLastRefuel: getLastRefuel,
            getTotalTime: getTotalTime,
            getSpentByYear: getSpentByYear,
            getSpentByMonth: getSpentByMonth,
            getSpentByDay: getSpentByDay,
            getSpentByHour: getSpentByHour,
            getSpentByMinute: getSpentByMinute,
            getSpentBySecond: getSpentBySecond,
            getSpentByMilisecond: getSpentByMilisecond,
            getTotalCapacity: getTotalCapacity,
            getTotalCapacityForStats: getTotalCapacityForStats,
            getRefuelsByMonth: getRefuelsByMonth,
            getName: getName,
            getTotalKilometers: getTotalKilometers,
            getSpentByKilometer: getSpentByKilometer,
            getConsumption: getConsumption,
            getAverageTimeBetweenRefuels: getAverageTimeBetweenRefuels,
            getAverageDistanceBetweenRefuels: getAverageDistanceBetweenRefuels,
            getRefuelsCount: getRefuelsCount,
            getAverageCapacity: getAverageCapacity,
            getAverageSpent: getAverageSpent
        });

        return CarModel;

        /*
         * get refueled cars (cars that have at least one refuel)
         */
        function getRefueledCars() {
            var cars = CarModel.query();

            return _.filter(cars, function (car) {
                return car.getRefuels().length > 0;
            });
        }

        /**
         * replace the current fuel object with the correct one from the list
         * if the second parameter "id" is present, the correct fuel will be that
         */
        function replaceFuel() {
            return Utils.replaceFuel.apply(this, arguments);
        }

        /*
         * returns the refuels of the instantiated car sort by date
         */
        function getRefuels() {
            var refuels = this.refuels ? this.refuels : Refuel.getRefuelsSortByDate();

            return _.where(refuels, {
                car: this._id.toString()
            });
        }

        /*
         * returns total money spent in refuels for a car
         */
        function getTotalSpent() {
            var refuels = this.getRefuels();

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('amount');
            }, 0);
        }

        /*
         * returns total money spent in refuels for a car for stats
         * doesn't take into account the first refuel made
         */
        function getTotalSpentForStats() {
            var refuels = this.getRefuels().slice(0, -1);

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('amount');
            }, 0);
        }

        /**
         * returns true if the car has been refueled, false in other case
         */
        function hasRefuels() {
            return !!this.getRefuels().length;
        }

        /**
         * returns true if the car has been refueled more than one time, false in other case
         */
        function hasMoreThanOneRefuel() {
            return this.getRefuels().length > 1;
        }

        /**
         * return the first refuel for a car
         * precondition: this.hasRefuels()
         */
        function getFirstRefuel() {
            return _.last(this.getRefuels());
        }

        /**
         * return the last refuel for a car
         * precondition: this.hasRefuels()
         */
        function getLastRefuel() {
            return _.first(this.getRefuels());
        }


        /**
         * return the total time between the first and the last refuel for a car
         * the unit used will be the passed by parameter using the constant
         * TIME
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getTotalTime(timeUnit) {
            var firstDate = this.getFirstRefuel().date,
                lastDate = this.getLastRefuel().date;

            return Utils.convertTime(lastDate - firstDate, timeUnit);
        }

        /**
         * return the spent by year amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getSpentByYear() {
            return this.getTotalSpentForStats() / this.getTotalTime(TIME.YEARS);
        }

        /**
         * return the spent by month amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getSpentByMonth() {
            return this.getTotalSpentForStats() / this.getTotalTime(TIME.MONTHS);
        }

        /**
         * return the spent by day amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getSpentByDay() {
            return this.getTotalSpentForStats() / this.getTotalTime(TIME.DAYS);
        }

        /**
         * return the spent by hour amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getSpentByHour() {
            return this.getTotalSpentForStats() / this.getTotalTime(TIME.HOURS);
        }

        /**
         * return the spent by minute amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getSpentByMinute() {
            return this.getTotalSpentForStats() / this.getTotalTime(TIME.MINUTES);
        }

        /**
         * return the spent by second amount in refuels for a car
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getSpentBySecond() {
            return this.getTotalSpentForStats() / this.getTotalTime(TIME.SECONDS);
        }

        /**
         * return the spent by millisecond amount in refuels for  car
         * precondition: this.hasMoreThanOneRefuel()
         */
        function getSpentByMilisecond() {
            return this.getTotalSpentForStats() / this.getTotalTime(TIME.MILLISECONDS);
        }

        /*
         * returns total capacity spent in refuels for a car
         */
        function getTotalCapacity() {
            var refuels = this.getRefuels();

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('capacity');
            }, 0);
        }

        /*
         * returns total capacity spent in refuels for a car for stats
         * doesn't take into account the first refuel made
         */
        function getTotalCapacityForStats() {
            var refuels = this.getRefuels().slice(0, -1);

            return _.reduce(refuels, function (memo, current) {
                return memo + current.get('capacity');
            }, 0);
        }

        /*
         * returns the refuels of the car by a given month of a certain year
         */
        function getRefuelsByMonth(month, year) {
            var refuels = Refuel.getRefuelsByMonth(month, year);
            // practically the same as the getTotalSpent function
            return _.where(refuels, {
                car: this._id.toString()
            });
        }

        /*
         * returns the complete name of the car: make + model
         */
        function getName() {
            return this.make + " " + this.model;
        }

        /**
         * returns the total kilometers traveled for a car
         * preconditions: this.hasMoreThanOneRefuel()
         */
        function getTotalKilometers() {
            var firstRefuelKilometers = this.getFirstRefuel().overallKilometers,
                lastRefuelKilometers = this.getLastRefuel().overallKilometers;

            return lastRefuelKilometers - firstRefuelKilometers;
        }

        /**
         * returns the amount spent by kilometer
         * preconditions: this.hasMoreThanOneRefuel()
         */
        function getSpentByKilometer() {
            return this.getTotalSpentForStats() / this.getTotalKilometers();
        }

        /**
         * returns the kilometers traveled with one liter of fuel
         * preconditions: this.hasMoreThanOneRefuel()
         */
        function getConsumption() {
            // return this.getTotalKilometers() / this.getTotalCapacityForStats();
            return Utils.calculateConsumption(this.getTotalKilometers(),
                this.getTotalCapacityForStats());
        }

        /**
         * returns the average timestamp between refuels for a car
         * preconditions: this.hasMoreThanOneRefuel()
         */
        function getAverageTimeBetweenRefuels() {
            return Utils.getAverageTimeBetweenRefuels(this.getRefuels());
        }

        /**
         * returns the average distance between refuels for a car
         * preconditions: this.hasMoreThanOneRefuel()
         */
        function getAverageDistanceBetweenRefuels() {
            return Utils.getAverageDistanceBetweenRefuels(this.getRefuels());
        }

        /**
         * returns the number of refuels for a car
         */
        function getRefuelsCount() {
            return this.getRefuels().length;
        }

        /**
         * returns the average capacity of refuels for a car
         */
        function getAverageCapacity() {
            return this.getTotalCapacity() / this.getRefuelsCount();
        }

        /**
         * returns the average spent of refuels for a car
         */
        function getAverageSpent() {
            return this.getTotalSpent() / this.getRefuelsCount();
        }
    }

})();
