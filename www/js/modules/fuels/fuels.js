angular.module('fuels', [])

.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider

        .state('app.fuelList', {
            url: '/fuels',
            resolve: {
                fuels: ['Fuel',
                    function (Fuel) {
                        return Fuel.query();
                    }
                ]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/fuels/fuels.html',
                    controller: 'Fuels'
                }
            }
        })

        .state('app.fuelNew', {
            url: '/fuels/new',
            resolve: {
                fuel: ['Fuel',
                    function (Fuel) {
                        return new Fuel();
                    }
                ]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/fuels/form.html',
                    controller: 'Fuels.Form'
                }
            }
        })

        .state('app.fuelEdit', {
            url: '/fuels/:id',
            resolve: {
                fuel: ['$stateParams', 'Fuel',
                    function ($stateParams, Fuel) {
                        return Fuel.get({
                            _id: parseInt($stateParams.id, 10)
                        });
                    }
                ]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/fuels/form.html',
                    controller: 'Fuels.Form'
                }
            }
        });

    }
]);
