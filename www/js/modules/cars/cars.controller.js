(function () {
    'use strict';

    angular
        .module('cars')
        .controller('CarsController', CarsController);

    CarsController.$inject = ['cars'];

    function CarsController(cars) {
        this.cars = cars;
    }

})();
