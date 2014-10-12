angular.module('stats', [])

.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('app.stats', {
            url: '/stats',
            resolve: {
                totalSpent: ['Refuel',
                    function (Refuel) {
                        return Refuel.getTotalSpent();
                    }
                ],
                totalKilometers: ['Refuel',
                    function (Refuel) {
                        if (Refuel.hasRefuels()) {
                            return Refuel.getTotalKilometers();
                        }
                        return 0;
                    }
                ],
                totalCapacity: ['Refuel',
                    function (Refuel) {
                        return Refuel.getTotalCapacity();
                    }
                ],
                spentByYear: ['Refuel',
                    function (Refuel) {
                        if (Refuel.hasRefuels()) {
                            return Refuel.getSpentByYear();
                        }
                        return 0;
                    }
                ],
                spentByMonth: ['Refuel',
                    function (Refuel) {
                        if (Refuel.hasRefuels()) {
                            return Refuel.getSpentByMonth();
                        }
                        return 0;
                    }
                ],
                spentByDay: ['Refuel',
                    function (Refuel) {
                        if (Refuel.hasRefuels()) {
                            return Refuel.getSpentByDay();
                        }
                        return 0;
                    }
                ]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/stats/stats.html',
                    controller: 'Stats'
                }
            }
        });

    }
]);
