angular.module('cars', [])

.config(['$stateProvider',
    function ($stateProvider) {

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
                fuels: ['Fuel',
                    function (Fuel) {
                        return _.sortBy(Fuel.query(), 'name');
                    }
                ],
                makes: ['Utils',
                    function (Utils) {
                        return Utils.getMakes();
                    }
                ]
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
                fuels: ['Fuel',
                    function (Fuel) {
                        return _.sortBy(Fuel.query(), 'name');
                    }
                ],
                makes: ['Utils',
                    function (Utils) {
                        return Utils.getMakes();
                    }
                ]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/cars/form.html',
                    controller: 'Cars.Form'
                }
            }
        })

        .state('app.carNewMakeModel', {
            url: '/cars/new/make-model',
            views: {
                menuContent: {
                    templateUrl: 'templates/cars/new-make-model.html',
                    controller: 'Cars.Form'
                }
            }
        });

    }
]);
