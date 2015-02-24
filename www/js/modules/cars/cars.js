angular.module('cars', [])

.config(['$stateProvider', '$compileProvider',
    function ($stateProvider, $compileProvider) {

        var resolveMakes = ['Utils', function (Utils) {
                return Utils.getMakes();
            }],

            resolveFuels = ['Fuel', function (Fuel) {
                /**
                 * I couldn't have the text translated here so I returned a function
                 * that will receive the translated text from the controller when it is used
                 */
                return function (text) {
                    return [{
                        name: text,
                        value: 'newFuel'
                    }].concat(_.sortBy(Fuel.query(), 'name'));
                };
            }];

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|content):/);

        $stateProvider

        .state('app.carList', {
            url: '/cars',
            resolve: {
                cars: ['Car',
                    function (Car) {
                        return Car.query();
                    }
                ]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/cars/list.html',
                    controller: 'Cars'
                }
            }
        })

        .state('app.carNew', {
            url: '/cars/new',
            resolve: {
                car: ['Car',
                    function (Car) {
                        return new Car();
                    }
                ],
                fuels: resolveFuels,
                makes: resolveMakes
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/cars/form.html',
                    controller: 'Cars.Form'
                }
            }
        })

        .state('app.carEdit', {
            url: '/cars/:id',
            resolve: {
                car: ['$stateParams', 'Car',
                    function ($stateParams, Car) {
                        return Car.get({
                            _id: parseInt($stateParams.id, 10)
                        });
                    }
                ],
                fuels: resolveFuels,
                makes: resolveMakes
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/cars/form.html',
                    controller: 'Cars.Form'
                }
            }
        });
    }
]);
