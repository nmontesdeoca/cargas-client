(function () {
    'use strict';

    angular
        .module('cars')
        .run(run);

    run.$inject = ['routerHelper'];

    function run(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.carList',
                config: {
                    url: '/cars',
                    resolve: {
                        cars: carsResolve
                    },
                    views: {
                        menuContent: {
                            templateUrl: 'templates/cars/list.html',
                            controller: 'CarsController as controller'
                        }
                    }
                }
            }, {
                state: 'app.carNew',
                config: {
                    url: '/cars/new',
                    resolve: {
                        car: newCarResolve,
                        fuels: fuelsResolve,
                        makes: makesResolve
                    },
                    views: {
                        menuContent: {
                            templateUrl: 'templates/cars/form.html',
                            controller: 'Cars.Form'
                        }
                    }
                }
            }, {
                state: 'app.carEdit',
                config: {
                    url: '/cars/:id',
                    resolve: {
                        car: carResolve,
                        fuels: fuelsResolve,
                        makes: makesResolve
                    },
                    views: {
                        menuContent: {
                            templateUrl: 'templates/cars/form.html',
                            controller: 'Cars.Form'
                        }
                    }
                }
            }
        ];
    }

    carsResolve.$inject = ['CarFactory'];

    function carsResolve(CarFactory) {
        return CarFactory.query();
    }

    makesResolve.$inject = ['Utils'];

    function makesResolve(Utils) {
        return Utils.getMakes();
    }

    fuelsResolve.$inject = ['Fuel'];

    function fuelsResolve(Fuel) {
        /**
         * I couldn't have the text translated here so I returned a function
         * that will receive the translated text from the controller when it is used
         */
        return function (text) {
            return _.sortBy(Fuel.query(), 'name').concat([{
                name: text,
                value: 'newFuel'
            }]);
        };
    }

    newCarResolve.$inject = ['CarFactory'];

    function newCarResolve(CarFactory) {
        return new CarFactory();
    }

    carResolve.$inject = ['$stateParams', 'CarFactory'];

    function carResolve($stateParams, CarFactory) {
        return CarFactory.get({
            // string _id to supress the jscs warning
            '_id': parseInt($stateParams.id, 10)
        });
    }

})();
