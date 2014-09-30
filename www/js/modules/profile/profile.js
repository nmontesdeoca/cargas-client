angular.module('profile', [])

.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('app.profile', {
            url: '/profile',
            resolve: {
                profile: ['Profile',
                    function (Profile) {
                        return Profile.query();
                    }
                ]
            },
            views: {
                menuContent: {
                    templateUrl: 'templates/profile/profile.html',
                    controller: 'Profile'
                }
            }
        });

    }
]);
